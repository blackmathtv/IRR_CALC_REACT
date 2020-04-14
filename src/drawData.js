
import React from 'react';
import {modCashFlows} from "./App.js";

function getRectangleSVG(key, topLeftPoint, width, height, fill, strokeColor, strokeWidth) {
    return(
        <rect 
        key={key}
        x={topLeftPoint[0]} y ={topLeftPoint[1]} //array [x,y]
        width = {width} height = {height}
        fill={fill} //string
        stroke={strokeColor} //string
        strokeWidth={strokeWidth} 
    />
    )
}

function GetDrawData () {
    console.log("Ran GetDrawData");
    var canvasHeight = 100;
    var canvasWidth = 200;
    var allBarValues = [];
    const drawData = {
        viewHeightMultiplier: null,
        allBarHeights: [],
        points: { 
            numPoints: {pos: null, neg: null},
            spacing: {pos: null, neg: null},    
            wavePoints: [],
            negWavePoints: []  
        },
        rectangles: {
            bars: [],
            glass: []
        }
    }
    console.log(drawData);
    for (var value in modCashFlows) {
        if (modCashFlows[value] > 0) {
            allBarValues.push(modCashFlows[value]);
            
        }
        else if (modCashFlows[value] < 0) {
            allBarValues.push(modCashFlows[value] * -1);
        }
    }
    allBarValues.sort((a,b) => b-a);
    drawData.viewHeightMultiplier = 100/allBarValues[0];

    
    
    for (var value in modCashFlows) {
        if (modCashFlows[value] > 0) {
            drawData.allBarHeights.push(modCashFlows[value] * drawData.viewHeightMultiplier);
            drawData.points.numPoints.pos +=1;
        }
        if (modCashFlows[value] < 0) {
            drawData.allBarHeights.push(modCashFlows[value] * drawData.viewHeightMultiplier);
            drawData.points.numPoints.neg +=1;
        } 
    }

    var barWidth = (canvasWidth / (drawData.allBarHeights.length) / 1.5);
    var barPadX = barWidth / 2;
    var glassPad = barPadX / 4;
    var barPosX = (barPadX / 2);

    //push svg data for bars
    for (var value in drawData.allBarHeights) {
        let key = value;
        if (drawData.allBarHeights[value] > 0) {  
            drawData.rectangles.bars.push(getRectangleSVG(key, [barPosX, canvasHeight - drawData.allBarHeights[value]], barWidth, drawData.allBarHeights[value], "blue"));
            drawData.points.wavePoints.push([barPosX, canvasHeight - drawData.allBarHeights[value]]);
            drawData.points.wavePoints.push([barPosX + barWidth, canvasHeight - drawData.allBarHeights[value]]);
            barPosX += (barWidth + barPadX);
        }
        else if (drawData.allBarHeights[value] < 0) {
            drawData.rectangles.bars.push(getRectangleSVG(key, [barPosX, canvasHeight - (drawData.allBarHeights[value] * -1)], barWidth, (drawData.allBarHeights[value] * -1), "red"));
            drawData.points.negWavePoints.push([barPosX, canvasHeight - drawData.allBarHeights[value] * -1]);
            drawData.points.negWavePoints.push([barPosX + barWidth, canvasHeight - drawData.allBarHeights[value] * -1]);
            barPosX += (barWidth + barPadX);
            
        }
    }

    

        
    return(drawData);
    
}
export default GetDrawData;
