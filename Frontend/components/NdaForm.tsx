"use client";

import type { NdaFormData, PartyInfo } from "@/types/nda";
import { useLanguage } from "@/lib/i18n/language-context";
import type { Translations } from "@/lib/i18n/translations";

interface NdaFormProps {
  data: NdaFormData;
  onChange: (data: NdaFormData) => void;
}

const inputClasses =
  "w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";
const labelClasses = "block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1";

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className={labelClasses}>{label}</span>
      <input
        type={type}
        className={inputClasses}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function PartyFields({
  title,
  party,
  onChange,
  t,
}: {
  title: string;
  party: PartyInfo;
  onChange: (party: PartyInfo) => void;
  t: Translations["form"];
}) {
  return (
    <fieldset className="space-y-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <legend className="px-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</legend>
      <Field
        label={t.legalName.label}
        value={party.legalName}
        placeholder={t.legalName.placeholder}
        onChange={(v) => onChange({ ...party, legalName: v })}
      />
      <Field
        label={t.address.label}
        value={party.address}
        placeholder={t.address.placeholder}
        onChange={(v) => onChange({ ...party, address: v })}
      />
      <div className="grid grid-cols-2 gap-3">
        <Field
          label={t.signatoryName.label}
          value={party.signatoryName}
          placeholder={t.signatoryName.placeholder}
          onChange={(v) => onChange({ ...party, signatoryName: v })}
        />
        <Field
          label={t.signatoryTitle.label}
          value={party.signatoryTitle}
          placeholder={t.signatoryTitle.placeholder}
          onChange={(v) => onChange({ ...party, signatoryTitle: v })}
        />
      </div>
      <Field
        label={t.signatoryEmail.label}
        value={party.signatoryEmail}
        placeholder={t.signatoryEmail.placeholder}
        type="email"
        onChange={(v) => onChange({ ...party, signatoryEmail: v })}
      />
    </fieldset>
  );
}

export default function NdaForm({ data, onChange }: NdaFormProps) {
  const { t } = useLanguage();

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <PartyFields
        title={t.form.partyA}
        party={data.partyA}
        onChange={(partyA) => onChange({ ...data, partyA })}
        t={t.form}
      />
      <PartyFields
        title={t.form.partyB}
        party={data.partyB}
        onChange={(partyB) => onChange({ ...data, partyB })}
        t={t.form}
      />

      <fieldset className="space-y-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
        <legend className="px-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{t.form.dealTerms}</legend>
        <Field
          label={t.form.purpose.label}
          value={data.purpose}
          placeholder={t.form.purpose.placeholder}
          onChange={(v) => onChange({ ...data, purpose: v })}
        />
        <Field
          label={t.form.effectiveDate.label}
          value={data.effectiveDate}
          type="date"
          onChange={(v) => onChange({ ...data, effectiveDate: v })}
        />
        <div className="grid grid-cols-2 gap-3">
          <Field
            label={t.form.mndaTerm.label}
            value={data.mndaTermYears}
            placeholder={t.form.mndaTerm.placeholder}
            type="number"
            onChange={(v) => onChange({ ...data, mndaTermYears: v })}
          />
          <Field
            label={t.form.confidentialityTerm.label}
            value={data.confidentialityTermYears}
            placeholder={t.form.confidentialityTerm.placeholder}
            type="number"
            onChange={(v) => onChange({ ...data, confidentialityTermYears: v })}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field
            label={t.form.governingLaw.label}
            value={data.governingLaw}
            placeholder={t.form.governingLaw.placeholder}
            onChange={(v) => onChange({ ...data, governingLaw: v })}
          />
          <Field
            label={t.form.jurisdiction.label}
            value={data.jurisdiction}
            placeholder={t.form.jurisdiction.placeholder}
            onChange={(v) => onChange({ ...data, jurisdiction: v })}
          />
        </div>
      </fieldset>
    </form>
  );
}
