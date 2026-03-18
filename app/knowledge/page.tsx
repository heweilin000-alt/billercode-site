import { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { SITE_NAME, SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: `BPAY Knowledge Base - ${SITE_NAME}`,
  description:
    "Learn about BPAY payments in Australia. Guides, tips, and articles about using BPAY, biller codes, and payment methods.",
  alternates: { canonical: `${SITE_URL}/knowledge/` },
};

export const revalidate = 2592000; // 30 days

export default async function KnowledgePage() {
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, title, date, excerpt, categories")
    .order("date", { ascending: false });

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        BPAY Knowledge Base
      </h1>
      <p className="text-gray-500 mb-8">
        Guides and articles about BPAY payments in Australia. Need to find a
        biller code?{" "}
        <Link href="/biller-code-search/" className="text-brand-600 hover:underline font-medium">
          Search here
        </Link>.
      </p>

      <div className="space-y-6">
        {posts?.map((post) => (
          <article
            key={post.slug}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <Link href={`/knowledge/${post.slug}/`}>
              <h2 className="text-lg font-semibold text-gray-900 mb-2 hover:text-brand-600 transition-colors">
                {post.title}
              </h2>
            </Link>
            {post.date && (
              <p className="text-sm text-gray-400 mb-2">
                {new Date(post.date).toLocaleDateString("en-AU", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
            {post.excerpt && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {post.excerpt}
              </p>
            )}
            <Link
              href={`/knowledge/${post.slug}/`}
              className="inline-block mt-3 text-sm text-brand-600 hover:underline font-medium"
            >
              Read more
            </Link>
          </article>
        ))}
      </div>

      {/* SEO: CTA linking to main functionality */}
      <div className="mt-10 bg-brand-50 border border-brand-200 rounded-xl p-6">
        <h2 className="font-semibold text-gray-900 mb-3">
          Find Your Biller Code
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Ready to make a BPAY payment? Search our directory of over 30,000
          Australian biller codes to find the one you need.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/biller-code-search/"
            className="px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition-colors"
          >
            Search Biller Codes
          </Link>
          <Link
            href="/all-biller-codes/"
            className="px-4 py-2 border border-brand-300 text-brand-700 text-sm font-medium rounded-lg hover:bg-brand-50 transition-colors"
          >
            Browse All Codes
          </Link>
        </div>
      </div>
    </>
  );
}
