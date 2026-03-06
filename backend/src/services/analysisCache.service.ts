import { AIAnalysisResponse } from "../schemas/aiAnalysis.schema";

interface CacheEntry {
    value: AIAnalysisResponse;
    expiresAt: number;
}

export class AnalysisCacheService {
    private cache = new Map<string, CacheEntry>();
    private ttlMs: number;

    constructor(ttlMs = 1000 * 60 * 10) {
        this.ttlMs = ttlMs; // 10 minutos
    }

    get(key: string): AIAnalysisResponse | null {
        const entry = this.cache.get(key);

        if (!entry) {
            return null;
        }

        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key);
            return null;
        }

        return entry.value;
    }

    set(key: string, value: AIAnalysisResponse): void {
        this.cache.set(key, {
            value,
            expiresAt: Date.now() + this.ttlMs,
        });
    }
}