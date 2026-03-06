import { Request, Response } from "express";
import { analyzeRequestSchema } from "../schemas/analyze.schema";
import { FiiDataService } from "../services/fiiData.service";
import { AIAnalysisService } from "../services/aiAnalysis.service";

const fiiDataService = new FiiDataService();
const aiAnalysisService = new AIAnalysisService();

export async function analyzeFiiController(req: Request, res: Response) {
    const parsed = analyzeRequestSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            error: "VALIDATION_ERROR",
            message: "Payload inválido",
            details: parsed.error.flatten(),
        });
    }

    try {
        const { ticker } = parsed.data;
        
        const fiiData = await fiiDataService.getByTicker(ticker);
        const analysis = await aiAnalysisService.analyze(fiiData);

        return res.json({
            ticker,
            ...analysis
        });
    } catch (error) {
        console.error("[analyzeFiiController] error: ", error);

        return res.status(500).json({
            error: "INTERNAL_SERVER_ERROR",
            message: "Não foi possível analisar o FII neste momento."
        });
    }
}