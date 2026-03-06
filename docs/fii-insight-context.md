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
Angular (not implemented yet)

## AI
OpenAI API

---

# Current Project Status

The backend MVP is functional.

Implemented endpoints:

GET /health  
POST /api/analyze

The system currently:

- validates ticker using regex + Zod
- uses layered architecture (routes / controllers / services)
- uses a mock FiiDataService
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

## Test the endpoint

curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"ticker":"HGLG11"}' | jq

---

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
    │   └── analysisCache.service.ts
    └── utils
        └── buildAnalysisPrompt.ts

---

# Environment Variables

PORT=3000
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
OPENAI_MAX_TOKENS=500
OPENAI_TEMPERATURE=0.3

---

# Engineering Rules

- Never expose OPENAI_API_KEY to frontend
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
- Mock FiiDataService implemented
- OpenAI integration implemented
- Structured output using json_schema
- Retry logic implemented
- Cache layer implemented
- Model configuration externalized via .env

---

# Planned Next Steps

## Backend Improvements

1. Improve FiiDataService with realistic data for popular tickers
2. Add rate limiting to protect OpenAI credits
3. Improve error handling for OpenAI failures
4. Expand API documentation

## Frontend (Angular)

1. Create Angular project
2. Create main analysis page
3. Implement ticker input form
4. Integrate with /api/analyze
5. Display analysis results in UI cards

## Product Evolution

1. FII comparison tool
2. Saved analyses
3. Portfolio explanation using AI
4. Upload and interpret FII reports

---

# Immediate Next Task

Improve src/services/fiiData.service.ts to provide more realistic data per ticker.
