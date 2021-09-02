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
var lineMid = new Path.Line(
            {x: view.center.x, y: view.center.y - ln},
            {x: view.center.x, y: view.center.y + ln}
            )
var arcTL = new Path.Arc(
            new Point(view.center.x - ln, view.center.y),
            new Point(view.center.x - ln/2, view.center.y - ln/2),
            new Point(view.center.x, view.center.y));
var arcBL = new Path.Arc(
            new Point(view.center.x - ln, view.center.y),
            new Point(view.center.x - ln/2, view.center.y + ln/2),
            new Point(view.center.x, view.center.y));
var arcTR = new Path.Arc(
            view.center, 
            new Point(view.center.x + ln/2, view.center.y - ln/2),
            new Point(view.center.x + ln, view.center.y));
var arcBR = new Path.Arc(
            {x: view.center.x + ln/2 + Math.cos((90+25)*Math.PI/180)*ln/2, y: view.center.y + Math.sin((90+25)*Math.PI/180)*ln/2},
            {x: view.center.x + ln/2, y: view.center.y + ln/2},
            {x: view.center.x + ln, y: view.center.y});
arcBL.visible = false;
arcTR.visible = false;
var leftGroup = new Group([arcTL, arcBL]);
leftGroup.position.y -= ln/6;
leftGroup.scale(0.9, 1, view.center)
var rightGroup = new Group([arcTR, arcBR]);
rightGroup.position.y += ln/8;


var midCurve = new Path([
    arcBL.segments[0], arcBL.segments[1],
    new Segment(
        lineMid.getPointAt(lineMid.length/2),
        new Point(-ln/12, ln/6),
        new Point(ln/12, -ln/6)),
    arcTR.segments[1], arcTR.segments[2]])
// midCurve.strokeColor = 'red'
midCurve.visible = false;

var lineTop = new Path.Line(
            {x: view.center.x - ln - ln/4, y: view.center.y - ln},
            {x: view.center.x + ln + ln/4, y: view.center.y - ln}
            )

var arcBL = leftGroup.children[1];
var arcTL = leftGroup.children[0];
// drawC(arcBL.firstSegment.point, 20);
var xDist = (arcBL.firstSegment.point - arcBL.lastSegment.point).length;
var yDist = ln - ln/6;
var refp1 = arcBL.firstSegment.point - new Point(0, yDist);
// drawC(refp1, 20)
// var refp2 = arc2.firstSegment.point - new Point(ln/2+ln/8, 0);
var refarc1 = new Path.Arc(
    arcBL.firstSegment.point + new Point(Math.cos(radians(0))*xDist, Math.sin(0)*yDist),
    arcBL.firstSegment.point + new Point(Math.cos(radians(-45))*xDist, Math.sin(radians(-45))*yDist),
    arcBL.firstSegment.point - new Point(0, yDist));

var refarc2 = new Path.Arc(
    arcTL.segments[1].point,
    arcBL.firstSegment.point + new Point(Math.cos(radians(-80))*xDist*0.7, Math.sin(radians(-80))*yDist*0.7),
    arcBL.firstSegment.point - new Point(0, yDist*0.7))
refarc2.visible = false;
refarc2 = new Path([refarc2.segments[0], refarc2.segments[1]])    
refarc1.visible = false;
refarc2.visible = false;
// drawC(arcBL.firstSegment.point + new Point(Math.cos(radians(-45))*xDist, Math.sin(radians(-45))*yDist), 20)
// drawC(arcTL.lastSegment.point, 20)

arcTL.lastSegment.point = refarc1.lastSegment.point
arcTL.lastSegment.handleIn = new Point(0, 0)
arcTL.segments[1].point =  refarc1.lastSegment.point + new Point(0, ln/2)
arcTL.segments[1].handleIn = new Point(0, ln/4),
arcTL.segments[1].handleOut = new Point(0, -ln/4)

// animations
var tspan = 3000
// arcTL.tween(
//     {
//         'lastSegment.point': view.center - new Point(ln, ln),
//         'lastSegment.handleIn': new Point(0, 0),
//         'segments[1].point': view.center - new Point(ln, ln/2),
//         // 'segments[1].handleIn': new Point(0, ln/4),
//         // 'segments[1].handleOut': new Point(0, -ln/4)
//         'segments[1].handleIn': new Point(0, ln/4),
//         'segments[1].handleOut': new Point(0, -ln/4)
//     }, 
//     {
//         duration: tspan,
//         easing: 'easeInOutQuart'
//     })


    
// var t1 = arcTL.tween({
//     duration: tspan,
//     easing: 'easeInOutQuart'
// })
// var off1 = 0, off2 = 0;
// var handleLength = arcBL.firstSegment.handleOut.y
// var arcC = arcTL.clone({insert: false})
// var handle1 = arcC.lastSegment.handleIn
// var handle2 = arcC.segments[1].handleIn
// var handle3 = arcC.segments[1].handleOut
// t1.onUpdate = function(event) {
//     var times = tspan/1000 * 62;
//     var angle = map(event.factor, 0, 1, 0, Math.PI*0.5);
//     var amp = 1;
    
//     var cp1 = refarc1.getPointAt(off1);
//     var norm1 = refarc1.getNormalAt(off1);
//     var f1 = Math.abs(Math.sin(angle))*refarc1.length;
//     // drawC(cp1, 10);
//     // drawL(cp1, cp1+norm1*10);
//     off1 = f1;
    
//     arcTL.lastSegment.point = cp1;
//     arcTL.lastSegment.handleIn = norm1 + handle1.normalize()*handleLength;
    
//     var cp2 = refarc2.getPointAt(off2);
//     var norm2 = refarc2.getNormalAt(off2);
//     var f2 = Math.abs(Math.sin(angle))*refarc2.length;
//     // drawC(cp2, 10);
//     // drawL(cp2, cp2+norm2*10);
//     off2 = f2;
    
//     arcTL.segments[1].point = cp2;
//     arcTL.segments[1].handleIn = norm2*-1 + handle2.normalize()*handleLength;
//     arcTL.segments[1].handleOut = norm2 + handle3.normalize()*handleLength;

//     arcTL.smooth({
//         type: 'geometric',
//         factor: 0.6
//     });
    
//     handleLength -= 0.21
    
//     var lineTop = new Path.Line(
//             {x: view.center.x - ln - ln/4, y: view.center.y - ln},
//             {x: view.center.x + ln + ln/4, y: view.center.y - ln}
//             )

// }

var letterPath = new CompoundPath({
    children: [lineMid, arcTL, arcTR, arcBL, arcBR, lineTop]
})
window.letterPath = letterPath