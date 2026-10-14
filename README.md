# FinFair — Plan with clarity

FinFair is an early-stage, student-built affordability simulator to help prospective university students reason about tuition, housing, living expenses, and unexpected costs. This repository contains a prototype, not a finished financial guidance service.

## Features
- Instant monthly income / cost calculator
- Annual tuition converted into a monthly *planning equivalent*
- One-time surprise cost scenario
- Compare two different housing costs
- Compare TWO universities using annual tuition & fees, annual scholarships/grants, monthly housing, and monthly living costs
- Toggle comparison totals between USD and BDT using an editable (NOT live) exchange rate
- View a side-by-side estimated annual cost, 12-month equivalent, and simple visual comparison
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

## What changed in Version 2

The new university comparison is in the `#universities` section of `index.html`. `styles.css` controls the design, `app.js` listens for changes and updates results, and `calculations.mjs` holds the tested math. No backend, paid API, or private student financial information is required.

### University comparison formula (USD)

```
annual estimated cost = max(0, annual tuition & fees + 12 × (monthly housing + monthly living costs) − annual aid)
```

The simplified scholarship deduction could cover non-tuition costs in this prototype; actual aid may have restrictions. A negative net total is clamped to zero. The **monthly equivalent** is annual net cost / 12; this is **not** the university's billing schedule.

### Currency toggle

```
converted BDT total = annual USD total × user-entered BDT per USD
```

The default **120 BDT per USD is an illustrative placeholder, not a current or live exchange rate**. Change it manually based on a reliable source. The input fields stay in USD even when totals are shown in BDT. Exchange fees and currency fluctuations are excluded.

### Sample check

- University A: $30,000 tuition + 12 × ($1,000 housing + $500 living) − $10,000 scholarship = **$38,000/year**.
- University B: $40,000 tuition + 12 × ($1,200 housing + $600 living) − $25,000 scholarship = **$36,600/year**.
- University B is cheaper by **$1,400 per year** with these *fictional* inputs.
- With illustrative rate of 120 BDT/USD: A = ৳4,560,000 and B = ৳4,392,000.

## Model and assumptions

Monthly expenses = housing + other monthly living expenses + annual out-of-pocket tuition / 12.

Monthly balance = monthly take-home income − monthly expenses.

Unexpected-cost balance = monthly balance − one-time unexpected cost.

Plan B is the same as Plan A except for housing cost. The model is not a full college cost calculator: it does not represent tuition payment schedules, financial aid calculations, loans, taxes, insurance, or debt interest. Numbers entered are retained only in the page state; there is no backend or analytics.

## Student learning challenges

Try completing these yourself and save your results in GitHub commits:
1. Change the example values in `universityDefaults` in `app.js` and predict the new totals before refreshing.
2. Explain in your own words why monthly costs are multiplied by 12 and why the currency switch does not change the USD inputs.
3. In `calculations.test.mjs`, write a new test for your own example and run `node --test calculations.test.mjs`.
4. Record a bug you find, how you reproduced it, and what code change fixed it.

## Roadmap and genuine user research
- [ ] Interview 3–5 students about budgeting challenges.
- [ ] Record and implement feedback in issues/commits.
- [ ] Run usability tests with 10 volunteers.
- [ ] Revise the model based on observed needs and limitations.
- [ ] Publish a short, evidence-based impact report.

## Authorship and integrity

This codebase, including the Version 2 comparison feature, was generated with AI assistance as a starter prototype. Review each function, change the product based on your own research, and accurately describe your personal contributions in applications. Do not claim invented users, metrics, or independently authored code.

## Privacy

Do not ask participants to enter real account numbers, passwords, or financial identifiers. Use estimates or fictional values during tests.
