import React from 'react';
import DrawSmooth  from "./bezierInterp.js";
import GetDrawData from "./drawData.js"
import { spring } from 'popmotion';
import { styles } from './App.js'
import {calcData} from "./App.js";
 


const pathSettle = 50;

let updateData = true;
let animDrawData = [];
let drawData = [];



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

function Sketch(){
  console.log("Ran Sketch");  
  
  const [path, setpath] = React.useState();
 
  if (updateData){
    drawData = GetDrawData();
    let numBars = drawData.values.drawBarHeights.length;
    let  textWidth = ".5vw";
    if (numBars >= 4) {
    textWidth = (2/numBars) + "vw";
    } 
    //push wave points and rectange svg to local drawData
    for (var value in drawData.values.drawBarHeights) {
      let key = value;
      if (drawData.values.drawBarHeights[value] >= 0) {  
          drawData.rectangles.bars.push(getRectangleSVG(key, [drawData.values.barPosX, drawData.values.barCanvas - drawData.values.drawBarHeights[value]], drawData.values.barWidth, drawData.values.drawBarHeights[value], styles.positiveColor));
          drawData.rectangles.glass.push(getRectangleSVG("glass" + key, [drawData.values.barPosX - drawData.values.glassPad, 2], drawData.values.barWidth + drawData.values.doubleGlassPad, 96, "none", styles.gray, .3, 1));
          //drawData.points.wavePoints.push([drawData.values.barPosX, drawData.values.barCanvas - drawData.values.drawBarHeights[value]]);
          drawData.points.wavePoints.push([drawData.values.barPosX + drawData.values.barWidth, drawData.values.barCanvas - drawData.values.drawBarHeights[value]]);         
          //drawData.points.negWavePoints.push([drawData.values.barPosX, drawData.values.drawBoxHeight]);
          drawData.points.negWavePoints.push([drawData.values.barPosX + drawData.values.barWidth, drawData.values.drawBoxHeight]);
          
         
      }
      else if (drawData.values.drawBarHeights[value] < 0) {
          drawData.rectangles.bars.push(getRectangleSVG(key, [drawData.values.barPosX, drawData.values.barCanvas - (drawData.values.drawBarHeights[value] * -1)], drawData.values.barWidth, (drawData.values.drawBarHeights[value] * -1), styles.negativeColor));
          drawData.rectangles.glass.push(getRectangleSVG("glass" + key, [drawData.values.barPosX - drawData.values.glassPad, 2], drawData.values.barWidth + drawData.values.doubleGlassPad, 96, "none", styles.gray, .3, 1));

          //drawData.points.negWavePoints.push([drawData.values.barPosX, drawData.values.barCanvas - drawData.values.drawBarHeights[value] * -1]);
          drawData.points.negWavePoints.push([drawData.values.barPosX + drawData.values.barWidth, drawData.values.barCanvas - drawData.values.drawBarHeights[value] * -1]);
          //  drawData.points.wavePoints.push([drawData.values.barPosX, drawData.values.drawBoxHeight]);
          drawData.points.wavePoints.push([drawData.values.barPosX + drawData.values.barWidth, drawData.values.drawBoxHeight]);
          
          
          
      }
 
      //drawData.rectangles.modFlows.push(<p style={{position: "absolute", left: modPosX + "%", fontSize: "1vw", background: "blue" }}>3</p>);
      drawData.rectangles.modFlows.push(<text key={key + "modText"} style={{fontSize: textWidth}} x={drawData.values.barPosX -1} y="110">{Math.round(calcData.modCashFlows[value])}</text>)
      drawData.values.barPosX += (drawData.values.barWidth + drawData.values.barPadx);
    }

  }
  else {
    drawData = animDrawData;
  }

  async function runSpring() {    
    for (let point in drawData.points.wavePoints) {
      spring({ from: drawData.points.wavePoints[point][1], to: pathSettle, stiffness: 150, damping: 5 })
          .start(v => {drawData.points.wavePoints[point][1] = v; setpath(DrawSmooth(drawData.points.wavePoints, 1))})
    }
  }

  return(
    <div>
      <svg
        style={{
        position: "absolute",
        background: 'none',
        top: "10%",
        left: "5%",
        width: "90%", 
        height: "80%"
        }}
        viewBox="0 0 200 100"
      >{drawData.rectangles.bars}{drawData.rectangles.modFlows}{drawData.rectangles.glass}{path}
      </svg>
      <div>
      {/* <button name="animate" onClick ={ () => {updateData= false; animDrawData = drawData; runSpring()}}>Animate Waves</button>   */}
      
      </div>
    </div>

  );
}

//const lineCommand = point => `L ${point[0]} ${point[1]}`


export default Sketch;