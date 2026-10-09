/** Pure functions, kept separate from the interface so they can be tested. */
export function monthlyExpenses({ rent, other, tuition }) {
  return rent + other + tuition / 12;
}
export function monthlyBalance(values) {
  return values.income - monthlyExpenses(values);
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
