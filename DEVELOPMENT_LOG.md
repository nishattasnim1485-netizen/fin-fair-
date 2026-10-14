# FinFair — Development Journal

## Project Mission
FinFair is a student financial planning tool designed to help prospective university students compare educational expenses and understand affordability.

## Version 1 — Financial Calculator
- Published the first working website using GitHub Pages.
- Tested how changing monthly income affected the estimated remaining balance.
- Verified an example calculation.

## Version 2 — University Comparison
- Added a comparison feature for two universities with AI-assisted development.
- Included tuition, scholarships, housing, and living expenses.
- Added USD/BDT currency conversion.
- Manually checked the comparison outputs using example figures.

## Version 3 — Four-Year Cost Predictor
- Added a four-year projection feature with AI-assisted development.
- Included adjustable tuition and living-cost growth assumptions.
- Verified the initial example calculations.
- Tested the zero-growth scenario to check the calculation logic.

## What I Have Learned
- How to create and publish a website through GitHub Pages.
- How version updates and GitHub commits work.
- How financial inputs affect calculation outputs.
- How to test a website using expected numerical results.

## My Next Goals
- Study and explain the JavaScript calculation functions.
- Make an independent improvement to the website.
- Test additional scenarios and document any problems.
- Improve the project based on genuine research and feedback.
## Version 4 — My First Hands-On Coding Improvement
**Date:** October 14, 2026

### Feature: Projected Annual Balance

I added a feature that calculates a student's projected annual remaining balance based on their monthly income and expenses.

### What I Did

- Added a new JavaScript function called `projectedAnnualBalance()` in `calculations.mjs`.
- Used my existing monthly balance function to calculate the annual projection.
- Wrote a new automated test in `calculations.test.mjs`.
- Used GitHub Codespaces to run the tests and confirmed that all 21 passed.
- Edited `index.html` to display the projected annual balance.
- Updated `app.js` to connect the calculation to the website.
- Published my changes through GitHub and tested the feature on the live website.
### Testing Results

With a monthly income of $3,000 and estimated monthly expenses of $1,850:
- Monthly remaining balance: $1,150
- Projected annual balance: $13,800
- Result: Passed

### What I Learned

This exercise helped me understand how JavaScript functions work together, how HTML elements are updated through JavaScript, and how automated testing can verify calculations.

I also learned how to troubleshoot coding mistakes, use GitHub commits to track my progress, and test changes on a live website.

### Limitations

The annual projection assumes that income and expenses remain unchanged for 12 months. It is an estimate rather than guaranteed savings.

### Next Goal

Continue developing my JavaScript skills, improve the clarity of FinFair's financial estimates, and learn how to create more features with greater independence.
