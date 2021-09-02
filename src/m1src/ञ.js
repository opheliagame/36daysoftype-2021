var size = new Size(600, 600);
project.currentStyle = {
    strokeColor: 'black',
    strokeWidth: 16,
    strokeCap: 'butt'
}

var ln = 150;
var lineR = new Path.Line(
    {x: view.center.x + ln/2 + ln/4, y: view.center.y - ln},
    {x: view.center.x + ln/2 + ln/4, y: view.center.y + ln});
var lineM = new Path.Line(
    {x: view.center.x + ln/4 - ln/40, y: view.center.y},
    {x: view.center.x + ln/2 + ln/4, y: view.center.y});
var arc1 = new Path.Arc(
    {x: view.center.x - ln/6, y: view.center.y - ln/3},
    {x: view.center.x + ln/4 - ln/40, y: view.center.y},
    {x: view.center.x - ln/6, y: view.center.y + ln/3});
var rotM = new Matrix();
rotM.rotate(180, view.center);
// console.log(arc1.segments[1].clone().transform(rotM));
var arc2 = new Path.Arc(
    arc1.lastSegment.point,
    {x: view.center.x - ln/2 - ln/6, y: view.center.y},
    {x: view.center.x - ln/2 - ln/4, y: view.center.y - ln/6});
var arcG = new Group([arc1, arc2]);
arcG.scale(1.2, lineM.firstSegment.point);

var tspan = 2000;
var rotP = lineM.firstSegment.point;

// arcG.tween(tspan).onUpdate = function(event) {
//     arcG.rotate(-3, rotP);
// }

var startOffset = arcG.firstChild.getOffsetOf(rotP);
var f = 0;
// var t1 = arcG.tween(tspan/2)
// t1.onUpdate = function(event) {
//     f += 0.41*2*2;
    
//     var pArc = arcG.firstChild.getPointAt(startOffset - f);
//     var distV = rotP - pArc;
//     // var refc = new Path.Circle(pArc + distV, 20);
//     arcG.translate(distV);
//     // refc.position = arcG.position;
// }

// t1.then(function() {
//     // var t2 = arcG.tween(4000)
//     // t2.onUpdate = function(event) {
//     //     var t = event.factor*6.35;
//     //     // arcG.shear(Math.sin(t)*0.01, -Math.sin(t)*0.005, lineM.firstSegment.point);
//     //     arcG.rotate(Math.sin(t)*1.2, lineM.firstSegment.point);
        
        
//     // }
//     // t2.then(function() {
//         var t3 = arcG.tween(tspan/2)
//         t3.onUpdate = function(event) {
//             f -= 0.41*2*2;
//             var pArc = arcG.firstChild.getPointAt(startOffset - f);
//             var distV = rotP - pArc;
//             arcG.translate(distV);
//         }
//     // })
// })



var lineTop = new Path.Line(
            {x: view.center.x - ln -ln/8 , y: view.center.y - ln},
            {x: view.center.x + ln +ln/8, y: view.center.y - ln}
            )
var letterPath = new CompoundPath({
    children: [lineR, lineM, arc1, arc2, lineTop]
})
window.letterPath = letterPath
