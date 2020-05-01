import React from 'react';
import Sketch from './sketch'
import './App.css';
import Graph from './graph.js';
import findIRR from './irr.js';
import GetDrawData from "./drawData.js";
import Button from '@material-ui/core/Button';
import {getPathSVG} from "./flexgraph.js";
export var modCashFlows = [];






let canvasWidth = window.innerWidth * .9;
let canvasHeight = canvasWidth/2.32;
let loggedNPVs = [];


export let calcData = {
  initialInvest: 0,
  cashFlows: [0],
  modCashFlows: [],
  theNPV: 0,
  npvSnap: [[0,0]],
  snapGraphX: 0,
  r: 50,
  testVar: 0,
  irr: null,
  discountFactor: .67,
  avgNpvYr: 0
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
  gray: "#8C8E8E",
  irrColor: "#53DD6C",
  npvBtnColor: "#57A773",
  boxRadius: ".5vw",
  calcPadLeft: "8%",
  calcPadTop: "10%",
  bottomRowPadTop: "59%",
  firstRowHeight: "44.5%",
  secondRowHeight: "34%"
}

function rndNearTenth(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}


const calcCanvas = {
  position: "absolute",
  left: "13%",
  top: "0%",
  
  background: styles.canvasColor,
  height: "50vw",
  width: "74vw",
}

const calcTitle = {
  position: "absolute",
  fontWeight: "bold",
  fontSize: "1.4vw",
  left: styles.calcPadLeft,
  top: parseInt(styles.calcPadTop) -8 + "%",
}
//..........CASHBOX......//

const cashFlowBox = {
  position: "absolute",
  top: styles.calcPadTop,
  left: styles.calcPadLeft, 
  background: styles.lightCanvasColor,
  height: "30%",
  width: "18%",
  borderRadius: ".5vw"
}
const innerCashBox = {
  position: "absolute",
  top: "13%", 
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
const cashInputStyle = {
  position: "absolute",
  background: "none",
  width: "57%",
  height: "22%",
  left: "27%",
  fontSize: "1.8vw",
  border: "none",
  color: styles.positiveColor
}

const negCashInputStyle = {
  position: "absolute",
  background: "none",
  width: "57%",
  height: "22%",
  left: "27%",
  fontSize: "1.8vw",
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
  paddingTop: "3%"
}
const cashBtmTxt = {
  position: "absolute",
  top: "87%",
  left: "29%",
  fontSize: ".7vw",
  fontWeight: "medium"
 
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

//.....DISCOUNT RATE BOX.........

const dRateBox = {
  position: "absolute",
  top: parseInt(styles.calcPadTop) + 32.5 + "%",
  left: styles.calcPadLeft, 
  background: styles.lightCanvasColor,
  height: "12%",
  width: cashFlowBox.width,
  borderRadius: styles.boxRadius
}
const sliderStyle = {
  position: "absolute",
  top: "60%",
  left: "11%",
  background: "styles.canvasColor",
  cursor: "pointer",
  width: "75%"
}
const DRateText = {
  position: "absolute",
  fontWeight: "bold",
  fontSize: ".8vw",
  left: "13%"
}
const DFactorText = {
  position: "absolute",
  fontWeight: "bold",
  fontSize: ".8vw",
  left: "13%",
  top: "20%"
}
//.......SKETCHBOX...........
const sketchBox = {
  position: "absolute",
  top: styles.calcPadTop,
  left: "29%", 
  background: styles.lightCanvasColor,
  height: styles.firstRowHeight,
  width: "41%",
  borderRadius: styles.boxRadius
}

//.....NpvStatBOX.....

const NpvStatBox = {
  position: "absolute",
  top: styles.calcPadTop,
  left: "73%", 
  background: styles.lightCanvasColor,
  height: styles.firstRowHeight,
  width: "18.5%",
  borderRadius: styles.boxRadius
}

// const innerNpvStatBox = {
//   position: "absolute",
//   top: "65%", 
//   background: styles.innerCashBoxColor,
//   height: "15%",
//   width: "100%",
//   overflowY: "scroll",
//   overflowX: "auto"
//   //fontWeight: "800"
// }


const NPVHeader = {

  position: "relative",
  fontWeight: "medium",
  fontSize: "1.8vw",
  top: 0,
  color: styles.gray,
  textAlign: "center",
  marginTop: 0
  

}
// const histListContents = { 
//   paddingTop: 0,
//   width: "100%",
//   height:"30%",
//   color: styles.negativeColor
// }

//......GRAPH BOX.......

const graphBox = {
  position: "absolute",
  top: styles.bottomRowPadTop,
  left: "44%", 
  background: styles.lightCanvasColor,
  height: styles.secondRowHeight,
  width: "47.5%",
  borderRadius: styles.boxRadius
}

const InstructionBox = {
  position: "absolute",
  top: styles.bottomRowPadTop,
  left: styles.calcPadLeft, 
  background: '#FAEFC5',
  height: styles.secondRowHeight,
  width: "32.5%",
  borderRadius: styles.boxRadius
}


const header1 = {
  fontWeight: "bold",
  fontSize: ".8vw",
  textAlign: "center"
}


const header3 = {
  fontWeight: "bold",
  fontSize: "1.2vw",
  textAlign: "center"
}


const arrow1Style = {
  position: "static",
  background: "none",
  paddingLeft: "27%",
  paddingTop: "20%"
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
const instructionTitle = {
  fontSize: "1.1vw",
  fontFamily: 'Montserrat',
  textAlign: "center",
  fontWeight: "bold"
}
const instructTextStyle = {
  fontSize: ".6vw",
  fontFamily: 'Montserrat',
  paddingLeft: "5%",
  paddingRight: "5%",
  fontWeight: "regular"
}
const instructTextCenter = {
  fontSize: ".7vw",
  paddingLeft: "5%",
  paddingRight: "5%",
  textAlign: "center",
  fontWeight: "bold"
}
function instructionText() {
  return(
    <div>
      <p style={instructionTitle}>INSTRUCTIONS</p>
      <p style = {instructTextStyle}>1. Enter as many cash flow periods as you'd like. The # inside the dollar sign represents the # of periods in the future where: </p>
      <p style= {{position: "absolute", left: "12%", top: "23%"}}>{dollSymbol(0, "black")}</p>
     <p style = {instructTextCenter}> = dollars in Period 0 (present day) </p>
     <p style = {instructTextStyle}>2. When you adjust the discount rate, all future cash flows become "converted" into present day units.</p>
     <a  style= {instructTextStyle} href="url">See part 1 + 2 of NPV Video</a>
     <p style = {instructTextStyle}>3. More instructions and links will go here in the finished version</p>

    </div>
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
      <text style={{fontSize: "2vw", fontWeight: "400", fill: color}} x="8%" y="75%">$</text>
      <circle style={{fill: color}} cx="52%" cy="78%" r="18%"/>
      <text style={{fontSize: numSize + "vw", fontWeight: "700", fill: styles.innerCashBoxColor}} x={numX} y={numY}>{value}</text>
    </svg>
    
  ) 
}


//the bottom arrow is getting shifted up whenever the page reloads for some reason
function arrow() {
  let bottomArrowLeft = 74;
  let bottomArrowTop = 58;
  let firstArrow = getPathSVG("drawArrow", [[0,0], [0,6], [1.5,3]], "none", 0, 0, 0, "black")
  let secondArrow = getPathSVG("secondarrow", [[60,0], [60,6], [61.5,3]], "none", 0, 0, 0, "black")
  let thirdArrow = getPathSVG("thirdarrow", [[bottomArrowLeft,bottomArrowTop], [bottomArrowLeft+3.5,bottomArrowTop], [bottomArrowLeft+1.75,bottomArrowTop + 3]], "none", 0, 0, 0, "black")
  let viewBox = "0 0 100 100";

  return ( <svg viewBox = {viewBox} >{firstArrow}{secondArrow}{thirdArrow}</svg>)
  
};

function App() {



//hook that makes sure dom is rerendered if a button is clicked, even if theNpv hasn't changed
const [npvRan, setNpvRan] = React.useState(0);
calcData.testVar = npvRan;
//console.log( "irr " + findIRR([100], 100));
let zeroCashInputStyle = {
  
  position: "absolute",
  background: "none",
  width: "80%",
  height: "22%",
  fontSize: ".7vw",
  border: "none",
  color: styles.negativeColor
}
function handleCashFlowChange() {
  findNPV(calcData.cashFlows, calcData.r, calcData.initialInvest);
  calcData.npvSnap = [[0,0]];      
  loggedNPVs = [];
}
function minusButton(value) {
  return(
      <svg height="1.2vw" width="2vw" onClick= {() => {calcData.cashFlows.splice(value,1); handleCashFlowChange()} } >
  
        <circle style={minusButtonStyle} cx="56%" cy="50%" r="32%"/>
        <line style={minusLineStyle} x1="44%" y1="50%" x2="67%" y2="50%"/>    
      </svg>
  )
}

function autoButton() {
  return (
    <div>
      <button onClick= {() => {calcData.irr = Math.round((findIRR(calcData.cashFlows, calcData.initialInvest)[0]) * 100) / 100; setNpvRan(npvRan + 1) }}>AUTO IRR</button>
      <p>irr:{calcData.irr}</p>
    </div>
    )
}
 
function cashFlowPlusBtn() {
  return(
    <svg height="1.3vw" width="1.3vw" style={plusBtnContainer} onClick= {() => {if (calcData.initialInvest != ""){ calcData.cashFlows.push(0); handleCashFlowChange()}} } >   
      <circle style={plusButtonStyle} cx="50%" cy="50%" r="38%"/>
      <line style={plusLineStyle} x1="30%" y1="50%" x2="70%" y2="50%"/>    
      <line style={plusLineStyle} x1="50%" y1="70%" x2="50%" y2="30%"/> 
    </svg>
  ) 
}


// function dollSymbol(value, color) {
//   let numSize = .6; 
//   let numX = "39%";
//   let numY = "86%";
//   if (value > 9) {
//     numSize= .5;
//     numX = "31%"
//     numY = "85%"
//   }
 
//   return(
    
//     <svg style={{position: "absolute", background: "none"}} height="2.6vw" width="1.5vw" >
//       <text style={{fontSize: "2.2vw", fontWeight: "400", fill: color}} x="4%" y="80%">$</text>
//       <circle style={{fill: color}} cx="52%" cy="78%" r="18%"/>
//       <text style={{fontSize: numSize + "vw", fontWeight: "700", fill: styles.innerCashBoxColor}} x={numX} y={numY}>{value}</text>
//     </svg>
    
//   ) 
// }
function snapNPVBtn() {
  return (<Button style={{position: "absolute", width: "10vw", fontSize: "1vw", background: styles.gray, color: styles.lightCanvasColor, fontFamily: 'Fira Code', padding: 0, left: "-.4vw", width: "10vw", height: "2vw"}} variant="contained"  onClick ={ () => {handleNPVSnap()}}  >PLOT ON GRAPH</Button>)
  //return (<button style={snapNPVBtnStyle} name="npvsnap" onClick ={ () => {calcData.npvSnap.push({x: calcData.r, y: calcData.theNPV }); calcData.snapGraphX++; setNpvRan(npvRan + 1); }}>FIND NPV</button>  )
}
function handleNPVSnap() {
  if (calcData.initialInvest != "") {
    calcData.npvSnap.unshift([calcData.r, calcData.theNPV]); 
    setNpvRan(npvRan + 1); 
  }
}

// function logNPV() {
 
//   loggedNPVs.unshift(
//     <div style = {histListContents}>
//       <svg style={{ position: "absolute", background: "none"}} height="30%" width="100%">
//         <text style={{ fontSize: "1.2vw" }} x="0" y="70%">{calcData.theNPV.toFixed(2)}</text>
//         <text style={{ fontSize: "1.2vw" }} x="75%" y="70%">{calcData.r}%</text>
//       </svg>
//     </div>
//     )
// }


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
            <input style={zeroCashInputStyle} placeholder="<Enter Initial Investment Here>"  key={"inINVhold"}  type="text" name ={"initialInv"} onChange={(event) => {calcData.initialInvest = event.target.value; handleCashFlowChange()}} />  
          </div>
          <div style={lineBreak}/>
        </div>
      )

  

  for (let value in calcData.cashFlows) {
    if (calcData.cashFlows[value] < 0){
      contents.push(
        <div>
          <div style={negCashContents}>
            {minusButton(value)} 
            {dollSymbol(parseInt(value) + 1, styles.negativeColor)}  
            <input style={negCashInputStyle} key={"cashflow" + value} value={calcData.cashFlows[value]} type="text" name ={value + "cashFlow"} onChange={(event) => {calcData.cashFlows[value] = event.target.value; handleCashFlowChange()}} />  
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
          <input style={cashInputStyle} key={"cashflow" + value} value={calcData.cashFlows[value]} type="text" name ={value + "cashFlow"} onChange={(event) => {calcData.cashFlows[value] = event.target.value; handleCashFlowChange()}} />  
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
    <input type="range" min="0" max="100" step="1"  style={sliderStyle} name ="ROR" onChange={(event) => {calcData.r = event.target.value; calcData.discountFactor = rndNearTenth(1/ (1 + (calcData.r/100))); findNPV(calcData.cashFlows, calcData.r, calcData.initialInvest)}} />
  )   
}



return (
  <div style={calcCanvas}>
    
    <p style={calcTitle}>NET PRESENT VALUE CALCULATOR</p>
    <div style={arrow1Style}>{arrow()}</div>
    <div style={cashFlowBox}><p style={header1}>CASH FLOWS</p>
      <div style={innerCashBox}>{CashFlowContents()}</div>
      <div style={cashBottom}>{cashFlowPlusBtn()}</div>
      <p style={cashBtmTxt}>Add another</p>
    </div>

    <div style={dRateBox}>
      <p style={DRateText}>DISCOUNT RATE: {calcData.r}%</p>
      
      <p style={DFactorText}>DISCOUNT FACTOR: {calcData.discountFactor}</p>
      {DiscountRateSlider()}
    </div>

    <div style={sketchBox}>
      <p style={header1}>ADJUSTED CASH FLOWS</p>
      <Sketch/>
    </div>
    
    <div style={NpvStatBox}>
      <p style={header1}>NET PRESENT VALUE</p>  
      <p style={NPVHeader}>{calcData.theNPV}</p> 
      <p style={header1}>AVG NPV PER YEAR</p>  
      <p style={NPVHeader}>{calcData.avgNpvYr}</p>     
      <div style={snapButtonPos}>{snapNPVBtn()}</div>
    </div>

    <div style ={graphBox}>
 
      <Graph/>
    </div>

    <div style ={InstructionBox}>{instructionText()}</div>

    
    
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
   
    npvOut =  Math.round((npv - calcData.initialInvest) * 100) / 100;
    calcData.avgNpvYr = (npvOut/cashFlows.length).toFixed(2);
    calcData.theNPV = npvOut.toFixed(2);
    
    //return (npvOut);
  }
  //{calcData.cashFlows.map((number) => <li key ={number.toString()}>{number}




























} 


export default App;