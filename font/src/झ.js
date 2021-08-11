var size = new Size(600, 600);
project.currentStyle = {
    strokeColor: 'black',
    strokeWidth: 16,
    strokeCap: 'butt'
}

var ln = 150;

var line1 = new Path.Line(
    {x: view.center.x + ln/2, y: view.center.y - ln},
    {x: view.center.x + ln/2, y: view.center.y - ln*2/3});
var lineh1 = new Path.Line(
    {x: view.center.x + ln/2, y: view.center.y - ln*2/3},
    {x: view.center.x - ln/3, y: view.center.y - ln*2/3});
var arc1 = new Path.Arc(
    {x: view.center.x - ln/3, y: view.center.y - ln*2/3},
    {x: view.center.x - ln/3 - ln/4-ln/12, y: view.center.y - ln*1/3},
    {x: view.center.x - ln/3, y: view.center.y });
var ref1 = {x: view.center.x, y: view.center.y - ln};
var ref2 = {x: view.center.x + ln/2 + ln/4, y: view.center.y - ln/8};
var lineh2 = new Path.Line(
    {x: view.center.x - ln/3, y: view.center.y},
    {x: view.center.x + ln/4, y: view.center.y});
var arc2 = new Path.Arc(
    {x: view.center.x + ln/4, y: view.center.y},
    {x: view.center.x + ln/4 + ln/4+ln/4, y: view.center.y + ln/2},
    {x: view.center.x + ln/4, y: view.center.y + ln});
var lineh3 = new Path.Line(
    {x: view.center.x + ln/4, y: view.center.y + ln},
    {x: view.center.x - ln/3 - ln/4, y: view.center.y + ln})
// var refc = new Path.Circle(ref1, 2);
var arc3 = new Path.Arc(
    {x: view.center.x - ln/3 - ln/4, y: view.center.y + ln},
    {x: view.center.x - ln/3 - ln/4 - ln/8, y: view.center.y + ln - ln/10},
    {x: view.center.x - ln/3 - ln/4 + ln/8, y: view.center.y + ln - ln/10});
var linev1 = new Path.Line(
    {x: view.center.x - ln/3 - ln/4 + ln/8, y: view.center.y + ln - ln/10},
    {x: view.center.x - ln/3 - ln/4 + ln/8, y: view.center.y + ln + ln/4});
var lineR = new Path.Line(
    {x: view.center.x + ln/2 + ln/4, y: view.center.y - ln},
    {x: view.center.x + ln/2 + ln/4, y: view.center.y + ln});
// var lineM = new Path.Line(
//     {x: view.center.x + ln/4 - ln/20 + ln*2/3 - ln/6, y: view.center.y + ln/4},
//     {x: view.center.x + ln/2 + ln/4 + ln*2/3 - ln/6, y: view.center.y + ln/4});

var group = new Group();
group.addChildren([line1, lineh1, arc1, lineh2, arc2, lineh3, arc3, linev1]);    
group.scale(0.8, 1);
group.position.x -= ln/3;
// lineM.scale(0.8, 1);
// lineM.position.x -= ln/3;

var factor = 1;
var tspan = 1500;
// var lineMid = lineM.getPointAt(lineM.length/2);
var lineMC = new Path.Line(
    {x: view.center.x + ln/4 - ln/40, y: view.center.y + ln/4},
    {x: view.center.x + ln/2 + ln/4, y: view.center.y + ln/4});
// lineMC.strokeWidth = 4.5;
// lineMC.scale(0.6, 1);
// var refc = new Path.Circle({x: view.center.x + ln/2 + ln/4, y: view.center.y}, 20);
// var t1 = group.tween(8000)
var tInt = 2000;
var amp = 0.008*3.8;
// t1.onUpdate = function(event) {
//     var t = event.factor*6*2;
//     var f = -Math.sin(t)*amp;
//     group.scale(1+f, 1);
//     amp += 0.000009; 

//     // group.scale(-1-f, 1);
//     var scaleP = {x: view.center.x, y: view.center.y - ln}
//     // group.scale(1, 1 + Math.sin(t/2)*0.008, scaleP);
    
//     // var moveLeft = new Point(ln/4 + ln/12, 0);
//     // lineMC.scale(1-f/2, 1, {x: view.center.x + ln/2 + ln/4, y: view.center.y});
//     // lineMC.scale(1, 1 + Math.sin(t/2)*0.008, scaleP);
// }
// t1.then(function() {
//     tInt = 2000;
//     var t2 = group.tween(8000);
//     t2.onUpdate = function(event) {
//         var t = event.factor*12*2.2;
//         var f = Math.sin(t)*0.06;
//         group.scale(1+f, 1);
//     }
// })

// setInterval(function() {
//     group.scale(-1, 1);
// }, tInt);

var lineTop = new Path.Line(
            {x: view.center.x - ln -ln/8 , y: view.center.y - ln},
            {x: view.center.x + ln +ln/8, y: view.center.y - ln}
            )