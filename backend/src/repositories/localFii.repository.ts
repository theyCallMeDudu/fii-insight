import { getLocalFiiCatalogItem, LocalFiiCatalogItem } from "../data/fiis/fiiCatalog";

export class LocalFiiRepository {
  findByTicker(ticker: string): LocalFiiCatalogItem | null {
    return getLocalFiiCatalogItem(ticker);
  }
}

