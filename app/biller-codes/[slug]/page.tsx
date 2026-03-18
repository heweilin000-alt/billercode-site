import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cache } from "react";
import { supabase } from "@/lib/supabase";
import { SITE_NAME, SITE_URL, formatPaymentMethods } from "@/lib/utils";
import { billerCodeJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import RelatedBillers from "@/components/RelatedBillers";
import PopularBillers from "@/components/PopularBillers";

interface Props {
  params: Promise<{ slug: string }>;
}

// React.cache deduplicates across generateMetadata + page render = 1 query instead of 2
const getBillerCode = cache(async (slug: string) => {
  const { data } = await supabase
    .from("biller_codes")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const biller = await getBillerCode(slug);
  if (!biller) return { title: "Not Found" };

  const title =
    biller.yoast_title ||
    `${biller.biller_code} Biller Code Details - ${SITE_NAME}`;
  const description =
    biller.yoast_desc ||
    `BPAY Biller Code ${biller.biller_code} for ${biller.merchant_name}. Find payment methods and details.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/biller-codes/${slug}/` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/biller-codes/${slug}/`,
      type: "website",
      siteName: SITE_NAME,
    },
  };
}

export const revalidate = 2592000; // 30 days

export default async function BillerCodePage({ params }: Props) {
  const { slug } = await params;
  const biller = await getBillerCode(slug);
  if (!biller) notFound();

  const methods = formatPaymentMethods(
    biller.payment_methods,
    biller.payment_method_2,
    biller.payment_method_3,
    biller.payment_method_4
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      billerCodeJsonLd(biller),
      breadcrumbJsonLd([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "All Biller Codes", url: `${SITE_URL}/all-biller-codes/` },
        {
          name: biller.biller_code,
          url: `${SITE_URL}/biller-codes/${slug}/`,
        },
      ]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/all-biller-codes/" className="hover:text-brand-600 transition-colors">All Biller Codes</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{biller.biller_code}</span>
      </nav>

      {/* H1 — SEO: includes biller code + merchant name as target keywords */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
        {biller.merchant_name} BPAY Biller Code{" "}
        <span className="text-brand-700 font-mono">{biller.biller_code}</span>
      </h1>

      {/* Main card — compact layout */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 md:p-6">
        <div className="grid md:grid-cols-3 gap-5">
          {/* Biller Code */}
          <div className="flex items-center gap-3 bg-brand-50 rounded-lg px-4 py-3">
            <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-brand-600 font-medium">Biller Code</p>
              <p className="text-xl font-mono font-bold text-brand-800">{biller.biller_code}</p>
            </div>
          </div>

          {/* Merchant Name */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 font-medium">Merchant</p>
              <p className="font-semibold text-gray-900 truncate">{biller.merchant_name}</p>
              {biller.merchant_short_name &&
                biller.merchant_short_name !== biller.merchant_name && (
                  <p className="text-xs text-gray-400 truncate">{biller.merchant_short_name}</p>
                )}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Payment Methods</p>
              {methods.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {methods.map((m, i) => (
                    <span key={i} className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded font-medium">
                      {m}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="font-semibold text-gray-900">BPAY</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* How to pay */}
      <div className="mt-8 bg-brand-50 rounded-xl border border-brand-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          How to Pay {biller.merchant_name} via BPAY
        </h2>
        <ol className="space-y-3">
          {[
            "Log in to your internet or mobile banking",
            'Select "BPAY" as your payment method',
            <>Enter biller code: <strong className="font-mono text-brand-700">{biller.biller_code}</strong></>,
            "Enter your customer reference number (found on your bill)",
            "Enter the payment amount and confirm",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
              <span className="w-6 h-6 bg-brand-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* FAQ */}
      <div className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">
          Frequently Asked Questions
        </h2>
        <details className="bg-white rounded-lg border border-gray-200 group">
          <summary className="cursor-pointer font-medium text-gray-900 p-4 hover:bg-gray-50 transition-colors">
            What is biller code {biller.biller_code}?
          </summary>
          <p className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
            Biller code {biller.biller_code} is the BPAY code for{" "}
            {biller.merchant_name}
            {biller.merchant_short_name &&
              biller.merchant_short_name !== biller.merchant_name &&
              ` (also known as ${biller.merchant_short_name})`}
            . You can use this code to make payments through any Australian
            bank that supports BPAY.
          </p>
        </details>
        <details className="bg-white rounded-lg border border-gray-200 group">
          <summary className="cursor-pointer font-medium text-gray-900 p-4 hover:bg-gray-50 transition-colors">
            How do I pay {biller.merchant_short_name || biller.merchant_name}{" "}
            using BPAY?
          </summary>
          <p className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
            To pay {biller.merchant_short_name || biller.merchant_name}, log
            into your bank&apos;s online banking, select BPAY, enter biller
            code {biller.biller_code}, your customer reference number from your
            bill, and the amount you want to pay. Learn more in our{" "}
            <Link href="/knowledge/how-to-make-a-bpay-payment-step-by-step-guide-commbank-nab-westpac-anz/" className="text-brand-600 hover:underline">
              step-by-step BPAY payment guide
            </Link>.
          </p>
        </details>
      </div>

      {/* Related Biller Codes — SEO: cross-link between detail pages */}
      <RelatedBillers currentSlug={slug} merchantName={biller.merchant_name} />

      {/* Popular Biller Codes — SEO: link equity to key pages */}
      <PopularBillers excludeSlug={slug} title="Other Popular Biller Codes" limit={8} />

      {/* Contextual links — SEO: link to hub pages */}
      <div className="mt-10 flex flex-wrap gap-3 text-sm">
        <Link href="/biller-code-search/" className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-brand-300 hover:text-brand-700 transition-colors">
          Search Biller Codes
        </Link>
        <Link href="/all-biller-codes/" className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-brand-300 hover:text-brand-700 transition-colors">
          All Biller Codes
        </Link>
        <Link href="/knowledge/" className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-brand-300 hover:text-brand-700 transition-colors">
          BPAY Guides
        </Link>
      </div>
    </>
  );
}
