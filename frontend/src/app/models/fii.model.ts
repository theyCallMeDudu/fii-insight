export type FiiType = "tijolo" | "papel" | "hibrido" | "desconhecido";

export interface FiiData {
  ticker: string;
  type: FiiType;
  segment: string | null;
  dividendYield: string | null;
  pvp: string | null;
  vacancy: string | null;
  manager: string | null;
  assetCount: number | null;
  source: string;
}

