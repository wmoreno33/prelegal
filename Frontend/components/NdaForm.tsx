"use client";

import { useState } from "react";
import type { NdaFormData, PartyInfo } from "@/types/nda";
import type { NdaFormErrors, PartyErrors, FieldErrorCode } from "@/lib/validation";
import { useLanguage } from "@/lib/i18n/language-context";
import type { Translations } from "@/lib/i18n/translations";

interface NdaFormProps {
  data: NdaFormData;
  errors: NdaFormErrors;
  onChange: (data: NdaFormData) => void;
}

const inputClasses =
  "w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";
const inputErrorClasses = "border-red-500 focus:border-red-500 focus:ring-red-500";
const labelClasses = "block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1";

function Field({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  placeholder?: string;
  type?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className={labelClasses}>{label}</span>
      <input
        type={type}
        className={`${inputClasses} ${error ? inputErrorClasses : ""}`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </label>
  );
}

function useTouched() {
  const [touched, setTouched] = useState<Set<string>>(new Set());
  function markTouched(key: string) {
    setTouched((prev) => (prev.has(key) ? prev : new Set(prev).add(key)));
  }
  return { touched, markTouched };
}

function errorMessage(
  code: FieldErrorCode | undefined,
  key: string,
  touched: Set<string>,
  tv: Translations["validation"],
): string | undefined {
  if (!code || !touched.has(key)) return undefined;
  return tv[code];
}

function PartyFields({
  title,
  fieldPrefix,
  party,
  errors,
  touched,
  markTouched,
  onChange,
  t,
  tv,
}: {
  title: string;
  fieldPrefix: "partyA" | "partyB";
  party: PartyInfo;
  errors: PartyErrors;
  touched: Set<string>;
  markTouched: (key: string) => void;
  onChange: (party: PartyInfo) => void;
  t: Translations["form"];
  tv: Translations["validation"];
}) {
  const key = (field: string) => `${fieldPrefix}.${field}`;

  return (
    <fieldset className="space-y-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <legend className="px-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</legend>
      <Field
        label={t.legalName.label}
        value={party.legalName}
        placeholder={t.legalName.placeholder}
        onChange={(v) => onChange({ ...party, legalName: v })}
        onBlur={() => markTouched(key("legalName"))}
        error={errorMessage(errors.legalName, key("legalName"), touched, tv)}
      />
      <Field
        label={t.address.label}
        value={party.address}
        placeholder={t.address.placeholder}
        onChange={(v) => onChange({ ...party, address: v })}
        onBlur={() => markTouched(key("address"))}
        error={errorMessage(errors.address, key("address"), touched, tv)}
      />
      <div className="grid grid-cols-2 gap-3">
        <Field
          label={t.signatoryName.label}
          value={party.signatoryName}
          placeholder={t.signatoryName.placeholder}
          onChange={(v) => onChange({ ...party, signatoryName: v })}
          onBlur={() => markTouched(key("signatoryName"))}
          error={errorMessage(errors.signatoryName, key("signatoryName"), touched, tv)}
        />
        <Field
          label={t.signatoryTitle.label}
          value={party.signatoryTitle}
          placeholder={t.signatoryTitle.placeholder}
          onChange={(v) => onChange({ ...party, signatoryTitle: v })}
          onBlur={() => markTouched(key("signatoryTitle"))}
          error={errorMessage(errors.signatoryTitle, key("signatoryTitle"), touched, tv)}
        />
      </div>
      <Field
        label={t.signatoryEmail.label}
        value={party.signatoryEmail}
        placeholder={t.signatoryEmail.placeholder}
        type="email"
        onChange={(v) => onChange({ ...party, signatoryEmail: v })}
        onBlur={() => markTouched(key("signatoryEmail"))}
        error={errorMessage(errors.signatoryEmail, key("signatoryEmail"), touched, tv)}
      />
    </fieldset>
  );
}

export default function NdaForm({ data, errors, onChange }: NdaFormProps) {
  const { t } = useLanguage();
  const { touched, markTouched } = useTouched();
  const tv = t.validation;

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <PartyFields
        title={t.form.partyA}
        fieldPrefix="partyA"
        party={data.partyA}
        errors={errors.partyA}
        touched={touched}
        markTouched={markTouched}
        onChange={(partyA) => onChange({ ...data, partyA })}
        t={t.form}
        tv={tv}
      />
      <PartyFields
        title={t.form.partyB}
        fieldPrefix="partyB"
        party={data.partyB}
        errors={errors.partyB}
        touched={touched}
        markTouched={markTouched}
        onChange={(partyB) => onChange({ ...data, partyB })}
        t={t.form}
        tv={tv}
      />

      <fieldset className="space-y-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
        <legend className="px-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{t.form.dealTerms}</legend>
        <Field
          label={t.form.purpose.label}
          value={data.purpose}
          placeholder={t.form.purpose.placeholder}
          onChange={(v) => onChange({ ...data, purpose: v })}
          onBlur={() => markTouched("purpose")}
          error={errorMessage(errors.purpose, "purpose", touched, tv)}
        />
        <Field
          label={t.form.effectiveDate.label}
          value={data.effectiveDate}
          type="date"
          onChange={(v) => onChange({ ...data, effectiveDate: v })}
          onBlur={() => markTouched("effectiveDate")}
          error={errorMessage(errors.effectiveDate, "effectiveDate", touched, tv)}
        />
        <div className="grid grid-cols-2 gap-3">
          <Field
            label={t.form.mndaTerm.label}
            value={data.mndaTermYears}
            placeholder={t.form.mndaTerm.placeholder}
            type="number"
            onChange={(v) => onChange({ ...data, mndaTermYears: v })}
            onBlur={() => markTouched("mndaTermYears")}
            error={errorMessage(errors.mndaTermYears, "mndaTermYears", touched, tv)}
          />
          <Field
            label={t.form.confidentialityTerm.label}
            value={data.confidentialityTermYears}
            placeholder={t.form.confidentialityTerm.placeholder}
            type="number"
            onChange={(v) => onChange({ ...data, confidentialityTermYears: v })}
            onBlur={() => markTouched("confidentialityTermYears")}
            error={errorMessage(errors.confidentialityTermYears, "confidentialityTermYears", touched, tv)}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field
            label={t.form.governingLaw.label}
            value={data.governingLaw}
            placeholder={t.form.governingLaw.placeholder}
            onChange={(v) => onChange({ ...data, governingLaw: v })}
            onBlur={() => markTouched("governingLaw")}
            error={errorMessage(errors.governingLaw, "governingLaw", touched, tv)}
          />
          <Field
            label={t.form.jurisdiction.label}
            value={data.jurisdiction}
            placeholder={t.form.jurisdiction.placeholder}
            onChange={(v) => onChange({ ...data, jurisdiction: v })}
            onBlur={() => markTouched("jurisdiction")}
            error={errorMessage(errors.jurisdiction, "jurisdiction", touched, tv)}
          />
        </div>
      </fieldset>
    </form>
  );
}
