import { PartialFiiDataFields } from "../types/provider.types";
import { FiiType } from "../types/fiiData.types";

export function normalizeDividendYield(
  raw: string | number | null | undefined,
): string | null {
  if (raw == null) return null;

  if (typeof raw === "number") {
    const pct = raw <= 1 ? raw * 100 : raw;
    return `${pct.toFixed(2)}% a.m.`;
  }

  const trimmed = raw.trim();
  if (!trimmed) return null;

  if (trimmed.includes("%")) {
    return trimmed.replace(/\s+/g, " ").replace("%", "% a.m.").trim();
  }

  const numeric = Number(trimmed.replace(",", "."));
  if (Number.isFinite(numeric)) {
    const pct = numeric <= 1 ? numeric * 100 : numeric;
    return `${pct.toFixed(2)}% a.m.`;
  }

  return null;
}

export function normalizePvp(
  raw: string | number | null | undefined,
): string | null {
  if (raw == null) return null;
  if (typeof raw === "number") {
    return raw.toFixed(2);
  }
  const trimmed = raw.trim().replace(",", ".");
  const num = Number(trimmed);
  return Number.isFinite(num) ? num.toFixed(2) : null;
}

export function normalizeVacancy(
  raw: string | number | null | undefined,
  type: FiiType,
): string | null {
  if (type === "papel") return "N/A";
  if (raw == null) return null;

  if (typeof raw === "number") {
    const pct = raw <= 1 ? raw * 100 : raw;
    return `${pct.toFixed(2)}%`;
  }

  const trimmed = raw.trim();
  if (!trimmed) return null;

  if (trimmed.includes("%")) {
    return trimmed.replace(/\s+/g, " ");
  }

  const num = Number(trimmed.replace(",", "."));
  if (Number.isFinite(num)) {
    const pct = num <= 1 ? num * 100 : num;
    return `${pct.toFixed(2)}%`;
  }

  return null;
}

export function buildSourceTag(parts: string[]): string {
  const cleaned = Array.from(new Set(parts.filter(Boolean)));
  if (!cleaned.length) return "unknown";
  return cleaned.sort().join("+");
}

