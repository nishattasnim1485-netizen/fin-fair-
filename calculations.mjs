/** Pure functions, kept separate from the interface so they can be tested. */
export function monthlyExpenses({ rent, other, tuition }) {
  return rent + other + tuition / 12;
}
export function monthlyBalance(values) {
  return values.income - monthlyExpenses(values);

}
export function projectedAnnualBalance(values) {
  return monthlyBalance(values) * 12;
  
}
export function afterUnexpectedCost(values) {
  return monthlyBalance(values) - values.surprise;
}
export function shareOfIncome(values) {
  const total = monthlyExpenses(values);
  return values.income === 0 ? (total === 0 ? 0 : Infinity) : (total / values.income) * 100;
}
export function validInputs(values) {
  return Object.values(values).every(n => Number.isFinite(n) && n >= 0);
}
export function compareHousing(values, alternativeRent) {
  return monthlyBalance({ ...values, rent: alternativeRent }) - monthlyBalance(values);
}

/** Annual net cost of studying at one university, in USD.
 * This is a simplified estimate; scholarships are modeled as annual deductions.
 * We floor the result at $0 to avoid showing a misleading negative tuition bill.
 */
export function universityAnnualCost({ tuition, aid, housing, living }) {
  return Math.max(0, tuition + 12 * (housing + living) - aid);
}

/** A conversion of a USD cost into BDT at a user-entered rate (BDT per USD). */
export function usdToBdt(usd, bdtPerUsd) {
  return usd * bdtPerUsd;
}

/** Explicitly illustrative BDT values per unit, NOT live exchange rates.
 * Every currency pair is derived from one shared example reference, so
 * a user may replace the displayed pair rate with a current rate.
 */
export const exampleBdtPerUnit = Object.freeze({
  USD:120, GBP:160, EUR:140, CAD:90, AUD:80, BDT:1
});

export function exampleExchangeRate(fromCurrency, toCurrency) {
  const from = exampleBdtPerUnit[fromCurrency];
  const to = exampleBdtPerUnit[toCurrency];
  if (!Number.isFinite(from) || !Number.isFinite(to) || to <= 0) return NaN;
  return Math.round((from / to) * 1000000) / 1000000;
}

/** Convert between two currency units using a manually supplied pair rate.
 * The UI always calculates costs in the entered currency first.
 */
export function convertCurrency(amount, targetUnitsPerSourceUnit) {
  return amount * targetUnitsPerSourceUnit;
}

/** Checks entered amounts and ensures our user-entered exchange rate is positive. */
export function validUniversityInputs(optionA, optionB, exchangeRate) {
  return validInputs(optionA) && validInputs(optionB) &&
    Number.isFinite(exchangeRate) && exchangeRate > 0;
}


/** Build a four-year educational COST SCENARIO, not a financial forecast.
 * Each year, tuition rises by the chosen percentage and combined housing/living
 * costs rise by their chosen percentage. Annual aid remains unchanged; users
 * must verify whether their real scholarships renew each year.
 */
export function projectFourYears(option, tuitionGrowthPct, livingGrowthPct) {
  return Array.from({ length: 4 }, (_, index) => {
    const tuition = option.tuition * (1 + tuitionGrowthPct / 100) ** index;
    const housing = option.housing * (1 + livingGrowthPct / 100) ** index;
    const living = option.living * (1 + livingGrowthPct / 100) ** index;
    const cost = universityAnnualCost({ tuition, housing, living, aid: option.aid });
    return { year: index + 1, tuition, housing, living, aid: option.aid, cost };
  });
}

/** Total cost across all years, without rounding each year's intermediate math. */
export function totalProjection(years) {
  return years.reduce((sum, item) => sum + item.cost, 0);
}

/** Reject negative, missing, nonfinite, or unusually extreme growth assumptions. */
export function validProjectionRates(tuitionGrowthPct, livingGrowthPct) {
  return [tuitionGrowthPct, livingGrowthPct]
    .every(n => Number.isFinite(n) && n >= 0 && n <= 25);
}
