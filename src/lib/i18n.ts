export type Lang = "en" | "zh";

export type Dictionary = typeof en;

const en = {
  site: {
    title: "YAML Tools - Online YAML Formatter, Validator & Query Tool",
    description: "Free online YAML tools. Format, validate, convert YAML to JSON, and query YAML with jq-like expressions. All processing happens in your browser.",
    nav: {
      home: "Home",
      formatter: "YAML Formatter",
      toJson: "YAML to JSON",
      query: "YAML Query",
    },
  },
  home: {
    heading: "YAML Tools",
    subtitle: "Free online YAML tools. All processing happens in your browser — your data never leaves your machine.",
    tools: {
      formatter: {
        title: "YAML Formatter",
        description: "Beautify, validate, and minify YAML. Instant syntax checking with line-level error reporting.",
      },
      toJson: {
        title: "YAML ↔ JSON",
        description: "Convert YAML to JSON and back. Bidirectional real-time conversion.",
      },
      query: {
        title: "YAML Query",
        description: "Query YAML with jq/yq-like expressions. Explore complex YAML structures in the browser.",
      },
    },
  },
  yamlFormatter: {
    title: "YAML Formatter & Validator",
    description: "Free online YAML formatter, beautifier and validator. Format your YAML with 2 or 4 space indentation. Validate YAML syntax with instant error reporting.",
    inputLabel: "Input YAML",
    outputLabel: "Formatted YAML",
    indent2: "2 spaces",
    indent4: "4 spaces",
    minify: "Minify",
    copy: "Copy",
    copied: "Copied!",
    error: "YAML syntax error",
    placeholder: "Paste your YAML here...",
    tryIt: "Try our %s instead",
    tryFormatter: "YAML Formatter",
    tryToJson: "YAML to JSON",
    tryQuery: "YAML Query",
  },
  yamlToJson: {
    title: "YAML to JSON Converter",
    description: "Free online YAML to JSON converter. Convert YAML to JSON and JSON to YAML in real-time, right in your browser.",
    yamlLabel: "YAML",
    jsonLabel: "JSON",
    copyJson: "Copy JSON",
    copyYaml: "Copy YAML",
    downloadJson: "Download JSON",
    loadFile: "Load file",
    placeholder: "Paste your YAML or JSON here...",
    conversionError: "Conversion error",
  },
  yamlQuery: {
    title: "YAML Query Playground",
    description: "Online YAML query playground. Query YAML with jq/yq-like expressions. All processing runs locally via WebAssembly.",
    yamlInput: "YAML Input",
    expression: "Query Expression (yq/jq syntax)",
    result: "Result",
    run: "Run (Ctrl+Enter)",
    share: "Share",
    copy: "Copy Result",
    wasmFallback: "WASM engine unavailable — using simplified query mode",
    placeholder: "Paste your YAML here...",
    exprPlaceholder: ".services | keys",
  },
  footer: {
    privacy: "All processing happens in your browser. Your data is never uploaded to any server.",
    builtWith: "Built with Next.js",
  },
};

const zh: Dictionary = {
  site: {
    title: "YAML Tools - 在线 YAML 格式化、校验与查询工具",
    description: "免费在线 YAML 工具集。格式化、校验 YAML，YAML 与 JSON 互转，使用 jq 风格表达式查询 YAML。所有处理均在浏览器本地完成。",
    nav: {
      home: "首页",
      formatter: "YAML 格式化",
      toJson: "YAML 转 JSON",
      query: "YAML 查询",
    },
  },
  home: {
    heading: "YAML 工具集",
    subtitle: "免费在线 YAML 工具。所有处理均在浏览器本地完成——你的数据不会离开你的设备。",
    tools: {
      formatter: {
        title: "YAML 格式化",
        description: "美化、校验、压缩 YAML。即时语法检查，行级错误报告。",
      },
      toJson: {
        title: "YAML ↔ JSON",
        description: "YAML 与 JSON 双向实时互转。",
      },
      query: {
        title: "YAML 查询",
        description: "用 jq/yq 风格表达式查询 YAML。在浏览器中探索复杂 YAML 结构。",
      },
    },
  },
  yamlFormatter: {
    title: "YAML 格式化 & 校验",
    description: "免费在线 YAML 格式化、美化和校验工具。支持 2 或 4 空格缩进，即时语法校验和行级错误定位。",
    inputLabel: "输入 YAML",
    outputLabel: "格式化结果",
    indent2: "2 空格",
    indent4: "4 空格",
    minify: "压缩",
    copy: "复制",
    copied: "已复制！",
    error: "YAML 语法错误",
    placeholder: "在此粘贴 YAML 内容...",
    tryIt: "试试我们的%s",
    tryFormatter: "YAML 格式化",
    tryToJson: "YAML 转 JSON",
    tryQuery: "YAML 查询",
  },
  yamlToJson: {
    title: "YAML ↔ JSON 互转",
    description: "免费在线 YAML 与 JSON 互转工具。浏览器中实时双向转换。",
    yamlLabel: "YAML",
    jsonLabel: "JSON",
    copyJson: "复制 JSON",
    copyYaml: "复制 YAML",
    downloadJson: "下载 JSON",
    loadFile: "加载文件",
    placeholder: "在此粘贴 YAML 或 JSON...",
    conversionError: "转换错误",
  },
  yamlQuery: {
    title: "YAML 查询操场",
    description: "在线 YAML 查询操场。使用 jq/yq 风格表达式查询 YAML 数据。所有处理在浏览器本地运行。",
    yamlInput: "YAML 输入",
    expression: "查询表达式 (yq/jq 语法)",
    result: "查询结果",
    run: "运行 (Ctrl+Enter)",
    share: "分享",
    copy: "复制结果",
    wasmFallback: "WASM 引擎不可用——使用简化查询模式",
    placeholder: "在此粘贴 YAML 内容...",
    exprPlaceholder: ".services | keys",
  },
  footer: {
    privacy: "所有处理均在浏览器中完成，数据不会上传至任何服务器。",
    builtWith: "基于 Next.js 构建",
  },
};

const dictionaries: Record<Lang, Dictionary> = { en, zh };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang] ?? dictionaries.en;
}

export function getLangFromAcceptLanguage(header: string | null): Lang {
  if (!header) return "en";
  if (header.includes("zh")) return "zh";
  return "en";
}

export const supportedLangs: Lang[] = ["en", "zh"];

export function getAlternateUrls(pathname: string): { lang: Lang; url: string }[] {
  return supportedLangs.map((lang) => ({
    lang,
    url: `/${lang}${pathname}`,
  }));
}
