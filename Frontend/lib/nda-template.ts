import type { NdaFormData } from "@/types/nda";
import type { Lang } from "@/lib/i18n/translations";

/**
 * Adapted from ../../Templates/Mutual-NDA.md (Common Paper Mutual NDA v1.0,
 * CC BY 4.0). The source file is the "Standard Terms" only and references a
 * separate "Cover Page" that Common Paper ships independently; the cover
 * page fields below (party info, purpose, dates, governing law) are modeled
 * on Common Paper's standard MNDA cover page schema. The Spanish text is a
 * translation of this adaptation, not an official Common Paper document, and
 * should be reviewed by a Spanish-speaking legal professional before real use.
 */
const STANDARD_TERMS_EN: string[] = [
  'This Mutual Non-Disclosure Agreement (which incorporates these Standard Terms and the Cover Page) ("**MNDA**") allows each party ("**Disclosing Party**") to disclose or make available information in connection with the **{{purpose}}** which (1) the Disclosing Party identifies to the receiving party ("**Receiving Party**") as "confidential", "proprietary", or the like or (2) should be reasonably understood as confidential or proprietary due to its nature and the circumstances of its disclosure ("**Confidential Information**"). Each party’s Confidential Information also includes the existence and status of the parties’ discussions and information on the Cover Page. Confidential Information includes technical or business information, product designs or roadmaps, requirements, pricing, security and compliance documentation, technology, inventions and know-how.',
  "The Receiving Party shall: (a) use Confidential Information solely for the **{{purpose}}**; (b) not disclose Confidential Information to third parties without the Disclosing Party’s prior written approval, except to representatives with a reasonable need to know who are bound by confidentiality obligations no less protective than this MNDA; and (c) protect Confidential Information using at least the same protections it uses for its own similar information, but no less than a reasonable standard of care.",
  "The Receiving Party’s obligations do not apply to information that: (a) is or becomes publicly available through no fault of the Receiving Party; (b) it rightfully knew or possessed prior to receipt without confidentiality restrictions; (c) it rightfully obtained from a third party without confidentiality restrictions; or (d) it independently developed without using the Confidential Information.",
  "The Receiving Party may disclose Confidential Information to the extent required by law, regulation, subpoena or court order, provided it gives the Disclosing Party reasonable advance notice and cooperates, at the Disclosing Party’s expense, with efforts to obtain confidential treatment.",
  "This MNDA commences on the **{{effectiveDate}}** and expires at the end of the **{{mndaTerm}}**. Either party may terminate this MNDA for any or no reason upon written notice. The Receiving Party’s confidentiality obligations survive for the **{{confidentialityTerm}}**, despite any expiration or termination of this MNDA.",
  "Upon expiration or termination of this MNDA, the Receiving Party will cease using Confidential Information, and, upon request, destroy or return all Confidential Information in its possession, subject to standard backup/record retention policies or legal requirements.",
  "The Disclosing Party retains all intellectual property and other rights in its Confidential Information; disclosure grants no license under such rights.",
  'ALL CONFIDENTIAL INFORMATION IS PROVIDED "AS IS", WITH ALL FAULTS, AND WITHOUT WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.',
  "This MNDA is governed by, and construed in accordance with, the laws of **{{governingLaw}}**, without regard to conflict of laws provisions. Any legal suit, action, or proceeding relating to this MNDA must be instituted in the federal or state courts located in **{{jurisdiction}}**, and each party irrevocably submits to such jurisdiction.",
  "A breach of this MNDA may cause irreparable harm for which monetary damages are an insufficient remedy. Upon a breach, the Disclosing Party is entitled to seek appropriate equitable relief, including an injunction, in addition to other remedies.",
  "Neither party has an obligation to disclose Confidential Information or proceed with any proposed transaction. Neither party may assign this MNDA without the other’s prior written consent, except in connection with a merger, reorganization, acquisition, or transfer of substantially all assets. This MNDA constitutes the entire agreement of the parties regarding its subject matter and may only be amended in writing signed by both parties.",
];

const STANDARD_TERMS_ES: string[] = [
  'Este Acuerdo Mutuo de No Divulgación (que incorpora estos Términos Estándar y la Portada) ("**ANDA**") permite que cada parte ("**Parte Divulgadora**") divulgue o ponga a disposición información en relación con el **{{purpose}}**, que (1) la Parte Divulgadora identifique ante la parte receptora ("**Parte Receptora**") como "confidencial", "propietaria" o similar, o (2) deba entenderse razonablemente como confidencial o propietaria debido a su naturaleza y a las circunstancias de su divulgación ("**Información Confidencial**"). La Información Confidencial de cada parte también incluye la existencia y el estado de las conversaciones entre las partes y la información contenida en la Portada. La Información Confidencial incluye información técnica o comercial, diseños de productos o hojas de ruta, requisitos, precios, documentación de seguridad y cumplimiento, tecnología, invenciones y conocimientos técnicos (know-how).',
  "La Parte Receptora deberá: (a) utilizar la Información Confidencial únicamente para el **{{purpose}}**; (b) no divulgar la Información Confidencial a terceros sin la aprobación previa por escrito de la Parte Divulgadora, salvo a representantes con una necesidad razonable de conocerla que estén sujetos a obligaciones de confidencialidad no menos protectoras que las de este ANDA; y (c) proteger la Información Confidencial utilizando al menos las mismas protecciones que utiliza para su propia información similar, pero nunca menos que un estándar de cuidado razonable.",
  "Las obligaciones de la Parte Receptora no aplican a la información que: (a) sea o llegue a ser de dominio público sin culpa de la Parte Receptora; (b) la Parte Receptora ya conociera o poseyera legítimamente antes de recibirla, sin restricciones de confidencialidad; (c) haya obtenido legítimamente de un tercero sin restricciones de confidencialidad; o (d) haya desarrollado de forma independiente sin utilizar la Información Confidencial.",
  "La Parte Receptora podrá divulgar Información Confidencial en la medida en que lo exija la ley, un reglamento, una citación judicial o una orden judicial, siempre que notifique a la Parte Divulgadora con una antelación razonable y coopere, a costa de la Parte Divulgadora, en los esfuerzos por obtener un tratamiento confidencial.",
  "Este ANDA comienza en la **{{effectiveDate}}** y expira al final del **{{mndaTerm}}**. Cualquiera de las partes podrá terminar este ANDA con o sin motivo, mediante notificación por escrito. Las obligaciones de confidencialidad de la Parte Receptora sobrevivirán durante el **{{confidentialityTerm}}**, a pesar de cualquier expiración o terminación de este ANDA.",
  "Al expirar o terminar este ANDA, la Parte Receptora dejará de utilizar la Información Confidencial y, previa solicitud, destruirá o devolverá toda la Información Confidencial en su poder, sujeto a las políticas estándar de respaldo/retención de registros o a requisitos legales.",
  "La Parte Divulgadora conserva todos los derechos de propiedad intelectual y otros derechos sobre su Información Confidencial; la divulgación no otorga ninguna licencia sobre dichos derechos.",
  'TODA LA INFORMACIÓN CONFIDENCIAL SE PROPORCIONA "TAL CUAL", CON TODOS SUS DEFECTOS Y SIN GARANTÍAS, INCLUYENDO LAS GARANTÍAS IMPLÍCITAS DE TITULARIDAD, COMERCIABILIDAD E IDONEIDAD PARA UN PROPÓSITO PARTICULAR.',
  "Este ANDA se rige e interpreta de conformidad con las leyes de **{{governingLaw}}**, sin tener en cuenta las disposiciones sobre conflicto de leyes. Cualquier demanda, acción o procedimiento legal relacionado con este ANDA deberá iniciarse en los tribunales federales o estatales ubicados en **{{jurisdiction}}**, y cada parte se somete irrevocablemente a dicha jurisdicción.",
  "El incumplimiento de este ANDA puede causar un daño irreparable para el cual una indemnización monetaria resultaría un remedio insuficiente. Ante un incumplimiento, la Parte Divulgadora tiene derecho a solicitar la reparación equitativa que corresponda, incluyendo una medida cautelar, además de otros remedios.",
  "Ninguna de las partes tiene la obligación de divulgar Información Confidencial ni de proceder con ninguna transacción propuesta. Ninguna de las partes podrá ceder este ANDA sin el consentimiento previo por escrito de la otra, salvo en relación con una fusión, reorganización, adquisición o transferencia de la totalidad o la mayor parte de sus activos. Este ANDA constituye el acuerdo completo entre las partes respecto de su materia y solo podrá modificarse mediante un documento escrito firmado por ambas partes.",
];

export function getStandardTermsParagraphs(lang: Lang): string[] {
  return lang === "es" ? STANDARD_TERMS_ES : STANDARD_TERMS_EN;
}

const PLACEHOLDER_TOKENS: Record<Lang, Record<"purpose" | "effectiveDate" | "mndaTerm" | "confidentialityTerm" | "governingLaw" | "jurisdiction", string>> = {
  en: {
    purpose: "[Purpose]",
    effectiveDate: "[Effective Date]",
    mndaTerm: "[MNDA Term]",
    confidentialityTerm: "[Term of Confidentiality]",
    governingLaw: "[Governing Law]",
    jurisdiction: "[Jurisdiction]",
  },
  es: {
    purpose: "[Propósito]",
    effectiveDate: "[Fecha de Vigencia]",
    mndaTerm: "[Plazo del ANDA]",
    confidentialityTerm: "[Plazo de Confidencialidad]",
    governingLaw: "[Ley Aplicable]",
    jurisdiction: "[Jurisdicción]",
  },
};

function mndaTermText(lang: Lang, years: string): string {
  return lang === "es" ? `${years} año(s) a partir de la Fecha de Vigencia` : `${years} year(s) from the Effective Date`;
}

function confidentialityTermText(lang: Lang, years: string): string {
  return lang === "es"
    ? `${years} año(s) después de que la Parte Receptora reciba la Información Confidencial`
    : `${years} year(s) after the Receiving Party’s receipt of the Confidential Information`;
}

function governingLawText(lang: Lang, state: string): string {
  return lang === "es" ? `el Estado de ${state}` : `the State of ${state}`;
}

export function fillTemplate(paragraph: string, data: NdaFormData, lang: Lang): string {
  const tokens = PLACEHOLDER_TOKENS[lang];
  return paragraph
    .replaceAll("{{purpose}}", data.purpose || tokens.purpose)
    .replaceAll("{{effectiveDate}}", data.effectiveDate || tokens.effectiveDate)
    .replaceAll("{{mndaTerm}}", data.mndaTermYears ? mndaTermText(lang, data.mndaTermYears) : tokens.mndaTerm)
    .replaceAll(
      "{{confidentialityTerm}}",
      data.confidentialityTermYears ? confidentialityTermText(lang, data.confidentialityTermYears) : tokens.confidentialityTerm,
    )
    .replaceAll("{{governingLaw}}", data.governingLaw ? governingLawText(lang, data.governingLaw) : tokens.governingLaw)
    .replaceAll("{{jurisdiction}}", data.jurisdiction || tokens.jurisdiction);
}

export function getSourceAttribution(lang: Lang): string {
  return lang === "es"
    ? "Adaptado del Acuerdo Mutuo de No Divulgación (Mutual Non-Disclosure Agreement) de Common Paper, Versión 1.0, de uso libre bajo CC BY 4.0 (commonpaper.com/standards/mutual-nda/1.0/)."
    : "Adapted from the Common Paper Mutual Non-Disclosure Agreement, Version 1.0, free to use under CC BY 4.0 (commonpaper.com/standards/mutual-nda/1.0/).";
}
