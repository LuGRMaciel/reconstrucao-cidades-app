
# Reconstrução Cidades — App Mobile + API (Exemplo de Repositório)

Aplicativo **mobile** (Expo/React Native) com **API Node.js/Express + SQLite** para facilitar a comunicação e a organização de recursos na **reconstrução de cidades afetadas por fortes chuvas**.

> **Funcionalidades obrigatórias incluídas:**
>
> - ✅ Cadastro de **locais afetados**
> - ✅ **Solicitação** e **oferta** de ajuda (materiais, voluntários)
> - ✅ Exibição de **informações públicas** (previsão do tempo) via integração com **API pública (Open‑Meteo)**
> - ✅ **Painel** simples para acompanhar **status da solicitação**
> - ✅ **Testes automatizados** (frontend e backend) com **alvo de cobertura ≥ 80%**

## Visão geral da arquitetura

```text
reconstrucao-cidades-app/
├─ mobile/          # App Expo/React Native (TS)
├─ server/          # API Express (TS) + SQLite
├─ .github/workflows/ci.yml   # Pipeline CI com Jest + coverage
├─ LICENSE (MIT)
└─ README.md
```

- O **mobile** consome a API para cadastrar locais, criar solicitações/ofertas e listar o painel do usuário.
- A API expõe `/public/weather` que consulta **Open‑Meteo** (sem chave) para previsão.
- Os **testes** usam Jest (frontend e backend), Supertest (API) e react-native-testing-library.

## Requisitos

- **Node.js** 18+ e **npm** 9+
- **Git**

> Dica: use **nvm** para gerenciar versões do Node.

## Como executar

### 1) API (server)

```bash
cd server
npm ci
npm run dev
```

- Servirá em `http://localhost:4000`
- Endpoints principais:
  - `POST /locations` — cria local afetado
  - `GET /locations`
  - `POST /requests` — cria solicitação de ajuda
  - `GET /requests?status=OPEN|IN_PROGRESS|DONE&createdBy=...`
  - `PATCH /requests/:id/status` — atualiza status da solicitação
  - `POST /offers` e `GET /offers`
  - `GET /public/weather?lat=-30.03&lon=-51.23` — previsão (Open‑Meteo)

### 2) App Mobile (Expo)

```bash
cd mobile
npm ci
npm start
```

- No primeiro uso, instale o **Expo Go** no iOS/Android para visualizar pelo QR Code.
- Ajuste a variável `API_URL` em `mobile/src/config.ts` caso rode a API em outro host.

## Testes e cobertura (≥ 80%)

- **Backend:**

```bash
cd server
npm test
```

- **Frontend:**

```bash
cd mobile
npm test
```

Cobertura mínima configurada via `coverageThreshold` no Jest.

## Deploy (opcional, camadas grátis)

- **API (server):**
  - [Render](https://render.com) / [Railway](https://railway.app) / [Fly.io](https://fly.io) — planos gratuitos limitados
  - **Banco**: manter **SQLite** (arquivo) ou migrar para **Supabase Postgres** (free tier)
- **Mobile:**
  - Publicação com **Expo EAS** (plano gratuito para builds locais) e lojas **Google Play / App Store**

## Ferramentas sugeridas (free-friendly)

### Mobile
- **Expo (React Native + TypeScript)** — desenvolvimento rápido, builds locais, OTA updates
- **react-native-paper** — UI pronta e acessível
- **Axios** — HTTP client
- **react-query** — cache e estados de requisição (opcional)
- **jest-expo** + **@testing-library/react-native** — testes e cobertura

### Backend
- **Node.js + Express (TypeScript)** — API simples e produtiva
- **SQLite** (arquivo) — zero-config local; migre p/ **Supabase Postgres** no deploy
- **Jest + Supertest** — testes de integração com cobertura

### Observabilidade e CI/CD
- **GitHub Actions** — CI gratuito p/ repositórios públicos
- **Codecov** — relatório de cobertura (grátis p/ públicos)

### APIs públicas
- **Open‑Meteo** (sem chave) — previsão do tempo: https://open-meteo.com/
  - Endpoint usado no projeto: `/v1/forecast?latitude={lat}&longitude={lon}&hourly=temperature_2m,precipitation_probability`

> ⚠️ Você pode plugar outros provedores (p.ex. **OpenWeatherMap**) criando um adaptador em `server/src/services/weather.ts`.

## Roadmap sugerido

- [ ] Geolocalização e mapa (OpenStreetMap/Leaflet via WebView ou react-native-maps)
- [ ] Upload de fotos (e.g., Supabase Storage)
- [ ] Autenticação (Supabase Auth / Firebase Auth)
- [ ] Moderação (palavras proibidas, foto obrigatória)
- [ ] Web admin (Next.js) p/ triagem e priorização

---

## Licença

[MIT](./LICENSE)
