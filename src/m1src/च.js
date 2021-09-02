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
var arc1t = arc1.clone().scale(1, -1);
arc1t.position.y -= ln/2 + ln/4 + ln/17;
var arc2t = arc2.clone().scale(1, -1);
arc2t.position.y -= ln/2 + ln/4;
var hlineLt = hlineL.clone().scale(1, -1);
hlineLt.position.y -= 4;
g1.addChildren([arc1, arc2]);
g2.visible = false;
// g1.visible = false;
g2.addChildren([hlineLt, arc1t, arc2t]);
// g2.rotate(90, view.center);
// g1.shear(1.2, 0, view.center);

var tspan = 4000;
// g2.tween(tspan).onUpdate = function(event) {
//     var t = event.factor*6;
//     g2.shear(-Math.sin(t)*0.005, 0, view.center);
// }
// var flip = arc1t.tween(tspan);
// flip.onUpdate = function(event) {
//     arc1t.interpolate(arc1t.clone({insert: false}), arc1, event.factor/10);
// }
// var arcp1 = new Path([arc1.segments[1], arc1.segments[2]]);
// arcp1.strokeColor = 'red';
// var arcp2 = new Path([arc2.segments[0], arc2.segments[1]]);
// arcp2.strokeColor = 'red';

// var a = new Path([arc1t.segments[1], arc1t.segments[2]]);
// g2.addChildren([a, arc2t]);
// flip.then(function() {
//     g2.visible = false;
//     g1.tween(4000).onUpdate = function(event) {
//         var t = event.factor*6;
//         // g1.scale(1, 1 + Math.sin(t)*0.01);
//         // var shearP = view.center + new Point(Math.cos(t), Math.sin(t))*40;
//         // var c = new Path.Circle(shearP, 10);
//         // g2.rotate(-2, view.center);
//         // arcp1.interpolate(arcp1.clone({insert: false}), a, event.factor/10);
//         // arcp2.interpolate(arcp2.clone({insert: false}), arc2t, event.factor/10);
//         // hlineLt.interpolate(hlineLt.clone({insert: false}), hlineL, event.factor/10);
//         g1.shear(Math.sin(t)*0.014, 0, view.center);
//     }
// });
// arc2t.tween(tspan).onUpdate = function(event) {
//     arc2t.interpolate(arc2t.clone({insert: false}), arc2, event.factor/10);
// }
// hlineLt.tween(tspan).onUpdate = function(event) {
//     hlineLt.interpolate(hlineLt.clone({insert: false}), hlineL, event.factor/10);
// }

// var curve = new Path([
//     {x: view.center.x - ln/2, y: view.center.y},
//     {x: view.center.x - ln/2 - ln/12, y: view.center.y + ln/4 },
//     {x: view.center.x - ln/2 , y: view.center.y + ln/2 + ln/16},
//     {x: view.center.x - ln/4, y: view.center.y + ln*3/4},
//     {x: view.center.x + ln/8, y: view.center.y + ln/4 + ln/8 + ln/4 + ln/12},
//     {x: view.center.x + ln/4 + ln/4, y: view.center.y + ln/4 + ln/8 + ln/60},
//     {x: view.center.x + ln/2 + ln/4, y: view.center.y}]);
// curve.smooth();

// var segments = curve.segments;
// curve.tween(4000).onUpdate = function(event) {
//     var t = event.factor*10;
//     var disp = new Point(Math.cos(-t), Math.sin(-t));
//     curve.segments[1].point = segments[1].point + (disp*0.2);
//     curve.segments[2].point = segments[2].point + (disp*0.5);
//     // curve.segments[3].point = segments[3].point + (disp*4);
//     // curve.segments[4].point = segments[4].point + (disp*5);
//     // curve.segments[5].point = segments[5].point + (disp*6);
// }
// curve.strokeColor = 'white';

var lineTop = new Path.Line(
            {x: view.center.x - ln -ln/8 , y: view.center.y - ln},
            {x: view.center.x + ln +ln/8, y: view.center.y - ln}
            )
var letterPath = new CompoundPath({
    children: [lineR, hlineL, arc1, arc2, lineTop]
})
window.letterPath = letterPath