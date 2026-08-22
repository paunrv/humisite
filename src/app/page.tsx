import { HomePage } from "@/components/home/HomePage";
import { humiLocalBusinessJsonLd } from "@/lib/humi-local-business-json-ld";
import { loadLegacyLanding } from "@/lib/legacy-landing";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://humisite.vercel.app";

export default function Page() {
  const legacy = loadLegacyLanding();
  const localBusinessJsonLd = humiLocalBusinessJsonLd(siteUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <HomePage legacy={legacy} />
    </>
  );
}
