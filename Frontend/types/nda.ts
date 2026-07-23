export interface PartyInfo {
  legalName: string;
  address: string;
  signatoryName: string;
  signatoryTitle: string;
  signatoryEmail: string;
}

export interface NdaFormData {
  partyA: PartyInfo;
  partyB: PartyInfo;
  purpose: string;
  effectiveDate: string;
  mndaTermYears: string;
  confidentialityTermYears: string;
  governingLaw: string;
  jurisdiction: string;
}

export const emptyParty: PartyInfo = {
  legalName: "",
  address: "",
  signatoryName: "",
  signatoryTitle: "",
  signatoryEmail: "",
};

export const emptyNdaFormData: NdaFormData = {
  partyA: { ...emptyParty },
  partyB: { ...emptyParty },
  purpose: "",
  effectiveDate: "",
  mndaTermYears: "",
  confidentialityTermYears: "",
  governingLaw: "",
  jurisdiction: "",
};
