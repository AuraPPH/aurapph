# AuraPPH — Project Website

**Mothers don't die from lack of care. They die from a 50% guess.**

AuraPPH is a free, fully offline Android app in development that estimates postpartum haemorrhage (PPH) blood loss from a photo of a used maternity pad — for nurses and ASHA/ANM workers in low-resource settings. This repo is its project website: the problem, the method, the validation plan, an interactive prototype simulator, and (after validation) the APK download.

Built for **Health Hackathon 3.0 — VIT Bhopal × Johns Hopkins University, Jan 27–29, 2027**.
Team: Shagun (Lead) · Dhyey Patel · Kislay Kumar · Snehil Sahay · Kartikey Singh

## The method — TRIVENI

Three streams converge into one output: a blood-loss **range** + one of four alert states (**BLUE** low-so-far / **AMBER** / **RED** / **DARK RED** — there is deliberately no "safe" state) + the next action.

1. **OPTICS** — channel-ratio spectroscopy indices from a flash / no-flash photo pair.
2. **AMOUNT** — stain area × penetration × lab calibration tables, plus a resonance-mass research arm.
3. **CLINICAL LEDGER** — deterministic rules + vitals; every pad is one ledger entry, escalation is sticky, deterioration overrides any photo.

Zero AI models. Zero servers. The app ships without the INTERNET permission — photos are processed in memory on the phone and deleted.

## Status (honest, by design)

| Item | Status |
|---|---|
| App design + algorithm spec | Done |
| Android app | In development |
| Bench validation | Planned |
| Clinical testing | Not started |
| APK download | Not available yet |

Everything on the site is a labelled placeholder or illustrative mock-up until bench validation exists. No results are published before they are measured (gravimetric weighing as primary ground truth, alkaline hematin lab test on a subset, blinded operator; headline metric = sensitivity at 500 mL).

## Tech

React + TypeScript + Vite + Tailwind CSS v4. Flat Swiss clinical-industrial design system (canvas `#F4F2EC`, hairline grid, Newsreader / IBM Plex Sans / IBM Plex Mono). No gradients, no stock photos, no external images.

The design was produced by a four-model cross-examination (ChatGPT, Gemini, Claude, GPT-6 Luna rated each other's blueprints); the winning direction (Gemini Hydrogen's Swiss spec-sheet design + Luna's honesty layer + Claude's interactions) was built via Google AI Studio (Gemini 4 Neon) from a merged super-prompt.

## Run locally

```bash
npm install --legacy-peer-deps   # the AI Studio export pins an esbuild version Vite 8 flags as a peer conflict
npm run dev                       # http://localhost:3000
npm run build                     # production build (verified)
```

AI Studio source app: https://aistudio.google.com/apps/70b40759-e940-48be-816d-a25edaca5f15

---

*Student research prototype. Not a certified medical device. Does not replace clinical judgement.*
*Sources: WHO PPH fact sheet · E-MOTIVE trial, NEJM 2023 · SRS 2020–22 MMR bulletin.*
