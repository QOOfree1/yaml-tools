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
    title: dict.yamlFormatter.title,
    description: dict.yamlFormatter.description,
    alternates: {
      canonical: `/${lang}/yaml-formatter`,
      languages: Object.fromEntries(
        supportedLangs.map((l) => [l, `/${l}/yaml-formatter`])
      ),
    },
    openGraph: {
      title: dict.yamlFormatter.title,
      description: dict.yamlFormatter.description,
      type: "website",
    },
  };
}

export default function FormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
