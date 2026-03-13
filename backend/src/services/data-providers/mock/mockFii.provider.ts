import { FiiDataProvider, PartialFiiDataFields } from "../types/provider.types";
import {
  getLocalFiiCatalogItem,
  LocalFiiCatalogItem,
} from "../../../data/fiis/fiiCatalog";

export class MockFiiProvider implements FiiDataProvider {
  public readonly name = "MockFiiProvider";

  async getData(ticker: string): Promise<PartialFiiDataFields | null> {
    const item: LocalFiiCatalogItem | null = getLocalFiiCatalogItem(ticker);
    if (!item) return null;

    return {
      ticker: item.ticker,
      type: item.type,
      segment: item.segment,
      dividendYield: item.dividendYield,
      pvp: item.pvp,
      vacancy: item.vacancy,
      manager: item.manager,
      assetCount: item.assetCount,
      sourceTag: "local",
    };
  }
}


