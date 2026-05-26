"use client";

import { useRef, useCallback } from "react";

interface YamlEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  errorLine?: number | null;
  readOnly?: boolean;
  minHeight?: string;
}

export function YamlEditor({
  value,
  onChange,
  placeholder = "",
  label,
  errorLine,
  readOnly = false,
  minHeight = "400px",
}: YamlEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const textarea = textareaRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newValue = value.substring(0, start) + "  " + value.substring(end);
        onChange(newValue);
        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        });
      }
    },
    [value, onChange]
  );

  const lines = value.split("\n");

  return (
    <div className="tool-panel">
      {label && <label className="tool-label">{label}</label>}
      <div className="relative flex-1">
        {/* Line numbers */}
        <div className="absolute left-0 top-0 bottom-0 w-10 py-4 select-none pointer-events-none">
          {lines.map((_, i) => (
            <div
              key={i}
              className={`text-xs leading-relaxed text-right pr-2 ${
                errorLine === i + 1
                  ? "text-[var(--color-error)] font-bold"
                  : "text-[var(--color-muted)]"
              }`}
              style={{ lineHeight: "1.625rem" }}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          readOnly={readOnly}
          className="code-editor pl-12"
          style={{ minHeight, tabSize: 2 }}
          spellCheck={false}
          aria-label={label}
        />
      </div>
      {errorLine && (
        <p className="mt-2 text-sm text-[var(--color-error)]">
          Error at line {errorLine}
        </p>
      )}
    </div>
  );
}
