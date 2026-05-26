import Link from "next/link";
import type { Lang, Dictionary } from "@/lib/i18n";

interface ToolLayoutProps {
  lang: Lang;
  dict: Dictionary;
  children: React.ReactNode;
  pageTitle: string;
  pageDescription: string;
  canonicalUrl: string;
  alternateUrls: { lang: Lang; url: string }[];
}

export function ToolLayout({
  lang,
  dict,
  children,
  pageTitle,
  pageDescription,
  canonicalUrl,
  alternateUrls,
}: ToolLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link
              href={`/${lang}`}
              className="text-lg font-bold tracking-tight hover:text-[var(--color-accent)] transition-colors"
            >
              YAML Tools
            </Link>
            <nav className="flex items-center gap-1 text-sm">
              <Link
                href={`/${lang}/yaml-formatter`}
                className="px-3 py-1.5 rounded-md hover:bg-[var(--color-surface)] transition-colors"
              >
                {dict.site.nav.formatter}
              </Link>
              <Link
                href={`/${lang}/yaml-to-json`}
                className="px-3 py-1.5 rounded-md hover:bg-[var(--color-surface)] transition-colors"
              >
                {dict.site.nav.toJson}
              </Link>
              <Link
                href={`/${lang}/yaml-query`}
                className="px-3 py-1.5 rounded-md hover:bg-[var(--color-surface)] transition-colors"
              >
                {dict.site.nav.query}
              </Link>
              {/* Language switcher */}
              <span className="ml-3 pl-3 border-l border-[var(--color-border)]">
                {lang === "en" ? (
                  <Link
                    href={`/zh${canonicalUrl.replace(`/${lang}`, "").replace(/^\/en$/, "").replace(/^\/en\//, "/") || "/"}`}
                    className="px-2 py-1.5 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors text-xs"
                  >
                    中文
                  </Link>
                ) : (
                  <Link
                    href={`/en${canonicalUrl.replace(`/${lang}`, "").replace(/^\/zh$/, "").replace(/^\/zh\//, "/") || "/"}`}
                    className="px-2 py-1.5 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors text-xs"
                  >
                    English
                  </Link>
                )}
              </span>
            </nav>
          </div>
        </div>
      </header>

      {/* Alternate language links for SEO */}
      {alternateUrls.map(({ lang: altLang, url }) => (
        <link
          key={altLang}
          rel="alternate"
          hrefLang={altLang}
          href={url}
        />
      ))}

      {/* Main content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">{pageTitle}</h1>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              {pageDescription}
            </p>
          </div>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-[var(--color-muted)]">{dict.footer.privacy}</p>
        </div>
      </footer>
    </div>
  );
}
