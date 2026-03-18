import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { SITE_NAME, SITE_URL } from "@/lib/utils";
import InternalLinkCTA from "@/components/InternalLinkCTA";

export const metadata: Metadata = {
  title: `About Us - ${SITE_NAME}`,
  description: `Learn about ${SITE_NAME}, Australia's comprehensive BPAY Biller Code directory with over 30,000 verified codes.`,
  alternates: { canonical: `${SITE_URL}/about/` },
};

export const revalidate = 2592000; // 30 days

export default async function AboutPage() {
  const { data: page } = await supabase
    .from("pages")
    .select("title, content")
    .eq("slug", "about")
    .single();

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          {page?.title || "About Us"}
        </h1>
        {page?.content ? (
          <div
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        ) : (
          <div className="prose prose-gray max-w-none">
            <p>
              {SITE_NAME} is Australia&apos;s most comprehensive BPAY Biller Code
              directory. We help Australians find the correct biller codes for
              making BPAY payments quickly and easily.
            </p>
            <p>
              Our database contains over 30,000 verified biller codes, making it
              easy to find the right code for any BPAY-registered merchant or
              organisation in Australia.
            </p>
          </div>
        )}
      </div>
      <InternalLinkCTA />
    </>
  );
}
