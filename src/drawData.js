
import React from 'react';
import {modCashFlows} from "./App.js";

function getRectangleSVG(key, topLeftPoint, width, height, fill, strokeColor, strokeWidth, radius) {
    return(
        <rect 
        key={key}
        x={topLeftPoint[0]} y ={topLeftPoint[1]} //array [x,y]
        width = {width} height = {height}
        fill={fill} //string
        stroke={strokeColor} //string
        strokeWidth={strokeWidth} 
        rx={radius}
    />
    )
}

function GetDrawData () {
    console.log("Ran GetDrawData");
   
    
    //values Before 
    const drawData = {
        points: { 
            numPoints: {pos: null, neg: null},
            spacing: {pos: null, neg: null},    
            wavePoints: [],
            negWavePoints: []  
        },
        rectangles: {
            bars: [],
            glass: [],
            betweenGlass: null
        },
        values: {
            drawBoxHeight: 100,
            drawBoxWidth: 200,
            allBarValues: [],
            drawBarHeights: [],
            viewHeightMultiplier: null,
            barWidth: null,
            barPadX: null,
            glassPad: null,
            doubleGlassPad: null,
            barPosx: null,
            barCanvas: null
        }
    }
    
    for (var value in modCashFlows) {
        if (modCashFlows[value] >= 0) {
            drawData.values.allBarValues.push(modCashFlows[value]);
            
        }
        else if (modCashFlows[value] < 0) {
            drawData.values.allBarValues.push(modCashFlows[value] * -1);
        }
    }
    drawData.values.allBarValues.sort((a,b) => b-a);
    drawData.values.viewHeightMultiplier = 92/drawData.values.allBarValues[0];

    
    
    for (var value in modCashFlows) {
        if (modCashFlows[value] >= 0) {
            drawData.values.drawBarHeights.push(modCashFlows[value] * drawData.values.viewHeightMultiplier);
            drawData.points.numPoints.pos +=1;
        }
        if (modCashFlows[value] < 0) {
            drawData.values.drawBarHeights.push(modCashFlows[value] * drawData.values.viewHeightMultiplier);
            drawData.points.numPoints.neg +=1;
        } 
    }

    drawData.values.barWidth = (drawData.values.drawBoxWidth / (drawData.values.drawBarHeights.length) / 1.5);
    drawData.values.barPadx = drawData.values.barWidth / 2;
    drawData.values.glassPad = Math.min(drawData.values.barPadx / 4, 2);
    drawData.values.doubleGlassPad = drawData.values.glassPad * 2;
    drawData.rectangles.betweenGlass = drawData.values.barPadx - drawData.values.doubleGlassPad;
    drawData.values.barPosX = (drawData.values.barPadx / 2);
    drawData.values.barCanvas = drawData.values.drawBoxHeight - 4;

    //push svg data for bars


    

        
    return(drawData);
    
}
export default GetDrawData;
