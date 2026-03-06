# FII Insight — Project Context

## Objetivo
Aplicação web que analisa FIIs (Fundos Imobiliários) brasileiros utilizando IA para transformar dados financeiros complexos em explicações claras e estruturadas.

Este projeto é desenvolvido como um MVP inicial para validar a ideia do produto.


---

# Stack

## Backend
Node.js  
Express  
TypeScript  
Zod (validação)

## Frontend
Angular (ainda não iniciado)

## IA
OpenAI GPT API (integração futura)

---

# Status Atual do Projeto

Backend inicial criado e funcionando.

Endpoint implementado:

POST /api/analyze

Atualmente:
- valida ticker
- retorna análise mock
- ainda NÃO integra IA
- ainda NÃO busca dados reais de FII

---

# Funcionalidade Atual (MVP Fase 1)

### Endpoint

POST /api/analyze

### Request

```json
{
  "ticker": "HGLG11"
}
```

### Response atual:
```
{
  "ticker": "HGLG11",
  "explicacao_simples": "...",
  "como_gera_renda": "...",
  "pontos_positivos": [],
  "pontos_de_atencao": [],
  "perfil_indicado": "...",
  "nivel_risco_estimado": "..."
}
```

### Para testar a requisição:

Num terminal rode:
```npm run dev```

Em outro terminal rode:
```
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"ticker":"HGLG11"}'
```

Deve retornar algo como:
```
  {"ticker":"HGLG11","fii_data":{"ticker":"HGLG11","type":"desconhecido","segment":null,"dividendYield":null,"pvp":null,"vacancy":null,"source":"mock"},"explicacao_simples":"HGLG11 é um FII (exemplo mock) e esta análise ainda não usa IA.","como_gera_renda":"O fundo gera renda principalmente via recebimento de aluguéis/recebíveis (mock).","pontos_positivos":["Gestão parece consistente (mock)","Boa diversificação (mock)"],"pontos_de_atencao":["Dados ainda não foram buscados em fonte pública (mock)","Esta resposta é apenas um placeholder"],"perfil_indicado":"Indicado para quem quer entender FIIs com linguagem simples (mock).","nivel_risco_estimado":"Médio (mock)"}
``

### Etrutura atual do backend
backend
 └ src
    ├ app.ts
    ├ server.ts
    │
    ├ controllers
    │   └ analyzeFii.controller.ts
    │
    ├ routes
    │   └ analyze.routes.ts
    │
    └ schemas
        └ analyze.schema.ts

Próximos Passos Planejados

### Fase 3:
Criar serviço:
AIAnalysisService

Responsável por:
. enviar dados do FII para GPT
. gerar análise estruturada

src/services/aiAnalysis.service.ts
schema Zod da resposta da IA
integração OpenAI com JSON-only + retry 1x

### Fase 4

Integrar OpenAI GPT

Fluxo esperado:
Controller
↓
FiiDataService
↓
AIAnalysisService
↓
Response

### Regras do Projeto

. Nunca expor OPENAI_API_KEY no frontend
. Toda resposta da IA deve ser validada
. Usar Zod para validações
. Seguir arquitetura por camadas:
    . routes
    . controllers
    . services
    . schemas

---

# API_ROUTES.md (documentação das rotas)

Crie:

`docs/API_ROUTES.md`

```md
# FII Insight — API Routes

Documentação das rotas disponíveis no backend.

Base URL local:

http://localhost:3000

---

# Health Check

## GET /health

Verifica se o backend está funcionando.

### Request
GET /health


### Response (200)

```json
{
  "status": "ok"
}

Analyze FII
POST /api/analyze

Analisa um Fundo Imobiliário pelo ticker.

Request
{
  "ticker": "HGLG11"
}
Validação

Ticker deve seguir o formato:

ABCD11

Regex utilizada:

^[A-Z]{4}[0-9]{2}$
Response de Sucesso
{
  "ticker": "HGLG11",
  "explicacao_simples": "HGLG11 é um FII...",
  "como_gera_renda": "O fundo gera renda via aluguéis...",
  "pontos_positivos": [
    "Gestão consistente",
    "Boa diversificação"
  ],
  "pontos_de_atencao": [
    "Resposta mock",
    "Dados ainda não conectados a fonte real"
  ],
  "perfil_indicado": "Investidores buscando renda",
  "nivel_risco_estimado": "Médio"
}
Response de Erro
Ticker inválido

Status: 400

{
  "error": "VALIDATION_ERROR",
  "message": "Payload inválido",
  "details": {}
}
Testes via CURL
Sucesso
curl -X POST http://localhost:3000/api/analyze \
-H "Content-Type: application/json" \
-d '{"ticker":"HGLG11"}'
Erro
curl -X POST http://localhost:3000/api/analyze \
-H "Content-Type: application/json" \
-d '{"ticker":"INVALID"}'
Próximas rotas planejadas
Método	Rota	Descrição
GET	/api/fii/:ticker	Buscar dados estruturados do FII
POST	/api/compare	Comparar dois FIIs
POST	/api/analyze/report	Analisar relatório PDF

Estas rotas ainda não estão implementadas.


---

# Estrutura recomendada do projeto agora

Seu repo deve ficar assim:


fii-insight

backend/
frontend/

docs/
API_ROUTES.md

PROJECT_CONTEXT.md
README.md

---

Sempre que você terminar uma funcionalidade:

Atualize:

PROJECT_CONTEXT.md
API_ROUTES.md

---