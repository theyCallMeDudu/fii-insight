import { FiiType } from "../services/data-providers/types/fiiData.types";
import { PartialFiiDataFields } from "../services/data-providers/types/provider.types";
import {
  inferFiiType as inferFiiTypeInternal,
  inferSegment as inferSegmentInternal,
} from "../services/data-providers/utils/fiiInference.utils";

export { FiiType };

export function inferFiiTypeFromSources(
  sources: PartialFiiDataFields[],
): FiiType {
  return inferFiiTypeInternal(sources);
}

export function inferSegmentFromSources(
  sources: PartialFiiDataFields[],
): string | null {
  return inferSegmentInternal(sources);
}

