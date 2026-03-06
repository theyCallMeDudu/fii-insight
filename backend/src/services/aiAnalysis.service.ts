import OpenAI from "openai";
import { FiiData } from "./fiiData.service";
import {
  aiAnalysisResponseSchema,
  AIAnalysisResponse,
} from "../schemas/aiAnalysis.schema";
import { buildAnalysisPrompt } from "../utils/buildAnalysisPrompt";
import { AnalysisCacheService } from "./analysisCache.service";

const MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const MAX_TOKENS = Number(process.env.OPENAI_MAX_TOKENS);
const TEMPERATURE = Number(process.env.OPENAI_TEMPERATURE);

const analysisCache = new AnalysisCacheService();

export class AIAnalysisService {
  private client: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("OPENAI_API_KEY não configurada");
    }

    this.client = new OpenAI({ apiKey });
  }

  async analyze(fiiData: FiiData): Promise<AIAnalysisResponse> {
    const cacheKey = fiiData.ticker;
    const cached = analysisCache.get(cacheKey);

    if (cached) {
      console.log("[AIAnalysisService] cache hit:", cacheKey);
      return cached;
    }

    const analysis = await this.tryAnalyze(fiiData, 0);
    analysisCache.set(cacheKey, analysis);

    return analysis;
  }

  private async tryAnalyze(
    fiiData: FiiData,
    attempt: number
  ): Promise<AIAnalysisResponse> {
    const prompt = buildAnalysisPrompt(fiiData);

    console.log("[AIAnalysisService] model:", MODEL);
    console.log("[AIAnalysisService] analyzing ticker:", fiiData.ticker);

    const response = await this.client.chat.completions.create({
      model: MODEL,
      temperature: TEMPERATURE,
      max_tokens: MAX_TOKENS,
      messages: [
        {
          role: "system",
          content:
            "Você é um analista especializado em FIIs brasileiros e deve responder apenas com JSON válido, sem markdown e sem texto extra.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "fii_analysis",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              explicacao_simples: {
                type: "string",
              },
              como_gera_renda: {
                type: "string",
              },
              pontos_positivos: {
                type: "array",
                items: { type: "string" },
              },
              pontos_de_atencao: {
                type: "array",
                items: { type: "string" },
              },
              perfil_indicado: {
                type: "string",
              },
              nivel_risco_estimado: {
                type: "string",
              },
            },
            required: [
              "explicacao_simples",
              "como_gera_renda",
              "pontos_positivos",
              "pontos_de_atencao",
              "perfil_indicado",
              "nivel_risco_estimado",
            ],
          },
        },
      },
    });

    const content = response.choices[0]?.message?.content;

    console.log("[AIAnalysisService] raw response:", content);

    if (!content) {
      throw new Error("Resposta vazia da OpenAI");
    }

    try {
      const parsedJson = JSON.parse(content);
      return aiAnalysisResponseSchema.parse(parsedJson);
    } catch (error) {
      console.error("[AIAnalysisService] invalid structured response:", content);

      if (attempt < 1) {
        console.log("[AIAnalysisService] retrying...");
        return this.tryAnalyze(fiiData, attempt + 1);
      }

      throw new Error("Falha ao validar JSON retornado pela OpenAI");
    }
  }
}