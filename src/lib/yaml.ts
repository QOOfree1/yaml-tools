import yaml from "js-yaml";

export interface ValidationError {
  line: number;
  message: string;
}

export function formatYaml(input: string, indent: number = 2): string {
  const parsed = yaml.load(input);
  return yaml.dump(parsed, {
    indent,
    lineWidth: -1,
    noRefs: true,
    sortKeys: false,
    quotingType: "'",
    forceQuotes: false,
  });
}

export function validateYaml(input: string): ValidationError | null {
  try {
    yaml.load(input);
    return null;
  } catch (e: unknown) {
    const err = e as yaml.YAMLException;
    const mark = (err as any).mark;
    const line = mark?.line ? mark.line + 1 : 1;
    return {
      line,
      message: err.reason || err.message || "Unknown YAML error",
    };
  }
}

export function yamlToJson(input: string, indent: number = 2): string {
  const parsed = yaml.load(input);
  return JSON.stringify(parsed, null, indent);
}

export function jsonToYaml(input: string): string {
  const parsed = JSON.parse(input);
  return yaml.dump(parsed, {
    indent: 2,
    lineWidth: -1,
    noRefs: true,
    sortKeys: false,
  });
}

export function minifyYaml(input: string): string {
  const parsed = yaml.load(input);
  return yaml
    .dump(parsed, {
      indent: 0,
      lineWidth: -1,
      noRefs: true,
      sortKeys: false,
      flowLevel: -1,
    })
    .split("\n")
    .filter((line) => !line.trim().startsWith("#"))
    .join("\n");
}
