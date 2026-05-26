import type { Metadata } from "next";
import { getDictionary, supportedLangs } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return {
    title: dict.yamlToJson.title,
    description: dict.yamlToJson.description,
    alternates: {
      canonical: `/${lang}/yaml-to-json`,
      languages: Object.fromEntries(
        supportedLangs.map((l) => [l, `/${l}/yaml-to-json`])
      ),
    },
    openGraph: {
      title: dict.yamlToJson.title,
      description: dict.yamlToJson.description,
      type: "website",
    },
  };
}

export default function YamlToJsonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
