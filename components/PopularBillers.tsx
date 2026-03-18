import Link from "next/link";

interface PopularBillersProps {
  excludeSlug?: string;
  title?: string;
  limit?: number;
}

// Static data from real database — no Supabase query needed
const POPULAR_BILLERS = [
  { slug: "23796", biller_code: "23796", merchant_name: "Telstra" },
  { slug: "1545", biller_code: "1545", merchant_name: "AGL Sales - Electricity" },
  { slug: "314534", biller_code: "314534", merchant_name: "Origin Energy" },
  { slug: "1313", biller_code: "1313", merchant_name: "EnergyAustralia Electricity" },
  { slug: "192146", biller_code: "192146", merchant_name: "Optus Billing" },
  { slug: "52225", biller_code: "52225", merchant_name: "Vodafone Postpaid" },
  { slug: "272344", biller_code: "272344", merchant_name: "Sydney Water" },
  { slug: "131672", biller_code: "131672", merchant_name: "Ergon Energy" },
  { slug: "168930", biller_code: "168930", merchant_name: "Alinta Energy" },
  { slug: "636241", biller_code: "636241", merchant_name: "Ausgrid" },
  { slug: "160952", biller_code: "160952", merchant_name: "Endeavour Energy" },
  { slug: "35477", biller_code: "35477", merchant_name: "SA Water" },
];

export default function PopularBillers({
  excludeSlug,
  title = "Popular BPAY Biller Codes",
  limit = 10,
}: PopularBillersProps) {
  const billers = POPULAR_BILLERS.filter((b) => b.slug !== excludeSlug).slice(0, limit);

  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {billers.map((b) => (
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
      <div className="mt-4 text-center">
        <Link
          prefetch={false}
          href="/all-biller-codes/"
          className="text-sm text-brand-600 hover:text-brand-700 hover:underline font-medium"
        >
          View all 30,000+ BPAY biller codes
        </Link>
      </div>
    </section>
  );
}
