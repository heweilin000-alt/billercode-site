import { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { SITE_NAME, SITE_URL, PER_PAGE } from "@/lib/utils";
import BillerCard from "@/components/BillerCard";
import Pagination from "@/components/Pagination";
import SearchBox from "@/components/SearchBox";
import AlphabetNav from "@/components/AlphabetNav";

export const metadata: Metadata = {
  title: `Complete List of Australian BPAY Biller Codes - ${SITE_NAME}`,
  description:
    "Browse the complete list of all Australian BPAY Biller Codes. Over 30,000 verified biller codes with merchant names and payment methods.",
  alternates: { canonical: `${SITE_URL}/all-biller-codes/` },
};

export const revalidate = 2592000; // 30 days

interface Props {
  searchParams: Promise<{ page?: string; letter?: string }>;
}

export default async function AllBillerCodesPage({ searchParams }: Props) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page || "1", 10));
  const letter = sp.letter || "";
  const offset = (page - 1) * PER_PAGE;

  let query = supabase
    .from("biller_codes")
    .select("slug, biller_code, merchant_name, merchant_short_name, payment_methods", {
      count: "exact",
    })
    .order("merchant_name", { ascending: true });

  // A-Z filter: letters filter by merchant_name, digits filter by biller_code
  if (letter) {
    if (/^\d$/.test(letter)) {
      query = query.ilike("biller_code", `${letter}%`);
    } else {
      query = query.ilike("merchant_name", `${letter}%`);
    }
  }

  const { data: billers, count } = await query.range(offset, offset + PER_PAGE - 1);

  const totalPages = Math.ceil((count || 0) / PER_PAGE);

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        All Australian BPAY Biller Codes
      </h1>
      <p className="text-gray-500 mb-6">
        Browse {letter ? "BPAY biller codes starting with " + letter : `all ${count?.toLocaleString()} registered BPAY biller codes`}.
        You can also{" "}
        <Link href="/biller-code-search/" className="text-brand-600 hover:underline font-medium">
          search BPAY codes by name or number
        </Link>.
      </p>

      <div className="mb-6">
        <SearchBox />
      </div>

      {/* A-Z navigation — SEO: creates crawlable filtered views */}
      <AlphabetNav basePath="/all-biller-codes/" activeLetter={letter} />

      <div className="space-y-3">
        {billers?.map((b) => (
          <BillerCard key={b.slug} {...b} />
        ))}
      </div>

      {billers?.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No biller codes found starting with &quot;{letter}&quot;.</p>
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath={letter ? `/all-biller-codes/?letter=${letter}` : "/all-biller-codes/"}
      />

      {/* SEO: contextual links to related sections */}
      <div className="mt-10 bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h2 className="font-semibold text-gray-900 mb-3">
          Looking for something specific?
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Use our{" "}
          <Link href="/biller-code-search/" className="text-brand-600 hover:underline font-medium">
            biller code search
          </Link>{" "}
          to quickly find a specific merchant or code. For guides on making BPAY
          payments, visit our{" "}
          <Link href="/knowledge/" className="text-brand-600 hover:underline font-medium">
            knowledge base
          </Link>.
        </p>
      </div>
    </>
  );
}
