import type { ReactNode } from "react";

/** Renders `**bold**` segments as <strong>; everything else as plain text. */
export function renderBoldMarkdown(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((segment, i) => {
    if (segment.startsWith("**") && segment.endsWith("**")) {
      return <strong key={i}>{segment.slice(2, -2)}</strong>;
    }
    return segment;
  });
}
