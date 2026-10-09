# FinFair — Plan with clarity

FinFair is an early-stage, student-built affordability simulator to help prospective university students reason about tuition, housing, living expenses, and unexpected costs. This repository contains a prototype, not a finished financial guidance service.

## Features
- Instant monthly income / cost calculator
- Annual tuition converted into a monthly *planning equivalent*
- One-time surprise cost scenario
- Compare two different housing costs
- Transparent financial formulas with no external data or API

## Run it locally

Open a terminal in this folder and run:

```bash
python3 -m http.server 8000
```

Visit http://localhost:8000. (A local server is needed because the JavaScript uses ES modules.)

## Run tests

```bash
node --test calculations.test.mjs
```

## Publish on GitHub Pages
1. Sign up at https://github.com and create a public repository named `finfair`.
2. Upload `index.html`, `styles.css`, `app.js`, and `calculations.mjs` (and the README and test file).
3. In your repository open **Settings → Pages** and select **Deploy from a branch**.
4. Choose branch `main`, folder `/ (root)`, and save.
5. Your URL will usually be `https://YOUR-USERNAME.github.io/finfair/` after deployment. Confirm the actual URL shown in GitHub Pages settings.

## Model and assumptions

Monthly expenses = housing + other monthly living expenses + annual out-of-pocket tuition / 12.

Monthly balance = monthly take-home income − monthly expenses.

Unexpected-cost balance = monthly balance − one-time unexpected cost.

Plan B is the same as Plan A except for housing cost. The model is not a full college cost calculator: it does not represent tuition payment schedules, financial aid calculations, loans, taxes, insurance, or debt interest. Numbers entered are retained only in the page state; there is no backend or analytics.

## Roadmap and genuine user research
- [ ] Interview 3–5 students about budgeting challenges.
- [ ] Record and implement feedback in issues/commits.
- [ ] Run usability tests with 10 volunteers.
- [ ] Revise the model based on observed needs and limitations.
- [ ] Publish a short, evidence-based impact report.

## Authorship and integrity

This initial codebase was generated with AI assistance as a starter prototype. Review each function, change the product based on your own research, and accurately describe your personal contributions in applications. Do not claim invented users, metrics, or independently authored code.

## Privacy

Do not ask participants to enter real account numbers, passwords, or financial identifiers. Use estimates or fictional values during tests.
