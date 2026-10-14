import test from 'node:test';
import assert from 'node:assert/strict';
import {monthlyExpenses,monthlyBalance,afterUnexpectedCost,shareOfIncome,validInputs,compareHousing,universityAnnualCost,usdToBdt,validUniversityInputs} from './calculations.mjs';
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
