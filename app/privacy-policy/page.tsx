import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { SITE_NAME, SITE_URL } from "@/lib/utils";
import InternalLinkCTA from "@/components/InternalLinkCTA";

export const metadata: Metadata = {
  title: `Privacy Policy - ${SITE_NAME}`,
  description: `Privacy Policy for ${SITE_NAME}.`,
  alternates: { canonical: `${SITE_URL}/privacy-policy/` },
};

export const revalidate = 2592000; // 30 days

export default async function PrivacyPolicyPage() {
  const { data: page } = await supabase
    .from("pages")
    .select("title, content")
    .eq("slug", "privacy-policy")
    .single();

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          {page?.title || "Privacy Policy"}
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
