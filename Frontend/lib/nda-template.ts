import type { NdaFormData } from "@/types/nda";

/**
 * Adapted from ../../Templates/Mutual-NDA.md (Common Paper Mutual NDA v1.0,
 * CC BY 4.0). The source file is the "Standard Terms" only and references a
 * separate "Cover Page" that Common Paper ships independently; the cover
 * page fields below (party info, purpose, dates, governing law) are modeled
 * on Common Paper's standard MNDA cover page schema.
 */
export const STANDARD_TERMS_PARAGRAPHS: string[] = [
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

export function fillTemplate(paragraph: string, data: NdaFormData): string {
  return paragraph
    .replaceAll("{{purpose}}", data.purpose || "[Purpose]")
    .replaceAll("{{effectiveDate}}", data.effectiveDate || "[Effective Date]")
    .replaceAll("{{mndaTerm}}", data.mndaTermYears ? `${data.mndaTermYears} year(s) from the Effective Date` : "[MNDA Term]")
    .replaceAll(
      "{{confidentialityTerm}}",
      data.confidentialityTermYears ? `${data.confidentialityTermYears} year(s) after the Receiving Party’s receipt of the Confidential Information` : "[Term of Confidentiality]",
    )
    .replaceAll("{{governingLaw}}", data.governingLaw ? `the State of ${data.governingLaw}` : "[Governing Law]")
    .replaceAll("{{jurisdiction}}", data.jurisdiction || "[Jurisdiction]");
}

export const SOURCE_ATTRIBUTION =
  "Adapted from the Common Paper Mutual Non-Disclosure Agreement, Version 1.0, free to use under CC BY 4.0 (commonpaper.com/standards/mutual-nda/1.0/).";
