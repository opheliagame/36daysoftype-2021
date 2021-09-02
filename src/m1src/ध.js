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
var ref1 = new Point(view.center.x - ln/2 - ln/4, view.center.y - ln/2);
var ref2 = new Point(view.center.x - ln/2, view.center.y + ln/3);
var ref3 = new Point(view.center.x - ln/3, view.center.y - ln/4);

var arc1 = new Path.Arc(
    {x: view.center.x - ln/2, y: view.center.y - ln},
    {x: view.center.x - ln/2 - ln/4, y: view.center.y - ln/2},
    {x: view.center.x - ln/3, y: view.center.y - ln/4});
var arc2 = new Path.Arc(
    {x: view.center.x - ln/3, y: view.center.y - ln/4},
    {x: view.center.x - ln/2, y: view.center.y + ln/3},
    {x: view.center.x + ln/20, y: view.center.y + ln/2 +ln/60});
var arc3 = new Path.Arc(
    {x: view.center.x + ln/20, y: view.center.y + ln/2 +ln/60},
    {x: view.center.x + ln/10, y: view.center.y + ln/2},
    {x: view.center.x + ln*2/3, y: view.center.y })

var tan = arc1.getNormalAt(0);
var r = ln/6;
var circ = new Path.Circle(
    arc1.firstSegment.point+tan*r, r);
var circOrg = circ.position;
    
var lineR = new Path.Line(
    {x: view.center.x + ln*2/3, y: view.center.y - ln},
    {x: view.center.x + ln*2/3, y: view.center.y + ln});

var lineTop = new Path.Line(
            {x: view.center.x , y: view.center.y - ln},
            {x: view.center.x + ln+ln/8, y: view.center.y - ln}
            )

var refp1 = arc2.firstSegment.point - new Point(ln, 0);
var refp2 = arc2.firstSegment.point - new Point(ln/2+ln/8, 0);
// drawC(refp1, 20);
// drawC(refp2, 20);

var refarc1 = new Path.Arc(
    arc1.firstSegment.point,
    new Point(refp1.x , refp1.y - ln/4),
    refp1);
var refarc2 = new Path.Arc(
    arc1.segments[1].point, 
    new Point(refp2.x, refp2.y - ln/8),
    refp2)
refarc1.visible = false;
refarc2.visible = false;
var arc1C = arc1.clone();
arc1C.visible = false;

// var refPath = new Path([refp1, refp2, arc2.firstSegment.point])
// console.log(arc1.segments);
        
// var refl1 = drawL(
//     arc1.segments[0].point+arc1.segments[0].handleIn,
//     arc1.segments[0].point+arc1.segments[0].handleOut);
// var refl2 = drawL(
//     arc1.segments[1].point+arc1.segments[1].handleIn,
//     arc1.segments[1].point+arc1.segments[1].handleOut);
// var refl3 = drawL(
//     arc1.segments[2].point+arc1.segments[2].handleIn,
//     arc1.segments[2].point+arc1.segments[2].handleOut);
// console.log(refl2.length);

//animations 
var tspan = 6000;
// var h = 5;
// var t1 = arc1.tween(tspan)
// var off1 = 0, off2 = 0;
// t1.onUpdate = function(event) {
//     var times = tspan/1000 * 62;
//     var angle = map(event.factor, 0, 1, 0, Math.PI*4);
//     var amp = 1;
    
//     var cp1 = refarc1.getPointAt(off1);
//     var norm1 = refarc1.getNormalAt(off1);
//     var f1 = Math.abs(Math.sin(angle))*refarc1.length;
//     // drawC(cp1, 10);
//     // drawL(cp1, cp1+norm1*10);
//     off1 = f1;
    
//     arc1.firstSegment.point = cp1;
//     arc1.firstSegment.handleOut = norm1 + arc1C.firstSegment.handleOut.normalize()*map(angle, 0, Math.PI, 1, 0);
    
//     var cp2 = refarc2.getPointAt(off2);
//     var norm2 = refarc2.getNormalAt(off2);
//     var f2 = Math.abs(Math.sin(angle))*refarc2.length;
//     // drawC(cp2, 10);
//     // drawL(cp2, cp2+norm2*10);
//     off2 = f2;
    
//     arc1.segments[1].point = cp2;
//     arc1.segments[1].handleIn = norm2*-1;// + arc1C.segments[1].handleIn.normalize();
//     arc1.segments[1].handleOut = norm2;// + arc1C.segments[1].handleOut.normalize();

//     arc1.smooth({
//         type: 'geometric',
//         factor: 0.68
//     });
// }

// t1.then(function() { 
//     var t3 = circ.tween(tspan/4);
//     t3.onUpdate = function(event) {
//         var angle = map(event.factor, 0, 1, 0, Math.PI);
//         circ.rotate(angle*1.05, arc1.firstSegment.point);
//     }
// })

// var t2 = circ.tween(tspan)
// t2.onUpdate = function(event) {
//     var norm = arc1.getNormalAt(0)*r;
//     circ.position = arc1.firstSegment.point + norm;
// }
var letterPath = new CompoundPath({
    children: [arc1, arc2, arc3, circ, lineR, lineTop]
})
window.letterPath = letterPath