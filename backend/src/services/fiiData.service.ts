export type FiiType = "tijolo" | "papel" | "hibrido" | "desconhecido";

export interface FiiData {
    ticker: string;
    type: FiiType;
    segment: string | null;
    dividendYield: string | null; // ex.: "0.85% a.m."
    pvp: string | null;           // ex.: "0.98"
    vacancy: string | null;       // ex.: "5%"
    manager: string | null;
    assetCount: number | null;
    source: "mock";               // por enquanto, apenas mock
}

const MOCK_FIIS: Record<string, FiiData> = {
    HGLG11: {
        ticker: "HGLG11",
        type: "tijolo",
        segment: "logística",
        dividendYield: "0.85% a.m.",
        pvp: "0.97",
        vacancy: "3%",
        manager: "CSHG",
        assetCount: 18,
        source: "mock",
    },
    MXRF11: {
        ticker: "MXRF11",
        type: "papel",
        segment: "fundos de papel",
        dividendYield: "1.10% a.m.",
        pvp: "1.05",
        vacancy: "N/A",
        manager: "XP Asset",
        assetCount: 400,
        source: "mock",
    },
    KNRI11: {
        ticker: "KNRI11",
        type: "tijolo",
        segment: "lajes corporativas",
        dividendYield: "0.80% a.m.",
        pvp: "0.95",
        vacancy: "10%",
        manager: "Kinea",
        assetCount: 17,
        source: "mock",
    },
};

export class FiiDataService {
    async getByTicker(ticker: string): Promise<FiiData> {
        const normalizedTicker = ticker.trim().toUpperCase();

        const mock = MOCK_FIIS[normalizedTicker];
        if (mock) {
            return mock;
        }

        // Fallback genérico para tickers ainda não mapeados
        return {
            ticker: normalizedTicker,
            type: "desconhecido",
            segment: null,
            dividendYield: null,
            pvp: null,
            vacancy: null,
            manager: null,
            assetCount: null,
            source: "mock",
        };
    }
}