import { describe, it, expect } from "vitest";
import { formatYaml, validateYaml, yamlToJson, jsonToYaml, minifyYaml } from "@/lib/yaml";

describe("formatYaml", () => {
  it("formats unformatted YAML with 2-space indent", () => {
    const input = "name: hello\nversion: '1.0'\nitems:\n- one\n- two";
    const result = formatYaml(input, 2);
    expect(result).toContain("name: hello");
    expect(result).toContain("  - one");
    expect(result).toContain("  - two");
  });

  it("formats with 4-space indent", () => {
    const input = "name: hello\nitems:\n- one";
    const result = formatYaml(input, 4);
    expect(result).toContain("    - one");
  });

  it("throws on invalid YAML", () => {
    const input = "? &anchor foo: bar";
    expect(() => formatYaml(input, 2)).toThrow();
  });
});

describe("validateYaml", () => {
  it("returns null for valid YAML", () => {
    const result = validateYaml("name: hello\nversion: '1.0'");
    expect(result).toBeNull();
  });

  it("returns error with line number for invalid YAML", () => {
    const input = "*undefined";
    const result = validateYaml(input);
    expect(result).not.toBeNull();
    expect(result!.line).toBeGreaterThan(0);
    expect(result!.message).toBeTruthy();
  });
});

describe("yamlToJson", () => {
  it("converts simple YAML to JSON string", () => {
    const yaml = "name: hello\nversion: '1.0'";
    const json = yamlToJson(yaml, 2);
    const parsed = JSON.parse(json);
    expect(parsed).toEqual({ name: "hello", version: "1.0" });
  });

  it("throws on invalid YAML", () => {
    expect(() => yamlToJson(": invalid", 2)).toThrow();
  });
});

describe("jsonToYaml", () => {
  it("converts JSON string to YAML", () => {
    const json = '{"name":"hello","version":"1.0"}';
    const yaml = jsonToYaml(json);
    expect(yaml).toContain("name: hello");
    expect(yaml).toContain("version: '1.0'");
  });

  it("throws on invalid JSON", () => {
    expect(() => jsonToYaml("{invalid")).toThrow();
  });
});

describe("minifyYaml", () => {
  it("removes comments and extra whitespace", () => {
    const input = "name: hello  # a comment\n\nversion: '1.0'\n";
    const result = minifyYaml(input);
    expect(result).not.toContain("# a comment");
    expect(result).toContain("name: hello");
  });
});
