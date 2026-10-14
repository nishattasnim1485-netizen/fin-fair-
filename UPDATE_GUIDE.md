# FinFair Version 2: beginner-friendly GitHub update guide

**You are updating your EXISTING website, not creating a new repository.**

## Upload the changes using GitHub (no Terminal needed)

1. Download `FinFair_v2_Upgrade.zip` and **extract** it (double-click the ZIP on your Mac).
2. Open your existing `finfair` repository on GitHub and choose the **Code** tab.
3. Click **Add file → Upload files** (above the file list).
4. Open the extracted ZIP folder, select the files **inside** it, and drag them into GitHub's upload box. Do not drag the ZIP file itself or an enclosing folder.
5. Make sure filenames look like `index.html`, `app.js`, `styles.css`, `calculations.mjs`, `calculations.test.mjs`, `README.md`, `UPDATE_GUIDE.md` — no extra folder path before them. The same-name files update your existing versions.
6. Use the commit message: `Add university comparison and BDT currency converter`.
7. Choose **Commit changes** (or **Propose changes** if GitHub offers a branch workflow). If GitHub creates a pull request, review and merge it into `main` to publish.
8. Once committed to `main`, GitHub Pages will republish automatically. Your existing **Settings → Pages → main → /(root)** configuration should not change. Check the **Actions** tab for a successful Pages deployment.
9. Visit your current website link, then scroll to `03 / UNIVERSITY COST COMPARISON`. Refresh the browser if needed.

**Do not delete your repository or your current user feedback files.** This ZIP does not overwrite `USER_TEST_LOG.csv` or `IMPACT_REPORT_TEMPLATE.md`.

## Five quick tests on your live site

1. Under the new university section, see default A = $38,000 and B = $36,600 per year.
2. Switch to **BDT**. At the *example* rate of 120 BDT/USD, totals should be ৳4,560,000 and ৳4,392,000.
3. Change the exchange rate to 100: A should become ৳3,800,000.
4. Change University A's annual scholarship from 10,000 to 20,000: at 100 BDT/USD, A should become ৳2,800,000.
5. Enter -5 in any cost field. You should see an error. Click **Reset example university costs** to restore defaults.

## How the files work

- `index.html`: the form fields, labels, and output elements you see on screen.
- `styles.css`: colors, cards, spacing, responsive mobile layout.
- `calculations.mjs`: small, independently testable functions for annual costs, conversions, and validation.
- `app.js`: connects inputs to calculations and refreshes totals when you type or change currency.
- `calculations.test.mjs`: automated arithmetic tests you can run later in Node.js.

### The main formula

`annual cost = max(0, tuition + 12 × (monthly housing + monthly living) − annual scholarship)`

BDT displayed total = annual USD cost × editable example exchange rate. The exchange rate is not fetched from a bank or API.

### A project you can honestly describe

The initial feature is AI-assisted. Read the calculations, try one original improvement, test unusual cases, and document what YOU changed. Never claim invented user feedback or independent authorship of AI-generated code.
