"use client";

import { useRef, useState } from "react";
import NdaForm from "@/components/NdaForm";
import NdaPreview from "@/components/NdaPreview";
import DownloadButton from "@/components/DownloadButton";
import { emptyNdaFormData, type NdaFormData } from "@/types/nda";

export default function Home() {
  const [formData, setFormData] = useState<NdaFormData>(emptyNdaFormData);
  const previewRef = useRef<HTMLDivElement>(null);

  const filename = formData.partyA.legalName && formData.partyB.legalName
    ? `Mutual-NDA-${formData.partyA.legalName}-${formData.partyB.legalName}.pdf`.replace(/\s+/g, "-")
    : "Mutual-NDA.pdf";

  return (
    <div className="min-h-full bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Mutual NDA Generator</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Fill in the details below to generate a mutual non-disclosure agreement. Nothing you enter leaves your
          browser.
        </p>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-2">
        <section>
          <NdaForm data={formData} onChange={setFormData} />
        </section>

        <section className="space-y-4">
          <div className="flex justify-end">
            <DownloadButton targetRef={previewRef} filename={filename} />
          </div>
          <NdaPreview ref={previewRef} data={formData} />
        </section>
      </main>
    </div>
  );
}
