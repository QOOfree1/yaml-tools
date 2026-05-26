"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import { ToolLayout } from "@/components/ToolLayout";
import { YamlEditor } from "@/components/YamlEditor";
import { Button } from "@/components/ui/Button";
import { getDictionary, type Lang } from "@/lib/i18n";
import { yamlToJson, jsonToYaml, validateYaml } from "@/lib/yaml";
import Link from "next/link";

export default function YamlToJsonPage() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "en";
  const dict = getDictionary(lang);

  const [yamlInput, setYamlInput] = useState("");
  const [mode, setMode] = useState<"yaml-to-json" | "json-to-yaml">("yaml-to-json");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const jsonOutput = useMemo(() => {
    if (mode !== "yaml-to-json" || !yamlInput.trim()) return "";
    try {
      return yamlToJson(yamlInput, 2);
    } catch {
      return "";
    }
  }, [yamlInput, mode]);

  const yamlOutput = useMemo(() => {
    if (mode !== "json-to-yaml" || !yamlInput.trim()) return "";
    try {
      return jsonToYaml(yamlInput);
    } catch {
      return "";
    }
  }, [yamlInput, mode]);

  const error = useMemo(() => {
    if (!yamlInput.trim()) return null;
    if (mode === "yaml-to-json") {
      return validateYaml(yamlInput);
    }
    try {
      JSON.parse(yamlInput);
      return null;
    } catch (e: unknown) {
      const err = e as Error;
      return { line: 1, message: err.message };
    }
  }, [yamlInput, mode]);

  const output = mode === "yaml-to-json" ? jsonOutput : yamlOutput;
  const outputLabel = mode === "yaml-to-json" ? dict.yamlToJson.jsonLabel : dict.yamlToJson.yamlLabel;
  const inputLabel = mode === "yaml-to-json" ? dict.yamlToJson.yamlLabel : dict.yamlToJson.jsonLabel;

  const handleCopy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleDownload = useCallback(() => {
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [output]);

  const handleFileLoad = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      setYamlInput(content);
    };
    reader.readAsText(file);
    e.target.value = "";
  }, []);

  return (
    <ToolLayout
      lang={lang}
      dict={dict}
      pageTitle={dict.yamlToJson.title}
      pageDescription={dict.yamlToJson.description}
      canonicalUrl={`/${lang}/yaml-to-json`}
      alternateUrls={[
        { lang: "en", url: "/en/yaml-to-json" },
        { lang: "zh", url: "/zh/yaml-to-json" },
      ]}
    >
      <div className="flex gap-4 mb-4 items-center">
        <Button
          variant={mode === "yaml-to-json" ? "primary" : "default"}
          size="sm"
          onClick={() => setMode("yaml-to-json")}
        >
          YAML &rarr; JSON
        </Button>
        <Button
          variant={mode === "json-to-yaml" ? "primary" : "default"}
          size="sm"
          onClick={() => setMode("json-to-yaml")}
        >
          JSON &rarr; YAML
        </Button>
        <div className="flex-1" />
        <Button size="sm" onClick={handleFileLoad}>
          {dict.yamlToJson.loadFile}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".yaml,.yml,.json"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button size="sm" onClick={() => handleCopy(output)} disabled={!output}>
          {copied ? dict.yamlFormatter.copied : (mode === "yaml-to-json" ? dict.yamlToJson.copyJson : dict.yamlToJson.copyYaml)}
        </Button>
        {mode === "yaml-to-json" && output && (
          <Button size="sm" onClick={handleDownload}>
            {dict.yamlToJson.downloadJson}
          </Button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-[var(--color-error)]">
          {dict.yamlToJson.conversionError}: {error.message}
        </div>
      )}

      <div className="flex gap-4 items-stretch" style={{ minHeight: "400px" }}>
        <YamlEditor
          value={yamlInput}
          onChange={setYamlInput}
          label={inputLabel}
          placeholder={dict.yamlToJson.placeholder}
          errorLine={error?.line ?? null}
        />
        <div className="flex items-center justify-center px-2">
          <span className="text-2xl text-[var(--color-muted)]">
            {mode === "yaml-to-json" ? "→" : "←"}
          </span>
        </div>
        <YamlEditor
          value={output}
          onChange={() => {}}
          label={outputLabel}
          readOnly
        />
      </div>

      {output && (
        <p className="mt-6 text-sm text-[var(--color-muted)]">
          <Link href={`/${lang}/yaml-formatter`} className="text-[var(--color-accent)] hover:underline">
            {dict.yamlFormatter.tryFormatter}
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
