var size = new Size(600, 600);
project.currentStyle = {
    strokeColor: 'black',
    strokeWidth: 16,
    strokeCap: 'butt'
}

var ln = 150;
var lineR = new Path.Line(
    {x: view.center.x + ln*2/3, y: view.center.y - ln},
    {x: view.center.x + ln*2/3, y: view.center.y - ln/2});
var r = new Size(ln/3, ln/2);
var group = new Group();
var ellR = new Path.Ellipse({
    point: [view.center.x + ln*2/3 - r.width/2, view.center.y - ln/2],
    size: [r.width, r.height]});
var arc1 = new Path.Arc(
    {x: view.center.x - ln*2/3, y: view.center.y - ln/2},
    {x: view.center.x - ln, y: view.center.y - ln/4},
    {x: view.center.x - ln/2, y: view.center.y + ln/8});
var refp = {x: view.center.x + ln*3/4, y: view.center.y + ln/2};
// var refc = new Path.Circle(refp, 10);
var arc2 = new Path.Arc(
    {x: view.center.x - ln/2, y: view.center.y + ln/8},
    {x: view.center.x - ln*3/4, y: view.center.y + ln*3/4},
    {x: view.center.x + ln/2, y: view.center.y + ln});
var arc3 = new Path.Arc(
    {x: view.center.x + ln/2, y: view.center.y + ln},
    {x: view.center.x + ln*3/4, y: view.center.y + ln/2},
    {x: view.center.x + ln*2/3 + r.width/2, y: view.center.y - ln/2 + r.height/2});
group.addChildren([ellR, arc1, arc2, arc3]);


var rotP = {x: view.center.x + ln*2/3, y: view.center.y - ln/5};
// group.tween(6000).onUpdate = function(event) {
//     var t = event.factor*12.5;
//     // group.rotate(Math.sin(t)*-1.5, rotP);
//     group.shear(Math.sin(t)*0.012, Math.sin(t)*-0.03, rotP);
// }

var lineTop = new Path.Line(
            {x: view.center.x - ln -ln/8 , y: view.center.y - ln},
            {x: view.center.x + ln +ln/8, y: view.center.y - ln}
            )

// lineTop.opacity = 0;