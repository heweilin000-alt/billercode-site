"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { SITE_NAME } from "@/lib/utils";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.webp" alt={SITE_NAME} width={36} height={36} priority />
          <span className="text-xl font-bold text-brand-700">{SITE_NAME}</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/all-biller-codes/" className="hover:text-brand-700 transition-colors">
            All Biller Codes
          </Link>
          <Link href="/biller-code-search/" className="hover:text-brand-700 transition-colors">
            Search
          </Link>
          <Link href="/knowledge/" className="hover:text-brand-700 transition-colors">
            Knowledge
          </Link>
          <Link href="/about/" className="hover:text-brand-700 transition-colors">
            About
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-1">
          <Link href="/all-biller-codes/" className="block py-2.5 text-gray-700 hover:text-brand-700" onClick={() => setMenuOpen(false)}>
            All Biller Codes
          </Link>
          <Link href="/biller-code-search/" className="block py-2.5 text-gray-700 hover:text-brand-700" onClick={() => setMenuOpen(false)}>
            Search
          </Link>
          <Link href="/knowledge/" className="block py-2.5 text-gray-700 hover:text-brand-700" onClick={() => setMenuOpen(false)}>
            Knowledge
          </Link>
          <Link href="/about/" className="block py-2.5 text-gray-700 hover:text-brand-700" onClick={() => setMenuOpen(false)}>
            About
          </Link>
        </div>
      )}
    </header>
  );
}
