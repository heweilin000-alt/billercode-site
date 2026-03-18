import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const data = JSON.parse(
  readFileSync(resolve(__dirname, "../../billercode-export.json"), "utf-8")
);

async function batchInsert(table, rows, batchSize = 500) {
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const { error } = await supabase
      .from(table)
      .upsert(batch, { onConflict: "slug" });
    if (error) {
      console.error(
        `Error inserting into ${table} at batch ${i}:`,
        error.message
      );
      process.exit(1);
    }
    console.log(
      `  ${table}: batch ${Math.floor(i / batchSize) + 1} (${Math.min(i + batchSize, rows.length)}/${rows.length})`
    );
  }
  console.log(`${table}: ${rows.length} rows inserted\n`);
}

// Biller Codes — handle both acf_prefixed and plain field names
console.log("Importing biller codes...");
const billerCodes = data.biller_records.map((r) => ({
  slug: r.slug,
  title: r.title,
  biller_code: r.acf_biller_code || r.biller_code || r.slug,
  merchant_name: r.acf_merchant_name || r.merchant_name || "",
  merchant_short_name: r.acf_merchant_short_name || r.merchant_short_name || "",
  payment_methods: r.acf_payment_methods || r.payment_methods || "",
  payment_method_2: r.acf_payment_method_2 || r.payment_method_2 || "",
  payment_method_3: r.acf_payment_method_3 || r.payment_method_3 || "",
  payment_method_4: r.acf_payment_method_4 || r.payment_method_4 || "",
  yoast_title: r.yoast_title || "",
  yoast_desc: r.yoast_desc || "",
}));
await batchInsert("biller_codes", billerCodes);

// Blog Posts
console.log("Importing blog posts...");
const blogPosts = data.blog_posts.map((p) => ({
  slug: p.slug,
  title: p.title,
  url: p.url || "",
  date: p.date || null,
  modified: p.modified || null,
  content: p.content || "",
  excerpt: p.excerpt || "",
  categories: p.categories || [],
  tags: p.tags || [],
  yoast_title: p.yoast_title || "",
  yoast_desc: p.yoast_desc || "",
}));
await batchInsert("blog_posts", blogPosts);

// Pages
console.log("Importing pages...");
const pages = data.pages.map((p) => ({
  slug: p.slug,
  title: p.title,
  content: p.content || "",
  yoast_title: p.yoast_title || "",
  yoast_desc: p.yoast_desc || "",
}));
await batchInsert("pages", pages);

console.log("Done! Verify row counts in Supabase dashboard.");
