import React from 'react';
import Sketch from './sketch'
import GetDrawData from "./drawData.js";
export var modCashFlows = [];

let currentCFValue = null;
let cashFlows = [];
let initialInvest = 0;
let cashFlowString = "";

function App() {

//rerender the DOM when r changes
const [r, setr] = React.useState(50);
//rerender the DOM when theNPV changes
const [theNpv, setNpv] = React.useState(0);
//console.log("r " + r);

  function handleCashFlows() {
    let strungOut = "";
    
    if (currentCFValue) {
    cashFlows.push(currentCFValue);
    }

    for (let entry in cashFlows) {
      strungOut += cashFlows[entry].toString();
      strungOut += ",";
    }
    //setNpv
    cashFlowString = strungOut;
    console.log(cashFlows);
    setNpv(findNPV(cashFlows, r, initialInvest));
  }

  return (
  <div><Sketch/>
    
    <div>
      <h1>NPV: {theNpv}</h1>
    </div>

    <div>
      <div>Initial Investment: {initialInvest}</div>
      <input type="text" name ="initialInv" onChange={(event) => setNpv(findNPV(cashFlows, r, event.target.value))} />  
    </div>

    <div>
      <div>Discount Rate: {r}%</div>
      <input type="range" min="0" max="100" step="1" name ="ROR" onChange={(event) => setNpv(findNPV(cashFlows, event.target.value, initialInvest))} />
    </div>

    <div>
      <div>Cash Flows: {cashFlowString}</div>
      <input type="text" name ="cashFlow" onChange={(event) => currentCFValue = event.target.value} />
      <button name="cashFlowBtn" onClick ={(handleCashFlows)}>Add Cash Flow</button>
    </div>


  </div>
    
  )
  function findNPV(cashFlows, r, initialInvestValue) {
    //push r value to interface 
    setr(r);
    console.log("r " + r);
    initialInvest = initialInvestValue;
    
    let rDec = r/100;
    let npv = null;
    //reset modded cash flows
    modCashFlows = [];
    modCashFlows.push(initialInvest * -1);
    for (let flow in cashFlows) {
     let powerOf=parseInt(flow) +  1;
     let discountedFlow = cashFlows[flow] / Math.pow(1 + rDec,  powerOf);
     modCashFlows.push(discountedFlow);
     npv += discountedFlow;
    }
  
    console.log("r " + r);
    console.log("cashflows " + cashFlows);
    console.log("initial Invest " + initialInvest);
    console.log("npv " + npv);
    console.log(theNpv);
    console.log("modflows " + modCashFlows);
    return ((npv - initialInvest).toFixed(2));
  }
  //{cashFlows.map((number) => <li key ={number.toString()}>{number}




























} 


export default App;