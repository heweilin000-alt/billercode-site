import { SITE_URL, SITE_NAME } from "./utils";

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "en-AU",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/biller-code-search/?q={search_term_string}`,
      },
      "query-input": {
        "@type": "PropertyValueSpecification",
        valueRequired: true,
        valueName: "search_term_string",
      },
    },
  };
}

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function billerCodeJsonLd(biller: {
  biller_code: string;
  merchant_name: string;
  merchant_short_name: string;
  slug: string;
}) {
  return {
    "@type": "FinancialProduct",
    "@id": `${SITE_URL}/biller-codes/${biller.slug}/#billercode`,
    name: `${biller.biller_code} - ${biller.merchant_name}`,
    description: `BPAY Biller Code ${biller.biller_code} for ${biller.merchant_name} (${biller.merchant_short_name}). Find payment details and methods.`,
    provider: {
      "@type": "Organization",
      name: biller.merchant_name,
    },
    url: `${SITE_URL}/biller-codes/${biller.slug}/`,
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
  };
}

export function faqPageJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function articleJsonLd(post: {
  title: string;
  slug: string;
  date?: string;
  content?: string;
}) {
  const url = `${SITE_URL}/knowledge/${post.slug}/`;
  const autoDesc = (post.content || "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 155);
  return {
    "@type": "Article",
    headline: post.title,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(post.date && { datePublished: post.date }),
    ...(autoDesc && { description: autoDesc }),
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
}

export function globalJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [websiteJsonLd(), organizationJsonLd()],
  };
}
