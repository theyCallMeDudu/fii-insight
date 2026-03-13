import { FiiData, FiiType } from "./fiiData.types";

// Visão intermediária de dados que um provider pode preencher (parcial)
export interface PartialFiiDataFields {
  ticker?: string;
  type?: FiiType;
  segment?: string | null;
  dividendYield?: string | null;
  pvp?: string | null;
  vacancy?: string | null;
  manager?: string | null;
  assetCount?: number | null;
  sourceTag: string; // nome curto da fonte, ex.: "okanebox"
}

// Interface comum para todos os providers
export interface FiiDataProvider {
  readonly name: string;

  /**
   * Tenta obter dados sobre o FII.
   * Nunca deve lançar erro para cima: falhas de rede/parse devem ser capturadas internamente.
   * Retorna:
   * - null se não encontrou nada
   * - PartialFiiDataFields se tem algo útil
   */
  getData(ticker: string): Promise<PartialFiiDataFields | null>;
}

