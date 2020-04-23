import React from 'react';
import Sketch from './sketch'
import './App.css';
import Graph from './graph.js';
import GetDrawData from "./drawData.js";
import Button from '@material-ui/core/Button';
export var modCashFlows = [];



let cashFlows = [0];


let canvasWidth = window.innerWidth * .9;
let canvasHeight = canvasWidth/2.32;
let loggedNPVs = [];

export let calcData = {
  initialInvest: 0,
  modCashFlows: [],
  theNPV: [],
  npvSnap: [],
  snapGraphX: 0,
  r: 50
};
export let styles = {
  canvasWidth: canvasWidth,
  canvasHeight: canvasHeight,
  canvasColor: "#E9E9E9",
  lightCanvasColor: "#FFFFFF",
  textColor: "#000000",
  innerCashBoxColor: "#FBFBFB",
  medLightGray: "#D8D8D8",
  negativeColor: "#F50057",
  positiveColor: "#27293E",
  darkGray: "#3A3A3A",
  gray: "#ACACAC",
  irrColor: "#53DD6C",
  npvBtnColor: "#57A773"
 

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
  borderRadius: "1vw"
}

const dRateBox = {
  position: "absolute",
  bottom: "9%",
  left: "5%", 
  background: styles.lightCanvasColor,
  height: "17%",
  width: "17%",
  borderRadius: "1vw"
}

const sketchBox = {
  position: "absolute",
  bottom: "9%",
  left: "24%", 
  background: styles.lightCanvasColor,
  height: "77%",
  width: "52%",
  borderRadius: "1vw"
}

const historyBox = {
  position: "absolute",
  bottom: "9%",
  right: "5%", 
  background: styles.lightCanvasColor,
  height: "77%",
  width: "17%",
  borderRadius: "1vw" 
}

const innerHistoryBox = {
  position: "absolute",
  top: "65%", 
  background: styles.innerCashBoxColor,
  height: "15%",
  width: "100%",
  overflowY: "scroll",
  overflowX: "auto"
  //fontWeight: "800"
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
  color: styles.positiveColor
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
  left: "27%",
  fontSize: "2vw",
  border: "none",
  color: styles.positiveColor
}

const negCashInputStyle = {
  position: "absolute",
  background: "none",
  width: "57%",
  height: "14%",
  left: "25%",
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
  left: "28%",
 
}

const sliderStyle = {
  position: "absolute",
  top: "40%",
  left: "18%",
  background: "styles.canvasColor",
  cursor: "pointer",
  width: "60%"
}



const snapButtonPos = {
  position: "absolute",
  bottom: "15%",
  left: "17%"
}
const histTitle = {
  position: "absolute",
  fontSize: "1vw",
  bottom: "33%",
  left: "8%",
}

const histTitle2 = {
  position: "absolute",
  fontSize: "1vw",
  bottom: "33%",
  right: "16%",
}



function App() {



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
      <svg height="1.2vw" width="2vw" onClick= {() => {cashFlows.splice(value,1); findNPV(cashFlows, calcData.r, calcData.initialInvest)} } >
  
        <circle style={minusButtonStyle} cx="56%" cy="50%" r="32%"/>
        <line style={minusLineStyle} x1="44%" y1="50%" x2="67%" y2="50%"/>    
      </svg>
  )
}

 
function cashFlowPlusBtn() {
  return(
    <svg height="1.7vw" width="1.7vw" style={plusBtnContainer} onClick= {() => {if (calcData.initialInvest != ""){ cashFlows.push(0); findNPV(cashFlows, calcData.r, calcData.initialInvest)}} } >   
      <circle style={plusButtonStyle} cx="50%" cy="50%" r="38%"/>
      <line style={plusLineStyle} x1="30%" y1="50%" x2="70%" y2="50%"/>    
      <line style={plusLineStyle} x1="50%" y1="70%" x2="50%" y2="30%"/> 
    </svg>
  ) 
}

function dollSymbol(value, color) {
  let numSize = .6; 
  let numX = "39%";
  let numY = "86%";
  if (value > 9) {
    numSize= .5;
    numX = "31%"
    numY = "85%"
  }
 
  return(
    <svg style={{position: "absolute", background: "none"}} height="2.6vw" width="1.5vw" >
      <text style={{fontSize: "2.2vw", fontWeight: "400", fill: color}} x="4%" y="80%">$</text>
      <circle style={{fill: color}} cx="52%" cy="78%" r="18%"/>
      <text style={{fontSize: numSize + "vw", fontWeight: "700", fill: styles.innerCashBoxColor}} x={numX} y={numY}>{value}</text>
    </svg>
  ) 
}
function snapNPVBtn() {
  return (<Button style={{position: "absolute", width: "10vw", fontSize: "1.5vw", color: styles.darkGray, fontFamily: 'Fira Code',  border: "1px solid", padding: ".2vw"}} variant="outlined"  onClick ={ () => {calcData.npvSnap.unshift({x: calcData.r, y: calcData.theNPV }); logNPV(); setNpvRan(npvRan + 1); }} disableElevation >FIND NPV</Button>)
  //return (<button style={snapNPVBtnStyle} name="npvsnap" onClick ={ () => {calcData.npvSnap.push({x: calcData.r, y: calcData.theNPV }); calcData.snapGraphX++; setNpvRan(npvRan + 1); }}>FIND NPV</button>  )
}

function logNPV() {
 
  loggedNPVs.unshift(
    <div style={{ paddingLeft:"6%"}}>
      <p style={{ }}>{calcData.theNPV.toFixed(2)}{"_____________"}{calcData.r}%</p><p style = {{float: "right", display: "inline"}}></p>
    </div>
  )
}

function CashFlowContents() {
  let dollColor = styles.negativeColor;

  if (calcData.initialInvest === "") {
    zeroCashInputStyle.fontSize = ".8vw";
  }
  else if (calcData.initialInvest >= 0 && calcData.initialInvest != "") {
    zeroCashInputStyle.fontSize = "2vw";
    zeroCashInputStyle.color = styles.negativeColor;
  }
  else if (calcData.initialInvest < 0) {
    zeroCashInputStyle.fontSize = "2vw";
    zeroCashInputStyle.color = styles.positiveColor;
    dollColor = styles.positiveColor;
  }
  let contents = [];

      contents.push(
        <div>
          <div style={{position: "absolute", left: "2%", bottom: "100%"}}>{dollSymbol(0, dollColor)}</div>
          <div style={negInitialInvStyle}>        
            <input style={zeroCashInputStyle} placeholder="<Enter Initial Investment Here>"  key={"inINVhold"}  type="text" name ={"initialInv"} onChange={(event) => {calcData.initialInvest = event.target.value; findNPV(cashFlows, calcData.r, calcData.initialInvest)}} />  
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
            {dollSymbol(parseInt(value) + 1, styles.negativeColor)}  
            <input style={negCashInputStyle} key={"cashflow" + value} value={cashFlows[value]} type="text" name ={value + "cashFlow"} onChange={(event) => {cashFlows[value] = event.target.value; findNPV(cashFlows, calcData.r, calcData.initialInvest)}} />  
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
          {dollSymbol(parseInt(value) + 1, styles.positiveColor)}   
          <input style={cashInputStyle} key={"cashflow" + value} value={cashFlows[value]} type="text" name ={value + "cashFlow"} onChange={(event) => {cashFlows[value] = event.target.value; findNPV(cashFlows, calcData.r, calcData.initialInvest)}} />  
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
    <input type="range" min="0" max="100" step="1" style={sliderStyle} name ="ROR" onChange={(event) => {calcData.r = event.target.value; findNPV(cashFlows, calcData.r, calcData.initialInvest)}} />
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
      <p style={header1}>DISCOUNT RATE: {calcData.r}%</p>{DiscountRateSlider()}
    </div>

    <div style={sketchBox}><Sketch/></div>
    <div style={historyBox}><p style={header3}>HISTORY</p>
      <Graph/>
      <p style={histTitle}>NPV</p><p style={histTitle2}>RATE</p>
      <div style={innerHistoryBox}>{loggedNPVs}</div>
      <div style={snapButtonPos}>{snapNPVBtn()}</div>
    </div>
  </div>
)

  function findNPV(cashFlows, r, initialInvestValue) {
    //push r value to interface 
   
    //ensures DOM will update even if npv didnt change
    setNpvRan(npvRan + 1);
    
  
    calcData.initialInvest = initialInvestValue;
    let npvOut = null;
    let rDec = r/100;
    let npv = null;
    //reset modded cash flows
    calcData.modCashFlows = [];
    calcData.modCashFlows.push(calcData.initialInvest * -1);
    for (let flow in cashFlows) {
     let powerOf=parseInt(flow) +  1;
     let discountedFlow = cashFlows[flow] / Math.pow(1 + rDec,  powerOf);
     calcData.modCashFlows.push(discountedFlow);
     npv += discountedFlow;
    }
    npvOut = (npv - calcData.initialInvest);
    calcData.theNPV = npvOut;
    
    //return (npvOut);
  }
  //{cashFlows.map((number) => <li key ={number.toString()}>{number}




























} 


export default App;