import type { NdaFormData, PartyInfo } from "@/types/nda";

export type FieldErrorCode = "required" | "invalidEmail" | "pastDate" | "invalidNumber";

export interface PartyErrors {
  legalName?: FieldErrorCode;
  address?: FieldErrorCode;
  signatoryName?: FieldErrorCode;
  signatoryTitle?: FieldErrorCode;
  signatoryEmail?: FieldErrorCode;
}

export interface NdaFormErrors {
  partyA: PartyErrors;
  partyB: PartyErrors;
  purpose?: FieldErrorCode;
  effectiveDate?: FieldErrorCode;
  mndaTermYears?: FieldErrorCode;
  confidentialityTermYears?: FieldErrorCode;
  governingLaw?: FieldErrorCode;
  jurisdiction?: FieldErrorCode;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRequiredText(value: string): FieldErrorCode | undefined {
  return value.trim() ? undefined : "required";
}

function validateEmail(value: string): FieldErrorCode | undefined {
  if (!value.trim()) return "required";
  return EMAIL_PATTERN.test(value.trim()) ? undefined : "invalidEmail";
}

function validatePositiveInteger(value: string): FieldErrorCode | undefined {
  if (!value.trim()) return "required";
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? undefined : "invalidNumber";
}

function validateEffectiveDate(value: string): FieldErrorCode | undefined {
  if (!value.trim()) return "required";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(`${value}T00:00:00`);
  return date.getTime() >= today.getTime() ? undefined : "pastDate";
}

function validateParty(party: PartyInfo): PartyErrors {
  return {
    legalName: validateRequiredText(party.legalName),
    address: validateRequiredText(party.address),
    signatoryName: validateRequiredText(party.signatoryName),
    signatoryTitle: validateRequiredText(party.signatoryTitle),
    signatoryEmail: validateEmail(party.signatoryEmail),
  };
}

export function validateNdaFormData(data: NdaFormData): NdaFormErrors {
  return {
    partyA: validateParty(data.partyA),
    partyB: validateParty(data.partyB),
    purpose: validateRequiredText(data.purpose),
    effectiveDate: validateEffectiveDate(data.effectiveDate),
    mndaTermYears: validatePositiveInteger(data.mndaTermYears),
    confidentialityTermYears: validatePositiveInteger(data.confidentialityTermYears),
    governingLaw: validateRequiredText(data.governingLaw),
    jurisdiction: validateRequiredText(data.jurisdiction),
  };
}

function partyHasErrors(errors: PartyErrors): boolean {
  return Object.values(errors).some(Boolean);
}

export function hasErrors(errors: NdaFormErrors): boolean {
  return (
    partyHasErrors(errors.partyA) ||
    partyHasErrors(errors.partyB) ||
    Boolean(errors.purpose) ||
    Boolean(errors.effectiveDate) ||
    Boolean(errors.mndaTermYears) ||
    Boolean(errors.confidentialityTermYears) ||
    Boolean(errors.governingLaw) ||
    Boolean(errors.jurisdiction)
  );
}
