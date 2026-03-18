import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface RelatedBillersProps {
  currentSlug: string;
  merchantName: string;
}

export default async function RelatedBillers({
  currentSlug,
  merchantName,
}: RelatedBillersProps) {
  // Extract first meaningful word(s) from merchant name for matching
  const searchTerm = merchantName
    .replace(/\b(pty|ltd|inc|corp|limited|australia|group)\b/gi, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .join(" ")
    .trim();

  if (!searchTerm || searchTerm.length < 3) return null;

  const { data: related } = await supabase
    .from("biller_codes")
    .select("slug, biller_code, merchant_name, merchant_short_name")
    .ilike("merchant_name", `%${searchTerm}%`)
    .neq("slug", currentSlug)
    .limit(6);

  if (!related?.length) return null;

  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Related Biller Codes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {related.map((b) => (
          <Link
            key={b.slug}
            prefetch={false}
            href={`/biller-codes/${b.slug}/`}
            className="flex items-center justify-between gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-brand-300 hover:shadow-sm transition-all group"
          >
            <span className="text-sm text-gray-900 truncate group-hover:text-brand-700 transition-colors">
              {b.merchant_name}
            </span>
            <span className="shrink-0 text-xs font-mono font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
              {b.biller_code}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
