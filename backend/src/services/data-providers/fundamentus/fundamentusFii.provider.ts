import axios from "axios";
import { FiiDataProvider, PartialFiiDataFields } from "../types/provider.types";

const FUNDAMENTUS_BASE_URL =
  process.env.FUNDAMENTUS_BASE_URL ?? "https://www.fundamentus.com.br";

export class FundamentusFiiProvider implements FiiDataProvider {
  public readonly name = "FundamentusFiiProvider";

  async getData(ticker: string): Promise<PartialFiiDataFields | null> {
    const normalized = ticker.trim().toUpperCase();

    try {
      const url = `${FUNDAMENTUS_BASE_URL}/fiis_resultado.php?papel=${normalized}`;
      const response = await axios.get<string>(url);

      const html = response.data;
      void html;

      // TODO: parsear HTML para extrair dividendYield, pvp, segmento, etc.
      return null;
    } catch (error) {
      console.error("[FundamentusFiiProvider] error:", error);
      return null;
    }
  }
}

