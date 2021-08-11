var size = new Size(600, 600);
project.currentStyle = {
    strokeColor: 'black',
    strokeWidth: 16,
    strokeCap: 'butt'
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
// circL.tween(2000).onUpdate = function(event) {
//     var y = refL.y + Math.sin(event.factor*10) * 20;
//     circL.position.y = y;
//     lineL.segments[1].point.y = y;
// }

var refR = new Point(view.center.x + ln/3, view.center.y + ln)
var lineR = new Path.Line(
    {x: view.center.x + ln/3, y: view.center.y - ln},
    refR);
var circR = new Path.Circle(
    {x: refR.x - r, y: refR.y},
    r);
circR.visible = false
    
var lineTop = new Path.Line(
            {x: view.center.x - ln + ln/8, y: view.center.y - ln},
            {x: view.center.x + ln - ln/8, y: view.center.y - ln}
            )
