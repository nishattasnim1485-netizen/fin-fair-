# FinFair — Plan with clarity

FinFair is an early-stage, student-built affordability simulator to help prospective university students reason about tuition, housing, living expenses, and unexpected costs. This repository contains a prototype, not a finished financial guidance service.

## Live Website
[Try FinFair — Plan with Clarity](https://nishattasnim1485-netizen.github.io/fin-fair-/)

## Project Portfolio
[Read My FinFair Project Portfolio](PROJECT_PORTFOLIO.md)

[View My Development Journal](DEVELOPMENT_LOG.md)

## Features
- Instant monthly income / cost calculator
- Annual tuition converted into a monthly *planning equivalent*
- One-time surprise cost scenario
- Compare two different housing costs
- Compare TWO universities using annual tuition & fees, annual scholarships/grants, monthly housing, and monthly living costs
- Select input and output currencies (USD, GBP, EUR, CAD, AUD, BDT) with an editable, non-live exchange rate
- View a side-by-side estimated annual cost, 12-month equivalent, and simple visual comparison
- Four-year university cost predictor with editable annual tuition and living-cost increases
- Year-by-year estimates, four-year totals, and shared six-currency controls
- Transparent financial formulas with no external data or API
- Projected annual balance calculator with transparent assumptions about monthly income and expenses


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

### University comparison formula (in the currency entered; USD in the sample)

```
annual estimated cost = max(0, annual tuition & fees + 12 × (monthly housing + monthly living costs) − annual aid)
```

The simplified scholarship deduction could cover non-tuition costs in this prototype; actual aid may have restrictions. A negative net total is clamped to zero. The **monthly equivalent** is annual net cost / 12; this is **not** the university's billing schedule.

### Multi-currency display

Choose an input currency (USD, GBP, EUR, CAD, AUD, or BDT) for **both** university cost entries, then choose the currency for displayed results. The cost formula uses the input currency; only the results are converted:

```
converted displayed total = cost in input currency × chosen output units per input unit
```

FinFair fills in an **illustrative, non-live rate** for the currency pair. The rate can be manually edited, and changing the source-currency selector never converts numbers already entered in the university input fields. For real comparisons, enter researched prices in the same currency as the input selector and verify an up-to-date exchange rate. Actual future exchange rates, fees, scholarship restrictions and other costs are not modeled.

### Sample check

- University A: $30,000 tuition + 12 × ($1,000 housing + $500 living) − $10,000 scholarship = **$38,000/year**.
- University B: $40,000 tuition + 12 × ($1,200 housing + $600 living) − $25,000 scholarship = **$36,600/year**.
- University B is cheaper by **$1,400 per year** with these *fictional* inputs.
- With the illustrative rate of 120 BDT per USD (select USD inputs and BDT output): A = ৳4,560,000 and B = ৳4,392,000.

## What changed in Version 3 — four-year cost scenarios

The new `#four-year` section in `index.html` uses the **same two university inputs** from Version 2. Adjust the annual tuition and living-cost growth percentages. Both universities use the same percentages so you can compare scenarios consistently.

For each university, the cost in year `n` is:

```
Year n cost (USD) = max(0,
  tuition_year1 × (1 + tuition_growth_rate)^(n - 1)
  + 12 × (housing_year1 + living_year1) × (1 + living_growth_rate)^(n - 1)
  - annual_scholarship_year1
)
Four-year total = sum(costs for years 1, 2, 3, and 4)
```

- Year 1 has no increase and matches Version 2 exactly.
- Growth percentages apply once each new year and are **illustrative assumptions, not official tuition projections**.
- Scholarships/grants are assumed to stay the same dollar amount each year; actual aid renewal can vary.
- All four years assume 12 months of living expenses. Financial aid eligibility, travel, insurance, loan interest, taxes, academic program changes, exchange fees, and future exchange rates are omitted.
- The same user-entered selected-currency conversion rate is applied to **displayed results only**.
- Rounding happens on display; internal calculations retain precision, so adding four displayed whole-dollar rows could differ slightly from the total.

**Example at 3% annual tuition growth and 2% annual living-cost growth:**

| University | Year 1 (USD) | Four-year total (USD) |
| --- | ---: | ---: |
| A | $38,000 | $159,698 |
| B | $36,600 | $156,372 |

University B has the lower projected four-year cost by about **$3,326** under these hypothetical assumptions. This result can differ from a simple 4× Year 1 comparison.

See `V3_LEARNING_GUIDE.md` for a beginner walkthrough and test checklist.

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

## My Development Process and Contributions

FinFair began as an AI-assisted prototype designed to help students understand the costs of university education.

I have been learning how to develop, modify, test, and publish its features using HTML, CSS, JavaScript, and GitHub.

### My Hands-On Contributions

- Added a projected annual balance function using JavaScript with step-by-step guidance.
- Connected the new calculation to the website's HTML and JavaScript interface.
- Added an explanation of the assumptions behind the annual projection.
- Ran automated tests using GitHub Codespaces and confirmed that all 21 tests passed.
- Tested the updated calculator on the live website.
- Used GitHub commits to document changes and maintain a development journal.

### What I Learned

Through this process, I learned how JavaScript functions work, how HTML elements connect to JavaScript, and how automated testing helps identify mistakes.

I also learned how to publish website updates and verify that changes work correctly.

### AI Assistance

AI tools helped generate the initial prototype and provided coding guidance, explanations, and debugging support. My hands-on work has focused on understanding the code, making guided modifications, running tests, and verifying the results.

My goal is to become increasingly independent in designing and implementing future features.


## Authorship and integrity

This codebase, including the Version 2 and Version 3 comparison/projection features, was generated with AI assistance as a starter prototype. Review each function, change the product based on your own research, and accurately describe your personal contributions in applications. Do not claim invented users, metrics, or independently authored code.

## Privacy

Do not ask participants to enter real account numbers, passwords, or financial identifiers. Use estimates or fictional values during tests.

## Multi-currency university planning (October 2026)

Both the university comparison and the four-year forecast support six currencies: **USD, GBP, EUR, CAD, AUD, and BDT**. Choose **University costs entered in** to define the currency of *every university input* (including scholarships) and **Show estimated totals in** to choose the output currency. An editable pair-specific exchange rate converts the result. Example: enter GBP amounts, display BDT totals.

- The editable example rate is shown as **1 source currency = X target currency**. Illustrative reference rates are not live quotes or verified current market rates; update the rate using a reliable source before using the results for decisions.
- Switching the input currency **does not convert numbers already typed into the cost fields**. Replace them with real amounts expressed in your selected currency. Both universities must be entered in the same source currency.
- All estimates and projections are calculated first in the input currency. Only the displayed totals, comparisons, and year-by-year results are converted. The model assumes one chosen rate for all four years, which is not a prediction of future FX rates.
- When input and output currencies are the same, the rate is fixed at 1. Changes to pair-specific rates stay available until you reset the university example values or reload the page.
- The separate monthly budget/housing simulator still uses USD and has not been changed.
