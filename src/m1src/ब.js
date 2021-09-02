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
    {x: view.center.x + ln/2, y: view.center.y - ln},
    {x: view.center.x + ln/2, y: view.center.y + ln})
var arc1 = new Path.Arc(
    lineR.getPointAt(lineR.length/2) + new Point(0, -ln/8),
    view.center + new Point(-ln/2, 0),
    lineR.getPointAt(lineR.length/2) + new Point(0, ln/8))
var arc2 = new Path.Arc(
    arc1.segments[4].point,
    lineR.getPointAt(lineR.length/2) + new Point(ln/64, 0),
    arc1.segments[0].point)
// arc1.fillColor = 'black'
// arc2.fillColor = 'black';
var lineM = new Path.Line(
    arc1.getPointAt(arc1.length/2 - arc1.length/8),
    arc1.getPointAt(arc1.length - arc1.length/12));
var pGroup = new Group([arc1, arc2, lineM]);
// pGroup.position = new Point(25, view.center.y + ln/2 + ln/4)

var lineTop = new Path.Line(
            {x: view.center.x - ln + ln/12, y: view.center.y - ln},
            {x: view.center.x + ln - ln/12, y: view.center.y - ln}
            )

var letterPath = new CompoundPath({
    children: [lineR, arc1, arc2, lineM, lineTop]
})
window.letterPath = letterPath;

// animations
// var tspan = 3000


// const shake = (path, degree, tspan) => {
//     var t = path.tween(tspan)
//     t.onUpdate = function(event) {
//         var times = map(event.factor, 0, 1, Math.PI/2, Math.PI*degree)
//         var angle = Math.sin(times)*3;
//         path.rotate(angle)
//     }
//     return t;
// }

// const roll = (path, point, tspan) => {
//     path.applyMatrix = false;
//     var t = pGroup.tween(
//         {
//             'position': view.center + point,
//             'rotation': 360
//         }, tspan)
//     return t;
// }

// const rollAndClimb = (path, tspan) => {
//     path.applyMatrix = false;
//     var t = path.tween(
//         {
//             'position': new Point(view.center.x, view.center.y + ln/2),
//             'rotation': 180
//         }, tspan/2)
//     t.then(function() {
//       var t2 = path.tween(
//           {
//               'position': view.center,
//               'rotation': -180
//           }, tspan/2);  
//     })
//     return t;
// }

// const returnToOrig = (path, tpan) => {
//     var t = path.tween(
//         {
//             'rotation': 0
//         }, tspan)
//     return t;
// }

// lineTop.applyMatrix = false;
// lineR.applyMatrix = false;


// // then circle of hell 
// Promise.resolve()
// .then(() => {
//     shake(lineR, 10, tspan)
//     var t2 = shake(lineTop, 20, tspan)
//     return t2;
// })
// .then(function() {
    
//     console.log('first shake over')
    
//     var t3 = roll(pGroup, new Point(ln*2.8, ln/2 + ln/4), tspan)
//     shake(lineR, 10/6, tspan/6)
//     shake(lineTop, 20/6, tspan/6)
//     return t3;
// })
// .then(function() {
        
//     pGroup.position = new Point(25, view.center.y + ln/2 + ln/4)
//     shake(lineR, 10, tspan)
//     var t4 = shake(lineTop, 20, tspan)
//     return t4;
// })
// .then(function() {
//     console.log('second shake over')
    
//     var t5 = roll(pGroup, new Point(ln*2.8, ln/2 + ln/4), tspan)
//     shake(lineR, 10/6, tspan/6)
//     shake(lineTop, 20/6, tspan/6)
//     return t5;
// })
// .then(function() {
//     shake(lineR, 10, tspan)
//     var t6 = shake(lineTop, 20, tspan)
//     return t6;
// })
// .then(function() {
//     rollAndClimb(pGroup, tspan*2)
//     // console.log(lineTop.rotation);
//     // console.log(lineR.rotation);
//     returnToOrig(lineR, tspan)
//     returnToOrig(lineTop, tspan)
// })