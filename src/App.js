import React from 'react';
import Sketch from './sketch'
import './App.css';
import GetDrawData from "./drawData.js";
export var modCashFlows = [];


let currentCFValue = null;
let cashFlows = [0];
let initialInvest = 0;
let cashFlowString = "";
let canvasWidth = window.innerWidth * .9;
let canvasHeight = canvasWidth/2.32;
export let styles = {
  canvasWidth: canvasWidth,
  canvasHeight: canvasHeight,
  canvasColor: "#E9E9E9",
  lightCanvasColor: "#FFFFFF",
  textColor: "#000000",
  innerCashBoxColor: "#FBFBFB",
  medLightGray: "#D8D8D8",
  negativeColor: "#FF2223",
  positiveColor: "#4E556A",
  darkGray: "#3A3A3A",
  gray: "#ACACAC",
  barGray: "#4E556A"

}




const calcCanvas = {
  position: "absolute",
  left: "5%",
  top: "10%",
  
  background: styles.canvasColor,
  height: "40vw",
  width: "90vw",
}
const cashFlowBox = {
  position: "absolute",
  top: "14%",
  left: "5%", 
  background: styles.lightCanvasColor,
  height: "56%",
  width: "17%",
  borderRadius: 15
}

const dRateBox = {
  position: "absolute",
  bottom: "9%",
  left: "5%", 
  background: styles.lightCanvasColor,
  height: "17%",
  width: "17%",
  borderRadius: 15
}

const sketchBox = {
  position: "absolute",
  bottom: "9%",
  left: "24%", 
  background: styles.lightCanvasColor,
  height: "77%",
  width: "52%",
  borderRadius: 15
}

const historyBox = {
  position: "absolute",
  bottom: "9%",
  right: "5%", 
  background: styles.lightCanvasColor,
  height: "77%",
  width: "17%",
  borderRadius: 15 
}

const historyBoxDelete = {
  position: "absolute",
  bottom: "0%",
  right: "0%", 
  background: styles.lightCanvasColor,
  height: "100%",
  width: "19%",
  borderRadius: 0
}

const innerCashBox = {
  position: "absolute",
  top: "12%", 
  background: styles.innerCashBoxColor,
  height: "76%",
  width: "100%",
  overflowY: "scroll",
  overflowX: "auto"
  //fontWeight: "800"
}

const cashContents = { 
  fontSize: "2vw",
  width: "100%",
  height:"2.6vw",
  color: styles.barGray
}
const negCashContents = { 
  fontSize: "2vw",
  width: "100%",
  height:"2.6vw",
  color: styles.negativeColor
}

const initalInvStyle = { 
  fontSize: "2vw",
  width: "auto",
  height:"2.6vw",
  marginLeft: "15%"
}
const negInitialInvStyle = { 
  fontSize: "2vw",
  width: "auto",
  height:"2.6vw",
  marginLeft: "15%",
  color: styles.negativeColor,
 

}

const lineBreak = {
    background: "#F0F0F0",
    height: "1px",
    left: "15%",
    width: "75%",
    position: "absolute"
}
const minusButtonStyle = {
 
  fill: styles.innerCashBoxColor,
  color: styles.medLightGray,
  stroke: styles.medLightGray,
  strokeWidth: "8%"
}
const minusLineStyle = {
  stroke: styles.medLightGray,
  strokeWidth: "8%"
}

const header1 = {
  fontWeight: "bold",
  fontSize: "1vw",
  textAlign: "center"
}
const header3 = {
  fontWeight: "bold",
  fontSize: "1.2vw",
  textAlign: "center"
}
const header2 = {
  position: "absolute",
  fontWeight: "bold",
  fontSize: "2vw",
  left: "5%"
  
}
const cashInputStyle = {
  position: "absolute",
  background: "none",
  width: "57%",
  height: "14%",
  fontSize: "2vw",
  border: "none",
  color: styles.barGray
}

const negCashInputStyle = {
  position: "absolute",
  background: "none",
  width: "57%",
  height: "14%",
  fontSize: "2vw",
  border: "none",
  color: styles.negativeColor
}
const cashBottom= {
  position: "absolute",
  top: "88%",
  left: "0%",
  width: "100%",
  height: "12%",
  background: "none",
  fontWeight: "500",
  fontSize: ".9vw",
  color: styles.darkGray
}
const plusButtonStyle = {
 
  fill: styles.innerCashBoxColor,
  color: styles.darkGray,
  stroke: styles.darkGray,
  strokeWidth: "5%"
}
const plusLineStyle = {
  stroke: styles.darkGray,
  strokeWidth: "5%"
}
const plusBtnContainer= {
  position: "absolute",
  paddingLeft: "70%",
  paddingTop: "4%"
}
const cashBtmTxt = {
  position: "absolute",
  left: "28%"
}

const sliderStyle = {
  position: "absolute",
  top: "40%",
  left: "18%",
  background: "styles.canvasColor",
  width: "60%"
}






function App() {



//rerender the DOM when r changes
const [r, setr] = React.useState(50);
//rerender the DOM when theNPV changes
const [theNpv, setNpv] = React.useState(0);
//hook that makes sure dom is rerendered if a button is clicked, even if theNpv hasn't changed
const [npvRan, setNpvRan] = React.useState(0);

let zeroCashInputStyle = {
  position: "absolute",
  background: "none",
  width: "80%",
  height: "14%",
  fontSize: ".8vw",
  border: "none",
  color: styles.negativeColor
}
function minusButton(value) {
  return(
      <svg height="1.2vw" width="2vw" onClick= {() => {cashFlows.splice(value,1); setNpv(findNPV(cashFlows, r, initialInvest))} } >
  
        <circle style={minusButtonStyle} cx="56%" cy="50%" r="32%"/>
        <line style={minusLineStyle} x1="44%" y1="50%" x2="67%" y2="50%"/>    
      </svg>
  )
}

 
function cashFlowPlusBtn() {
  return(
    <svg height="1.5vw" width="1.5vw" style={plusBtnContainer} onClick= {() => {cashFlows.push(0); setNpv(findNPV(cashFlows, r, initialInvest))} } >   
      <circle style={plusButtonStyle} cx="50%" cy="50%" r="45%"/>
      <line style={plusLineStyle} x1="25%" y1="50%" x2="75%" y2="50%"/>    
      <line style={plusLineStyle} x1="50%" y1="75%" x2="50%" y2="25%"/> 
    </svg>
)
  
}

//console.log("r " + r);
function CashFlowContents() {
  if (initialInvest === "") {
    zeroCashInputStyle.fontSize = ".8vw";
  }
  else if (initialInvest >= 0 && initialInvest != "") {
    zeroCashInputStyle.fontSize = "2vw";
    zeroCashInputStyle.color = styles.negativeColor;
  }
  else if (initialInvest < 0) {
    zeroCashInputStyle.fontSize = "2vw";
    zeroCashInputStyle.color = styles.positiveColor;
  }
  let contents = [];
  console.log("initial invest" + initialInvest);
      contents.push(
        <div>
          <div style={negInitialInvStyle}>        
            <input style={zeroCashInputStyle} placeholder="<Enter Initial Investment Here>"  key={"inINVhold"}  type="text" name ={"initialInv"} onChange={(event) => {initialInvest = event.target.value; setNpv(findNPV(cashFlows, r, initialInvest)) }} />  
          </div>
          <div style={lineBreak}/>
        </div>
      )

  

  for (let value in cashFlows) {
    if (cashFlows[value] < 0){
      contents.push(
        <div>
          <div style={negCashContents}>
            {minusButton(value)} 
            $ {' '}  
            <input style={negCashInputStyle} key={"cashflow" + value} value={cashFlows[value]} type="text" name ={value + "cashFlow"} onChange={(event) => {cashFlows[value] = event.target.value; setNpv(findNPV(cashFlows, r, initialInvest))}} />  
          </div>
          <div style={lineBreak}/>
        </div>
        )

    }
    else {
    contents.push(
      <div>
        <div style={cashContents} >
          {minusButton(value)} 
          $ {' '}  
          <input style={cashInputStyle} key={"cashflow" + value} value={cashFlows[value]} type="text" name ={value + "cashFlow"} onChange={(event) => {cashFlows[value] = event.target.value; setNpv(findNPV(cashFlows, r, initialInvest))}} />  
        </div>
        <div style={lineBreak}/>
      </div>
      )
    }
  }
  return (contents)
}
function DiscountRateSlider() {
  return(
    <input type="range" min="0" max="100" step="1" style={sliderStyle} name ="ROR" onChange={(event) => setNpv(findNPV(cashFlows, event.target.value, initialInvest))} />
  )   
}

return (
  <div style={calcCanvas}>
    <p style={header2}>NET PRESENT VALUE CALCULATOR</p>
    <div style={cashFlowBox}><p style={header1}>CASH FLOWS</p>
      <div style={innerCashBox}>{CashFlowContents()}</div>
      <div style={cashBottom}>{cashFlowPlusBtn()}<p style={cashBtmTxt}>Add another</p></div>
    </div>

    <div style={dRateBox}>
<p style={header1}>DISCOUNT RATE: {r}%</p>{DiscountRateSlider()}
    </div>

    <div style={sketchBox}><p style={header3}>NPV: {theNpv}</p><Sketch/></div>
    <div style={historyBoxDelete}></div>
  </div>
)

  function findNPV(cashFlows, r, initialInvestValue) {
    //push r value to interface 
    setr(r);
    //ensures DOM will update even if npv didnt change
    setNpvRan(npvRan + 1);
    
  
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