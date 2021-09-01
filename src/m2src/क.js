var size = new Size(600, 600);
project.currentStyle = {
    strokeColor: 'black',
    strokeWidth: 16,
    strokeCap: 'butt'
}

var ln = 150;
var lineMid = new Path.Line(
            {x: view.center.x, y: view.center.y - ln},
            {x: view.center.x, y: view.center.y + ln}
            )
var lineTop = new Path.Line(
            {x: view.center.x - ln-ln/4, y: view.center.y - ln},
            {x: view.center.x + ln+ln/4, y: view.center.y - ln}
            )

var lineL = new Path([
    {x: view.center.x - ln, y: view.center.y},
    {x: view.center.x - ln/2, y: view.center.y},
    view.center
    ]);
var lineLC = lineL.clone();
var lineR = new Path([
    view.center,
    {x: view.center.x + ln/2, y: view.center.y},
    {x: view.center.x + ln, y: view.center.y}
    ]);
var lineRC = lineR.clone();

var arcTL = new Path([
            new Point(view.center.x - ln, view.center.y),
            new Point(view.center.x - ln/2, view.center.y),
            new Point(view.center.x, view.center.y)
            ]);
var arcBL = new Path([
            new Point(view.center.x - ln, view.center.y),
            new Point(view.center.x - ln/2, view.center.y),
            new Point(view.center.x, view.center.y)
            ]);
var arcTR = new Path([
            view.center, 
            new Point(view.center.x + ln/2, view.center.y),
            new Point(view.center.x + ln, view.center.y)
            ]);
var arcBR = new Path([
            {x: view.center.x + ln/2 + Math.cos((90+25)*Math.PI/180)*ln/2, y: view.center.y + Math.sin((180)*Math.PI/180)*ln/2},
            {x: view.center.x + ln/2, y: view.center.y},
            {x: view.center.x + ln, y: view.center.y}
            ]);
arcTL.visible = true;
arcBL.visible = true;
arcTR.visible = true;
arcBR.visible = true;
lineL.visible = false;
lineLC.visible = false;
lineR.visible = false;
lineRC.visible = false;
// lineMid.style = thinStyle;