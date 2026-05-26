import { describe, it, expect } from "vitest";
import { getDictionary, getLangFromAcceptLanguage, type Lang } from "@/lib/i18n";

describe("getDictionary", () => {
  it("returns English dictionary for 'en'", () => {
    const d = getDictionary("en");
    expect(d.yamlFormatter.title).toBe("YAML Formatter & Validator");
    expect(d.yamlFormatter.description).toContain("format");
  });

  it("returns Chinese dictionary for 'zh'", () => {
    const d = getDictionary("zh");
    expect(d.yamlFormatter.title).toBe("YAML 格式化 & 校验");
  });

  it("falls back to English for unknown lang", () => {
    const d = getDictionary("fr" as Lang);
    expect(d.yamlFormatter.title).toBe("YAML Formatter & Validator");
  });
});

describe("getLangFromAcceptLanguage", () => {
  it("returns zh for Chinese Accept-Language", () => {
    expect(getLangFromAcceptLanguage("zh-CN,zh;q=0.9")).toBe("zh");
  });

  it("returns en for English Accept-Language", () => {
    expect(getLangFromAcceptLanguage("en-US,en;q=0.9")).toBe("en");
  });

  it("returns en for unknown languages", () => {
    expect(getLangFromAcceptLanguage("fr-FR,fr;q=0.9")).toBe("en");
  });

  it("returns en for empty header", () => {
    expect(getLangFromAcceptLanguage(null)).toBe("en");
  });
});
