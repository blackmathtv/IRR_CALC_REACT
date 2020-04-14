
//wave paths
var path = new Path();
var negPath = new Path();
var numSegments = 11;
var width = view.size.width;
path.segments = [];
negPath.segments = [];
var smooth = true;
var smoothType = 'continuous';
var waveHeight = view.size.height / 20;
var waveSpeed = 20; //lower number = faster
var waviness = 23;

//rectangles that cover waves
var boolRectangleLeft = null;
var boolRectangleRight = null;

//bars are the graphed values, rectangles are the glass containers
var barValues = [80, -80];
var bars = [];
var rectangles = [];
var rectanglesInit = {
    numRectangles: null,
    firstX: null
};
var glassMoveSpeed = 3;
var padModifier = 5;
var fluidTopY = relativeYPos(96);
var holdBox = null;

var boxBreakCount = 0;

// var mousePos = view.center / 2;
// var pathHeight = mousePos.y;

var fluidPadX = relativeXPos(padModifier);
var fluidPadY = relativeYPos(padModifier);
var fluidBounds = {
    bottomLeft: point = { x: fluidPadX, y: fluidPadY },
    bottomRight: point = { x: view.size.width - fluidPadX, y: fluidPadY }
}
var canvasWidth = fluidBounds.bottomRight.x - fluidBounds.bottomLeft.x;
var containerPad = 4;
var wavePoints = {
    x: [],
    y: [],
    avgHeight: null,
    negx: [],
    negy: [],
    negAvgHeight: null,
}

//=====colors======\\
var posBarColor = '#4E556A';
var negBarColor = 'red';
negPath.fillColor = 'red';
negPath.opacity = .7;
path.fillColor = '#4E556A';
path.opacity = 1;
var canvasColor = 'white';
var glassColor = "#B1B1B1";

//allows process Y values for canvas between 0 (bottom) and 100 (top)
function relativeYPos(num) {
    multiplier = view.size.height / 100;
    return view.size.height - (num * multiplier);
}

function relativeXPos(num) {
    multiplier = view.size.width / 100;
    return num * multiplier;
}

function sortAscendingRectX(array) {
    array.sort(function (a, b) {
        return parseFloat(a.firstSegment.point.x) - parseFloat(b.firstSegment.point.x);
    })
}

setBars();

function setBars() {

    barWidth = (canvasWidth / (barValues.length) / 1.5);
    barPadding = barWidth / 2;
    glassPadding = barPadding / 4;
    barPosition = (barPadding / 2) + fluidBounds.bottomLeft.x;

    //...............
    //Draw Graph Bars
    //...............

    for (var bar in barValues) {

        //if the bar value is positive, create a positive colored bar
        if (barValues[bar] > 0) {
            bars.push(new Path.Rectangle({
                topLeft: new Point(barPosition, relativeYPos(barValues[bar] + padModifier)),
                bottomRight: new Point(barPosition + barWidth, fluidPadY),
                radius: 1,
                opacity: 1,
                fillColor: posBarColor
            }));

            //push the coordinates for the top left and top right corners for each positive bar
            wavePoints.x.push(bars[bar].firstSegment.point.x);
            wavePoints.y.push(relativeYPos(barValues[bar] + padModifier));
            wavePoints.x.push(bars[bar].lastSegment.point.x);
            wavePoints.y.push(relativeYPos(barValues[bar] + padModifier));
            barPosition += (barWidth + barPadding);
        }
        //if the bar value is negative, create a negative colored bar
        if (barValues[bar] < 0) {
            bars.push(new Path.Rectangle({
                topLeft: new Point(barPosition, relativeYPos(barValues[bar] * -1 + padModifier)),
                bottomRight: new Point(barPosition + barWidth, fluidPadY),
                opacity: .7,
                radius: 1,
                fillColor: negBarColor
            }));

            //push the coordinates for the top left and top right corners for each negative bar
            wavePoints.negx.push(bars[bar].firstSegment.point.x);
            wavePoints.negy.push(relativeYPos(barValues[bar] * -1 + padModifier));
            wavePoints.negx.push(bars[bar].lastSegment.point.x);
            wavePoints.negy.push(relativeYPos(barValues[bar] * -1 + padModifier));
            barPosition += (barWidth + barPadding);

        }
        //sort the array of bar objects by their x coordinates
        sortAscendingRectX(bars);
    }

    for (var height in wavePoints.y) {
        wavePoints.avgHeight += wavePoints.y[height];
    }

    for (var height in wavePoints.negy) {
        wavePoints.negAvgHeight += wavePoints.negy[height];
    }
    wavePoints.avgHeight = wavePoints.avgHeight / wavePoints.y.length;
    wavePoints.negAvgHeight = wavePoints.negAvgHeight / wavePoints.negy.length;

    boolRectangleLeft = new Path.Rectangle({
        topLeft: new Point(view.bounds.left, 0),
        bottomRight: new Point(bars[0].firstSegment.point.x, view.bounds.height),
        radius: 1,
        opacity: 1,
        fillColor: canvasColor
    });

    

    boolRectangleRight = new Path.Rectangle({
        topLeft: new Point(bars[bars.length -1].lastSegment.point.x, 0),
        bottomRight: new Point(view.bounds.width, view.bounds.height),
        radius: 1,
        opacity: 1,
        fillColor: canvasColor
    });

    //......................
    //draw glass around bars
    //......................
    for (var bar in bars) {
        rectangles.push(new Path.Rectangle({
            topLeft: new Point(bars[bar].firstSegment.point.x - glassPadding, fluidTopY),
            bottomRight: new Point(bars[bar].lastSegment.point.x + glassPadding, view.size.height - fluidTopY),
            radius: 3,
            strokeColor: glassColor,
            closed: false
        }));
        rectangles[bar].add(rectangles[bar].segments[0].point.x,rectangles[bar].segments[0].point.y );
        
        //rectangles[bar].lastSegment.remove();
    }
    rectanglesInit.numRectangles = rectangles.length;
    rectanglesInit.firstX = rectangles[0].firstSegment.point.x;



}
console.log(rectangles[0]);
function onFrame(event) {
    if (event.count > 150) {
     
        //rectangles[0].bounds.bottomRight.x += 1;
        boolRectangleRight.segments[2].point.x = rectangles[0].segments[6].point.x -glassPadding;
        boolRectangleRight.segments[1].point.x = rectangles[0].segments[6].point.x - glassPadding;
        if (rectangles[boxBreakCount]) {
            //move all the segments for the first glass container every frame
            for (segment in rectangles[0].segments){
                rectangles[0].segments[segment].point.x += glassMoveSpeed;
            }
            
            for (i = 3; i <= 7; i++)
            boolRectangleLeft.segments[i].point.x = rectangles[0].segments[1].point.x + glassPadding;
            


        if (rectangles[0].segments[7].point.x >= rectangles[boxBreakCount].firstSegment.point.x -3) {
            if (rectanglesInit.numRectangles > boxBreakCount) {
                
                bars[boxBreakCount].remove();
                //remove first rectangle and redraw it larger



                if (boxBreakCount == 0) {

                    //..........
                    //Draw Waves
                    //..........
                    path.add(new Point(0, fluidPadY));
                    negPath.add(new Point (0, fluidPadY));
                    for (i = 0; i <= numSegments + 1; i++) {
                        path.add(new Point(width / numSegments * i, wavePoints.avgHeight));
                        negPath.add(new Point(width / numSegments * i, wavePoints.negAvgHeight));
                    }
                    path.add(new Point(width, fluidPadY));
                    negPath.add(new Point (width, fluidPadY));
                    console.log(path);
                    console.log(width);
                    // //bottom left point
                    // path.add(new Point(bars[0].firstSegment.point.x, bars[0].firstSegment.point.y));
                    // negPath.add(new Point(bars[0].firstSegment.point.x, bars[0].firstSegment.point.y));

                    //bottom left point

                }
                else {
                    
                   
                    rectangles[boxBreakCount].remove();
                   
                   
                   //resize the first rectangle so outer bounds are the previously removed rectangle
                    for (i = 4; i <= 7; i++) {
                        rectangles[0].segments[i].point.x = rectangles[boxBreakCount].segments[i].point.x;
                    }




                    
                    
                    // path.removeSegment(path.segments.length - 1);
                    // negPath.removeSegment(negPath.segments.length - 1);
                }
                //add new points to paths everytime box merges
                // path.add(bars[boxBreakCount].bounds.topLeft);
                // path.add(bars[boxBreakCount].bounds.topRight);
                // path.add(bars[boxBreakCount].bounds.bottomRight);
                // negPath.add(bars[boxBreakCount].bounds.topLeft);
                // negPath.add(bars[boxBreakCount].bounds.topRight);
                // negPath.add(bars[boxBreakCount].bounds.bottomRight);

               
                boxBreakCount += 1;
            }
        }
        }
        //animate the waves
        for (var i = 0; i < path.segments.length - 1; i++) {
            if (i != 0) {
                initY = path.segments[i].point.y;
                
                var sinSeed = event.count + (i + i % 10) * waviness;
                var sinHeight = Math.sin(sinSeed / waveSpeed) * waveHeight;
                var yPos = (Math.sin(sinSeed / 100) * sinHeight) + wavePoints.avgHeight;
                // //shrink
                //path.segments[i-1].point.x += .01;
                path.segments[i].point.y = yPos;
            }
        }

        for (var i = 0; i < negPath.segments.length - 1; i++) {
            if (i != 0) {
                initY = negPath.segments[i].point.y;
               
                var sinSeed = event.count + (i + i % 10) * waviness;
                var sinHeight = Math.sin(sinSeed / (waveSpeed + 8)) * waveHeight;
                var yPos = (Math.sin(sinSeed / 100) * sinHeight) + wavePoints.negAvgHeight;
                // //shrink
                //path.segments[i-1].point.x += .01;
                negPath.segments[i].point.y = yPos;
            }
        }

        waveHeight = waveHeight * .997;

        if (smooth) {
            path.smooth({ type: smoothType });
            negPath.smooth({ type: smoothType });

        }

    }
}

// function onMouseMove(event) {
// 	mousePos = event.point;
// }

// // Reposition the path whenever the window is resized: this calls on initial load for some reason
// function onResize(event) {
// }