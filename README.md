# Subsea Intelligence Control Tower

A React + TypeScript product prototype for Telin's proposed **Intelligent Corridor Portfolio Management** layer.

## What the prototype demonstrates

- Interactive corridor prioritisation across demand, diversity and return
- Hyperscaler, AI inference and NeoCloud demand context
- Early warning on delivery, supplier, permit, regulatory and geopolitical signals
- Commercial readiness before RFS
- Executive scenario recommendations, work queues and decision gates
- Original illustrative cable-corridor visual (not an authoritative route map)

Everything is dummy data. The data structure is intentionally separated in `public/app.js`, making it straightforward to replace with APIs, project-management feeds, commercial pipeline data and external-risk signals later.

## Run locally

```bash
npm install
npm run dev
```

Open the local address shown by Vite (normally http://localhost:5173).

## Suggested real-data evolution

1. Project plan: CIF, RFS, contract, permits and supply milestones.
2. Commercial: anchor tenants, capacity reservation, pricing and pipeline probability.
3. Financial: CAPEX, committed revenue, IRR and cost-to-serve.
4. External early signals: supplier status, marine/route notices, regulation and geopolitical risk.
5. Decision layer: scenario choices, recommended actions, decision owner and escalation status.
