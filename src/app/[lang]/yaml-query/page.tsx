"use client";

import { useState, useCallback, useMemo, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { ToolLayout } from "@/components/ToolLayout";
import { YamlEditor } from "@/components/YamlEditor";
import { Button } from "@/components/ui/Button";
import { getDictionary, type Lang } from "@/lib/i18n";
import { validateYaml } from "@/lib/yaml";
import { queryYaml } from "@/lib/yaml-query";
import Link from "next/link";

function YamlQueryContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lang = (params?.lang as Lang) || "en";
  const dict = getDictionary(lang);

  // Support loading from shared URL
  const sharedInput = searchParams?.get("q")
    ? (() => { try { return atob(searchParams.get("q")!); } catch { return ""; } })()
    : "";
  const sharedExpr = searchParams?.get("e")
    ? (() => { try { return atob(searchParams.get("e")!); } catch { return ""; } })()
    : "";

  const [input, setInput] = useState(sharedInput);
  const [expression, setExpression] = useState(sharedExpr);
  const [copied, setCopied] = useState(false);

  const error = useMemo(() => {
    if (!input.trim()) return null;
    return validateYaml(input);
  }, [input]);

  const result = useMemo(() => {
    if (!input.trim() || !expression.trim()) return "";
    try {
      return queryYaml(input, expression);
    } catch {
      return "";
    }
  }, [input, expression]);

  // Re-run on Ctrl+Enter
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setExpression((prev) => prev);
      }
    },
    []
  );

  const handleCopy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleShare = useCallback(() => {
    const q = btoa(input);
    const e = btoa(expression);
    const url = `${window.location.origin}/${lang}/yaml-query?q=${encodeURIComponent(q)}&e=${encodeURIComponent(e)}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [input, expression, lang]);

  return (
    <ToolLayout
      lang={lang}
      dict={dict}
      pageTitle={dict.yamlQuery.title}
      pageDescription={dict.yamlQuery.description}
      canonicalUrl={`/${lang}/yaml-query`}
      alternateUrls={[
        { lang: "en", url: "/en/yaml-query" },
        { lang: "zh", url: "/zh/yaml-query" },
      ]}
    >
      <div className="flex gap-4 mb-4">
        <Button variant="primary" size="sm" onClick={() => setExpression((prev) => prev)}>
          {dict.yamlQuery.run}
        </Button>
        <Button size="sm" onClick={handleShare} disabled={!input || !expression}>
          {copied ? dict.yamlFormatter.copied : dict.yamlQuery.share}
        </Button>
        <Button size="sm" onClick={() => handleCopy(result)} disabled={!result}>
          {dict.yamlQuery.copy}
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-[var(--color-error)]">
          {error.message}
        </div>
      )}

      <div className="flex gap-4" style={{ minHeight: "400px" }}>
        <YamlEditor
          value={input}
          onChange={setInput}
          label={dict.yamlQuery.yamlInput}
          placeholder={dict.yamlQuery.placeholder}
          errorLine={error?.line ?? null}
          minHeight="350px"
        />
        <div className="tool-panel" style={{ maxWidth: "50%" }}>
          <label className="tool-label">{dict.yamlQuery.expression}</label>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={dict.yamlQuery.exprPlaceholder}
            className="w-full px-4 py-2 text-sm font-mono bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            spellCheck={false}
          />
          <label className="tool-label mt-4">{dict.yamlQuery.result}</label>
          <pre className="flex-1 p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md overflow-auto text-sm">
            {result || <span className="text-[var(--color-muted)]">—</span>}
          </pre>
        </div>
      </div>

      <p className="mt-6 text-sm text-[var(--color-muted)]">
        <Link href={`/${lang}/yaml-formatter`} className="text-[var(--color-accent)] hover:underline">
          {dict.yamlFormatter.tryFormatter}
        </Link>
        {" · "}
        <Link href={`/${lang}/yaml-to-json`} className="text-[var(--color-accent)] hover:underline">
          {dict.yamlFormatter.tryToJson}
        </Link>
      </p>

      <p className="mt-4 text-xs text-[var(--color-muted)]">
        {dict.yamlQuery.wasmFallback}
      </p>
    </ToolLayout>
  );
}

export default function YamlQueryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[var(--color-muted)]">Loading...</div>}>
      <YamlQueryContent />
    </Suspense>
  );
}
