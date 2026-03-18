"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox({ defaultValue = "" }: { defaultValue?: string }) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/biller-code-search/?q=${encodeURIComponent(q)}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      <div className="flex rounded-xl border-2 border-gray-200 bg-white shadow-sm focus-within:border-brand-500 focus-within:shadow-md transition-all">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search BPAY biller code or merchant name..."
          className="flex-1 px-4 py-3 text-base rounded-l-xl outline-none bg-transparent"
          autoComplete="off"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-brand-600 text-white font-medium rounded-r-xl hover:bg-brand-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
