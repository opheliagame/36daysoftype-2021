var size = new Size(600, 600);
project.currentStyle = {
    strokeColor: 'black',
    strokeWidth: 16,
    strokeCap: 'butt'
}
var ln = 150;

var leftArc = new Path.Arc(
    {x: view.center.x - ln*3/4, y: view.center.y - ln},
    {x: view.center.x - ln/3, y: view.center.y - ln/2},
    {x: view.center.x - ln, y: view.center.y }
    );
var leftLine = new Path([
    {x: view.center.x - ln, y: view.center.y},
    {x: view.center.x - ln/4 - ln*3/8, y: view.center.y + ln/2},
    {x: view.center.x - ln/4, y: view.center.y + ln}
    ]);
leftLine.visible = false;
var bottomArc = new Path.Arc(
    {x: view.center.x - ln, y: view.center.y},
    {x: view.center.x - ln/4, y: view.center.y + ln*3/4},
    {x: view.center.x + ln*3/4, y: view.center.y + ln/2}
    );
// bottomArc.visible = false;
    
var rightLine = new Path.Line(
    {x: view.center.x + ln*3/4, y: view.center.y - ln},
    {x: view.center.x + ln*3/4, y: view.center.y + ln});
var rightArc = new Path.Arc(
    {x: view.center.x + ln*3/4, y: view.center.y - ln/8},
    {x: view.center.x - ln/12 , y: view.center.y},
    {x: view.center.x + ln*3/4, y: view.center.y + ln/8}
    )
    
var lineTop = new Path.Line(
            {x: view.center.x - ln-ln/8, y: view.center.y - ln},
            {x: view.center.x + ln+ln/8, y: view.center.y - ln}
            )