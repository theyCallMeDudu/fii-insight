import { FiiData } from "../services/data-providers/types/fiiData.types";

// Helper simples para mesclar base local com dados externos parciais.
export function mergeFiiData(
  base: FiiData,
  override: Partial<FiiData>,
): FiiData {
  return {
    ...base,
    ...override,
    // ticker e source sempre vêm da base, a menos que override traga algo explícito
    ticker: override.ticker ?? base.ticker,
    source: override.source ?? base.source,
  };
}

