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

g1.addChildren([hlineL, arc1, arc2]);
g1.position.y -= ln/6;
// g1.applyMatrix = false;

var tspan = 2000;
// g1.tween(
//     {scaling: {x: -1, y: 1}},
//     {
//         easing: 'easeInOutCubic',
//         duration: tspan
//     }
// );

g1.scaling = {x: -1, y: 1};
// var factor = 1;
// var t1 = g1.tween(tspan)
// t1.onUpdate = function(event) {
//     var t = event.factor*2;
//     factor = -Math.sin(t)*0.03;
//     g1.scaling = {x: 1 + factor, y: 1};
//     // g1.shear(Math.sin(t)*0.02, 0);
// }
// t1.then(function() {
//     g1.scale(-1, 1);
//     var t2 = g1.tween(tspan);
//     t2.onUpdate = function(event) {
//         var t = event.factor*2;
//         factor = Math.sin(t)*0.0305;
//         g1.scaling = {x: 1 + factor, y: 1};
//     }
// });
    
var lineTop = new Path.Line(
            {x: view.center.x - ln -ln/8 , y: view.center.y - ln},
            {x: view.center.x + ln +ln/8, y: view.center.y - ln}
            )
