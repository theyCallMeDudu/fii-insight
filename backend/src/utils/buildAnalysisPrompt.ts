import { FiiData } from "../services/fiiData.service";

export function buildAnalysisPrompt(fiiData: FiiData): string {
    return `
Analise os dados do fundo imobiliário abaixo e retorne exclusivamente um JSON válido.

Ticker: ${fiiData.ticker},
Tipo: ${fiiData.type},
Segmento: ${fiiData.segment},
Dividend Yield: ${fiiData.dividendYield ?? "não informado"},
P/VP: ${fiiData.pvp ?? "não informado"},
Vacância: ${fiiData.vacancy ?? "não informado"}

Retorne exatamente neste formato JSON:
{
  "explicacao_simples": "string",
  "como_gera_renda": "string",
  "pontos_positivos": ["string"],
  "pontos_de_atencao": ["string"],
  "perfil_indicado": "string",
  "nivel_risco_estimado": "string"
}

Regras:
- Responda em português do Brasil
- Não escreva nada fora do JSON
- Não use markdown
- Não inclua observações extras
- Use linguagem simples e clara
- Não dê recomendação de compra ou venda
`.trim();
}