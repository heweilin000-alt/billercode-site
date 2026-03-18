import { MetadataRoute } from "next";
import { fetchAllRows } from "@/lib/supabase-fetch";
import { supabase } from "@/lib/supabase";

export const revalidate = 2592000; // 30 days

const SITE_URL = "https://www.billercodes.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const slug of [
    "",
    "all-biller-codes",
    "biller-code-search",
    "knowledge",
    "about",
    "privacy-policy",
    "terms-and-conditions",
    "disclaimer",
  ]) {
    entries.push({ url: `${SITE_URL}/${slug ? slug + "/" : ""}` });
  }

  // All biller code detail pages — only fetch slug (minimal payload)
  const allBillers = await fetchAllRows<{ slug: string }>(
    "biller_codes",
    "slug"
  );
  for (const r of allBillers) {
    entries.push({ url: `${SITE_URL}/biller-codes/${r.slug}/` });
  }

  // Blog posts
  const { data: blogPosts } = await supabase
    .from("blog_posts")
    .select("slug");
  for (const post of blogPosts || []) {
    entries.push({ url: `${SITE_URL}/knowledge/${post.slug}/` });
  }

  return entries;
}
