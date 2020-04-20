
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
            viewHeightMultiplier: null
        }
    }
    
    for (var value in modCashFlows) {
        if (modCashFlows[value] > 0) {
            drawData.values.allBarValues.push(modCashFlows[value]);
            
        }
        else if (modCashFlows[value] < 0) {
            drawData.values.allBarValues.push(modCashFlows[value] * -1);
        }
    }
    drawData.values.allBarValues.sort((a,b) => b-a);
    drawData.values.viewHeightMultiplier = 92/drawData.values.allBarValues[0];

    
    
    for (var value in modCashFlows) {
        if (modCashFlows[value] > 0) {
            drawData.values.drawBarHeights.push(modCashFlows[value] * drawData.values.viewHeightMultiplier);
            drawData.points.numPoints.pos +=1;
        }
        if (modCashFlows[value] < 0) {
            drawData.values.drawBarHeights.push(modCashFlows[value] * drawData.values.viewHeightMultiplier);
            drawData.points.numPoints.neg +=1;
        } 
    }

    const barWidth = (drawData.values.drawBoxWidth / (drawData.values.drawBarHeights.length) / 1.5);
    const barPadX = barWidth / 2;
    const glassPad = Math.min(barPadX / 4, 2);
    const doubleGlassPad = glassPad * 2;
    drawData.rectangles.betweenGlass = barPadX - doubleGlassPad;
    let barPosX = (barPadX / 2);
    const barCanvas = drawData.values.drawBoxHeight - 4;

    //push svg data for bars
    for (var value in drawData.values.drawBarHeights) {
        let key = value;
        if (drawData.values.drawBarHeights[value] > 0) {  
            drawData.rectangles.bars.push(getRectangleSVG(key, [barPosX, barCanvas - drawData.values.drawBarHeights[value]], barWidth, drawData.values.drawBarHeights[value], "blue"));
            drawData.rectangles.glass.push(getRectangleSVG("glass" + key, [barPosX - glassPad, 2], barWidth + doubleGlassPad, 96, "none", "black", .3, 1));
            drawData.points.wavePoints.push([barPosX, barCanvas - drawData.values.drawBarHeights[value]]);
            drawData.points.wavePoints.push([barPosX + barWidth, barCanvas - drawData.values.drawBarHeights[value]]);
            
            drawData.points.negWavePoints.push([barPosX, drawData.values.drawBoxHeight]);
            drawData.points.negWavePoints.push([barPosX + barWidth, drawData.values.drawBoxHeight]);
            
            barPosX += (barWidth + barPadX);
        }
        else if (drawData.values.drawBarHeights[value] < 0) {
            drawData.rectangles.bars.push(getRectangleSVG(key, [barPosX, barCanvas - (drawData.values.drawBarHeights[value] * -1)], barWidth, (drawData.values.drawBarHeights[value] * -1), "red"));
            drawData.rectangles.glass.push(getRectangleSVG("glass" + key, [barPosX - glassPad, 2], barWidth + doubleGlassPad, 96, "none", "black", .3, 1));

            drawData.points.negWavePoints.push([barPosX, barCanvas - drawData.values.drawBarHeights[value] * -1]);
            drawData.points.negWavePoints.push([barPosX + barWidth, barCanvas - drawData.values.drawBarHeights[value] * -1]);
            
            drawData.points.wavePoints.push([barPosX, drawData.values.drawBoxHeight]);
            drawData.points.wavePoints.push([barPosX + barWidth, drawData.values.drawBoxHeight]);
            
            barPosX += (barWidth + barPadX);
            
        }
    }

    

        
    return(drawData);
    
}
export default GetDrawData;
