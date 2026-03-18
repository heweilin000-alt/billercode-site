import { supabase } from "./supabase";
import { PER_PAGE } from "./utils";

function buildTsQuery(raw: string): string {
  const words = raw.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  return words.map((w) => w.replace(/[^a-zA-Z0-9]/g, "") + ":*").join(" & ");
}

export async function searchBillerCodes(rawQuery: string, page: number = 1) {
  const offset = (page - 1) * PER_PAGE;
  const trimmed = rawQuery.trim();
  const numericOnly = trimmed.replace(/\D/g, "");
  const isAllDigits = /^\d+$/.test(trimmed.replace(/\s/g, ""));

  // 1) Exact biller code match
  if (isAllDigits && numericOnly.length >= 4) {
    const { data, count } = await supabase
      .from("biller_codes")
      .select(
        "slug, biller_code, merchant_name, merchant_short_name, payment_methods",
        { count: "exact" }
      )
      .eq("biller_code", numericOnly)
      .range(offset, offset + PER_PAGE - 1);
    if (data?.length)
      return { results: data, total: count || 0, type: "exact" as const };
  }

  // 2) Partial numeric match
  if (isAllDigits && numericOnly.length >= 2) {
    const { data, count } = await supabase
      .from("biller_codes")
      .select(
        "slug, biller_code, merchant_name, merchant_short_name, payment_methods",
        { count: "exact" }
      )
      .ilike("biller_code", `%${numericOnly}%`)
      .range(offset, offset + PER_PAGE - 1);
    if (data?.length)
      return { results: data, total: count || 0, type: "numeric" as const };
  }

  // 3) Full-text search
  const tsQuery = buildTsQuery(trimmed);
  if (tsQuery) {
    const { data, count } = await supabase
      .from("biller_codes")
      .select(
        "slug, biller_code, merchant_name, merchant_short_name, payment_methods",
        { count: "exact" }
      )
      .textSearch("fts", tsQuery)
      .range(offset, offset + PER_PAGE - 1);
    if (data?.length)
      return { results: data, total: count || 0, type: "keyword" as const };
  }

  // 4) ILIKE fallback
  const { data, count } = await supabase
    .from("biller_codes")
    .select(
      "slug, biller_code, merchant_name, merchant_short_name, payment_methods",
      { count: "exact" }
    )
    .or(
      `merchant_name.ilike.%${trimmed}%,merchant_short_name.ilike.%${trimmed}%,biller_code.ilike.%${trimmed}%`
    )
    .range(offset, offset + PER_PAGE - 1);

  return { results: data || [], total: count || 0, type: "keyword" as const };
}
