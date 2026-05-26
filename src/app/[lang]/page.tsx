import Link from "next/link";
import { getDictionary, type Lang } from "@/lib/i18n";
import { ToolLayout } from "@/components/ToolLayout";

export default function HomePage({ params }: { params: { lang: Lang } }) {
  const { lang } = params;
  const dict = getDictionary(lang);

  const tools = [
    {
      href: `/${lang}/yaml-formatter`,
      ...dict.home.tools.formatter,
    },
    {
      href: `/${lang}/yaml-to-json`,
      ...dict.home.tools.toJson,
    },
    {
      href: `/${lang}/yaml-query`,
      ...dict.home.tools.query,
    },
  ];

  return (
    <ToolLayout
      lang={lang}
      dict={dict}
      pageTitle={dict.home.heading}
      pageDescription={dict.site.description}
      canonicalUrl={`/${lang}`}
      alternateUrls={[
        { lang: "en", url: "/en" },
        { lang: "zh", url: "/zh" },
      ]}
    >
      <p className="mb-8 text-[var(--color-muted)]">{dict.home.subtitle}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="block p-6 border border-[var(--color-border)] rounded-lg hover:border-[var(--color-accent)] hover:shadow-sm transition-all"
          >
            <h2 className="text-lg font-semibold mb-2">{tool.title}</h2>
            <p className="text-sm text-[var(--color-muted)]">{tool.description}</p>
          </Link>
        ))}
      </div>
    </ToolLayout>
  );
}
