import React from 'react';

//import { motion, useAnimatedState } from "framer-motion";
import DrawSmooth  from "./bezierInterp.js";
import GetDrawData from "./drawData.js"
import { spring } from 'popmotion';


//const barValues = [-80,70,-10,20,40,-20,60];

const points = [[5, 10], [10, 40], [40, 30], [60, 5], [90, 45], [120, 10], [150, 45], [200, 10]]
const canvasHeight = window.innerHeight/2;
const canvasWidth = canvasHeight * 2;
const pathSettle = 50;

console.log(canvasWidth + " canvas width");
const drawData = GetDrawData();



const rect = (
    <rect 
        x={40} y ={0}
        width = {30} height = {65}
        fill="hotpink"
        stroke="black"
        strokeWidth={1}
    />
)


function Sketch(){
  
  //const [activeDrawData, setActiveDrawData] = useState(drawData);
    
  //console.log(activeDrawData);
  console.log("Ran Sketch");
  
  const drawData = GetDrawData();

  //const [wavePoints, setWavePoints] = useState(points);
  const path = DrawSmooth(drawData.points.wavePoints, 1);
  //const [animatedPath, setAnimatedPath] = useAnimatedState(DrawSmooth(GetDrawData().points.wavePoints, 1));

  const negPath = DrawSmooth(drawData.points.negWavePoints, 0);

  async function runSpring() {  
    for (let point in drawData.points.wavePoints) {
      spring({ from: 0, to: 100 })
        .start(v => drawData.points.wavePoints[point][1] = v)
        console.log(drawData.points.wavePoints);
        
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
        >{GetDrawData().rectangles.bars}{path}{negPath}
      </svg>
      <div>
      <button name="animate" onClick ={(runSpring)}>Animate Waves</button>
      </div>
    </div>

  );
}

//const lineCommand = point => `L ${point[0]} ${point[1]}`


export default Sketch;