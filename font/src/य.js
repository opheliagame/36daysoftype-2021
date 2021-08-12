var size = new Size(600, 600);
project.currentStyle = {
    strokeColor: 'black',
    strokeWidth: 16,
    strokeCap: 'butt'
}

const radians = function(degrees) {
	return degrees * Math.PI / 180;
}
const degrees = function(radians) {
    return radians * 180 / Math.PI;
}
const drawC = function(point, radius) {
    var refc = new Path.Circle(point, radius);
    refc.strokeWidth = 1;
    refc.strokeColor = 'red';
} 
const drawL = function(point1, point2) {
    var refl = new Path.Line(point1, point2);
    return refl;
}
const map = function(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
const random = function(v1, v2) {
    return map(Math.random(), 0, 1, v1, v2);
}

var ln = 150;
var leftArc = new Path.Arc(
    {x: view.center.x - ln*3/4, y: view.center.y - ln},
    {x: view.center.x - ln/3, y: view.center.y - ln/2},
    {x: view.center.x - ln, y: view.center.y });
var bottomArc = new Path.Arc(
    {x: view.center.x - ln, y: view.center.y},
    {x: view.center.x - ln/4, y: view.center.y + ln*3/4},
    {x: view.center.x + ln*3/4, y: view.center.y + ln/2});
var rightLine = new Path.Line(
    {x: view.center.x + ln*3/4, y: view.center.y - ln},
    {x: view.center.x + ln*3/4, y: view.center.y + ln});
var linePos = rightLine.lastSegment.point.y;

var lineTop = new Path.Line(
    {x: view.center.x - ln-ln/8, y: view.center.y - ln},
    {x: view.center.x + ln+ln/8, y: view.center.y - ln})

var under = new Group([leftArc, bottomArc, rightLine, lineTop]);
// under.rotate(180)
var origPos = under.position;
// var arc2 = new Path.Arc(
//     leftArc.firstSegment.point  - new Point(0, 8), 
//     leftArc.position + new Point(ln/3, ln/10),
//     leftArc.lastSegment.point)
// rightLine.lastSegment.point = bottomArc.lastSegment.point;

// animations
var tspan = 1500
var bubbles = [];
const makeBubble = (startPos, number, tspan) => {
    var t;
    moveBubble(-ln/2, tspan*2)
    for(var i = 0; i < number; i++) {
        var bubble = new Path.Circle(
            startPos, 10)
        bubble.fillColor = 'black';
            // new Point(random(ln/3, ln), random(-ln/2, 0)), 10)
        bubbles.push(bubble);
        t = bubble.tween(
            {
                'position': bubble.position + new Point(random(ln/3, ln), random(-ln/2, -ln/3))
            }, random(tspan/4, tspan))
        // moveBubble(-ln/2, tspan*2)
    }
    return t;
}
const moveBubble = (dist, tspan) => {
    var t;
    for(var i = 0; i < bubbles.length; i++) {
        var b = bubbles[i];
        t = b.tween(
            {
                'position': b.position + new Point(random(-ln/3, ln/3), dist)
            }, tspan)
    }
    return t;
}
const removeBubble = () => {
    for(var i = 0; i < bubbles.length; i++) {
        var b = bubbles[i];
        var limit = view.center.y - 600;
        if(b.position.y <= limit) b.remove();
        // console.log(b)
    }
}

const returnToOrig = (tspan) => {
    arc2.visible = false;
    // drawC(view.center + new Point(0, ln), 10)
    var t = rightLine.tween({
            'lastSegment.point.y': view.center.y - ln
        }, tspan)
    t.then(function() {
        under.applyMatrix = false;
        under.tween(
            {
                'position': origPos,
                'rotation': -180
            }, tspan)
    })    
}


// Promise.resolve()
// .then(() => makeBubble(leftArc.position, 5, tspan/2))
// .then(() => moveBubble(-ln, tspan*2))
// .then(() => removeBubble())
// .then(() => makeBubble(leftArc.position, 5, tspan/2))
// .then(() => moveBubble(-ln, tspan*2))
// .then(() => removeBubble())
// .then(() => makeBubble(leftArc.position, 5, tspan/2))
// .then(() => moveBubble(-ln, tspan*2))
// .then(() => removeBubble())
// .then(() => makeBubble(leftArc.position, 5, tspan/2))
// .then(() => moveBubble(-ln, tspan*2))
// .then(() => removeBubble())
// .then(() => moveBubble(-ln*2, tspan*3))

// .then(() => returnToOrig(tspan))
// .then(() => console.log('end'))