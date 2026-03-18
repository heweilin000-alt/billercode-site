import Link from "next/link";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

interface AlphabetNavProps {
  basePath: string;
  activeLetter?: string;
}

export default function AlphabetNav({ basePath, activeLetter }: AlphabetNavProps) {
  return (
    <nav className="flex flex-wrap gap-1 mb-6" aria-label="Alphabetical navigation">
      <Link
        href={basePath}
        className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
          !activeLetter
            ? "bg-brand-600 text-white"
            : "bg-white border border-gray-200 text-gray-600 hover:border-brand-300 hover:text-brand-700"
        }`}
      >
        All
      </Link>
      {LETTERS.map((letter) => (
        <Link
          key={letter}
          href={`${basePath}?letter=${letter}`}
          className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeLetter === letter
              ? "bg-brand-600 text-white"
              : "bg-white border border-gray-200 text-gray-600 hover:border-brand-300 hover:text-brand-700"
          }`}
        >
          {letter}
        </Link>
      ))}
    </nav>
  );
}
