import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {styles} from './App.js';
import {calcData} from "./App.js";
import {LineMarkGraph} from './flexgraph.js'





function Graph()  {
  let graphStyles = {
    canvasWidth: "36vw",
    canvasHeight: "15vw",
    canvasPadLeft: "0",
    canvasPadTop: "1vw",
    lineSize: .2,
    fontSize: 2,
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
    xName: "DISCOUNT RATE",
    yName: "NPV",
    zeroLineColor: "#47C4C1",
    zeroLineSize: .3,
    background: "none",
    displayInit: "DISCOUNT RATE: 0 NPV: 0",
    displayFontSize: 2,
    displayFontWeight: "bold",
    displayColor: "black"
  
  }

 
  let calcInput = [[0,0]];
  if (calcData.npvSnap != 0) {
    calcInput = calcData.npvSnap
  }


let lineColor = styles.gray
  let data = {
    "#C2C2C2": calcInput
  };


// let styles = [];
let graph = LineMarkGraph(data, graphStyles);
    
//<FlexibleXYPlot margin={{left: 0, right: 0, top: 0, bottom: 0}}>    
    return (
      <div  >
       {graph}
      </div>
    );
  
}

export default Graph;