var size = new Size(600, 600);
project.currentStyle = {
    strokeColor: 'black',
    strokeWidth: 16,
    strokeCap: 'butt'
}

var ln = 150;
var lineV = new Path.Line(
    {x: view.center.x, y: view.center.y - ln},
    {x: view.center.x, y: view.center.y - ln/4});
var r = ln/2 + ln/4;
// var refc = new Path.Circle(lineV.lastSegment.point + new Point(0, r), 20);
var circle = new Path.Ellipse({
    center: lineV.lastSegment.point + new Point(0, r*0.9),
    size: [r*2, 0.9*r*2],
});
// circle.scale(1, 0.9, lineV.lastSegment.point);


var lineTop = new Path.Line(
            {x: view.center.x - ln + ln/8, y: view.center.y - ln},
            {x: view.center.x + ln - ln/8, y: view.center.y - ln}
            )
var hinge = lineV.lastSegment.point + new Point(0, r*0.9);

var topG = new Group([lineV, lineTop]);
// topG.translate(new Point(ln*2, 0));
// var rotPath = circle.clone().scale(0.5);
// circle.translate(new Point(-ln*2, 0));
// circle.rotate(90);

// animations
// var tspan = 2000;

// var rotP = lineV.lastSegment.point;
// var startOffset = circle.getOffsetOf(circle.segments[1].point);
// // startOffset = 0;
// var f = 0;

// var t1 = topG.tween({ duration: tspan, start: false })
// t1.onUpdate = function(event) {
//     var times = tspan/1000 * 61;
//     // topG.translate(new Point(-ln*2/times, 0));
//     circle.translate(new Point(ln*2/times, 0));
//     circle.rotate(90*(2+1)/times);
// }
// var amp = 0.1;
// var circleC = circle.clone();
// // circleC.translate(new Point(ln*2, 0))
// // circleC.rotate(90);
// circleC.visible = false;

// function rotateCircleByHinge(angle) {
//     var off = circle.length * angle/360;
//     var pCirc = circleC.getPointAt((startOffset + off)%circle.length);
//     var diffY = (pCirc - hinge).length - (rotP - hinge).length;
//     circle.position.y = diffY + hinge.y;
//     circle.rotate(angle);
// }

// rotateCircleByHinge(60);

// t1.then(function() {
//     var t2 = circle.tween(tspan*3)
//     t2.onUpdate = function(event) {
//         // f += circle.length/(360/rotAngle);
//         // console.log(circle.length/(360/rotAngle));
//         var times = tspan*3/1000 * 61;
//         f += circle.length/times;
//         var rotAngle = 360/times;
//         // console.log(rotAngle);
//         var pCirc = circleC.getPointAt((startOffset + f)%circle.length);
//         var diffY = (pCirc - hinge).length - (rotP - hinge).length;
        
//         // console.log(diffY);
//         // var hDist = pCirc.y - rotP.y;
//         var c = circle.position - rotP;
//         var distV = rotP - pCirc + new Point(0, r);
//         // console.log(distV);
//         // var refc = new Path.Circle(pCirc, 2);
//         circle.position.y = diffY + hinge.y;
//         circle.rotate(rotAngle);
        
//         // console.log(circle.position, event.factor);
//     }
//     // t2.then(function() {
//     //     var t3 = circle.tween(tspan)
//     //     t3.onUpdate = function(event) {
//     //         var t = event.factor*12;
//     //         var f = -Math.sin(t)*amp;
//     //         amp += t/15000;
//     //         circle.scale(1, 1 + f);
//     //     }
//     // })
// })
