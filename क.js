

var size = new Size(600, 600);
var back = new Path.Rectangle(view.center-size/2, size);
back.fillColor = 'black';

project.currentStyle = {
    strokeColor: 'white',
    strokeWidth: 4,
    strokeCap: 'round'
}
var thinStyle = {
    strokeColor: 'white',
    strokeWidth: 0.6,
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
lineTop.style = {
    strokeColor: '#fae0e4',
    strokeWidth: 15,
    strokeCap: 'butt'
}
lineTop.opacity = 0.9;
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

var arcTL = new Path.Arc(
            new Point(view.center.x - ln, view.center.y),
            new Point(view.center.x - ln/2, view.center.y - ln/2),
            new Point(view.center.x, view.center.y));
var arcBL = new Path.Arc(
            new Point(view.center.x - ln, view.center.y),
            new Point(view.center.x - ln/2, view.center.y + ln/2),
            new Point(view.center.x, view.center.y));
var arcTR = new Path.Arc(
            view.center, 
            new Point(view.center.x + ln/2, view.center.y - ln/2),
            new Point(view.center.x + ln, view.center.y));
var arcBR = new Path.Arc(
            {x: view.center.x + ln/2 + Math.cos((90+25)*Math.PI/180)*ln/2, y: view.center.y + Math.sin((90+25)*Math.PI/180)*ln/2},
            {x: view.center.x + ln/2, y: view.center.y + ln/2},
            {x: view.center.x + ln, y: view.center.y});
arcTL.visible = false;
arcBL.visible = false;
arcTR.visible = false;
arcBR.visible = false;
// lineL.style = thinStyle;
// lineLC.style = thinStyle;
// lineR.style = thinStyle;
// lineRC.style = thinStyle;
// lineMid.style = thinStyle;
// arcTL.style = thinStyle;
// arcBL.style = thinStyle;
// arcTR.style = thinStyle;
// arcBR.style = thinStyle;
    
lineL.tween(100000).onUpdate = function(event) {
  lineL.interpolate(lineL.clone({insert: false}), arcTL, event.factor); 
  lineLC.interpolate(lineLC.clone({insert: false}), arcBL, event.factor);
};
lineR.tween(100000).onUpdate = function(event) {
  lineR.interpolate(lineR.clone({insert: false}), arcTR, event.factor); 
  lineRC.interpolate(lineRC.clone({insert: false}), arcBR, event.factor);
};


