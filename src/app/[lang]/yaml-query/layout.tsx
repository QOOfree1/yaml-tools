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
    title: dict.yamlQuery.title,
    description: dict.yamlQuery.description,
    alternates: {
      canonical: `/${lang}/yaml-query`,
      languages: Object.fromEntries(
        supportedLangs.map((l) => [l, `/${l}/yaml-query`])
      ),
    },
    openGraph: {
      title: dict.yamlQuery.title,
      description: dict.yamlQuery.description,
      type: "website",
    },
  };
}

export default function YamlQueryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
