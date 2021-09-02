var size = new Size(600, 600);
project.currentStyle = {
    strokeColor: 'black',
    strokeWidth: 16,
    strokeCap: 'butt'
}

var radians = function(degrees) {
	return degrees * Math.PI / 180;
}
var degrees = function(radians) {
    return radians * 180 / Math.PI;
}
var drawC = function(point, radius) {
    var refc = new Path.Circle(point, radius);
    refc.strokeWidth = 1;
    refc.strokeColor = 'red';
} 
var drawL = function(point1, point2) {
    var refl = new Path.Line(point1, point2);
    return refl;
}
var map = function(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

var ln = 150;
var lineR = new Path.Line(
    {x: view.center.x + ln/2 + ln/4, y: view.center.y - ln},
    {x: view.center.x + ln/2 + ln/4, y: view.center.y + ln});
// lineR.strokeWidth = 0.5;
var hlineL = new Path.Line(
    {x: view.center.x - ln, y: view.center.y},
    {x: view.center.x - ln/2, y: view.center.y});
var refp1 = {x: view.center.x - ln/2 - ln/12, y: view.center.y + ln/4 + ln/8};
var refp2 = {x: view.center.x + ln/4 + ln/4, y: refp1.y + ln/40};
// var refc = new Path.Circle({x: view.center.x + ln/8, y: refp1.y + ln/4}, 20);
var g1 = new Group();
var g2 = new Group();
var arc1 = new Path.Arc(
    {x: view.center.x - ln/2, y: view.center.y},
    refp1,
    {x: view.center.x + ln/8, y: refp1.y + ln/4 + ln/12});
var arc2 = new Path.Arc(
    {x: view.center.x + ln/8, y: refp1.y + ln/4 + ln/12},
    refp2,
    {x: view.center.x + ln/2 + ln/4, y: view.center.y});

g1.addChildren([hlineL, arc1, arc2]);
g1.position.y -= ln/6;
// g1.applyMatrix = false;
g1.scale(-1, 1)

var lineTop = new Path.Line(
        {x: view.center.x - ln-ln/8, y: view.center.y - ln},
        {x: view.center.x + ln+ln/8, y: view.center.y - ln})

// animations
var tspan = 4000;
var hand1 = arc2.firstSegment.handleOut.rotate(60)
var tail = new Path([
    arc2.firstSegment,
    new Segment(arc2.firstSegment.point + new Point(-ln/8, -ln/3.5), hand1.rotate(90)*-0.5, hand1.rotate(90)*0.5),
    new Segment(arc2.firstSegment.point + new Point(ln/2, ln/2), hand1, null)])
var hand1 = arc2.getNormalAt(arc2.length/2+arc2.length/3).rotate(90)*arc2.firstSegment.handleOut.length/3;
var mid = new Segment(arc2.getPointAt(arc2.length/2), hand1*-1, hand1*1);
arc2.insertSegment(1, mid)
arc2.visible = false
// drawC(mid.point, 10)
tail.strokeColor = 'black'
// tail.visible = false

var pathArc1 = new Path.Arc(
    arc2.lastSegment.point,
    view.center,
    tail.lastSegment.point)
var pathArc2 = new Path.Arc(
    arc2.segments[1].point, 
    tail.segments[1].point + new Point(-ln/12, -ln/12),
    tail.segments[1].point)
pathArc1.visible = false;
pathArc2.visible = false;

// var t1 = arc2.tween(tspan)
// var off1 = 0, off2 = 0;
// var rot1 = 0;
// t1.onUpdate = function(event) {
//     var times = tspan/1000*61
//     var step1 = pathArc1.length/times;
//     var step2 = pathArc2.length/times;
//     var rotStep1 = 150/times;
//     var rotStep2 = (60+60)/times;
    
//     var h1 = arc2.lastSegment.handleIn;
//     var h2 = arc2.segments[1].handleIn;
//     var h3 = arc2.segments[1].handleOut;
//     // drawC(pathArc1.getPointAt(off1), 10)
//     // drawC(pathArc2.getPointAt(off2), 10)
//     // drawL(pathArc1.getPointAt(off1), pathArc1.getPointAt(off1)+h1)
//     // drawL(pathArc2.getPointAt(off2), pathArc2.getPointAt(off2)+h2)
    
//     arc2.lastSegment.point = pathArc1.getPointAt(off1)
//     arc2.lastSegment.handleIn = h1.rotate(-rotStep1)
//     arc2.segments[1].point = pathArc2.getPointAt(off2)
//     arc2.segments[1].handleIn = h2.rotate(rotStep2)*1.001
//     arc2.segments[1].handleOut = h3.rotate(rotStep2)*1.001
    
//     off1 += step1;
//     off2 += step2;
// }
var letterPath = new CompoundPath({
    children: [lineR, hlineL, arc1, tail, lineTop]
})
window.letterPath = letterPath 