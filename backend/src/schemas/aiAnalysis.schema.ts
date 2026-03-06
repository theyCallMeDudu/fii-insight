import z from "zod";

export const aiAnalysisResponseSchema = z.object({
    explicacao_simples: z.string(),
    como_gera_renda: z.string(),
    pontos_positivos: z.array(z.string()),
    pontos_de_atencao: z.array(z.string()),
    perfil_indicado: z.string(),
    nivel_risco_estimado: z.string()
});

export type AIAnalysisResponse = z.infer<typeof aiAnalysisResponseSchema>;