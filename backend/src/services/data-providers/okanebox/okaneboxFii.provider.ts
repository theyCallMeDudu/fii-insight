import axios from "axios";
import { FiiDataProvider, PartialFiiDataFields } from "../types/provider.types";
import { FiiType } from "../types/fiiData.types";

const OKANEBOX_BASE_URL = process.env.OKANEBOX_BASE_URL;
const OKANEBOX_API_KEY = process.env.OKANEBOX_API_KEY;

// Ajustar estes tipos quando o contrato real estiver fechado
interface OkaneboxDemonstrativosResponse {
  ticker: string;
  segmento?: string;
  gestor?: string;
  quantidade_ativos?: number;
  tipo?: string;
  vacancia?: number | string | null;
  pvp?: number | string | null;
}

interface OkaneboxProventosResponse {
  dividendos?: Array<{
    data_pagamento: string;
    valor_cota: number;
    yield_mes?: number;
  }>;
}

export class OkaneboxFiiProvider implements FiiDataProvider {
  public readonly name = "OkaneboxFiiProvider";

  async getData(ticker: string): Promise<PartialFiiDataFields | null> {
    if (!OKANEBOX_BASE_URL || !OKANEBOX_API_KEY) {
      return null;
    }

    const normalized = ticker.trim().toUpperCase();

    try {
      const [demonstrativosRes, proventosRes] = await Promise.all([
        axios.get<OkaneboxDemonstrativosResponse>(
          `${OKANEBOX_BASE_URL}/fii/demonstrativos/${normalized}`,
          { headers: { Authorization: `Bearer ${OKANEBOX_API_KEY}` } },
        ),
        axios.get<OkaneboxProventosResponse>(
          `${OKANEBOX_BASE_URL}/fii/proventos/${normalized}`,
          { headers: { Authorization: `Bearer ${OKANEBOX_API_KEY}` } },
        ),
      ]);

      const demo = demonstrativosRes.data;
      const prov = proventosRes.data;

      let type: FiiType | undefined;
      if (demo.tipo === "tijolo" || demo.tipo === "papel" || demo.tipo === "hibrido") {
        type = demo.tipo;
      }

      let dividendYield: string | null = null;
      if (prov?.dividendos && prov.dividendos.length > 0) {
        const last = prov.dividendos[0];
        if (typeof last.yield_mes === "number") {
          const pct = last.yield_mes <= 1 ? last.yield_mes * 100 : last.yield_mes;
          dividendYield = `${pct.toFixed(2)}% a.m.`;
        }
      }

      const fields: PartialFiiDataFields = {
        ticker: normalized,
        type,
        segment: demo.segmento ?? null,
        manager: demo.gestor ?? null,
        assetCount: demo.quantidade_ativos ?? null,
        dividendYield,
        vacancy: demo.vacancia ?? null,
        pvp: demo.pvp ?? null,
        sourceTag: "okanebox",
      };

      return fields;
    } catch (error) {
      console.error("[OkaneboxFiiProvider] error:", error);
      return null;
    }
  }
}

