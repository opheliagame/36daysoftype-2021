var size = new Size(600, 600);
project.currentStyle = {
    strokeColor: 'black',
    strokeWidth: 16,
    strokeCap: 'butt'
}

var radians = function(degrees) {
	return degrees * Math.PI / 180;
}
var drawC = function(point, radius) {
    var refc = new Path.Circle(point, radius);
    refc.strokeWidth = 1;
    refc.strokeColor = 'red';
} 

var ln = 150;
var lineR = new Path.Line(
    {x: view.center.x + ln/3, y: view.center.y - ln},
    {x: view.center.x + ln/3, y: view.center.y - ln/3});
var r = ln/2 + ln/3;

var arcR1 = new Point(Math.cos(radians(-120)) * r, Math.sin(radians(-120)) * r);
var shiftD = new Point(0, ln/2);
var shiftU = new Point(0, ln/3);
var shiftR = new Point(ln/2, 0);
var arcR2 = new Point(-r, 0);
var arcR3 = new Point(Math.cos(radians(45)) * r, Math.sin(radians(45)) * r);
// drawC(arcR1*2 + view.center + shiftR + shiftD*3, 10);
// drawC(view.center + shiftR + shiftD, 10);
// drawC(lineR.lastSegment.point + new Point(0, r*1.8), r*1.8);
// drawC(arcR2 + view.center + shiftD, 10);
// drawC(arcR3 + view.center + shiftD, 10);
// drawC(view.center + shiftD, r);

var arc2 = new Path.Arc(
    arcR2 + view.center + shiftD,
    new Point(Math.cos(radians(90+45/2)) * r, Math.sin(radians(90+45/2)) * r) + view.center + shiftD,
    arcR3 + view.center + shiftD);
var centerR = new Point(lineR.lastSegment.point.x, arcR2.y+view.center.y+shiftD.y);
var radiusR = new Size(r+ln/3, arcR2.y+view.center.y+shiftD.y-lineR.lastSegment.point.y);
var rectR = new Rectangle(centerR-radiusR, radiusR*2);
var ellR = new Path.Ellipse(rectR);
var rectRound = new Path.Rectangle(rectR, new Size(ln, ln));
// console.log(rectRound.segments[0]);
rectRound.visible = false;
// drawC(centerR, 10);


ellR.visible = false;
// var arc3 = new Path([ellR.segments[0], ellR.segments[1]]);
var arc3 = new Path([rectRound.segments[1], rectRound.segments[2], rectRound.segments[3], lineR.lastSegment])
// drawC(arc3.position, 10);
// drawC(arc3.segments[1].point, 10);

var sr = ln/4;
var tan = arc2.getTangentAt(arc2.length);
tan.y *= -1;
var circ = new Path.Circle(arc2.lastSegment.point - tan*sr, sr)

var compArc = arc2.unite(arc3);
compArc.strokeColor = 'yellow';
compArc.closed = false;
compArc.visible = false;
var fullArc = new Path(compArc.pathData);
// console.log(fullArc);
// fullArc.strokeColor = 'red';
fullArc.closed = false;
arc2.visible = false;
arc3.visible = false;
// drawC(fullArc.getPointAt(0), 20);

// animations
// function smallCircMove(offset) {
//     var currentP = fullArc.getPointAt(offset);
//     var norm = fullArc.getNormalAt(offset);
//     // drawC(currentP - norm*sr, 20);
//     // var line = new Path.Line(currentP, currentP - norm*sr);
//     var move = currentP - norm*sr;
//     circ.position = move;
// }

// var tspan = 2000;
// var offset = 0
// var t1 = circ.tween(
//     {
//         duration: tspan,
//         start: true
//     })
// t1.onUpdate = function(event) {
//     var times = tspan/1000 * 62;
//     offset += fullArc.length/times;
//     smallCircMove(offset);
// }
// t1.then(function() {
//     var t2 = circ.tween(tspan)
//     t2.onUpdate = function(event) {
//         var times = tspan/1000 * 62;
//         offset -= fullArc.length/times;
//         smallCircMove(offset);
//     }
//     t2.then(function() {
        
//         // fullArc.visible = false;
//         arc2.visible = false;
//         arc3.visible = false;
//         var g = new Group([circ, fullArc]);
        
//         var n1 = fullArc.getNormalAt(0);
//         var n2 = fullArc.getNormalAt(fullArc.length);
//         var p1 = fullArc.firstSegment.point;
//         var p2 = fullArc.lastSegment.point;
//         // var l1 = new Path.Line(p1, p1-n1*120);
//         // var l2 = new Path.Line(p2, p2-n2*200);
//         // var intersections = l1.getIntersections(l2);
//         // // intersections.strokeColor = 'red';
//         // console.log(intersections);
//         var rotP = p1-n1*130;
//         // g.scale(-1, 1, lineR.lastSegment.point);
//         // g.scale(1, -1, centerR);
//         var t3 = g.tween(tspan/2)
//         t3.onUpdate = function(event) {
//             var times = (tspan/2)/1000 * 62;
//             g.translate(1, 0);
//             g.rotate(-180/times);
//             // drawC(g.position, 10);
//             // drawC(rotP, 10);
//         }
//         t3.then(function() {
//             var t4 = g.tween(tspan/2+tspan/4)
//             t4.onUpdate = function(event) {
//                 var f = Math.sin(event.factor*11)*2.6;
//                 g.rotate(f, lineR.lastSegment.point);
//             }
//         })
//     })
// })

var lineTop = new Path.Line(
            {x: view.center.x - ln - ln/8, y: view.center.y - ln},
            {x: view.center.x + ln + ln/8, y: view.center.y - ln}
            )
var letterPath = new CompoundPath({
    children: [lineR, fullArc, circ, lineTop]
})
window.letterPath = letterPath