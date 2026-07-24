"use client";

import type { NdaFormData, PartyInfo } from "@/types/nda";

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
}: {
  title: string;
  party: PartyInfo;
  onChange: (party: PartyInfo) => void;
}) {
  return (
    <fieldset className="space-y-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <legend className="px-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</legend>
      <Field
        label="Legal name"
        value={party.legalName}
        placeholder="Acme, Inc."
        onChange={(v) => onChange({ ...party, legalName: v })}
      />
      <Field
        label="Address"
        value={party.address}
        placeholder="123 Main St, San Francisco, CA 94105"
        onChange={(v) => onChange({ ...party, address: v })}
      />
      <div className="grid grid-cols-2 gap-3">
        <Field
          label="Signatory name"
          value={party.signatoryName}
          placeholder="Jane Doe"
          onChange={(v) => onChange({ ...party, signatoryName: v })}
        />
        <Field
          label="Signatory title"
          value={party.signatoryTitle}
          placeholder="CEO"
          onChange={(v) => onChange({ ...party, signatoryTitle: v })}
        />
      </div>
      <Field
        label="Signatory email"
        value={party.signatoryEmail}
        placeholder="jane@acme.com"
        type="email"
        onChange={(v) => onChange({ ...party, signatoryEmail: v })}
      />
    </fieldset>
  );
}

export default function NdaForm({ data, onChange }: NdaFormProps) {
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <PartyFields title="Party A" party={data.partyA} onChange={(partyA) => onChange({ ...data, partyA })} />
      <PartyFields title="Party B" party={data.partyB} onChange={(partyB) => onChange({ ...data, partyB })} />

      <fieldset className="space-y-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
        <legend className="px-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Deal terms</legend>
        <Field
          label="Purpose"
          value={data.purpose}
          placeholder="Evaluating a potential business relationship"
          onChange={(v) => onChange({ ...data, purpose: v })}
        />
        <Field
          label="Effective date"
          value={data.effectiveDate}
          type="date"
          onChange={(v) => onChange({ ...data, effectiveDate: v })}
        />
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="MNDA term (years)"
            value={data.mndaTermYears}
            placeholder="2"
            type="number"
            onChange={(v) => onChange({ ...data, mndaTermYears: v })}
          />
          <Field
            label="Confidentiality survives (years)"
            value={data.confidentialityTermYears}
            placeholder="3"
            type="number"
            onChange={(v) => onChange({ ...data, confidentialityTermYears: v })}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Governing law (state)"
            value={data.governingLaw}
            placeholder="Delaware"
            onChange={(v) => onChange({ ...data, governingLaw: v })}
          />
          <Field
            label="Jurisdiction"
            value={data.jurisdiction}
            placeholder="Wilmington, Delaware"
            onChange={(v) => onChange({ ...data, jurisdiction: v })}
          />
        </div>
      </fieldset>
    </form>
  );
}
