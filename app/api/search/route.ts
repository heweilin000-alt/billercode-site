import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get("q") || "").trim();
  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const numericOnly = q.replace(/\D/g, "");
  const isNumeric = /^\d+$/.test(q.replace(/\s/g, ""));

  let data;

  if (isNumeric && numericOnly.length >= 2) {
    // Search by biller code
    const res = await supabase
      .from("biller_codes")
      .select("slug, biller_code, merchant_name, merchant_short_name")
      .ilike("biller_code", `%${numericOnly}%`)
      .limit(20);
    data = res.data;
  } else {
    // Search by merchant name
    const res = await supabase
      .from("biller_codes")
      .select("slug, biller_code, merchant_name, merchant_short_name")
      .or(
        `merchant_name.ilike.%${q}%,merchant_short_name.ilike.%${q}%`
      )
      .limit(20);
    data = res.data;
  }

  return NextResponse.json(
    { results: data || [] },
    {
      headers: {
        "Cache-Control":
          "public, s-maxage=2592000, stale-while-revalidate=2592000",
      },
    }
  );
}
