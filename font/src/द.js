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

var ln = 150;
var lineR = new Path.Line(
    {x: view.center.x + ln/3, y: view.center.y - ln - ln/4},
    {x: view.center.x + ln/3, y: view.center.y - ln/2 - ln/4});
var r = ln/2 + ln/3;

var arcR1 = new Point(Math.cos(radians(-120)) * r, Math.sin(radians(-120)) * r);
var shiftD = new Point(0, ln/8);
var shiftU = new Point(0, ln/3);
var shiftR = new Point(ln/2, 0);
var arcR2 = new Point(-r, 0);
var arcR3 = new Point(Math.cos(radians(45)) * r, Math.sin(radians(45)) * r);

var arc2 = new Path.Arc(
    arcR2 + view.center + shiftD,
    new Point(Math.cos(radians(90+45/2)) * r, Math.sin(radians(90+45/2)) * r) + view.center + shiftD,
    arcR3 + view.center + shiftD);
var centerR = new Point(lineR.lastSegment.point.x, arcR2.y+view.center.y+shiftD.y);
var radiusR = new Size(r+ln/3, arcR2.y+view.center.y+shiftD.y-lineR.lastSegment.point.y);
var rectR = new Rectangle(centerR-radiusR, radiusR*2);
var ellR = new Path.Ellipse(rectR);
var rectRound = new Path.Rectangle(rectR, new Size(ln, ln));
rectRound.visible = false;
// drawC(centerR, 10);
ellR.visible = false;
// var arc3 = new Path([ellR.segments[0], ellR.segments[1]]);
var arc3 = new Path([rectRound.segments[1], rectRound.segments[2], rectRound.segments[3], lineR.lastSegment])

var sr = ln/4;
var tan = arc2.getTangentAt(arc2.length);
tan.y *= -1;
var circ = new Path.Circle(arc2.lastSegment.point - tan*sr, sr)
circ.visible = false;
var arc4 = new Path.Arc(
    arc2.lastSegment.point,
    circ.segments[1].point,
    circ.segments[0].point);
// arc4.strokeColor = 'red';
var circ2 = new Path.Circle(circ.segments[2].point, sr*2);
circ2.visible = false;
var lineB = new Path.Line(
    circ.firstSegment.point, 
    circ.firstSegment.point + new Point(0, 10));
lineB.visible = false;
var arc5 = new Path([circ2.segments[3], circ2.segments[0]]);
arc5.firstSegment.point += new Point(ln/6, ln/4);
var origLast = arc5.firstSegment.point;
// drawC(origLast, 10);

var g = new Group([arc2, arc3, arc4, lineR]);
var lineTop = new Path.Line(
            {x: view.center.x - ln-ln/8, y: view.center.y - ln-ln/4},
            {x: view.center.x + ln+ln/8, y: view.center.y - ln-ln/4}
            )

// animations
var tspan = 8000;
// var t1 = g.tween(tspan)
// var amp = 0.014;
// t1.onUpdate = function(event) {
//     var times = tspan/1000 * 61;
//     var t = event.factor;
//     var angle = map(t, 0, 1, 0, Math.PI*4);
//     var f = -Math.sin(angle) * amp;
//     g.scale(1, 1+f, lineR.firstSegment.point);
//     // drawC(arc4.lastSegment.point, 10);
//     // lineB.scale(1, 1+f, arc4.lastSegment.point);
//     arc5.lastSegment.point = arc4.lastSegment.point;
//     var linel = (Math.sin(angle));
//     arc5.firstSegment.point = origLast + new Point(0, linel);
    
//     amp += 0.0000005;
// }

// g = new Group([arc2, arc3, arc4, arc5]);
// var t1 = g.tween(tspan) 
// t1.onUpdate = function(event) {
//     var times = tspan/1000 * 61;
//     var angle = map(event.factor, 0, 1, 0, Math.PI*6);
//     arc5.rotate((-360*3)/times, g.children[2].lastSegment.point);

//     g.rotate(Math.sin(angle+Math.PI/1.8) * 2, lineR.lastSegment.point);
//     // drawC(arc4.lastSegment.point, 10);
//     // arc5.lastSegment.point = arc4.lastSegment.point;
//     // arc5.firstSegment.point = origLast + new Point(Math.sin(angle+Math.PI/1.8)*ln/30, Math.sin(angle+Math.PI)*ln/30);
// }
