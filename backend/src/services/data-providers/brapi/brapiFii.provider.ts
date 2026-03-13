import axios from "axios";
import { FiiDataProvider, PartialFiiDataFields } from "../types/provider.types";

const BRAPI_BASE_URL = process.env.BRAPI_BASE_URL || "https://brapi.dev";
const BRAPI_TOKEN = process.env.BRAPI_TOKEN;

interface BrapiQuoteResponse {
  results?: Array<{
    symbol: string;
    regularMarketPrice?: number;
    priceToBook?: number;
    dividendsData?: {
      cashDividends?: Array<{
        rate?: number;
      }>;
    };
    sector?: string;
    industry?: string;
  }>;
}

export class BrapiFiiProvider implements FiiDataProvider {
  public readonly name = "BrapiFiiProvider";

  async getData(ticker: string): Promise<PartialFiiDataFields | null> {
    if (!BRAPI_BASE_URL) return null;

    const normalized = ticker.trim().toUpperCase();

    try {
      const url = new URL(`/api/quote/${normalized}`, BRAPI_BASE_URL);

      if (BRAPI_TOKEN) {
        url.searchParams.set("token", BRAPI_TOKEN);
      }

      url.searchParams.set("fundamental", "true");
      url.searchParams.set("dividends", "true");

      const response = await axios.get<BrapiQuoteResponse>(url.toString());
      const result = response.data?.results?.[0];

      if (!result) return null;

      const price = result.regularMarketPrice;
      const priceToBook = result.priceToBook;

      const dividendsData = result.dividendsData;
      const lastCashDividend = Array.isArray(dividendsData?.cashDividends)
        ? dividendsData.cashDividends[0]
        : undefined;

      let dividendYield: string | null = null;

      if (price && lastCashDividend?.rate) {
        const monthlyYield = (lastCashDividend.rate / price) * 100;
        dividendYield = `${monthlyYield.toFixed(2)}% a.m.`;
      }

      const pvp =
        typeof priceToBook === "number" ? priceToBook.toFixed(2) : null;

      const segment: string | null =
        result.sector ??
        result.industry ??
        null;

      const fields: PartialFiiDataFields = {
        ticker: normalized,
        dividendYield,
        pvp,
        segment,
        sourceTag: "brapi",
      };

      return fields;
    } catch (error) {
      console.error("[BrapiFiiProvider] error:", error);
      return null;
    }
  }
}

