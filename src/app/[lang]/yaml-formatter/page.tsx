"use client";

import { useState, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import { ToolLayout } from "@/components/ToolLayout";
import { YamlEditor } from "@/components/YamlEditor";
import { Button } from "@/components/ui/Button";
import { getDictionary, type Lang } from "@/lib/i18n";
import { formatYaml, validateYaml, minifyYaml } from "@/lib/yaml";
import Link from "next/link";

export default function YamlFormatterPage() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "en";
  const dict = getDictionary(lang);

  const [input, setInput] = useState("");
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  const formatted = useMemo(() => {
    if (!input.trim()) return "";
    try {
      return formatYaml(input, indent);
    } catch {
      return "";
    }
  }, [input, indent]);

  const minified = useMemo(() => {
    if (!input.trim()) return "";
    try {
      return minifyYaml(input);
    } catch {
      return "";
    }
  }, [input]);

  const error = useMemo(() => {
    if (!input.trim()) return null;
    return validateYaml(input);
  }, [input]);

  const handleCopy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const output = indent === 0 ? minified : formatted;

  return (
    <ToolLayout
      lang={lang}
      dict={dict}
      pageTitle={dict.yamlFormatter.title}
      pageDescription={dict.yamlFormatter.description}
      canonicalUrl={`/${lang}/yaml-formatter`}
      alternateUrls={[
        { lang: "en", url: "/en/yaml-formatter" },
        { lang: "zh", url: "/zh/yaml-formatter" },
      ]}
    >
      <div className="flex gap-4 mb-4">
        <Button
          variant={indent === 2 ? "primary" : "default"}
          size="sm"
          onClick={() => setIndent(2)}
        >
          {dict.yamlFormatter.indent2}
        </Button>
        <Button
          variant={indent === 4 ? "primary" : "default"}
          size="sm"
          onClick={() => setIndent(4)}
        >
          {dict.yamlFormatter.indent4}
        </Button>
        <Button
          variant={indent === 0 ? "primary" : "default"}
          size="sm"
          onClick={() => setIndent(0)}
        >
          {dict.yamlFormatter.minify}
        </Button>
        <div className="flex-1" />
        <Button
          size="sm"
          onClick={() => handleCopy(output)}
          disabled={!output}
        >
          {copied ? dict.yamlFormatter.copied : dict.yamlFormatter.copy}
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-[var(--color-error)]">
          {dict.yamlFormatter.error}: {error.message} (line {error.line})
        </div>
      )}

      <div className="flex gap-4" style={{ minHeight: "400px" }}>
        <YamlEditor
          value={input}
          onChange={setInput}
          label={dict.yamlFormatter.inputLabel}
          placeholder={dict.yamlFormatter.placeholder}
          errorLine={error?.line ?? null}
        />
        <YamlEditor
          value={output}
          onChange={() => {}}
          label={dict.yamlFormatter.outputLabel}
          readOnly
        />
      </div>

      {output && !error && (
        <p className="mt-6 text-sm text-[var(--color-muted)]">
          {dict.yamlFormatter.tryIt.replace("%s", "")}
          <Link href={`/${lang}/yaml-to-json`} className="text-[var(--color-accent)] hover:underline ml-1">
            {dict.yamlFormatter.tryToJson}
          </Link>
          {" · "}
          <Link href={`/${lang}/yaml-query`} className="text-[var(--color-accent)] hover:underline">
            {dict.yamlFormatter.tryQuery}
          </Link>
        </p>
      )}
    </ToolLayout>
  );
}
