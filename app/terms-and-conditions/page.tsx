import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { SITE_NAME, SITE_URL } from "@/lib/utils";
import InternalLinkCTA from "@/components/InternalLinkCTA";

export const metadata: Metadata = {
  title: `Terms and Conditions - ${SITE_NAME}`,
  description: `Terms and Conditions for ${SITE_NAME}.`,
  alternates: { canonical: `${SITE_URL}/terms-and-conditions/` },
};

export const revalidate = 2592000; // 30 days

export default async function TermsPage() {
  const { data: page } = await supabase
    .from("pages")
    .select("title, content")
    .eq("slug", "terms-and-conditions")
    .single();

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          {page?.title || "Terms and Conditions"}
        </h1>
        <div
          className="prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: page?.content || "" }}
        />
      </div>
      <InternalLinkCTA />
    </>
  );
}
