import { FiiData } from "../types/fiiData.types";
import { FiiDataProvider, PartialFiiDataFields } from "../types/provider.types";
import {
  buildSourceTag,
  normalizeDividendYield,
  normalizePvp,
  normalizeVacancy,
} from "../utils/fiiNormalization.utils";
import { inferFiiType, inferSegment } from "../utils/fiiInference.utils";

export class FiiDataAggregatorService {
  constructor(
    private readonly providers: FiiDataProvider[],
  ) {}

  async getFiiData(ticker: string): Promise<FiiData> {
    const normalizedTicker = ticker.trim().toUpperCase();

    const results = await Promise.all(
      this.providers.map(async (p) => {
        try {
          const data = await p.getData(normalizedTicker);
          return data ?? null;
        } catch (error) {
          console.error(
            "[FiiDataAggregatorService] provider error:",
            p.name,
            error,
          );
          return null;
        }
      }),
    );

    const usable: PartialFiiDataFields[] = results.filter(
      (r): r is PartialFiiDataFields => r !== null,
    );

    if (usable.length === 0) {
      return {
        ticker: normalizedTicker,
        type: "desconhecido",
        segment: null,
        dividendYield: null,
        pvp: null,
        vacancy: null,
        manager: null,
        assetCount: null,
        source: "fallback",
      };
    }

    const type = inferFiiType(usable);
    const segment =
      usable.find((u) => u.segment)?.segment ?? inferSegment(usable);

    const dividendYieldRaw =
      usable.find((u) => u.sourceTag === "fundamentus")?.dividendYield ??
      usable.find((u) => u.sourceTag === "brapi")?.dividendYield ??
      usable.find((u) => u.sourceTag === "okanebox")?.dividendYield ??
      usable.find((u) => u.sourceTag === "local")?.dividendYield ??
      null;

    const pvpRaw =
      usable.find((u) => u.sourceTag === "fundamentus")?.pvp ??
      usable.find((u) => u.sourceTag === "brapi")?.pvp ??
      usable.find((u) => u.sourceTag === "okanebox")?.pvp ??
      usable.find((u) => u.sourceTag === "local")?.pvp ??
      null;

    const vacancyRaw =
      usable.find((u) => u.sourceTag === "okanebox")?.vacancy ??
      usable.find((u) => u.sourceTag === "local")?.vacancy ??
      null;

    const manager =
      usable.find((u) => u.manager)?.manager ?? null;

    const assetCount =
      usable.find((u) => typeof u.assetCount === "number")?.assetCount ?? null;

    const source = buildSourceTag(usable.map((u) => u.sourceTag));

    const dividendYield = normalizeDividendYield(dividendYieldRaw);
    const pvp = normalizePvp(pvpRaw);
    const vacancy = normalizeVacancy(vacancyRaw, type);

    const fiiData: FiiData = {
      ticker: normalizedTicker,
      type,
      segment,
      dividendYield,
      pvp,
      vacancy,
      manager,
      assetCount,
      source,
    };

    return fiiData;
  }
}

