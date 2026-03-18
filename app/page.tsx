import { Metadata } from "next";
import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import PopularBillers from "@/components/PopularBillers";
import { SITE_NAME, SITE_URL } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: `Find BPAY Biller Codes in Australia - ${SITE_NAME}`,
  description:
    "Search and lookup Australian BPAY Biller Codes. Find biller codes by merchant name or code number. Complete directory of 30,000+ registered BPAY billers.",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: `Find BPAY Biller Codes in Australia - ${SITE_NAME}`,
    description:
      "Search and lookup Australian BPAY Biller Codes. Complete directory of 30,000+ registered BPAY billers.",
    url: `${SITE_URL}/`,
    type: "website",
    siteName: SITE_NAME,
  },
};

export const revalidate = 2592000; // 30 days

export default async function HomePage() {
  // Fetch recent blog posts for internal linking
  const { data: recentPosts } = await supabase
    .from("blog_posts")
    .select("slug, title")
    .order("date", { ascending: false })
    .limit(4);

  return (
    <>
      {/* Hero */}
      <div className="py-14 md:py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
          30,000+ verified biller codes
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Australian BPAY<br className="hidden md:block" /> Biller Code Lookup
        </h1>
        <p className="text-gray-500 mb-8 max-w-2xl mx-auto text-lg">
          Find the biller code you need by merchant name or code number.
        </p>
        <SearchBox />
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <Link
          href="/all-biller-codes/"
          className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-brand-300 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center shrink-0 group-hover:bg-brand-100 transition-colors">
            <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <div>
            <span className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">All Biller Codes</span>
            <p className="text-sm text-gray-400">Browse 30,000+ codes</p>
          </div>
        </Link>
        <Link
          href="/biller-code-search/"
          className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-brand-300 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center shrink-0 group-hover:bg-brand-100 transition-colors">
            <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div>
            <span className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">Search Biller Codes</span>
            <p className="text-sm text-gray-400">By name or code number</p>
          </div>
        </Link>
        <Link
          href="/knowledge/"
          className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-brand-300 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center shrink-0 group-hover:bg-brand-100 transition-colors">
            <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <span className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">BPAY Knowledge Base</span>
            <p className="text-sm text-gray-400">Guides & articles</p>
          </div>
        </Link>
      </div>

      {/* Popular Biller Codes — SEO: internal links to detail pages from homepage */}
      <PopularBillers title="Popular Biller Codes" limit={10} />

      {/* Info section */}
      <div className="bg-gradient-to-r from-brand-50 to-emerald-50 border border-brand-200 rounded-xl p-6 md:p-8 mt-10 mb-8">
        <h2 className="font-semibold text-gray-900 mb-3 text-lg">
          What is a BPAY Biller Code?
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          A BPAY Biller Code is a unique identifier assigned to businesses and
          organisations that accept BPAY payments in Australia. When making a
          BPAY payment through your bank, you need the biller code and your
          customer reference number. Our directory contains over 30,000
          verified biller codes to help you find the right one.
        </p>
        <p className="text-gray-600 leading-relaxed">
          You can{" "}
          <Link href="/biller-code-search/" className="text-brand-600 hover:underline font-medium">
            search for a biller code
          </Link>{" "}
          by entering a merchant name or code number, or{" "}
          <Link href="/all-biller-codes/" className="text-brand-600 hover:underline font-medium">
            browse the complete list
          </Link>{" "}
          of all registered BPAY billers. To learn more about how BPAY works, visit our{" "}
          <Link href="/knowledge/" className="text-brand-600 hover:underline font-medium">
            knowledge base
          </Link>
          .
        </p>
      </div>

      {/* Recent articles — SEO: cross-link blog from homepage */}
      {recentPosts && recentPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Latest BPAY Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/knowledge/${post.slug}/`}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-brand-300 hover:shadow-sm transition-all group"
              >
                <span className="text-sm font-medium text-gray-900 group-hover:text-brand-700 transition-colors line-clamp-2">
                  {post.title}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-3 text-center">
            <Link
              href="/knowledge/"
              className="text-sm text-brand-600 hover:text-brand-700 hover:underline font-medium"
            >
              View all articles
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
