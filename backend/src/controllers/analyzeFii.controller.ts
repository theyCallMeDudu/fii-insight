import { Request, Response } from "express";
import { analyzeRequestSchema } from "../schemas/analyze.schema";
import { FiiDataService } from "../services/fiiData.service";

const fiiDataService = new FiiDataService();

export async function analyzeFiiController(req: Request, res: Response) {
    const parsed = analyzeRequestSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            error: "VALIDATION_ERROR",
            message: "Payload inválido",
            details: parsed.error.flatten(),
        });
    }

    const { ticker } = parsed.data;

    // 1. Buscar dados estruturados (mock por enquanto)
    const fiiData = await fiiDataService.getByTicker(ticker);

    // 2. Mock de análise (por enquanto)
    return res.json({
        ticker,
        fii_data: fiiData,
        explicacao_simples: `${ticker} é um FII (exemplo mock) e esta análise ainda não usa IA.`,
        como_gera_renda: "O fundo gera renda principalmente via recebimento de aluguéis/recebíveis (mock).",
        pontos_positivos: [
            "Gestão parece consistente (mock)",
            "Boa diversificação (mock)",
        ],
        pontos_de_atencao: [
            "Dados ainda não foram buscados em fonte pública (mock)",
            "Esta resposta é apenas um placeholder",
        ],
        perfil_indicado: "Indicado para quem quer entender FIIs com linguagem simples (mock).",
        nivel_risco_estimado: "Médio (mock)",
    });
}