import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          href="/"
          className="px-5 py-2.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/biller-code-search/"
          className="px-5 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Search Biller Codes
        </Link>
      </div>
    </div>
  );
}
