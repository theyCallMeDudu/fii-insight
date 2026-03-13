# FII Insight — Project Context

## Objective
FII Insight is a web application that analyzes Brazilian Real Estate Funds (FIIs) using AI to transform financial data into simple explanations for investors.

The goal of the MVP is to allow a user to input a FII ticker and receive an AI‑generated analysis.

---

# Technology Stack

## Backend
Node.js  
Express  
TypeScript  
Zod (validation)

## Frontend
Angular (initial structure implemented, consuming the existing backend)

## AI
OpenAI API (via json_schema structured outputs)

---

# Current Project Status

The backend MVP is functional.

Implemented endpoints:

GET /health  
POST /api/analyze

The system currently:

- validates ticker using regex + Zod  
- uses layered architecture (routes / controllers / services)  
- uses a data aggregation layer for FIIs composed of multiple providers (local catalog, Okanebox, Fundamentus, BRAPI), combined by a central aggregator service  
- maintains a local, structured FII catalog (fallback) with several popular FIIs of different types (tijolo, papel, híbridos/FOFs), including tickers like HGLG11, XPLG11, BTLG11, KNRI11, VISC11, XPML11, HSML11, PVBI11, KNIP11, KNCR11, MXRF11, CPTS11, RBRR11, VGIR11, RECR11, IRDM11, BCFF11, HFOF11, RBRF11, KFOF11 and special test cases TEST11 and MIXD11  
- integrates with OpenAI GPT API  
- reads OpenAI configuration from .env  
- validates AI responses using Zod  
- uses structured outputs (json_schema)  
- retries once if the AI response is invalid  
- caches analysis results in memory  
- formats JSON responses for easier terminal reading

---

# Current MVP Feature

## Endpoint

POST /api/analyze

## Request

{
  "ticker": "HGLG11"
}

## Response

{
  "ticker": "HGLG11",
  "explicacao_simples": "...",
  "como_gera_renda": "...",
  "pontos_positivos": [],
  "pontos_de_atencao": [],
  "perfil_indicado": "...",
  "nivel_risco_estimado": "..."
}

---

# How to Run the Project

## Start the backend

npm run dev

## Start the frontend

From the `frontend/` directory:

- install dependencies (first time): `npm install`  
- start the Angular dev server: `npm start` (or `ng serve`)

The frontend runs by default on `http://localhost:4200` and calls the backend on `http://localhost:3000/api`.

## Test the endpoint (with aggregated data providers)

1. Ensure you have a `.env` file in `backend/` with at least:

PORT=3000
OPENAI_API_KEY=your_openai_key_here
OPENAI_MODEL=gpt-4.1-mini
OPENAI_MAX_TOKENS=500
OPENAI_TEMPERATURE=0.3
BRAPI_BASE_URL=https://brapi.dev
BRAPI_TOKEN=your_brapi_token_here
# Optional future external data providers
OKANEBOX_BASE_URL=https://api.okanebox.com.br
OKANEBOX_API_KEY=your_okanebox_key_here
FUNDAMENTUS_BASE_URL=https://www.fundamentus.com.br

2. Start the backend:

`npm run dev`

3. Test the analysis endpoint using:

- Using a ticker with enriched mock data (predictable context):

curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"ticker":"HGLG11"}' | jq

- Using another ticker with enriched mock data:

curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"ticker":"KNIP11"}' | jq

In these cases the system will prioritise the mock provider, returning a stable and predictable dataset, useful for validating the AI analysis contract.

- Using a ticker **not** present in the mock table (to exercise external providers and fallback behaviour):

curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"ticker":"ABCP11"}' | jq

For this last case the backend will try to aggregate data from the configured providers in order (Okanebox, Fundamentus, BRAPI). If none of them provides useful data, the service falls back to a generic FII structure, keeping the external API contract unchanged.

---

# Project Folder Structure

fii-insight
├── backend
│   └── src
│       ├── app.ts
│       ├── server.ts
│       ├── controllers
│       │   └── analyzeFii.controller.ts
│       ├── routes
│       │   └── analyze.routes.ts
│       ├── schemas
│       │   ├── analyze.schema.ts
│       │   └── aiAnalysis.schema.ts
│       ├── services
│       │   ├── fiiData.service.ts
│       │   ├── aiAnalysis.service.ts
│       │   └── analysisCache.service.ts
│       └── utils
│           └── buildAnalysisPrompt.ts
└── docs
    ├── fii-insight-context.md
    └── fii-insight-api-routes.md

# Backend Structure

backend
└── src
    ├── app.ts
    ├── server.ts
    ├── controllers
    │   └── analyzeFii.controller.ts
    ├── routes
    │   └── analyze.routes.ts
    ├── schemas
    │   ├── analyze.schema.ts
    │   └── aiAnalysis.schema.ts
    ├── services
    │   ├── fiiData.service.ts
    │   ├── aiAnalysis.service.ts
    │   ├── analysisCache.service.ts
    │   └── data-providers
    │       ├── types
    │       │   ├── fiiData.types.ts
    │       │   └── provider.types.ts
    │       ├── utils
    │       │   ├── fiiInference.utils.ts
    │       │   └── fiiNormalization.utils.ts
    │       ├── mock
    │       │   └── mockFii.provider.ts
    │       ├── okanebox
    │       │   └── okaneboxFii.provider.ts
    │       ├── fundamentus
    │       │   └── fundamentusFii.provider.ts
    │       ├── brapi
    │       │   └── brapiFii.provider.ts
    │       └── aggregator
    │           └── fiiDataAggregator.service.ts
    └── utils
        └── buildAnalysisPrompt.ts

Documentation files:

- docs/fii-insight-context.md (this file, main project overview)
- docs/fii-insight-api-routes.md (API routes and contracts)

---

# Environment Variables

PORT=3000
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
OPENAI_MAX_TOKENS=500
OPENAI_TEMPERATURE=0.3
BRAPI_BASE_URL=https://brapi.dev
BRAPI_TOKEN=your_brapi_token_here
OKANEBOX_BASE_URL=https://api.okanebox.com.br
OKANEBOX_API_KEY=your_okanebox_key_here
FUNDAMENTUS_BASE_URL=https://www.fundamentus.com.br

---

# Engineering Rules

- Never expose OPENAI_API_KEY to frontend
- Never expose BRAPI_TOKEN to frontend
- Never expose OKANEBOX_API_KEY to frontend
- Always validate AI output
- Prefer configuration via .env
- Maintain separation of concerns
- Controllers should remain thin
- Services contain business logic

---

# Completed Work

- Git repository created
- Node + Express + TypeScript backend configured
- Healthcheck endpoint implemented
- Input validation using Zod
- Controller for FII analysis created
- Mock FiiDataService implemented, now enriched with realistic data for some popular tickers (HGLG11, MXRF11, KNRI11)
- OpenAI integration implemented
- Structured output using json_schema
- Retry logic implemented
- Cache layer implemented
- Model configuration externalized via .env

---

# Next Steps Roadmap

This section is the single source of truth for the next steps of the project.  
Always update it when you finish an implementation so the next point of entry is clear.

## Backend Improvements

1. Expand FiiDataService with more realistic data for additional popular tickers and, in the future, replace mocks with real data sources (scraping/API).
2. Add more robust error handling and monitoring around OpenAI failures (network issues, timeouts, invalid responses).
3. Expand API documentation as new endpoints and behaviors are introduced.

## Frontend (Angular)

1. Create Angular project.
2. Create main analysis page.
3. Implement ticker input form.
4. Integrate with /api/analyze.
5. Display analysis results in UI cards.

## Product Evolution

1. FII comparison tool.
2. Saved analyses.
3. Portfolio explanation using AI.
4. Upload and interpret FII reports.
