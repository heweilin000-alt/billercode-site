import Link from "next/link";
import { SITE_NAME } from "@/lib/utils";

const POPULAR_FOOTER_LINKS = [
  { code: "23796", name: "Telstra" },
  { code: "1545", name: "AGL" },
  { code: "314534", name: "Origin Energy" },
  { code: "1313", name: "EnergyAustralia" },
  { code: "192146", name: "Optus" },
  { code: "52225", name: "Vodafone" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-brand-200/70 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">BPAY Biller Codes</h3>
            <div className="space-y-2 text-sm">
              <Link href="/all-biller-codes/" className="block hover:text-white transition-colors">
                All BPAY Biller Codes
              </Link>
              <Link href="/biller-code-search/" className="block hover:text-white transition-colors">
                Search BPAY Codes
              </Link>
              <Link href="/all-biller-codes/?letter=A" className="block hover:text-white transition-colors">
                BPAY Billers Starting with A
              </Link>
              <Link href="/all-biller-codes/?letter=B" className="block hover:text-white transition-colors">
                BPAY Billers Starting with B
              </Link>
              <Link href="/all-biller-codes/?letter=C" className="block hover:text-white transition-colors">
                BPAY Billers Starting with C
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Popular BPAY Billers</h3>
            <div className="space-y-2 text-sm">
              {POPULAR_FOOTER_LINKS.map(({ code, name }) => (
                <Link
                  key={code}
                  href={`/biller-codes/${code}/`}
                  className="block hover:text-white transition-colors"
                >
                  {name} ({code})
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Resources</h3>
            <div className="space-y-2 text-sm">
              <Link href="/knowledge/" className="block hover:text-white transition-colors">
                BPAY Knowledge Base
              </Link>
              <Link href="/knowledge/how-to-make-a-bpay-payment-step-by-step-guide-commbank-nab-westpac-anz/" className="block hover:text-white transition-colors">
                How to Make a BPAY Payment
              </Link>
              <Link href="/knowledge/bpay-in-australia-the-ultimate-guide-to-paying-and-getting-paid/" className="block hover:text-white transition-colors">
                BPAY Ultimate Guide
              </Link>
              <Link href="/about/" className="block hover:text-white transition-colors">
                About Us
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Legal</h3>
            <div className="space-y-2 text-sm">
              <Link href="/privacy-policy/" className="block hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions/" className="block hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/disclaimer/" className="block hover:text-white transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-brand-800 pt-6 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <p className="mt-1">BPAY is a registered trademark of BPAY Pty Ltd.</p>
        </div>
      </div>
    </footer>
  );
}
