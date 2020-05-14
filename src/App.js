import React from 'react';
import Sketch from './sketch'
import './App.css';
import Graph from './graph.js';
import findIRR from './irr.js';
import GetDrawData from "./drawData.js";
import Button from '@material-ui/core/Button';
import { getPathSVG, drawCanvas, FlexButton } from "./flexgraph.js";


export var modCashFlows = [];




const dollarFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

const commaFormat = (number) => Intl.NumberFormat().format(number);
var idk = "38843,3992"
const removeCommas = (num) => parseFloat(num.replace(/,/g, ''))

function rndNearTenth(num) {
  return parseFloat((Math.round(num * 100) / 100).toFixed(2));
}

const numFormatter = new Intl.NumberFormat('en-US', {
  style: "decimal",
  maximumFractionDigits: 2
})

var someNumber = -88233442.57674;
// console.log(commaFormat(someNumber));
// console.log(rndNearTenth(939,85.11222))
// console.log(numFormatter.format(someNumber));

let canvasWidth = window.innerWidth * .9;
let canvasHeight = canvasWidth / 2.32;
let loggedNPVs = [];


export let calcData = {
  initialInvest: 0,
  cashFlows: [0, 0, 0, 0, 0],
  modCashFlows: [],
  theNPV: 0,
  npvSnap: [],
  snapGraphX: 0,
  r: "50.00",
  testVar: 0,
  irr: null,
  discountFactor: .67,
  avgNpvYr: 0,
  allNpvPoints: []
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
  bottomRowPadTop: "57%",
  firstRowHeight: "44.5%",
  secondRowHeight: "38%",
  lightBlue: "#47C4C1"
}



const calcCanvas = {
  position: "absolute",
  left: "13%",
  top: "10%",

  background: styles.canvasColor,
  height: "50vw",
  width: "74vw",
}

const calcTitle = {
  position: "absolute",
  fontWeight: "bold",
  fontSize: "2vw",
  left: styles.calcPadLeft,
  top: parseInt(styles.calcPadTop) - 11 + "%",
}
//..........CASHBOX......//

const cashFlowBox = {
  position: "absolute",
  top: styles.calcPadTop,
  left: styles.calcPadLeft,
  background: styles.lightCanvasColor,
  height: "57%",
  width: "18%",
  borderRadius: ".5vw"
}
const innerCashBox = {
  position: "absolute",
  top: "8%",
  background: styles.innerCashBoxColor,
  height: "86%",
  width: "100%",
  overflowY: "scroll",
  overflowX: "auto"
  //fontWeight: "800"
}

// const cashContents = {
//   fontSize: "2vw",
//   width: "100%",
//   height: "2.6vw",
//   color: styles.positiveColor
// }
const cashContents = {
  background: "none",
  width: "100%",
  height: "2.6vw",
}
// const cashInputStyle = {
//   position: "absolute",
//   background: "none",
//   width: "57%",
//   height: "22%",
//   left: "27%",
//   fontSize: "1.8vw",
//   border: "none",
//   color: styles.positiveColor
// }

// const negCashInputStyle = {
//   position: "absolute",
//   background: "none",
//   width: "57%",
//   height: "22%",
//   left: "27%",
//   fontSize: "1.8vw",
//   border: "none",
//   color: styles.negativeColor
// }
const cashBottom = {
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
const plusBtnContainer = {
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
// const negInitialInvStyle = {
//   fontSize: "2vw",
//   width: "auto",
//   height: "2.6vw",
//   marginLeft: "15%",
//   color: styles.negativeColor,


// }

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
  top: 70 + "%",
  left: styles.calcPadLeft,
  background: styles.lightCanvasColor,
  height: "15%",
  width: cashFlowBox.width,
  borderRadius: styles.boxRadius
}
const sliderStyle = {
  position: "absolute",
  top: "36%",
  left: "11%",
  background: "styles.canvasColor",
  cursor: "pointer",
  width: "75%",
  height: "25%"
}
const DRateText = {
  position: "absolute",
  fontWeight: "bold",
  fontSize: ".8vw",
  left: "1vw",
  top: "0vw"
}
const DFactorText = {
  position: "absolute",
  fontWeight: "bold",
  fontSize: ".8vw",
  left: "1vw",
  top: "65%"
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
  left: "29%",
  background: styles.lightCanvasColor,
  height: styles.secondRowHeight,
  width: "62.5%",
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
  display: "grid",
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



// function instructionText() {
//   return (
//     <div>
//       <p style={instructionTitle}>INSTRUCTIONS</p>
//       <p style={instructTextStyle}>1. Enter as many cash flow periods as you'd like. The # inside the dollar sign represents the # of periods in the future where: </p>
//       <p style={{ position: "absolute", left: "3vw", marginTop: "-3%" }}>{dollSymbol(0, "black")}</p>
//       <p style={instructTextCenter}> = dollars in Period 0 (present day) </p>
//       <p style={instructTextStyle}>2. When you adjust the discount rate, all future cash flows become "converted" into present day units.</p>
//       <a style={instructTextStyle} href="url">See part 1 + 2 of NPV Video</a>
//       <p style={instructTextStyle}>3. More instructions and links will go here in the finished version</p>

//     </div>
//   )
// }


function dollSymbol(value, color) {
  let numSize = .6;
  let numX = "39%";
  let numY = "86%";
  if (value > 9) {
    numSize = .5;
    numX = "31%"
    numY = "85%"
  }

  return (

    <svg style={{ position: "absolute", background: "none" }} height="2.6vw" width="1.5vw" >
      <text key="dollarSymbol" style={{ fontSize: "2vw", fontWeight: "400", fill: color }} x="8%" y="75%">$</text>
      <circle key="dollcircle" style={{ fill: color }} cx="52%" cy="78%" r="18%" />
      <text key="innernumber" style={{ fontSize: numSize + "vw", fontWeight: "700", fill: styles.innerCashBoxColor }} x={numX} y={numY}>{value}</text>
    </svg>

  )
}


//the bottom arrow is getting shifted up whenever the page reloads for some reason

const drawArrows = () => {
  let canvasStyles = {
    canvasPadLeft: 0,
    canvasPadTop: 0,
    canvasWidth: "74vw",
    canvasHeight: "50vw",
    canvasColor: "none"
  };

  let firstArrowLeft = 27;
  let firstArrowTop = 30;
  let secondArrowLeft = 71;
  let secondArrowTop = 30;
  // let bottomArrowLeft = 80;
  // let bottomArrowTop = 56
  let secondArrow = getPathSVG("drawArrowb", canvasStyles, [[secondArrowLeft, secondArrowTop], [secondArrowLeft, secondArrowTop + 3], [secondArrowLeft + 1.25, secondArrowTop + 1.5]], "none", 0, 0, 0, styles.medLightGray);
  let firstArrow = getPathSVG("drawArrowa", canvasStyles, [[firstArrowLeft, firstArrowTop], [firstArrowLeft, firstArrowTop + 3], [firstArrowLeft + 1.25, firstArrowTop + 1.5]], "none", 0, 0, 0, styles.medLightGray);
  // let thirdArrow = getPathSVG("thirdarrow", canvasStyles, [[bottomArrowLeft, bottomArrowTop], [bottomArrowLeft + 3.5, bottomArrowTop], [bottomArrowLeft + 1.75, bottomArrowTop + 2]], "none", 0, 0, 0, styles.medLightGray);
  let canvas = drawCanvas("arrowcanvas", canvasStyles, [firstArrow, secondArrow]);
  return (canvas);
}



function App() {



  //hook that makes sure dom is rerendered if a button is clicked, even if theNpv hasn't changed
  const [npvRan, setNpvRan] = React.useState(0);
  calcData.testVar = npvRan;

  function rorInput() {
    function percentBox() {
      return (
      <input
        style={{
          position: "absolute",
          // background: "none",
          width: "3vw",
          // height: "2.6vw",
          top: "-.4vw",
          left: "7.4vw",
          fontSize: "1.2vw",
          borderWidth: ".1vw",
          color: styles.lightBlue
        }}
        key={"rorinput"}
        value={calcData.r}
        type="text" name={"ror"}
        onChange={(event) => {
          if (event.target.value < 0) {
            calcData.r = 0;
          }
          else if (event.target.value > 100) {
            calcData.r = 100;
          }
          else {
            calcData.r = event.target.value;
          }
          calcData.discountFactor = rndNearTenth(1 / (1 + (calcData.r / 100))); findNPV(calcData.cashFlows, calcData.r, calcData.initialInvest)
        }}/>
      )
    }


    return (
      <p style={DRateText}>RATE OF RETURN:{percentBox()}<p style = {{ fontSize: "1.4vw", position: "absolute", top: "-1.8vw", left: "11vw", color: styles.lightBlue}}>%</p></p>
    )
  }


  function handleCashFlowChange() {
    calcData.allNpvPoints = [];
    let yearZero = parseFloat(calcData.cashFlows[0]);
    calcData.initialInvest = yearZero;
    //find the npv for every point between 1 and 100
    for (let i = 0; i <= 100; i++) {
      let npvOut = null;
      let rDec = i / 100;
      let npv = null;
      for (let flow = 1; flow < calcData.cashFlows.length; flow++) {
        let powerOf = parseInt(flow) + 1;
        let discountedFlow = calcData.cashFlows[flow] / Math.pow(1 + rDec, powerOf);
        npv += discountedFlow;
      }
      npvOut = Math.round((npv + yearZero) * 100) / 100;
      calcData.allNpvPoints.push([i, npvOut]);
    }

    findNPV(calcData.cashFlows, calcData.r);
    calcData.npvSnap = [];
    loggedNPVs = [];
  }
  function minusButton(value) {
    return (
      <svg height="1.2vw" width="2vw" onClick={() => { calcData.cashFlows.splice(value, 1); handleCashFlowChange() }} >

        <circle style={minusButtonStyle} cx="56%" cy="50%" r="32%" />
        <line style={minusLineStyle} x1="44%" y1="50%" x2="67%" y2="50%" />
      </svg>
    )
  }

  function autoButton() {
    return (
      <div>
        <button onClick={() => { calcData.irr = Math.round((findIRR(calcData.cashFlows, calcData.initialInvest)[0]) * 100) / 100; setNpvRan(npvRan + 1) }}>AUTO IRR</button>
        <p>irr:{calcData.irr}</p>
      </div>
    )
  }

  function cashFlowPlusBtn() {
    return (
      <svg height="1.3vw" width="1.3vw" style={plusBtnContainer} onClick={() => { calcData.cashFlows.push(0); handleCashFlowChange() }} >
        <circle style={plusButtonStyle} cx="50%" cy="50%" r="38%" />
        <line style={plusLineStyle} x1="30%" y1="50%" x2="70%" y2="50%" />
        <line style={plusLineStyle} x1="50%" y1="70%" x2="50%" y2="30%" />
      </svg>
    )
  }



  function snapNPVBtn() {
    return (<Button style={{ position: "relative", left: "2vw", width: "10vw", fontSize: "1vw", background: styles.gray, color: styles.lightCanvasColor, fontFamily: 'Fira Code', padding: 0, height: "2vw", borderRadius: ".2vw" }} variant="contained" onClick={() => { handleNPVSnap() }}  >PLOT ON GRAPH</Button>)
    //return (<button style={snapNPVBtnStyle} name="npvsnap" onClick ={ () => {calcData.npvSnap.push({x: calcData.r, y: calcData.theNPV }); calcData.snapGraphX++; setNpvRan(npvRan + 1); }}>FIND NPV</button>  )
  }
  function handleNPVSnap() {
    if (calcData.initialInvest != "") {
      calcData.npvSnap.unshift([calcData.r, calcData.theNPV]);
      setNpvRan(npvRan + 1);
    }
  }

  function plotButton() {
    let buttonStyle = {
      canvasWidth: "70%",
      canvasHeight: "15%",
      canvasPadLeft: "15%",
      canvasPadTop: "60%",
      btnColor: styles.gray,
      btnStrokeColor: "none",
      btnStrokeWidth: 1,
      btnRadius: 2,
      btnDisplay: "PLOT ON GRAPH",
      btnFontSize: 10,
      btnFontColor: styles.lightCanvasColor,
      btnFontWeight: "medium",
      btnTextRange: [9, 14]
    }

    let mouseDown = () => handleNPVSnap();
    return FlexButton("plotButton", buttonStyle, mouseDown)
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
  // let drawArrows = {};
  // React.useEffect(()=> {



  // });
  // let zeroCashInputStyle = {

  //   position: "absolute",
  //   background: "none",
  //   width: "80%",
  //   height: "22%",
  //   fontSize: ".7vw",
  //   border: "none",
  //   color: styles.positiveColor
  // }

  function CashFlowContents() {
    let dollColor = styles.positiveColor;


    // if (calcData.initialInvest === "") {
    //   zeroCashInputStyle.fontSize = ".8vw";
    // }
    // else if (calcData.initialInvest >= 0 && calcData.initialInvest != "") {
    //   zeroCashInputStyle.fontSize = "2vw";
    //   zeroCashInputStyle.color = styles.positiveColor;

    // }
    // else if (calcData.initialInvest < 0) {
    //   zeroCashInputStyle.fontSize = "2vw";
    //   zeroCashInputStyle.color = styles.negativeColor;
    //   dollColor = styles.negativeColor;
    // }
    let contents = [];

    // contents.push(
    //   <div key={"initialentry"}>
    //     <div style={{ position: "absolute", left: "2%", bottom: "100%" }}>{dollSymbol(0, dollColor)}</div>
    //     <div style={negInitialInvStyle}>
    //       <input style={zeroCashInputStyle} placeholder="<Enter Initial Investment Here>" key={"inINVhold"} type="text" name={"initialInv"} onChange={(event) => { calcData.initialInvest = parseFloat(event.target.value); handleCashFlowChange() }} />
    //     </div>
    //     <div style={lineBreak} />
    //   </div>
    // )



    for (let value in calcData.cashFlows) {
      let color = styles.positiveColor;

      if (calcData.cashFlows[value] < 0) {
        color = styles.negativeColor;
      }
      contents.push(
        <div key={"cashflow" + value}>
          <div style={cashContents}>

            {dollSymbol(parseInt(value), color)}
            <input style={{
              position: "absolute",
              background: "none",
              width: "9vw",
              height: "2.6vw",
              left: "2vw",
              fontSize: "1.8vw",
              border: "none",
              color: color
            }} key={"cashflow" + value}
              value={calcData.cashFlows[value]}
              type="text" name={value + "cashFlow"}
              onChange={(event) => {

                calcData.cashFlows[value] = event.target.value;
                handleCashFlowChange()
              }} />
            {/* {minusButton(value)} */}
          </div>
          <div style={lineBreak} />
        </div>
      )

    }

    return (contents)
  }

  function DiscountRateSlider() {
    return (
      <input type="range" min="0" max="100" step={1} style={sliderStyle} value={calcData.r} name="ROR" onChange={(event) => { calcData.r = parseFloat(event.target.value).toFixed(2); calcData.discountFactor = rndNearTenth(1 / (1 + (calcData.r / 100))); findNPV(calcData.cashFlows, calcData.r, calcData.initialInvest) }} />
    )
  }



  return (
    <div style={calcCanvas}>
      {drawArrows()}
      <p style={calcTitle}>NET PRESENT VALUE CALCULATOR</p>

      <div style={cashFlowBox}><p style={header1}>CASH FLOWS</p>
        <div style={innerCashBox}>{CashFlowContents()}</div>
        <div style={cashBottom}>{cashFlowPlusBtn()}</div>
        <p style={cashBtmTxt}>Add another</p>
      </div>

      <div style={dRateBox}>
        {rorInput()}
        {DiscountRateSlider()}
        <p style={DFactorText}>DISCOUNT FACTOR: {calcData.discountFactor}</p>

      </div>

      <div style={sketchBox}>
        <p style={header1}>CASHFLOWS AT PRESENT VALUE</p>
        <Sketch />
      </div>

      <div style={NpvStatBox}>
        <p style={header1}>NET PRESENT VALUE</p>
        <p style={NPVHeader}>{calcData.theNPV}</p>
        <p style={header1}>AVG NPV PER PERIOD</p>
        <p style={NPVHeader}>{calcData.avgNpvYr}</p>

      </div>

      <div style={graphBox}>
        {Graph()}
      </div>
      {/* {plotButton()} */}





    </div>
  )

  function findNPV(cashFlows, r) {
    //push r value to interface 

    //ensures DOM will update even if npv didnt change
    setNpvRan(npvRan + 1);




    let yearZero = parseFloat(cashFlows[0]);


    let npvOut = null;
    let rDec = r / 100;
    let npv = null;
    //reset modded cash flows
    calcData.modCashFlows = [];
    calcData.modCashFlows.push(yearZero);
    calcData.initialInvest = yearZero;
    for (let flow = 1; flow < cashFlows.length; flow++) {

      let powerOf = parseInt(flow) + 1;
      let discountedFlow = cashFlows[flow] / Math.pow(1 + rDec, powerOf);
      calcData.modCashFlows.push(discountedFlow);
      npv += discountedFlow;
    }

    npvOut = Math.round((npv + yearZero) * 100) / 100;

    calcData.avgNpvYr = (npvOut / (cashFlows.length + 1)).toFixed(2);
    calcData.theNPV = npvOut.toFixed(2);

    //return (npvOut);
  }
  //{calcData.cashFlows.map((number) => <li key ={number.toString()}>{number}




























}


export default App;