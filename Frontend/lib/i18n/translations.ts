export type Lang = "en" | "es";

export interface Translations {
  header: {
    title: string;
    subtitle: string;
  };
  languageToggle: {
    label: string;
  };
  form: {
    partyA: string;
    partyB: string;
    dealTerms: string;
    legalName: { label: string; placeholder: string };
    address: { label: string; placeholder: string };
    signatoryName: { label: string; placeholder: string };
    signatoryTitle: { label: string; placeholder: string };
    signatoryEmail: { label: string; placeholder: string };
    purpose: { label: string; placeholder: string };
    effectiveDate: { label: string };
    mndaTerm: { label: string; placeholder: string };
    confidentialityTerm: { label: string; placeholder: string };
    governingLaw: { label: string; placeholder: string };
    jurisdiction: { label: string; placeholder: string };
  };
  preview: {
    documentTitle: string;
    coverPage: string;
    partyA: string;
    partyB: string;
    signedBy: string;
    purpose: string;
    effectiveDate: string;
    governingLawAndJurisdiction: string;
    standardTerms: string;
    placeholderPartyALegalName: string;
    placeholderPartyAAddress: string;
    placeholderPartyBLegalName: string;
    placeholderPartyBAddress: string;
    placeholderSignatoryName: string;
    placeholderSignatoryTitle: string;
    placeholderSignatoryEmail: string;
    placeholderPurpose: string;
    placeholderEffectiveDate: string;
    placeholderGoverningLaw: string;
    placeholderJurisdiction: string;
  };
  download: {
    button: string;
    generating: string;
    error: string;
  };
}

export const translations: Record<Lang, Translations> = {
  en: {
    header: {
      title: "Mutual NDA Generator",
      subtitle:
        "Fill in the details below to generate a mutual non-disclosure agreement. Nothing you enter leaves your browser.",
    },
    languageToggle: {
      label: "Language",
    },
    form: {
      partyA: "Party A",
      partyB: "Party B",
      dealTerms: "Deal terms",
      legalName: { label: "Legal name", placeholder: "Acme, Inc." },
      address: { label: "Address", placeholder: "123 Main St, San Francisco, CA 94105" },
      signatoryName: { label: "Signatory name", placeholder: "Jane Doe" },
      signatoryTitle: { label: "Signatory title", placeholder: "CEO" },
      signatoryEmail: { label: "Signatory email", placeholder: "jane@acme.com" },
      purpose: { label: "Purpose", placeholder: "Evaluating a potential business relationship" },
      effectiveDate: { label: "Effective date" },
      mndaTerm: { label: "MNDA term (years)", placeholder: "2" },
      confidentialityTerm: { label: "Confidentiality survives (years)", placeholder: "3" },
      governingLaw: { label: "Governing law (state)", placeholder: "Delaware" },
      jurisdiction: { label: "Jurisdiction", placeholder: "Wilmington, Delaware" },
    },
    preview: {
      documentTitle: "Mutual Non-Disclosure Agreement",
      coverPage: "Cover Page",
      partyA: "Party A",
      partyB: "Party B",
      signedBy: "Signed by",
      purpose: "Purpose",
      effectiveDate: "Effective Date",
      governingLawAndJurisdiction: "Governing Law / Jurisdiction",
      standardTerms: "Standard Terms",
      placeholderPartyALegalName: "[Party A Legal Name]",
      placeholderPartyAAddress: "[Party A Address]",
      placeholderPartyBLegalName: "[Party B Legal Name]",
      placeholderPartyBAddress: "[Party B Address]",
      placeholderSignatoryName: "[Signatory Name]",
      placeholderSignatoryTitle: "[Title]",
      placeholderSignatoryEmail: "[Signatory Email]",
      placeholderPurpose: "[Purpose]",
      placeholderEffectiveDate: "[Effective Date]",
      placeholderGoverningLaw: "[Governing Law]",
      placeholderJurisdiction: "[Jurisdiction]",
    },
    download: {
      button: "Download PDF",
      generating: "Generating PDF…",
      error: "Couldn't generate the PDF. Please try again.",
    },
  },
  es: {
    header: {
      title: "Generador de ANDA Mutuo",
      subtitle:
        "Completa los datos a continuación para generar un acuerdo mutuo de no divulgación. Nada de lo que ingreses sale de tu navegador.",
    },
    languageToggle: {
      label: "Idioma",
    },
    form: {
      partyA: "Parte A",
      partyB: "Parte B",
      dealTerms: "Términos del acuerdo",
      legalName: { label: "Nombre legal", placeholder: "Acme, Inc." },
      address: { label: "Dirección", placeholder: "Calle Principal 123, San Francisco, CA 94105" },
      signatoryName: { label: "Nombre del firmante", placeholder: "Jane Doe" },
      signatoryTitle: { label: "Cargo del firmante", placeholder: "CEO" },
      signatoryEmail: { label: "Correo del firmante", placeholder: "jane@acme.com" },
      purpose: { label: "Propósito", placeholder: "Evaluar una posible relación comercial" },
      effectiveDate: { label: "Fecha de vigencia" },
      mndaTerm: { label: "Plazo del ANDA (años)", placeholder: "2" },
      confidentialityTerm: { label: "Confidencialidad vigente por (años)", placeholder: "3" },
      governingLaw: { label: "Ley aplicable (estado)", placeholder: "Delaware" },
      jurisdiction: { label: "Jurisdicción", placeholder: "Wilmington, Delaware" },
    },
    preview: {
      documentTitle: "Acuerdo Mutuo de No Divulgación",
      coverPage: "Portada",
      partyA: "Parte A",
      partyB: "Parte B",
      signedBy: "Firmado por",
      purpose: "Propósito",
      effectiveDate: "Fecha de Vigencia",
      governingLawAndJurisdiction: "Ley Aplicable / Jurisdicción",
      standardTerms: "Términos Estándar",
      placeholderPartyALegalName: "[Nombre Legal de la Parte A]",
      placeholderPartyAAddress: "[Dirección de la Parte A]",
      placeholderPartyBLegalName: "[Nombre Legal de la Parte B]",
      placeholderPartyBAddress: "[Dirección de la Parte B]",
      placeholderSignatoryName: "[Nombre del Firmante]",
      placeholderSignatoryTitle: "[Cargo]",
      placeholderSignatoryEmail: "[Correo del Firmante]",
      placeholderPurpose: "[Propósito]",
      placeholderEffectiveDate: "[Fecha de Vigencia]",
      placeholderGoverningLaw: "[Ley Aplicable]",
      placeholderJurisdiction: "[Jurisdicción]",
    },
    download: {
      button: "Descargar PDF",
      generating: "Generando PDF…",
      error: "No se pudo generar el PDF. Inténtalo de nuevo.",
    },
  },
};
