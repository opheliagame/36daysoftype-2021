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
var leftArc = new Path.Arc(
    {x: view.center.x - ln*3/4, y: view.center.y - ln},
    {x: view.center.x - ln/3, y: view.center.y - ln/2},
    {x: view.center.x - ln, y: view.center.y });
var leftLine = new Path([
    {x: view.center.x - ln, y: view.center.y},
    {x: view.center.x - ln/4 - ln*3/8, y: view.center.y + ln/2},
    {x: view.center.x - ln/4, y: view.center.y + ln}]);
// leftLine.visible = false;
var bottomArc = new Path.Arc(
    {x: view.center.x - ln, y: view.center.y},
    {x: view.center.x - ln/4, y: view.center.y + ln*3/4},
    {x: view.center.x + ln*3/4, y: view.center.y + ln/2});
// bottomArc.visible = false;
var rightLine = new Path.Line(
    {x: view.center.x + ln*3/4, y: view.center.y - ln},
    {x: view.center.x + ln*3/4, y: view.center.y + ln});


var lineTop = new Path.Line(
        {x: view.center.x - ln-ln/8, y: view.center.y - ln},
        {x: view.center.x + ln+ln/8, y: view.center.y - ln})


// animations 
var tspan = 1000;
// console.log(bottomArc.segments);
bottomArc.segments[1].point = bottomArc.getPointAt(bottomArc.length/2);
bottomArc.visible = false
var slope = leftLine.firstSegment.point - leftLine.lastSegment.point;

var hand = new Path.Line(
    rightLine.getPointAt(rightLine.length*0.4), 
    rightLine.getPointAt(rightLine.length*0.4));
var handC = hand.clone();
handC.lastSegment.point = new Point(107, hand.firstSegment.point.y);
handC.lastSegment.point = leftArc.getIntersections(handC)[0].point
// handC.visible = false;

var letterPath = new CompoundPath({
    children: [leftArc, leftLine, rightLine, handC, lineTop]
})
window.letterPath = letterPath

// const stand = (tspan) => {
//     var t1 = bottomArc.tween(
//     {
//         'firstSegment.handleOut': new Point(0, 0),
//         'segments[1].point': leftLine.segments[1].point,
//         'segments[1].handleIn': slope*0.5,
//         'segments[1].handleOut': slope*-0.5,
//         'lastSegment.point': leftLine.lastSegment.point,
//         'lastSegment.handleIn': new Point(0, 0)
//     }, tspan/2)
//     return t1;
// }
const swingAroundPoint = (path, rotP, sdeg, edeg, amp, tspan) => {
    var t = path.tween(tspan)
    t.onUpdate = function(event) {
        var times = map(event.factor, 0, 1, Math.PI/2+Math.PI*sdeg, Math.PI/2+Math.PI*edeg)
        var angle = Math.sin(times)*amp;
        path.rotate(angle, rotP)
        // drawC(path.position, 10);
    }
    return t;
}
const move = (path, seg, target, start, tspan) => {
    
    var t = path.tween(tspan)
    
    t.onUpdate = function(event) {
        var times = tspan/1000*61;
        var intersections = target.getIntersections(handC);
        for(var i = 0; i < intersections.length; i++) {
            // drawC(intersections[i].point, 10);
        }
        var targetp = intersections[0].point;
        // drawC(targetp, 10);
        if(start == true) {
            var f = 1-event.factor;
            var step = (targetp-seg.point)/(f*times);
            if(f == 0)  step = 0;
        }
        else {
            step = (targetp-seg.point);
        }
        
        seg.point += step;
    }
    return t;
} 




// Promise.resolve()
// .then(() => stand(tspan*3))
// .then(() => swingAroundPoint(leftArc, leftLine.firstSegment.point, 0.5, 0.5+5.5, 4, tspan*3))
// .then(() => {
//     var left = new Group([leftArc, bottomArc]);
//     lineTop.bringToFront();
    
//     move(hand, hand.lastSegment, left.children[0], true, tspan*2);
//     return swingAroundPoint(left, leftLine.lastSegment.point, 0.5, 0.5+1, 0.3, tspan*2)
// })
// .then(() => {
//     var left = new Group([leftArc, bottomArc]);
//     lineTop.bringToFront();
//     move(hand, hand.lastSegment, left.children[0], false, tspan*2);
//     // swingAroundPoint(left.children[0], leftLine.firstSegment.point, 0.5, 0.5+5.5, 4, tspan*3)
//     return swingAroundPoint(left, leftLine.lastSegment.point, -0.5, -0.5+1, 0.3, tspan*2)
// })
// .then(() => {
//     move(hand, hand.lastSegment, leftArc, false, tspan);
//     return swingAroundPoint(leftArc, leftLine.firstSegment.point, 0.5, -0.5, 1, tspan)
// })
// .then(() => {
//     var left = new Group([leftArc, bottomArc]);
//     var lPos = left.position;
//     // var full = new Group([leftArc, bottomArc, hand, rightLine]);
//     lineTop.bringToFront();
    
//     move(hand, hand.lastSegment, left.children[0], false, tspan);
//     move(hand, hand.firstSegment, rightLine, false, tspan);
//     var dist = ln/12;
//     left.tween(
//         {
//             'position': lPos + new Point(dist, 0)
//         }, tspan)
//     rightLine.tween(
//         {
//             'position': rightLine.position + new Point(-dist, 0)
//         }, tspan)
// })
// .catch((e) => console.log(e));