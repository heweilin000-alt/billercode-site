import Link from "next/link";

export default function InternalLinkCTA() {
  return (
    <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 mt-8">
      <h3 className="font-semibold text-gray-900 mb-3">
        Find Your BPAY Biller Code
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Need to make a BPAY payment? Search our directory of over 30,000
        Australian BPAY biller codes to find the one you need.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          prefetch={false}
          href="/biller-code-search/"
          className="px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition-colors"
        >
          Search BPAY Codes
        </Link>
        <Link
          prefetch={false}
          href="/all-biller-codes/"
          className="px-4 py-2 border border-brand-300 text-brand-700 text-sm font-medium rounded-lg hover:bg-brand-50 transition-colors"
        >
          Browse All Codes
        </Link>
        <Link
          prefetch={false}
          href="/knowledge/"
          className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          BPAY Guides
        </Link>
      </div>
    </div>
  );
}
