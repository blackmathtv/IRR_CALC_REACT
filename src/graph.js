import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {styles} from './App.js';
import {calcData} from "./App.js";
import {LineMarkGraph} from './flexgraph.js'





function Graph()  {
  let graphStyles = {
    canvasWidth: "43vw",
    canvasHeight: "17vw",
    canvasPadLeft: "2vw",
    canvasPadTop: "1vw",
    
    lineSize: .2,
    fontSize: 1.5,
    fontColor: styles.gray,
    axisColor: styles.canvasColor,
    axisLineSize: .3,
    xTicks: 4,
    yTicks: 4,
    tickColor: "#E8E8E8	",
    tickLineSize: .1,
    clickPointColor: "#47C4C1",
    pointSize: 1,
    selectedPointSize: 2,

    zeroLineColor: "#47C4C1",
    zeroLineSize: .3,
    background: "none",
    drawDisplay: "false",

    drawPoints: "false",
    drawLines: "true"
  }

  let markStyles = {
    canvasWidth: "43vw",
    canvasHeight: "17vw",
    canvasPadLeft: "2vw",
    canvasPadTop: "1vw",
 
    fontSize: 1.5,
    fontColor: styles.gray,
    axisColor: "none",
    xName: "RATE OF RETURN (%)",
    yName: "NPV ($)",
    tickColor: "",
    tickLineSize: .1,
    clickPointColor: "#47C4C1",
    pointSize: 1,
    selectedPointSize: 2,
    drawZeroLine: "false",
    drawAxis: "false",

    background: "none",
    drawPoints: "true",
    drawLines: "false"
  }


  
  // let calcInput = [[0,0]];
  // if (calcData.npvSnap != 0) {
  //   calcInput = calcData.npvSnap
  // }
  
  let calcInput = [[0,0]];

  if (calcData.allNpvPoints != 0) {
    
    calcInput = calcData.allNpvPoints;
  }

let lineColor = styles.gray
  let data = {
    "#47C4C1": calcInput
  };


// let styles = [];
let graph = LineMarkGraph(data, graphStyles);
let mark = LineMarkGraph(calcData.npvSnap, markStyles);


//<FlexibleXYPlot margin={{left: 0, right: 0, top: 0, bottom: 0}}>    
    return (
      <div>
        <div>
          {graph}
        </div>
        <div>
          {mark}
        </div>
      </div>
    );
  
}

export default Graph;