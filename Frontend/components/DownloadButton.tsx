"use client";

import { useState, type RefObject } from "react";
import { downloadElementAsPdf } from "@/lib/pdf";

interface DownloadButtonProps {
  targetRef: RefObject<HTMLDivElement | null>;
  filename: string;
}

export default function DownloadButton({ targetRef, filename }: DownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    if (!targetRef.current) return;
    setIsGenerating(true);
    setError(null);
    try {
      await downloadElementAsPdf(targetRef.current, filename);
    } catch {
      setError("Couldn't generate the PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleDownload}
        disabled={isGenerating}
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {isGenerating ? "Generating PDF…" : "Download PDF"}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
