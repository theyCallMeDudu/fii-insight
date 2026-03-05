export type FiiType = "tijolo" | "papel" | "hibrido" | "desconhecido";

export interface FiiData {
    ticker: string;
    type: FiiType;
    segment: string | null;
    dividendYield: string | null; // ex.: "0.85% a.m."
    pvp: string | null;           // ex.: "0.98"
    vacancy: string | null;       // ex.: "5%"
    source: "mock";               // por enquanto, apenas mock
}

export class FiiDataService {
    async getByTicker(ticker: string): Promise<FiiData> {
        // MVP: retorno mockado
        // Trocar por scraping/API
        return {
            ticker,
            type: "desconhecido",
            segment: null,
            dividendYield: null,
            pvp: null,
            vacancy: null,
            source: "mock"
        };
    }
}