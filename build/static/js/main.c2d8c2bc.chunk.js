(this.webpackJsonp2irr_calc=this.webpackJsonp2irr_calc||[]).push([[0],{12:function(e,a,t){},14:function(e,a,t){},15:function(e,a,t){"use strict";t.r(a);var l=t(0),o=t.n(l),n=t(4),s=t.n(n),r=(t(12),t(1));t(2),t(5);var i=function(){console.log("Ran GetDrawData");var e={points:{numPoints:{pos:null,neg:null},spacing:{pos:null,neg:null},wavePoints:[],negWavePoints:[]},rectangles:{bars:[],glass:[],betweenGlass:null},values:{drawBoxHeight:100,drawBoxWidth:200,allBarValues:[],drawBarHeights:[],viewHeightMultiplier:null,barWidth:null,barPadX:null,glassPad:null,doubleGlassPad:null,barPosx:null,barCanvas:null}};for(var a in d)d[a]>=0?e.values.allBarValues.push(d[a]):d[a]<0&&e.values.allBarValues.push(-1*d[a]);for(var a in e.values.allBarValues.sort((function(e,a){return a-e})),e.values.viewHeightMultiplier=92/e.values.allBarValues[0],d)d[a]>=0&&(e.values.drawBarHeights.push(d[a]*e.values.viewHeightMultiplier),e.points.numPoints.pos+=1),d[a]<0&&(e.values.drawBarHeights.push(d[a]*e.values.viewHeightMultiplier),e.points.numPoints.neg+=1);return e.values.barWidth=e.values.drawBoxWidth/e.values.drawBarHeights.length/1.5,e.values.barPadx=e.values.barWidth/2,e.values.glassPad=Math.min(e.values.barPadx/4,2),e.values.doubleGlassPad=2*e.values.glassPad,e.rectangles.betweenGlass=e.values.barPadx-e.values.doubleGlassPad,e.values.barPosX=e.values.barPadx/2,e.values.barCanvas=e.values.drawBoxHeight-4,e},u=(t(6),window.innerHeight,[]);function v(e,a,t,l,n,s,r,i){return o.a.createElement("rect",{key:e,x:a[0],y:a[1],width:t,height:l,fill:n,stroke:s,strokeWidth:r,rx:i})}var h=function(){console.log("Ran Sketch");var e=o.a.useState(),a=Object(r.a)(e,2),t=a[0];for(var l in a[1],(u=i()).values.drawBarHeights){var n=l;u.values.drawBarHeights[l]>=0?(u.rectangles.bars.push(v(n,[u.values.barPosX,u.values.barCanvas-u.values.drawBarHeights[l]],u.values.barWidth,u.values.drawBarHeights[l],w.barGray)),u.rectangles.glass.push(v("glass"+n,[u.values.barPosX-u.values.glassPad,2],u.values.barWidth+u.values.doubleGlassPad,96,"none",w.gray,.3,1)),u.points.wavePoints.push([u.values.barPosX+u.values.barWidth,u.values.barCanvas-u.values.drawBarHeights[l]]),u.points.negWavePoints.push([u.values.barPosX+u.values.barWidth,u.values.drawBoxHeight]),u.values.barPosX+=u.values.barWidth+u.values.barPadx):u.values.drawBarHeights[l]<0&&(u.rectangles.bars.push(v(n,[u.values.barPosX,u.values.barCanvas- -1*u.values.drawBarHeights[l]],u.values.barWidth,-1*u.values.drawBarHeights[l],w.negativeColor)),u.rectangles.glass.push(v("glass"+n,[u.values.barPosX-u.values.glassPad,2],u.values.barWidth+u.values.doubleGlassPad,96,"none",w.gray,.3,1)),u.points.negWavePoints.push([u.values.barPosX+u.values.barWidth,u.values.barCanvas- -1*u.values.drawBarHeights[l]]),u.points.wavePoints.push([u.values.barPosX+u.values.barWidth,u.values.drawBoxHeight]),u.values.barPosX+=u.values.barWidth+u.values.barPadx)}return o.a.createElement("div",null,o.a.createElement("svg",{style:{position:"absolute",background:"none",top:"10%",left:"5%",width:"90%",height:"80%"},viewBox:"0 0 200 100"},u.rectangles.bars,u.rectangles.glass,t),o.a.createElement("div",null))},d=(t(14),[]),c=[0],g=0,b=.9*window.innerWidth,w={canvasWidth:b,canvasHeight:b/2.32,canvasColor:"#E9E9E9",lightCanvasColor:"#FFFFFF",textColor:"#000000",innerCashBoxColor:"#FBFBFB",medLightGray:"#D8D8D8",negativeColor:"#FF2223",positiveColor:"#4E556A",darkGray:"#3A3A3A",gray:"#ACACAC",barGray:"#4E556A"},p={position:"absolute",left:"5%",top:"10%",background:w.canvasColor,height:"40vw",width:"90vw"},m={position:"absolute",top:"14%",left:"5%",background:w.lightCanvasColor,height:"56%",width:"17%",borderRadius:15},y={position:"absolute",bottom:"9%",left:"5%",background:w.lightCanvasColor,height:"17%",width:"17%",borderRadius:15},f={position:"absolute",bottom:"9%",left:"24%",background:w.lightCanvasColor,height:"77%",width:"52%",borderRadius:15},C=(w.lightCanvasColor,{position:"absolute",bottom:"0%",right:"0%",background:w.lightCanvasColor,height:"100%",width:"19%",borderRadius:0}),E={position:"absolute",top:"12%",background:w.innerCashBoxColor,height:"76%",width:"100%",overflowY:"scroll",overflowX:"auto"},P={fontSize:"2vw",width:"100%",height:"2.6vw",color:w.barGray},k={fontSize:"2vw",width:"100%",height:"2.6vw",color:w.negativeColor},x={fontSize:"2vw",width:"auto",height:"2.6vw",marginLeft:"15%",color:w.negativeColor},B={background:"#F0F0F0",height:"1px",left:"15%",width:"75%",position:"absolute"},W={fill:w.innerCashBoxColor,color:w.medLightGray,stroke:w.medLightGray,strokeWidth:"8%"},H={stroke:w.medLightGray,strokeWidth:"8%"},S={fontWeight:"bold",fontSize:"1vw",textAlign:"center"},G={fontWeight:"bold",fontSize:"1.2vw",textAlign:"center"},F={position:"absolute",fontWeight:"bold",fontSize:"2vw",left:"5%"},A={position:"absolute",background:"none",width:"57%",height:"14%",fontSize:"2vw",border:"none",color:w.barGray},z={position:"absolute",background:"none",width:"57%",height:"14%",fontSize:"2vw",border:"none",color:w.negativeColor},X={position:"absolute",top:"88%",left:"0%",width:"100%",height:"12%",background:"none",fontWeight:"500",fontSize:".9vw",color:w.darkGray},R={fill:w.innerCashBoxColor,color:w.darkGray,stroke:w.darkGray,strokeWidth:"5%"},L={stroke:w.darkGray,strokeWidth:"5%"},I={position:"absolute",paddingLeft:"70%",paddingTop:"4%"},O={position:"absolute",left:"28%"},V={position:"absolute",top:"40%",left:"18%",background:"styles.canvasColor",width:"60%"};var M=function(){var e=o.a.useState(50),a=Object(r.a)(e,2),t=a[0],l=a[1],n=o.a.useState(0),s=Object(r.a)(n,2),i=s[0],u=s[1],v=o.a.useState(0),b=Object(r.a)(v,2),M=b[0],D=b[1],T={position:"absolute",background:"none",width:"80%",height:"14%",fontSize:".8vw",border:"none",color:w.negativeColor};function N(e){return o.a.createElement("svg",{height:"1.2vw",width:"2vw",onClick:function(){c.splice(e,1),u(j(c,t,g))}},o.a.createElement("circle",{style:W,cx:"56%",cy:"50%",r:"32%"}),o.a.createElement("line",{style:H,x1:"44%",y1:"50%",x2:"67%",y2:"50%"}))}return o.a.createElement("div",{style:p},o.a.createElement("p",{style:F},"NET PRESENT VALUE CALCULATOR"),o.a.createElement("div",{style:m},o.a.createElement("p",{style:S},"CASH FLOWS"),o.a.createElement("div",{style:E},function(){""===g?T.fontSize=".8vw":g>=0&&""!=g?(T.fontSize="2vw",T.color=w.negativeColor):g<0&&(T.fontSize="2vw",T.color=w.positiveColor);var e=[];console.log("initial invest"+g),e.push(o.a.createElement("div",null,o.a.createElement("div",{style:x},o.a.createElement("input",{style:T,placeholder:"<Enter Initial Investment Here>",key:"inINVhold",type:"text",name:"initialInv",onChange:function(e){g=e.target.value,u(j(c,t,g))}})),o.a.createElement("div",{style:B})));var a=function(a){c[a]<0?e.push(o.a.createElement("div",null,o.a.createElement("div",{style:k},N(a),"$ "," ",o.a.createElement("input",{style:z,key:"cashflow"+a,value:c[a],type:"text",name:a+"cashFlow",onChange:function(e){c[a]=e.target.value,u(j(c,t,g))}})),o.a.createElement("div",{style:B}))):e.push(o.a.createElement("div",null,o.a.createElement("div",{style:P},N(a),"$ "," ",o.a.createElement("input",{style:A,key:"cashflow"+a,value:c[a],type:"text",name:a+"cashFlow",onChange:function(e){c[a]=e.target.value,u(j(c,t,g))}})),o.a.createElement("div",{style:B})))};for(var l in c)a(l);return e}()),o.a.createElement("div",{style:X},o.a.createElement("svg",{height:"1.5vw",width:"1.5vw",style:I,onClick:function(){c.push(0),u(j(c,t,g))}},o.a.createElement("circle",{style:R,cx:"50%",cy:"50%",r:"45%"}),o.a.createElement("line",{style:L,x1:"25%",y1:"50%",x2:"75%",y2:"50%"}),o.a.createElement("line",{style:L,x1:"50%",y1:"75%",x2:"50%",y2:"25%"})),o.a.createElement("p",{style:O},"Add another"))),o.a.createElement("div",{style:y},o.a.createElement("p",{style:S},"DISCOUNT RATE: ",t,"%"),o.a.createElement("input",{type:"range",min:"0",max:"100",step:"1",style:V,name:"ROR",onChange:function(e){return u(j(c,e.target.value,g))}})),o.a.createElement("div",{style:f},o.a.createElement("p",{style:G},"NPV: ",i),o.a.createElement(h,null)),o.a.createElement("div",{style:C}));function j(e,a,t){l(a),D(M+1),g=t;var o=a/100,n=null;for(var s in(d=[]).push(-1*g),e){var r=parseInt(s)+1,u=e[s]/Math.pow(1+o,r);d.push(u),n+=u}return console.log("r "+a),console.log("cashflows "+e),console.log("initial Invest "+g),console.log("npv "+n),console.log(i),console.log("modflows "+d),(n-g).toFixed(2)}};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(M,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},7:function(e,a,t){e.exports=t(15)}},[[7,1,2]]]);
//# sourceMappingURL=main.c2d8c2bc.chunk.js.map