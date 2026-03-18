import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  function pageUrl(p: number) {
    if (p === 1) return basePath;
    return `${basePath}?page=${p}`;
  }

  return (
    <nav className="flex items-center justify-center gap-1 mt-8" aria-label="Pagination">
      {currentPage > 1 && (
        <Link
          href={pageUrl(currentPage - 1)}
          className="px-3 py-2 text-sm rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Previous
        </Link>
      )}

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-2 py-2 text-gray-400">...</span>
        ) : (
          <Link
            key={p}
            href={pageUrl(p)}
            className={`px-3 py-2 text-sm rounded-md border transition-colors ${
              p === currentPage
                ? "bg-brand-600 text-white border-brand-600"
                : "border-gray-200 hover:bg-brand-50 hover:border-brand-200"
            }`}
          >
            {p}
          </Link>
        )
      )}

      {currentPage < totalPages && (
        <Link
          href={pageUrl(currentPage + 1)}
          className="px-3 py-2 text-sm rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
