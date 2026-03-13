# FII Insight — API Routes

This document describes the current API endpoints available in the FII Insight backend.

---

# Base URL

http://localhost:3000

---

# Health Check

## Endpoint

GET /health

## Description

Simple endpoint used to verify if the backend server is running.

## Example Request

curl http://localhost:3000/health

## Example Response

{
  "status": "ok"
}

---

# Analyze FII

## Endpoint

POST /api/analyze

## Description

Receives a FII ticker and returns an AI-generated analysis.

Internally, this endpoint uses a `FiiDataService` that is backed by a data aggregation layer composed of multiple providers (mock, Okanebox, Fundamentus, BRAPI).  
- For some popular FIIs such as `HGLG11`, `MXRF11`, `KNRI11`, `VISC11`, `XPML11`, `BCFF11` and `KNIP11`, the mock provider returns enriched and predictable data (including manager and asset count), ideal for testing the AI behaviour.  
- For other tickers, the system attempts to combine the available data from the external providers in order of priority per field (type, segment, dividendYield, pvp, vacancy, manager, assetCount).  
- If no provider returns useful information, a generic FII structure is used as fallback.  
- The external request/response contract of this endpoint remains unchanged.

## Request Body

{
  "ticker": "HGLG11"
}

### Validation Rules

- ticker must match regex for Brazilian FIIs
- ticker is required

Regex used for ticker validation:

`^[A-Z]{4}[0-9]{2}$`

---

## Successful Response

{
  "ticker": "HGLG11",
  "explicacao_simples": "Explanation in simple terms.",
  "como_gera_renda": "Description of income generation.",
  "pontos_positivos": [
    "Positive aspect 1",
    "Positive aspect 2"
  ],
  "pontos_de_atencao": [
    "Attention point 1"
  ],
  "perfil_indicado": "Investor profile description",
  "nivel_risco_estimado": "Low | Moderate | High"
}

---

## Validation Error

Status: 400

{
  "error": "VALIDATION_ERROR",
  "message": "Payload inválido"
}

Example:

{
  "ticker": ""
}

---

## Internal Error

Status: 500

{
  "error": "INTERNAL_SERVER_ERROR",
  "message": "Não foi possível analisar o FII neste momento."
}

---

# Future Endpoints (Planned)

GET /api/fii/:ticker
GET /api/compare
POST /api/portfolio/analyze

These endpoints will be implemented in future versions of the product.
