"use client";

import { useMemo, useRef, useState } from "react";
import NdaForm from "@/components/NdaForm";
import NdaPreview from "@/components/NdaPreview";
import DownloadButton from "@/components/DownloadButton";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/lib/i18n/language-context";
import { emptyNdaFormData, type NdaFormData } from "@/types/nda";
import { validateNdaFormData, hasErrors } from "@/lib/validation";

export default function Home() {
  const [formData, setFormData] = useState<NdaFormData>(emptyNdaFormData);
  const previewRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const errors = useMemo(() => validateNdaFormData(formData), [formData]);
  const isValid = !hasErrors(errors);

  const filename = formData.partyA.legalName && formData.partyB.legalName
    ? `Mutual-NDA-${formData.partyA.legalName}-${formData.partyB.legalName}.pdf`.replace(/\s+/g, "-")
    : "Mutual-NDA.pdf";

  return (
    <div className="min-h-full bg-zinc-50 dark:bg-zinc-950">
      <header className="flex items-start justify-between gap-4 border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div>
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{t.header.title}</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{t.header.subtitle}</p>
        </div>
        <LanguageToggle />
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-2">
        <section>
          <NdaForm data={formData} errors={errors} onChange={setFormData} />
        </section>

        <section className="space-y-4">
          <div className="flex justify-end">
            <DownloadButton targetRef={previewRef} filename={filename} disabled={!isValid} />
          </div>
          <NdaPreview ref={previewRef} data={formData} />
        </section>
      </main>
    </div>
  );
}
