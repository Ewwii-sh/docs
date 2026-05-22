import React, { useRef, useState, type ReactNode } from "react";
import type { Props } from "@theme/MDXComponents/Pre";

export default function MDXPre(props: Props): ReactNode {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = ref.current?.innerText ?? "";
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <pre ref={ref} {...props} />
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: "0.5rem",
          right: "0.5rem",
          padding: "0.25rem 0.5rem",
          fontSize: "0.75rem",
          cursor: "pointer",
          background: "var(--ifm-color-emphasis-200)",
          border: "none",
          borderRadius: "4px",
          color: "var(--ifm-color-content)",
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
