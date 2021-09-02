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
    view.center + new Point(ln/2, -ln),
    view.center + new Point(ln/2, ln))
lineR.insert(1, lineR.getPointAt(lineR.length/2))
var refp = lineR.getPointAt(lineR.length/2)
var beakBottom = new Path.Line(
    refp,
    refp + new Point(-ln*1.2, ln/2))
var r = ln/8
refp += new Point(-ln*1.2, -ln/2) + new Point(0, r)
var hand1 = new Point(0, -1)*r
var hand2 = new Point(-1, 0)*r
var beakTop = new Path([
    new Segment(refp, null, hand1),
    new Segment(refp + new Point(ln/4, -ln/4), hand2, hand2*-2),
    new Segment(lineR.getPointAt(lineR.length/2), null, null)])
var beak = new Group([beakTop, beakBottom])

var lineTop = new Path.Line(
        {x: view.center.x - ln+ln/20, y: view.center.y - ln},
        {x: view.center.x + ln-ln/20, y: view.center.y - ln})


// animations
// const swingAroundPoint = (path, rotP, sdeg, edeg, amp, tspan) => {
//     var t = path.tween({
//         duration: tspan,
//         easing: 'easeInOutCubic'
//     })
//     t.onUpdate = function(event) {
//         var times = map(event.factor, 0, 1, Math.PI*sdeg, Math.PI*edeg)
//         var angle = Math.sin(times)*amp;
//         path.rotate(angle, rotP)
//         // drawC(path.position, 10);
//     }
//     return t;
// }
// const move = (path, seg, target, start, tspan) => {
//     var t = path.tween(tspan)
//     t.onUpdate = function(event) {
//         var times = tspan/1000*61;
//         // var intersections = target.getIntersections(handC);
//         // for(var i = 0; i < intersections.length; i++) {
//         //     // drawC(intersections[i].point, 10);
//         // }
//         var targetp = target;
//         // drawC(targetp, 10);
//         if(start == true) {
//             var f = 1-event.factor;
//             var step = (targetp-seg.point)/(f*times);
//             if(f == 0)  step = 0;
//         }
//         else {
//             step = (targetp-seg.point);
//         }
//         seg.point += step;
//     }
//     return t;
// } 

// const anim = (rotStart) => {
//     move(lineR, lineR.segments[1], target, false, tspan/4)
//     target += new Point(r, 0)
//     return swingAroundPoint(beak, lineR.lastSegment.point, rotStart, -2, 2, tspan)
// }

// var tspan = 500;
// r = r/4;
// var target = lineR.segments[1].point + new Point(r, 0)

// Promise.resolve()
// .then(() => {
//     return swingAroundPoint(beak, lineR.lastSegment.point, 0, -2, 2, tspan)
// })
// .then(() => anim(0.01))
// .then(() => anim(0.02))
// .then(() => anim(0.03))
// .then(() => anim(0.04))
// .then(() => anim(0.05))
// // .then(() => anim(0.06))
// // .then(() => anim(0.07))
// .catch((e) => console.log(e))
var letterPath = new CompoundPath({
    children: [lineR, beakBottom, beakTop, lineTop]
})
window.letterPath = letterPath