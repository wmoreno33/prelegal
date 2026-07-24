import { forwardRef } from "react";
import type { NdaFormData } from "@/types/nda";
import { STANDARD_TERMS_PARAGRAPHS, SOURCE_ATTRIBUTION, fillTemplate } from "@/lib/nda-template";
import { renderBoldMarkdown } from "@/lib/markdown";

interface NdaPreviewProps {
  data: NdaFormData;
}

function displayOrPlaceholder(value: string, placeholder: string) {
  return value.trim() ? value : placeholder;
}

const NdaPreview = forwardRef<HTMLDivElement, NdaPreviewProps>(function NdaPreview({ data }, ref) {
  return (
    <div
      ref={ref}
      className="mx-auto max-w-3xl bg-white p-10 text-zinc-900 shadow-sm ring-1 ring-zinc-200 dark:bg-white dark:text-zinc-900 dark:ring-zinc-300"
    >
      <h1 className="mb-1 text-center text-xl font-bold">Mutual Non-Disclosure Agreement</h1>
      <p className="mb-8 text-center text-sm text-zinc-500">Cover Page</p>

      <dl className="mb-8 grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
        <div>
          <dt className="font-semibold">Party A</dt>
          <dd>{displayOrPlaceholder(data.partyA.legalName, "[Party A Legal Name]")}</dd>
          <dd className="text-zinc-600">{displayOrPlaceholder(data.partyA.address, "[Party A Address]")}</dd>
          <dd className="mt-1 text-zinc-600">
            Signed by: {displayOrPlaceholder(data.partyA.signatoryName, "[Signatory Name]")},{" "}
            {displayOrPlaceholder(data.partyA.signatoryTitle, "[Title]")}
          </dd>
          <dd className="text-zinc-600">{displayOrPlaceholder(data.partyA.signatoryEmail, "[Signatory Email]")}</dd>
        </div>
        <div>
          <dt className="font-semibold">Party B</dt>
          <dd>{displayOrPlaceholder(data.partyB.legalName, "[Party B Legal Name]")}</dd>
          <dd className="text-zinc-600">{displayOrPlaceholder(data.partyB.address, "[Party B Address]")}</dd>
          <dd className="mt-1 text-zinc-600">
            Signed by: {displayOrPlaceholder(data.partyB.signatoryName, "[Signatory Name]")},{" "}
            {displayOrPlaceholder(data.partyB.signatoryTitle, "[Title]")}
          </dd>
          <dd className="text-zinc-600">{displayOrPlaceholder(data.partyB.signatoryEmail, "[Signatory Email]")}</dd>
        </div>
        <div className="col-span-2">
          <dt className="font-semibold">Purpose</dt>
          <dd>{displayOrPlaceholder(data.purpose, "[Purpose]")}</dd>
        </div>
        <div>
          <dt className="font-semibold">Effective Date</dt>
          <dd>{displayOrPlaceholder(data.effectiveDate, "[Effective Date]")}</dd>
        </div>
        <div>
          <dt className="font-semibold">Governing Law / Jurisdiction</dt>
          <dd>
            {displayOrPlaceholder(data.governingLaw, "[Governing Law]")} /{" "}
            {displayOrPlaceholder(data.jurisdiction, "[Jurisdiction]")}
          </dd>
        </div>
      </dl>

      <h2 className="mb-4 text-center text-lg font-bold">Standard Terms</h2>
      <ol className="list-decimal space-y-4 pl-5 text-sm leading-relaxed text-justify">
        {STANDARD_TERMS_PARAGRAPHS.map((paragraph, i) => (
          <li key={i}>{renderBoldMarkdown(fillTemplate(paragraph, data))}</li>
        ))}
      </ol>

      <p className="mt-8 text-center text-xs text-zinc-400">{SOURCE_ATTRIBUTION}</p>
    </div>
  );
});

export default NdaPreview;
