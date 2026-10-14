# FinFair Version 3 — Learn and publish the four-year predictor

## What this adds
- A four-year cost calculator that **reuses** the University A/B values already on the site.
- Two adjustable growth assumptions (annual tuition and annual living costs).
- A year-by-year table, cumulative four-year total for each university, and cost difference.
- Results in USD or BDT using your existing display-currency selector.
- Inputs continue to be entered in USD; the BDT display is based on an editable **illustrative** conversion rate.

## 1. Update the existing GitHub repo (no new repo)
1. Download and **extract** the `FinFair_v3_GitHub_Update.zip` archive.
2. Open your existing `fin-fair-` GitHub repository (same one that is hosting Version 2).
3. Choose **Add file → Upload files** on the `main` branch.
4. Select the **seven files inside** the extracted folder. Don't upload the folder or ZIP itself.
5. Use commit message: `Add four-year university cost predictor`.
6. Select **Commit directly to the main branch**, then click **Commit changes** once.
7. Wait a few minutes and refresh your GitHub Pages website. Scroll to section **04 / THE FOUR-YEAR PICTURE**.
8. If GitHub displays a blank screen, open the repository in a fresh tab first and check the commit count before repeating anything.

**Important:** Keep your existing `USER_TEST_LOG.csv` and `IMPACT_REPORT_TEMPLATE.md`. They are not in this update archive and should remain untouched.

## 2. What each file does

- `index.html` defines the new inputs and results section.
- `styles.css` makes the new section readable on laptops and phones.
- `app.js` listens to user input, validates it, calls the calculation functions, and updates the displayed table.
- `calculations.mjs` contains the math (`projectFourYears`, `totalProjection`, `validProjectionRates`).
- `calculations.test.mjs` contains automated checks for edge cases and expected outputs.
- `README.md` documents the actual features and assumptions.
- This guide explains how to learn, test and publish the upgrade.

## 3. The math explained

Start with the Year 1 university details already entered in FinFair.

- Year 1: tuition + 12 × (housing + living) − annual scholarship.
- Year 2: tuition × 1.03 + 12 × (housing + living) × 1.02 − scholarship, assuming 3%/2% example rates.
- Year 3: tuition × 1.03² + 12 × (housing + living) × 1.02² − scholarship.
- Year 4: tuition × 1.03³ + 12 × (housing + living) × 1.02³ − scholarship.
- Each year's net cost is floored at zero. The four-year total is the sum of all four years.

This is **a sensitivity model**, not a prediction of real inflation or real college billing. Your scholarship is assumed to renew at the same value every year.

## 4. Testing with the defaults

With University A ($30,000 tuition, $10,000 aid, $1,000 monthly housing, $500 monthly living) and University B ($40,000 tuition, $25,000 aid, $1,200 monthly housing, $600 monthly living), plus 3% tuition and 2% living growth:

| Year | A USD | B USD |
| --- | ---: | ---: |
| 1 | $38,000 | $36,600 |
| 2 | $39,260 | $38,232 |
| 3 | $40,554 | $39,909 |
| 4 | $41,884 | $41,631 |
| **Four-year total** | **$159,698** | **$156,372** |

Change both growth rates to 0%. Both universities should show four identical years. Their four-year totals should be $152,000 (A) and $146,400 (B).

Change the display selector to BDT with rate 120. A should show roughly ৳19,163,730 over 4 years; B approximately ৳18,764,618 (the converter applies to the unrounded totals).

Change tuition or aid in the **University Cost Comparison** section and verify the four-year table updates as well.

**Developer tests:** If Node.js is installed, run `node --test calculations.test.mjs` from the project folder.

## 5. Make the project your own

1. Try writing a new test that uses your own tuition, scholarship, and growth assumptions.
2. Explain why exponent `** index` implements year-over-year compounding.
3. Choose and implement a new feature: a scholarship that changes by year, a CSV download, or a more realistic 9-month housing option.
4. Document the change as a new GitHub commit and explain what *you* designed or fixed.

Be transparent about AI assistance and never claim invented interviews, outcomes, or independent authorship. Your real debugging notes and algorithm explanations are valuable evidence of learning.
