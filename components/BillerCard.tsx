import Link from "next/link";

interface BillerCardProps {
  slug: string;
  biller_code: string;
  merchant_name: string;
  merchant_short_name: string;
  payment_methods?: string;
}

export default function BillerCard({
  slug,
  biller_code,
  merchant_name,
  merchant_short_name,
}: BillerCardProps) {
  return (
    <Link
      prefetch={false}
      href={`/biller-codes/${slug}/`}
      className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-brand-300 hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-gray-900 truncate group-hover:text-brand-700 transition-colors">
            {merchant_name}
          </p>
          {merchant_short_name && merchant_short_name !== merchant_name && (
            <p className="text-sm text-gray-500 truncate">{merchant_short_name}</p>
          )}
        </div>
        <span className="shrink-0 px-3 py-1 bg-brand-50 text-brand-700 font-mono font-bold rounded-md text-sm">
          {biller_code}
        </span>
      </div>
    </Link>
  );
}
