import { FiiData, FiiType } from "./data-providers/types/fiiData.types";
import { FiiDataAggregatorService } from "./data-providers/aggregator/fiiDataAggregator.service";
import { MockFiiProvider } from "./data-providers/mock/mockFii.provider";
import { OkaneboxFiiProvider } from "./data-providers/okanebox/okaneboxFii.provider";
import { FundamentusFiiProvider } from "./data-providers/fundamentus/fundamentusFii.provider";
import { BrapiFiiProvider } from "./data-providers/brapi/brapiFii.provider";

const aggregator = new FiiDataAggregatorService([
    new MockFiiProvider(),
    new OkaneboxFiiProvider(),
    new FundamentusFiiProvider(),
    new BrapiFiiProvider(),
]);

export { FiiData, FiiType };

export class FiiDataService {
    async getByTicker(ticker: string): Promise<FiiData> {
        return aggregator.getFiiData(ticker);
    }
}
