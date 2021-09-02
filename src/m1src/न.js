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
var r = 40;
var refL = new Point(view.center.x - ln/3, view.center.y + ln/4)
var lineL = new Path.Line(
    {x: view.center.x - ln/3, y: view.center.y - ln},
    refL);
var circL = new Path.Circle(
    {x: refL.x - r, y: refL.y},
    r);

var refR = new Point(view.center.x + ln/3, view.center.y + ln)
var lineR = new Path.Line(
    {x: view.center.x + ln/3, y: view.center.y - ln},
    refR);
var circR = new Path.Circle(
    {x: refR.x - r, y: refR.y},
    r);
circR.visible = false
    
// animations
// var tspan = 2000;
// circL.tween(tspan/2).onUpdate = function(event) {
//     var y = refL.y + Math.sin(event.factor*10) * 20;
//     circL.position.y = y;
//     lineL.segments[1].point.y = y;
// }
// var tween1 = circR.tween(tspan/2)
// tween1.onUpdate = function(event) {
//     var y = refR.y + Math.sin(event.factor*10) * 20;
//     circR.position.y = y;
//     lineR.segments[1].point.y = y;
// }    
// tween1.then(function() {
//     var tween2 = circR.tween(600);
//     tween2.onUpdate = function(event) {
//         // projectile?
//         var t = event.factor;
//         circR.position.x -= 2 * t;
//         circR.position.y += 2 * t * t;
//       } 
       
//       tween2.then(function() {
//           circR.tween(tspan/2).onUpdate = function(event) {
//               circR.position.x -= 2;
//           }
          
//           var lineA = new Path.Line(
//               lineL.lastSegment.point, 
//               circL.segments[2].point);
//           var t3 = circL.tween(tspan)
//           var refp = circL.position;
//           t3.onUpdate = function(event) {
//               var angle = map(event.factor, 0, 1, 0, Math.PI);
//               circL.position.x = refp.x + -Math.abs(Math.sin(angle))*ln/2;
//               circL.position.y = refp.y + Math.abs(Math.sin(angle))*ln/4;
              
//               circR.position.x -= 2;
//               lineA.lastSegment.point = circL.segments[2].point;
//           }
          
//           t3.then(function() {
//               lineA.visible = false;
//               var t = tspan/2;
//               lineR.tween(
//                   {
//                       'position.x': view.center.x + ln/2 + ln/4
//                   }, t)
            
//               lineL.tween(
//                   {
//                        'firstSegment.point': {x: view.center.x + ln/2 + ln/4, y: view.center.y - ln/4},
//                        'lastSegment.point': {x: view.center.x - ln/2, y: view.center.y - ln/4}
//                   }, t)
//               circL.tween(
//                   {
//                       position: lineL.lastSegment.point + new Point(0, r)
//                   }, t)
//               var t4 = lineTop.tween(
//                   {
//                       'firstSegment.point.x': view.center.x - ln + ln/12,
//                       'lastSegment.point.x': view.center.x + ln + ln/10
//                   }, t) 
//               t4.then(function() {
//                   // dribble
//                 //   drawC(circL.segments[1].point, 10);
//                 var lineA = new Path.Line(
//                     lineL.lastSegment.point, 
//                     circL.segments[1].point)
                
//                 var refp = lineL.lastSegment.point;
//                 var t5 = circL.tween(tspan*2)
//                 t5.onUpdate = function(event) {
//                     var angle = map(event.factor, 0, 1, 0, Math.PI*4)
//                     circL.position.y = refp.y+r+ Math.abs(Math.sin(angle))*(ln-ln/4-r)
//                     // drawC(circL.position, 10);
//                     circL.scale(1, 1-Math.sin(angle*2)*0.01);
//                     lineA.lastSegment.point = circL.segments[1].point
                    
//                     lineL.lastSegment.point.y = refp.y + Math.sin(angle*2)*ln/40;
//                     lineA.firstSegment.point = lineL.lastSegment.point
//                 }
                
                  
//               })
            
//           })
//       })
      
// });

var lineTop = new Path.Line(
            {x: view.center.x - ln + ln/8 , y: view.center.y - ln},
            {x: view.center.x + ln - ln/8, y: view.center.y - ln}
            )
var letterPath = new CompoundPath({
    children: [lineL, lineR, circL, circR, lineTop]
})
window.letterPath = letterPath
