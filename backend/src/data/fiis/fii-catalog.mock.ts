export type FiiType = "tijolo" | "papel" | "hibrido" | "desconhecido";

export interface LocalFiiCatalogItem {
  ticker: string;
  type: FiiType;
  segment: string | null;
  dividendYield: string | null;
  pvp: string | null;
  vacancy: string | null;
  manager: string | null;
  assetCount: number | null;
  source: "local";
  notes?: string;
}

export const LOCAL_FII_CATALOG: Record<string, LocalFiiCatalogItem> = {
  HGLG11: {
    ticker: "HGLG11",
    type: "tijolo",
    segment: "Logística",
    dividendYield: null,
    pvp: null,
    vacancy: null,
    manager: "CSHG",
    assetCount: 20,
    source: "local",
    notes: "Fundo de galpões logísticos. Deixe DY e P/VP para fontes externas ou atualização manual."
  },
  KNRI11: {
    ticker: "KNRI11",
    type: "hibrido",
    segment: "Escritórios e logística",
    dividendYield: null,
    pvp: null,
    vacancy: null,
    manager: "Kinea",
    assetCount: 20,
    source: "local",
    notes: "Pode ser tratado como híbrido por combinar imóveis de segmentos diferentes."
  },
  KNIP11: {
    ticker: "KNIP11",
    type: "papel",
    segment: "CRIs",
    dividendYield: null,
    pvp: null,
    vacancy: "N/A",
    manager: "Kinea",
    assetCount: 80,
    source: "local",
    notes: "Vacância não se aplica ao fundo de papel; assetCount pode ser refinado quando houver fonte confiável."
  },
  MXRF11: {
    ticker: "MXRF11",
    type: "hibrido",
    segment: "Híbrido",
    dividendYield: null,
    pvp: null,
    vacancy: null,
    manager: "XP Vista Asset",
    assetCount: null,
    source: "local",
    notes: "Mistura recebíveis e outros ativos; manter dados dinâmicos fora do catálogo local."
  },
  VISC11: {
    ticker: "VISC11",
    type: "tijolo",
    segment: "Shoppings",
    dividendYield: null,
    pvp: null,
    vacancy: null,
    manager: "Vinci Partners",
    assetCount: 30,
    source: "local",
    notes: "AssetCount é aproximado e pode ser atualizado depois."
  },
  XPML11: {
    ticker: "XPML11",
    type: "tijolo",
    segment: "Shoppings",
    dividendYield: null,
    pvp: null,
    vacancy: null,
    manager: "XP Asset",
    assetCount: 20,
    source: "local",
    notes: "Campo vacancy deve vir de fonte externa ou permanecer null se indisponível."
  },
  BCFF11: {
    ticker: "BCFF11",
    type: "hibrido",
    segment: "FOF",
    dividendYield: null,
    pvp: null,
    vacancy: "N/A",
    manager: "BTG Pactual",
    assetCount: 80,
    source: "local",
    notes: "Como FOF, vacância direta não é um indicador principal; pode ser tratado como N/A."
  },
  XPLG11: {
    ticker: "XPLG11",
    type: "tijolo",
    segment: "Logística",
    dividendYield: null,
    pvp: null,
    vacancy: null,
    manager: "XP Asset",
    assetCount: 18,
    source: "local",
    notes: "Boa opção para enriquecer o conjunto inicial do MVP."
  },
  CPTS11: {
    ticker: "CPTS11",
    type: "papel",
    segment: "CRIs",
    dividendYield: null,
    pvp: null,
    vacancy: "N/A",
    manager: "Capitânia",
    assetCount: null,
    source: "local",
    notes: "AssetCount pode ficar null até existir critério consistente de contagem."
  },
  TGAR11: {
    ticker: "TGAR11",
    type: "hibrido",
    segment: "Desenvolvimento",
    dividendYield: null,
    pvp: null,
    vacancy: null,
    manager: "TG Core",
    assetCount: null,
    source: "local",
    notes: "Fundo com estratégia menos trivial; segmento pode ser refinado depois."
  }
};

export function getLocalFiiCatalogItem(ticker: string): LocalFiiCatalogItem | null {
  return LOCAL_FII_CATALOG[ticker.toUpperCase()] ?? null;
}
