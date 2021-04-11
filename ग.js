

var size = new Size(600, 600);
var back = new Path.Rectangle(view.center-size/2, size);
back.fillColor = 'black';

project.currentStyle = {
    strokeColor: 'white',
    strokeWidth: 4,
    strokeCap: 'round'
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
circL.tween(2000).onUpdate = function(event) {
    var y = refL.y + Math.sin(event.factor*10) * 20;
    circL.position.y = y;
    lineL.segments[1].point.y = y;
}

var refR = new Point(view.center.x + ln/3, view.center.y + ln)
var lineR = new Path.Line(
    {x: view.center.x + ln/3, y: view.center.y - ln},
    refR);
var circR = new Path.Circle(
    {x: refR.x - r, y: refR.y},
    r);
var tween1 = circR.tween(2000)
tween1.onUpdate = function(event) {
    var y = refR.y + Math.sin(event.factor*10) * 20;
    circR.position.y = y;
    lineR.segments[1].point.y = y;
}    
tween1.then(function() {
    var tween2 = circR.tween(600);
    tween2.onUpdate = function(event) {
        // projectile?
        var t = event.factor;
        circR.position.x -= 2 * t;
        circR.position.y += 2 * t * t;
  } 
   
  tween2.then(function() {
      circR.tween(3000).onUpdate = function(event) {
          circR.position.x -= 2;
      }
  })
});
    
var lineTop = new Path.Line(
            {x: view.center.x - ln + ln/8, y: view.center.y - ln},
            {x: view.center.x + ln - ln/8, y: view.center.y - ln}
            )
lineTop.style = {
    strokeColor: '#fae0e4',
    strokeWidth: 15,
    strokeCap: 'butt'
}

