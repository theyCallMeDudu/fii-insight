# FII Insight — Project Context

## Objetivo
Aplicação web que analisa FIIs usando IA.

## Stack
Backend: Node.js + Express + TypeScript
Frontend: Angular
AI: OpenAI GPT API

## MVP
Funcionalidade inicial:

POST /api/analyze

Request:
{
  "ticker": "HGLG11"
}

Backend deve:
1. Validar ticker via regex
2. Validar via Zod
3. Chamar FiiDataService (mock)
4. Retornar análise mock

Response:
{
  "explicacao_simples": "",
  "como_gera_renda": "",
  "pontos_positivos": [],
  "pontos_de_atencao": [],
  "perfil_indicado": "",
  "nivel_risco_estimado": ""
}

## Estrutura atual do backend

backend/
src/
app.ts
server.ts

GET /health funcionando