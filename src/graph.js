import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, MarkSeries, LabelSeries, VerticalGridLines, XAxis, YAxis} from 'react-vis';
import {styles} from './App.js';
import {calcData} from "./App.js";




function Graph()  {
    let canvasWidth = window.innerWidth;
    let graphWidth = canvasWidth* .15;
    let graphHeight = graphWidth;
    console.log("ran graph");
    
    let graphColor = styles.gray;
    if (calcData.theNPV === 0) {
        graphColor = styles.irrColor;
    }

    
    let fontSize = ".5vw"
   
    let data = calcData.npvSnap;

  
    
    // const data = [
    //   {x: 0, y: 8, label: '200', style: {fontSize: fontSize} },
    //   {x: 1, y: -5, label: 'woah'},
    //   {x: 2, y: 4, label: 'woah'},
    //   {x: 3, y: 9},
    //   {x: 4, y: 1},
    //   {x: 5, y: 7},
    //   {x: 6, y: 6},
    //   {x: 7, y: 3},
    //   {x: 8, y: 2},
    //   {x: 9, y: 0, label: 'woah'}
    // ];
    return (
      <div>
        <div style={{position: "absolute", background: "none", top: "10%"}}className="Graph">
            <XYPlot style={{position: "absolute"}}height={graphHeight} width={graphWidth}>    
        
            
            <YAxis title="NPV" />
            <XAxis title="Discount Rate" />
            {/* <LabelSeries color={graphColor} data={data}  /> */}
            <MarkSeries color={graphColor} data={data}  />
            <LineSeries color={graphColor} data={[{x: 0, y:0}, {x: 100, y: 0}]} />
            </XYPlot>
        </div>
        
      </div>
    );
  
}

export default Graph;