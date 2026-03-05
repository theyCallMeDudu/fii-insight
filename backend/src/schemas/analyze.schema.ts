import { z } from "zod";

export const tickerRegex = /^[A-Z]{4}[0-9]{2}$/;

export const analyzeRequestSchema = z.object({
    ticker: z
        .string()
        .trim()
        .toUpperCase()
        .regex(tickerRegex, "Ticker inválido. Use o formato ABCD12."),
});

export type AnalyzeRequestDTO = z.infer<typeof analyzeRequestSchema>;