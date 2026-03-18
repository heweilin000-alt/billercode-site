import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cache } from "react";
import { supabase } from "@/lib/supabase";
import { SITE_NAME, SITE_URL } from "@/lib/utils";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import InternalLinkCTA from "@/components/InternalLinkCTA";

interface Props {
  params: Promise<{ slug: string }>;
}

const getPost = cache(async (slug: string) => {
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not Found" };

  const title = post.yoast_title || `${post.title} - ${SITE_NAME}`;
  const description =
    post.yoast_desc ||
    (post.content || "")
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 155);

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/knowledge/${slug}/` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/knowledge/${slug}/`,
      type: "article",
      siteName: SITE_NAME,
    },
  };
}

export const revalidate = 2592000; // 30 days

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  // Fetch other articles for "Related Articles" section
  const { data: otherPosts } = await supabase
    .from("blog_posts")
    .select("slug, title")
    .neq("slug", slug)
    .order("date", { ascending: false })
    .limit(4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      articleJsonLd(post),
      breadcrumbJsonLd([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Knowledge", url: `${SITE_URL}/knowledge/` },
        { name: post.title, url: `${SITE_URL}/knowledge/${slug}/` },
      ]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/knowledge/" className="hover:text-brand-600 transition-colors">Knowledge</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{post.title}</span>
      </nav>

      <article className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        {post.date && (
          <p className="text-sm text-gray-400 mb-6">
            {new Date(post.date).toLocaleDateString("en-AU", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
        <div
          className="prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
      </article>

      {/* Related Articles — SEO: cross-link between blog posts */}
      {otherPosts && otherPosts.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {otherPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/knowledge/${p.slug}/`}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-brand-300 hover:shadow-sm transition-all group"
              >
                <span className="text-sm font-medium text-gray-900 group-hover:text-brand-700 transition-colors line-clamp-2">
                  {p.title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA — SEO: link from blog to core pages */}
      <InternalLinkCTA />
    </>
  );
}
