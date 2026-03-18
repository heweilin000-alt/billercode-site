import { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL, PER_PAGE } from "@/lib/utils";
import { searchBillerCodes } from "@/lib/search";
import SearchBox from "@/components/SearchBox";
import BillerCard from "@/components/BillerCard";
import Pagination from "@/components/Pagination";
import PopularBillers from "@/components/PopularBillers";

export const metadata: Metadata = {
  title: `Search BPAY Biller Codes - ${SITE_NAME}`,
  description:
    "Search for Australian BPAY Biller Codes by merchant name or biller code number. Fast and accurate results from 30,000+ verified codes.",
  alternates: { canonical: `${SITE_URL}/biller-code-search/` },
};

interface Props {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const sp = await searchParams;
  const query = sp.q || "";
  const page = Math.max(1, parseInt(sp.page || "1", 10));

  let results: Awaited<ReturnType<typeof searchBillerCodes>> | null = null;
  if (query) {
    results = await searchBillerCodes(query, page);
  }

  const totalPages = results ? Math.ceil(results.total / PER_PAGE) : 0;

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        Search BPAY Biller Codes
      </h1>
      <p className="text-gray-500 mb-6">
        Enter a BPAY biller code number or merchant name to search. Or{" "}
        <Link prefetch={false} href="/all-biller-codes/" className="text-brand-600 hover:underline font-medium">
          browse all BPAY codes
        </Link>.
      </p>

      <div className="mb-8">
        <SearchBox defaultValue={query} />
      </div>

      {query && results && (
        <>
          <p className="text-sm text-gray-500 mb-4">
            {results.total} result{results.total !== 1 ? "s" : ""} for &quot;
            {query}&quot;
          </p>

          {results.results.length > 0 ? (
            <div className="space-y-3">
              {results.results.map((b) => (
                <BillerCard key={b.slug} {...b} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">No biller codes found</p>
              <p className="text-sm">
                Try a different search term or{" "}
                <Link
                  href="/all-biller-codes/"
                  className="text-brand-600 hover:underline"
                >
                  browse all biller codes
                </Link>
                . You can also check our{" "}
                <Link
                  href="/knowledge/"
                  className="text-brand-600 hover:underline"
                >
                  BPAY knowledge base
                </Link>{" "}
                for help.
              </p>
            </div>
          )}

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            basePath={`/biller-code-search/?q=${encodeURIComponent(query)}`}
          />
        </>
      )}

      {/* When no search yet, show popular billers — SEO: internal links */}
      {!query && <PopularBillers title="Popular Biller Codes" limit={12} />}
    </>
  );
}
