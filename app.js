import { monthlyExpenses, monthlyBalance, afterUnexpectedCost, shareOfIncome, validInputs, compareHousing, universityAnnualCost, usdToBdt, validUniversityInputs, projectFourYears, totalProjection, validProjectionRates } from './calculations.mjs';
import { projectedAnnualBalance } from "./calculations.mjs";
const $ = id => document.getElementById(id);
const defaults = {income:2400, rent:900, other:650, tuition:3600, surprise:400, rentB:1200};
const money = n => `${n < 0 ? '−' : ''}$${Math.abs(n).toLocaleString('en-US',{maximumFractionDigits:0})}`;
function render() {
  const names = ['income','rent','other','tuition','surprise'];
  const values = Object.fromEntries(names.map(name=>[name,Number($(name).value)]));
  const alternateRent = Number($('rentB').value);
  const valid = names.every(name => $(name).value.trim() !== '') && $('rentB').value.trim() !== '' && validInputs({...values,alternateRent});
  $('error').hidden = valid;
  document.querySelectorAll('.results, .compare-grid, .comparison-note').forEach(el=>el.classList.toggle('invalid',!valid));
  if (!valid) return;
  const balance = monthlyBalance(values), expense = monthlyExpenses(values), shock = afterUnexpectedCost(values), share = shareOfIncome(values);
  $('remaining').textContent = money(balance);
$("annualBalance").textContent = money(projectedAnnualBalance(values));
  $('remaining').classList.toggle('negative',balance<0);
  $('status').textContent = balance < 0 ? 'Estimated deficit' : balance < values.income*.1 ? 'Tight budget' : 'Positive balance';
  $('expenses').textContent = money(expense);
  $('share').textContent = Number.isFinite(share) ? `${Math.round(share)}%` : 'N/A';
  $('barfill').style.width = `${Math.min(100,Number.isFinite(share) ? share : 100)}%`;
  $('barfill').classList.toggle('over',balance<0);
  $('afterShock').textContent = money(shock);
  $('afterShock').classList.toggle('negative',shock<0);
  const biggest = [['housing',values.rent],['other living costs',values.other],['tuition',values.tuition/12]].sort((a,b)=>b[1]-a[1])[0];
  $('insight').textContent = biggest[1] === 0 ? 'Add costs to see your largest expense category.' : `Your largest modeled expense category is ${biggest[0]} (${money(biggest[1])}/month).`;
  $('planA').textContent = money(balance);
  const difference = compareHousing(values,alternateRent);
  $('planB').textContent = money(balance+difference);
  $('comparison').textContent = difference === 0 ? 'Both plans have the same estimated monthly balance.' : `Plan B leaves you ${money(Math.abs(difference))} ${difference > 0 ? 'more' : 'less'} each month than Plan A.`;
}
for (const id of Object.keys(defaults)) $(id).addEventListener('input',render);
$('reset').addEventListener('click',()=>{for(const [id,value] of Object.entries(defaults)) $(id).value=value;render();});
$('year').textContent = new Date().getFullYear();
render();


// ----- University cost comparison (Version 2) -----
// These are example numbers, not prices from real universities.
const universityDefaults = {
  uniAName:'University A', uniATuition:30000, uniAAid:10000, uniAHousing:1000, uniALiving:500,
  uniBName:'University B', uniBTuition:40000, uniBAid:25000, uniBHousing:1200, uniBLiving:600,
  displayCurrency:'USD', bdtRate:120
};
const numericUniversityFields = [
  'uniATuition','uniAAid','uniAHousing','uniALiving',
  'uniBTuition','uniBAid','uniBHousing','uniBLiving'
];
// Initialized before the first university render (which also updates the projection).
const growthDefaults = { tuitionGrowth:3, livingGrowth:2 };
const growthFields = Object.keys(growthDefaults);

function readUniversity(prefix) {
  // Input values are strings in HTML. Number(...) turns them into numeric values.
  return {
    tuition:Number($(prefix+'Tuition').value),
    aid:Number($(prefix+'Aid').value),
    housing:Number($(prefix+'Housing').value),
    living:Number($(prefix+'Living').value)
  };
}

function renderUniversities() {
  const a = readUniversity('uniA');
  const b = readUniversity('uniB');
  const rate = Number($('bdtRate').value);
  // Empty inputs would normally be converted by Number('') into 0; catch them.
  const nonEmpty = numericUniversityFields.every(id => $(id).value.trim() !== '') && $('bdtRate').value.trim() !== '';
  const valid = nonEmpty && validUniversityInputs(a,b,rate);
  $('uniError').hidden = valid;
  $('universityResults').classList.toggle('invalid', !valid);
  if (!valid) {
    renderProjection();
    return;
  }

  const aUsd = universityAnnualCost(a);
  const bUsd = universityAnnualCost(b);
  const showBdt = $('displayCurrency').value === 'BDT';
  const format = usd => showBdt
    ? `৳${Math.round(usdToBdt(usd,rate)).toLocaleString('en-US')}`
    : `$${Math.round(usd).toLocaleString('en-US')}`;

  const aName = $('uniAName').value.trim() || 'University A';
  const bName = $('uniBName').value.trim() || 'University B';
  $('uniAResultName').textContent = aName;
  $('uniBResultName').textContent = bName;
  $('barAName').textContent = aName;
  $('barBName').textContent = bName;
  $('uniATotal').textContent = format(aUsd);
  $('uniBTotal').textContent = format(bUsd);
  $('uniAMonth').textContent = format(aUsd / 12);
  $('uniBMonth').textContent = format(bUsd / 12);

  const scale = Math.max(aUsd,bUsd,1); // prevents dividing by zero
  $('uniBarA').style.width = `${aUsd/scale*100}%`;
  $('uniBarB').style.width = `${bUsd/scale*100}%`;
  const difference = Math.abs(aUsd-bUsd);
  $('uniDifference').textContent = difference < 0.005
    ? 'Both options have the same estimated annual cost based on your entries.'
    : `${aUsd < bUsd ? aName : bName} has a lower estimated annual cost by ${format(difference)}.`;
  renderProjection(); // Shared university inputs and currency selection feed Version 3.
}

for (const id of [...numericUniversityFields,'uniAName','uniBName','bdtRate']) {
  $(id).addEventListener('input',renderUniversities);
}
$('displayCurrency').addEventListener('change',renderUniversities);
$('resetUniversities').addEventListener('click', () => {
  for (const [id,value] of Object.entries(universityDefaults)) $(id).value = value;
  renderUniversities();
});
renderUniversities();


// ----- Four-year cost predictor (Version 3) -----
// Uses the same university costs and USD/BDT display setting as Version 2.

function renderProjection() {
  const a = readUniversity('uniA');
  const b = readUniversity('uniB');
  const rate = Number($('bdtRate').value);
  const tuitionGrowth = Number($('tuitionGrowth').value);
  const livingGrowth = Number($('livingGrowth').value);

  // Reject blank inputs: Number('') would otherwise silently become 0.
  const allRequired = [...numericUniversityFields, 'bdtRate', ...growthFields]
    .every(id => $(id).value.trim() !== '');
  const valid = allRequired && validUniversityInputs(a, b, rate) &&
    validProjectionRates(tuitionGrowth, livingGrowth);
  $('projectionError').hidden = valid;
  $('projectionResults').classList.toggle('invalid', !valid);
  if (!valid) return;

  const aRows = projectFourYears(a, tuitionGrowth, livingGrowth);
  const bRows = projectFourYears(b, tuitionGrowth, livingGrowth);
  const aTotal = totalProjection(aRows);
  const bTotal = totalProjection(bRows);
  const showBdt = $('displayCurrency').value === 'BDT';
  const format = usd => showBdt
    ? `৳${Math.round(usdToBdt(usd,rate)).toLocaleString('en-US')}`
    : `$${Math.round(usd).toLocaleString('en-US')}`;
  const aName = $('uniAName').value.trim() || 'University A';
  const bName = $('uniBName').value.trim() || 'University B';

  $('projectionAName').textContent = aName;
  $('projectionBName').textContent = bName;
  $('projectionTableA').textContent = aName;
  $('projectionTableB').textContent = bName;
  $('projectionATotal').textContent = format(aTotal);
  $('projectionBTotal').textContent = format(bTotal);
  const difference = Math.abs(aTotal - bTotal);
  $('projectionDifference').textContent = difference < .005
    ? 'Both options have the same estimated cost over four years.'
    : `${aTotal < bTotal ? aName : bName} has a lower estimated four-year cost by ${format(difference)}.`;

  // We create text nodes instead of inserting HTML so names are safely displayed.
  const tbody = $('projectionTableBody');
  tbody.replaceChildren();
  for (let i = 0; i < 4; i++) {
    const row = document.createElement('tr');
    for (const content of [`Year ${i + 1}`, format(aRows[i].cost), format(bRows[i].cost)]) {
      const cell = document.createElement('td');
      cell.textContent = content;
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
}

for (const id of growthFields) $(id).addEventListener('input', renderProjection);
$('resetGrowth').addEventListener('click', () => {
  for (const [id,value] of Object.entries(growthDefaults)) $(id).value = value;
  renderProjection();
});
renderProjection();
