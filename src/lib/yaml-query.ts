import yaml from "js-yaml";

export function queryYaml(yamlStr: string, expression: string): string {
  const data = yaml.load(yamlStr);
  const result = evaluate(data, expression.trim());
  if (typeof result === "string" || typeof result === "number" || typeof result === "boolean") {
    return String(result);
  }
  return JSON.stringify(result, null, 2);
}

function evaluate(data: unknown, expr: string): unknown {
  if (expr.includes("|")) {
    const segments = expr.split("|").map((s) => s.trim());
    let current: unknown = data;
    for (const seg of segments) {
      current = evaluate(current, seg);
    }
    return current;
  }

  if (expr === ".") return data;

  if (expr === "keys") {
    if (data && typeof data === "object") {
      return Object.keys(data as Record<string, unknown>);
    }
    return [];
  }

  let path = expr;
  if (path.startsWith(".")) path = path.slice(1);

  const parts = splitPath(path);
  let current: unknown = data;

  for (const part of parts) {
    if (current === null || current === undefined) return null;

    if (part === "[]") {
      if (Array.isArray(current)) return current;
      return [];
    }

    const idxMatch = part.match(/^(.+)\[(\d+)\]$/);
    if (idxMatch) {
      const key = idxMatch[1];
      const idx = parseInt(idxMatch[2], 10);
      const obj = (current as Record<string, unknown>)[key];
      if (Array.isArray(obj) && idx < obj.length) {
        current = obj[idx];
        continue;
      }
      return null;
    }

    const directIdxMatch = part.match(/^\[(\d+)\]$/);
    if (directIdxMatch) {
      const idx = parseInt(directIdxMatch[1], 10);
      if (Array.isArray(current) && idx < current.length) {
        current = current[idx];
        continue;
      }
      return null;
    }

    if (typeof current === "object" && current !== null) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return null;
    }
  }

  return current;
}

function splitPath(path: string): string[] {
  const parts: string[] = [];
  let current = "";

  for (let i = 0; i < path.length; i++) {
    const ch = path[i];
    if (ch === "." && current) {
      parts.push(current);
      current = "";
    } else if (ch === "[") {
      if (current) {
        parts.push(current);
        current = "";
      }
      const end = path.indexOf("]", i);
      if (end !== -1) {
        parts.push(path.substring(i, end + 1));
        i = end;
      }
    } else {
      current += ch;
    }
  }

  if (current) parts.push(current);
  return parts;
}
