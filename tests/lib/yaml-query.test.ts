import { describe, it, expect } from "vitest";
import { queryYaml } from "@/lib/yaml-query";

describe("queryYaml", () => {
  const yaml = `
services:
  web:
    image: nginx
    ports:
      - "80:80"
      - "443:443"
  db:
    image: postgres
    ports:
      - "5432:5432"
`;

  it("returns entire parsed object for '.' expression", () => {
    const result = queryYaml(yaml, ".");
    expect(result).toContain("services");
  });

  it("accesses nested key with dot notation", () => {
    const result = queryYaml(yaml, ".services.web.image");
    expect(result).toContain("nginx");
  });

  it("returns array keys", () => {
    const result = queryYaml(yaml, ".services | keys");
    const parsed = JSON.parse(result);
    expect(parsed).toContain("web");
    expect(parsed).toContain("db");
  });

  it("accesses array index", () => {
    const result = queryYaml(yaml, ".services.web.ports[0]");
    expect(result).toContain("80:80");
  });

  it("iterates array with .[]", () => {
    const result = queryYaml(yaml, ".services.web.ports[]");
    const parsed = JSON.parse(result);
    expect(parsed).toHaveLength(2);
    expect(parsed[0]).toContain("80:80");
  });

  it("throws on invalid YAML", () => {
    expect(() => queryYaml(": bad", ".")).toThrow();
  });
});
