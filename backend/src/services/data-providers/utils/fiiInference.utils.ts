import { FiiType } from "../types/fiiData.types";
import { PartialFiiDataFields } from "../types/provider.types";

export function inferFiiType(sources: PartialFiiDataFields[]): FiiType {
  for (const s of sources) {
    if (s?.type && s.type !== "desconhecido") {
      return s.type;
    }
  }

  const text = collectTextContext(sources).toLowerCase();

  const hasPaperTerms = /cri|cra|receb(i|í)veis|papel|crédito/i.test(text);
  const hasBrickTerms = /lajes|log[ií]stica|shopping|galp(ão|ões)|im(ó|o)veis/i.test(
    text,
  );

  if (hasPaperTerms && !hasBrickTerms) return "papel";
  if (!hasPaperTerms && hasBrickTerms) return "tijolo";
  if (hasPaperTerms && hasBrickTerms) return "hibrido";

  return "desconhecido";
}

export function inferSegment(sources: PartialFiiDataFields[]): string | null {
  const segmentFromSources = sources.find((s) => s.segment)?.segment;
  if (segmentFromSources) return segmentFromSources;

  const text = collectTextContext(sources).toLowerCase();

  if (/log[ií]stica/i.test(text)) return "logística";
  if (/lajes/i.test(text)) return "lajes corporativas";
  if (/shopping/i.test(text)) return "shoppings";
  if (/cri/i.test(text)) return "CRIs";
  if (/fundos de fundos|fof/i.test(text)) return "fundos de fundos";

  return null;
}

function collectTextContext(sources: PartialFiiDataFields[]): string {
  const buf: string[] = [];
  for (const s of sources) {
    if (s.segment) buf.push(s.segment);
    if (s.manager) buf.push(s.manager);
  }
  return buf.join(" ");
}

