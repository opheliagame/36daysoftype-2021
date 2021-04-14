

var size = new Size(605, 605);
var back = new Path.Rectangle(view.center-size/2, size);
back.fillColor = 'black';

project.currentStyle = {
    strokeColor: 'white',
    strokeWidth: 4,
    strokeCap: 'round'
}

var ln = 120;
var group = new Group();
var line1 = new Path.Line(
    {x: view.center.x + ln/2, y: view.center.y - ln},
    {x: view.center.x + ln/2, y: view.center.y - ln*2/3});
group.addChild(line1);

var lineh1 = new Path.Line(
    {x: view.center.x + ln/2, y: view.center.y - ln*2/3},
    {x: view.center.x - ln/3, y: view.center.y - ln*2/3});
var arc1 = new Path.Arc(
    {x: view.center.x - ln/3, y: view.center.y - ln*2/3},
    {x: view.center.x - ln/3 - ln/4-ln/12, y: view.center.y - ln*1/3},
    {x: view.center.x - ln/3, y: view.center.y });
var ref1 = {x: view.center.x + ln/4, y: view.center.y};
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
group.addChildren([lineh1, arc1, lineh2, arc2, lineh3]);    
var rect = new Path.Rectangle(
    {x: view.center.x + ln/2 + ln/4, y: view.center.y - ln/8},
    new Size(12, 12));
rect.rotate(45);
rect.strokeColor = '#fae0e4';
rect.fillColor = '#fae0e4';
// rect.visible = false;

var lineTop = new Path.Line(
            {x: view.center.x - ln , y: view.center.y - ln},
            {x: view.center.x + ln , y: view.center.y - ln}
            )
lineTop.style = {
    strokeColor: '#fae0e4',
    strokeWidth: 15,
    strokeCap: 'butt'
}
group.addChild(lineTop);

group.tween(4000).onUpdate = function(event) {
    var t = event.factor*3*2;
    var nx = Math.abs(Math.sin(t))*30;
    lineh2.segments[1].point.x = ref1.x + nx;
    arc2.segments[0].point.x = ref1.x + nx;
    arc2.segments[1].point.x = ref1.x + nx + ln/4+ln/4;
    arc2.segments[2].point.x = ref1.x + nx;
    lineh3.segments[0].point.x = ref1.x + nx;
    rect.position.x = ref2.x + nx;
    rect.rotate(-3);
}

// group.shear(-0.2, 0);
// group.position.x = -ln/8;
// group.tween(12000).onUpdate = function(event) {
//     var t = event.factor*6;
//     group.shear(Math.sin(t*4)*0.005, 0);
    
//     group.position.x += ln/100;
//     group.position.y = view.center.y - 40 + Math.abs(Math.sin(4*t))*80;
//     group.scale(1, 1 + Math.sin(4*2*t)*0.01);
    
//     if(group.position.y-(view.center.y - 40) <= 2) {
//         var rectPos = new Point(group.position.x + ln/2 + ln/4, group.position.y + ln/8);
//         var rect = new Path.Rectangle(rectPos, new Size(12, 12));
//         rect.rotate(45);
//         rect.strokeColor = '#fae0e4';
//         rect.fillColor = '#fae0e4';
//     }
// }

// var curve = new Path([
//     {x: view.center.x + ln/2, y: view.center.y - ln*2/3},
//     {x: view.center.x, y: view.center.y - ln*2/3 + ln/40},
//     {x: view.center.x - ln/2, y: view.center.y - ln*2/3 + ln/20},
//     {x: view.center.x - ln/2 - ln/4, y: view.center.y - ln*1/3},
//     {x: view.center.x - ln/2, y: view.center.y },
//     {x: view.center.x, y: view.center.y},
//     {x: view.center.x + ln/2, y: view.center.y},
//     {x: view.center.x + ln/2 + ln/4, y: view.center.y + ln/2},
//     {x: view.center.x + ln/2, y: view.center.y + ln},
//     {x: view.center.x, y: view.center.y + ln},
//     {x: view.center.x - ln/2, y: view.center.y + ln},
//     {x: view.center.x - ln/2 - ln/4, y: view.center.y + ln - ln/2}
//     ]);
    
// curve.smooth();



