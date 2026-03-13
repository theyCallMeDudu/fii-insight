export type FiiType = "tijolo" | "papel" | "hibrido" | "desconhecido";

export interface FiiData {
  ticker: string;
  type: FiiType;
  segment: string | null;
  dividendYield: string | null; // ex.: "1.05% a.m."
  pvp: string | null;           // ex.: "1.01"
  vacancy: string | null;       // ex.: "N/A"
  manager: string | null;
  assetCount: number | null;
  source: string;               // ex.: "okanebox+fundamentus+brapi" ou "mock"
}

