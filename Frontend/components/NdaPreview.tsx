import { forwardRef } from "react";
import type { NdaFormData } from "@/types/nda";
import { getStandardTermsParagraphs, getSourceAttribution, fillTemplate } from "@/lib/nda-template";
import { renderBoldMarkdown } from "@/lib/markdown";
import { useLanguage } from "@/lib/i18n/language-context";

interface NdaPreviewProps {
  data: NdaFormData;
}

function displayOrPlaceholder(value: string, placeholder: string) {
  return value.trim() ? value : placeholder;
}

const NdaPreview = forwardRef<HTMLDivElement, NdaPreviewProps>(function NdaPreview({ data }, ref) {
  const { lang, t } = useLanguage();
  const p = t.preview;

  return (
    <div
      ref={ref}
      className="mx-auto max-w-3xl bg-white p-10 text-zinc-900 shadow-sm ring-1 ring-zinc-200 dark:bg-white dark:text-zinc-900 dark:ring-zinc-300"
    >
      <h1 className="mb-1 text-center text-xl font-bold">{p.documentTitle}</h1>
      <p className="mb-8 text-center text-sm text-zinc-500">{p.coverPage}</p>

      <dl className="mb-8 grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
        <div>
          <dt className="font-semibold">{p.partyA}</dt>
          <dd>{displayOrPlaceholder(data.partyA.legalName, p.placeholderPartyALegalName)}</dd>
          <dd className="text-zinc-600">{displayOrPlaceholder(data.partyA.address, p.placeholderPartyAAddress)}</dd>
          <dd className="mt-1 text-zinc-600">
            {p.signedBy}: {displayOrPlaceholder(data.partyA.signatoryName, p.placeholderSignatoryName)},{" "}
            {displayOrPlaceholder(data.partyA.signatoryTitle, p.placeholderSignatoryTitle)}
          </dd>
          <dd className="text-zinc-600">{displayOrPlaceholder(data.partyA.signatoryEmail, p.placeholderSignatoryEmail)}</dd>
        </div>
        <div>
          <dt className="font-semibold">{p.partyB}</dt>
          <dd>{displayOrPlaceholder(data.partyB.legalName, p.placeholderPartyBLegalName)}</dd>
          <dd className="text-zinc-600">{displayOrPlaceholder(data.partyB.address, p.placeholderPartyBAddress)}</dd>
          <dd className="mt-1 text-zinc-600">
            {p.signedBy}: {displayOrPlaceholder(data.partyB.signatoryName, p.placeholderSignatoryName)},{" "}
            {displayOrPlaceholder(data.partyB.signatoryTitle, p.placeholderSignatoryTitle)}
          </dd>
          <dd className="text-zinc-600">{displayOrPlaceholder(data.partyB.signatoryEmail, p.placeholderSignatoryEmail)}</dd>
        </div>
        <div className="col-span-2">
          <dt className="font-semibold">{p.purpose}</dt>
          <dd>{displayOrPlaceholder(data.purpose, p.placeholderPurpose)}</dd>
        </div>
        <div>
          <dt className="font-semibold">{p.effectiveDate}</dt>
          <dd>{displayOrPlaceholder(data.effectiveDate, p.placeholderEffectiveDate)}</dd>
        </div>
        <div>
          <dt className="font-semibold">{p.governingLawAndJurisdiction}</dt>
          <dd>
            {displayOrPlaceholder(data.governingLaw, p.placeholderGoverningLaw)} /{" "}
            {displayOrPlaceholder(data.jurisdiction, p.placeholderJurisdiction)}
          </dd>
        </div>
      </dl>

      <h2 className="mb-4 text-center text-lg font-bold">{p.standardTerms}</h2>
      <ol className="list-decimal space-y-4 pl-5 text-sm leading-relaxed text-justify">
        {getStandardTermsParagraphs(lang).map((paragraph, i) => (
          <li key={i}>{renderBoldMarkdown(fillTemplate(paragraph, data, lang))}</li>
        ))}
      </ol>

      <p className="mt-8 text-center text-xs text-zinc-400">{getSourceAttribution(lang)}</p>
    </div>
  );
});

export default NdaPreview;
