

var size = new Size(605, 605);
var back = new Path.Rectangle(view.center-size/2, size);
back.fillColor = 'black';

project.currentStyle = {
    strokeColor: 'white',
    strokeWidth: 4,
    strokeCap: 'round'
}

var ln = 150;

var ref1 = new Point(view.center.x - ln/2 - ln/4, view.center.y - ln/2);
var ref2 = new Point(view.center.x - ln/2, view.center.y + ln/3);
var ref3 = new Point(view.center.x - ln/3, view.center.y - ln/4);

var arc1 = new Path.Arc(
    {x: view.center.x - ln/2, y: view.center.y - ln},
    {x: view.center.x - ln/2 - ln/4, y: view.center.y - ln/2},
    {x: view.center.x - ln/3, y: view.center.y - ln/4});
var arc2 = new Path.Arc(
    {x: view.center.x - ln/3, y: view.center.y - ln/4},
    {x: view.center.x - ln/2, y: view.center.y + ln/3},
    {x: view.center.x + ln/20, y: view.center.y + ln/2 +ln/60});
var arc3 = new Path.Arc(
    {x: view.center.x + ln/20, y: view.center.y + ln/2 +ln/60},
    {x: view.center.x + ln/10, y: view.center.y + ln/2},
    {x: view.center.x + ln*2/3, y: view.center.y })
    
// var curve1 = new Path([
//     {x: view.center.x - ln/3, y: view.center.y - ln/4},
//     {x: view.center.x - ln/2, y: view.center.y - ln/18},
//     {x: view.center.x - ln/1.8, y: view.center.y + ln/4},
//     {x: view.center.x - ln/3, y: view.center.y + ln/4 + ln/4},
//     {x: view.center.x - ln/6, y: view.center.y + ln/2 + ln/20},
//     {x: view.center.x + ln/20, y: view.center.y + ln/2 +ln/60},
//     {x: view.center.x + ln/3, y: view.center.y + ln/3 + ln/18},
//     {x: view.center.x + ln*2/3, y: view.center.y }]);
// curve1.smooth();
// var refSegs = curve1.segments;

var lineR = new Path.Line(
    {x: view.center.x + ln*2/3, y: view.center.y - ln},
    {x: view.center.x + ln*2/3, y: view.center.y + ln});

arc1.tween(5000).onUpdate = function(event) {
    arc1.segments[1].point.x = ref1.x + Math.sin(event.factor*10) * 20 - 10;
    arc1.segments[2].point.x = ref3.x + Math.sin(event.factor*10) * 30;
}
// curve1.tween(5000).onUpdate = function(event) {
//     for(var i = 0; i < curve1.segments.length-1; i++) {
//         var s = curve1.segments[i];
//         s.point.x = refSegs[i].point.x + Math.sin(event.factor*10) * 0.5;
//     }
// }
arc2.tween(5000).onUpdate = function(event) {
    arc2.segments[1].point.x = ref2.x + Math.sin(event.factor*10) * 20 - 10;
    arc2.segments[0].point.x = ref3.x + Math.sin(event.factor*10) * 30;
}

var lineTop = new Path.Line(
            {x: view.center.x - ln - ln/8, y: view.center.y - ln},
            {x: view.center.x + ln + ln/8, y: view.center.y - ln}
            )
lineTop.style = {
    strokeColor: '#fae0e4',
    strokeWidth: 15,
    strokeCap: 'butt'
}

