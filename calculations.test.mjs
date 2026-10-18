import test from 'node:test';
import assert from 'node:assert/strict';
import {monthlyExpenses,monthlyBalance,afterUnexpectedCost,shareOfIncome,validInputs,compareHousing,universityAnnualCost,usdToBdt,convertCurrency,exampleExchangeRate,validUniversityInputs,projectFourYears,totalProjection,validProjectionRates} from './calculations.mjs';
import { projectedAnnualBalance } from "./calculations.mjs";
const x = {income:2400,rent:900,other:650,tuition:3600,surprise:400};
test('annual tuition spread over 12 months',()=>assert.equal(monthlyExpenses(x),1850));
test('monthly balance',()=>assert.equal(monthlyBalance(x),550));
test('unexpected cost applies once',()=>assert.equal(afterUnexpectedCost(x),150));
test('housing comparison',()=>assert.equal(compareHousing(x,1200),-300));
test('zero income and zero expenses',()=>assert.equal(shareOfIncome({income:0,rent:0,other:0,tuition:0}),0));
test('zero income with expenses',()=>assert.equal(shareOfIncome({income:0,rent:200,other:0,tuition:0}),Infinity));
test('reject negatives and nonnumbers',()=>{assert.equal(validInputs({x:-1}),false);assert.equal(validInputs({x:NaN}),false);assert.equal(validInputs(x),true)});

const optionA = {tuition:30000,aid:10000,housing:1000,living:500};
const optionB = {tuition:40000,aid:25000,housing:1200,living:600};
test('annual total converts monthly housing and living costs to twelve months',()=>assert.equal(universityAnnualCost(optionA),38000));
test('compare two example universities',()=>assert.equal(universityAnnualCost(optionB),36600));
test('aid greater than expenses does not show negative annual cost',()=>assert.equal(universityAnnualCost({tuition:1000,aid:10000,housing:0,living:0}),0));
test('zero-cost university',()=>assert.equal(universityAnnualCost({tuition:0,aid:0,housing:0,living:0}),0));
test('convert USD to BDT with user-entered example rate',()=>assert.equal(usdToBdt(100,120),12000));
test('validate both universities and positive exchange rate',()=>{
  assert.equal(validUniversityInputs(optionA,optionB,120),true);
  assert.equal(validUniversityInputs(optionA,optionB,0),false);
  assert.equal(validUniversityInputs({...optionA,tuition:-1},optionB,120),false);
  assert.equal(validUniversityInputs(optionA,{...optionB,living:NaN},120),false);
});


test('projection begins with existing Year 1 cost for both universities', () => {
  assert.equal(projectFourYears(optionA, 3, 2)[0].cost, 38000);
  assert.equal(projectFourYears(optionB, 3, 2)[0].cost, 36600);
});
test('3% tuition growth and 2% living growth apply separately', () => {
  const rows = projectFourYears(optionA, 3, 2);
  assert.equal(rows[1].tuition, 30900);
  assert.equal(rows[1].housing, 1020);
  assert.equal(rows[1].living, 510);
  assert.equal(rows[1].aid, 10000);
  assert.equal(rows[1].cost, 39260);
});
test('no annual increases means four equal yearly costs', () => {
  const years = projectFourYears(optionA, 0, 0);
  assert.deepEqual(years.map(row=>row.cost), [38000,38000,38000,38000]);
  assert.equal(totalProjection(years), 152000);
});
test('four-year total matches separately compounded yearly costs', () => {
  assert.equal(Math.round(totalProjection(projectFourYears(optionA,3,2))),159698);
  assert.equal(Math.round(totalProjection(projectFourYears(optionB,3,2))),156372);
});
test('very large scholarship never makes any projected year negative', () => {
  const years = projectFourYears({tuition:1000, housing:0, living:0, aid:99999},3,2);
  assert.deepEqual(years.map(y=>y.cost),[0,0,0,0]);
});
test('growth rates must be finite and between 0 and 25%', () => {
  assert.equal(validProjectionRates(3,2),true);
  assert.equal(validProjectionRates(0,25),true);
  assert.equal(validProjectionRates(-1,0),false);
  assert.equal(validProjectionRates(0,26),false);
  assert.equal(validProjectionRates(NaN,2),false);
  assert.equal(validProjectionRates(Infinity,2),false);
});
test('projected cost converts to BDT without changing USD baseline', () => {
  const usd=totalProjection(projectFourYears(optionA,0,0));
  assert.equal(usdToBdt(usd,120),18240000);
  assert.equal(usd,152000);
});
test("projected annual balance", () => {
  const values = {
    income: 2400,
    rent: 900,
    other: 650,
    tuition: 3600
  };
  assert.equal(projectedAnnualBalance(values), 6600);
});

test('illustrative USD to BDT pair rate', () => assert.equal(exampleExchangeRate('USD','BDT'),120));
test('GBP EUR CAD and AUD examples convert into BDT', () => {
  for (const [code,rate] of [['GBP',160],['EUR',140],['CAD',90],['AUD',80]])
    assert.equal(convertCurrency(100,exampleExchangeRate(code,'BDT')),100*rate);
});
test('EUR to AUD comparison uses a common illustrative reference', () => {
  assert.equal(exampleExchangeRate('EUR','AUD'),1.75);
});
test('reverse conversion BDT to USD is available', () => {
  assert.ok(Math.abs(exampleExchangeRate('BDT','USD') - 1/120) < 0.000001);
});
test('same currency uses a factor of one and unknown currencies are rejected', () => {
  assert.equal(exampleExchangeRate('GBP','GBP'),1);
  assert.equal(Number.isNaN(exampleExchangeRate('XYZ','USD')),true);
});
test('user-entered exchange rate overrides examples without changing original cost', () => {
  const cost = universityAnnualCost(optionA);
  assert.equal(convertCurrency(cost,152),5776000);
  assert.equal(cost,38000);
});
