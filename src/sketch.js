import React from 'react';

//import { motion, useAnimatedState } from "framer-motion";
import DrawSmooth  from "./bezierInterp.js";
import GetDrawData from "./drawData.js"
import { spring } from 'popmotion';


//const barValues = [-80,70,-10,20,40,-20,60];
const testPoints = [[20, 30], [40, 80], [60,10], [80, 60],[100, 30], [120, 80], [140,10], [160, 60]];
const testPath = DrawSmooth(testPoints);
const canvasHeight = window.innerHeight/2;
const canvasWidth = canvasHeight * 2;
const pathSettle = 50;
var points = [];
let updateData = true;
let animDrawData = [];
let drawData = [];
console.log(canvasWidth + " canvas width");

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
  
  //const [activeDrawData, setActiveDrawData] = useState(drawData);
  //const drawData = () => { return GetDrawData() };
  const [testVar, setTestVar] = React.useState(0);
  const [aTestPath, setATestPath] = React.useState();

  if (updateData){
    drawData = GetDrawData();
    
  }
  else {
    drawData = animDrawData;
  }
  
  //const drawData = GetDrawData();
  //console.log(activeDrawData);
  console.log("Ran Sketch");
 
  
  

  //const [wavePoints, setWavePoints] = useState(points);
  
  //const [animatedPath, setAnimatedPath] = useAnimatedState(DrawSmooth(GetDrawData().points.wavePoints, 1));

  

 async function runSpring() {  
    
    // for (let point in drawData.points.wavePoints) {
    //   spring({ from: 0, to: 100 })
    //     .start(v => drawData.points.wavePoints[point][1] = v)
    //     console.log(drawData.points.wavePoints);
        
    // }
    for (let point in drawData.points.wavePoints) {
     
      
      spring({ from: drawData.points.wavePoints[point][1], to: pathSettle, stiffness: 150, damping: 5 })
          .start(v => {drawData.points.wavePoints[point][1] = v; setATestPath(DrawSmooth(drawData.points.wavePoints, 1))})
    }
  }
  //wavePoints[0] = [200,100]
  return(
    <div>
      <svg
        style={{
        background: '#333',
        width: canvasWidth, 
        height: canvasHeight 
        }}
        viewBox="0 0 200 100"
        >{drawData.rectangles.bars}{drawData.rectangles.glass}{aTestPath}
      </svg>
      <div>
      <button name="animate" onClick ={ () => {updateData= false; animDrawData = GetDrawData(); runSpring()}}>Animate Waves</button>{testVar}  
      
      </div>
    </div>

  );
}

//const lineCommand = point => `L ${point[0]} ${point[1]}`


export default Sketch;