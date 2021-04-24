

var size = new Size(605, 605);
var back = new Path.Rectangle(view.center-size/2, size);
back.fillColor = 'black';

project.currentStyle = {
    strokeColor: 'white',
    strokeWidth: 4,
    strokeCap: 'round'
}

const radians = function(degrees) {
	return degrees * Math.PI / 180;
}
const degrees = function(radians) {
    return radians * 180 / Math.PI;
}
const drawC = function(point, radius) {
    var refc = new Path.Circle(point, radius);
    refc.strokeWidth = 1;
    refc.strokeColor = 'red';
} 
const drawL = function(point1, point2) {
    var refl = new Path.Line(point1, point2);
    return refl;
}

const map = function(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

var ln = 150;
var lineR = new Path.Line(
    {x: view.center.x + ln/2, y: view.center.y - ln},
    {x: view.center.x + ln/2, y: view.center.y + ln});
var lineM = new Path.Arc(
    {x: view.center.x + ln/2, y: view.center.y - ln/6},
    {x: view.center.x, y: view.center.y - ln/6 - ln/12},
    {x: view.center.x - ln/3, y: view.center.y - ln/6});
var arc = new Path.Arc(
    lineM.lastSegment.point,
    {x: view.center.x - ln/3 - ln/4, y: view.center.y + ln/3},
    {x: view.center.x - ln/4, y: view.center.y + ln - ln/16})
arc.shear(0, 0.3, lineM.lastSegment.point);

var lineTop = new Path.Line(
            {x: view.center.x - ln , y: view.center.y - ln},
            {x: view.center.x + ln , y: view.center.y - ln}
            )
lineTop.style = {
    strokeColor: '#fae0e4',
    strokeWidth: 15,
    strokeCap: 'butt'
}


// animations
var tspan = 1000;
var slant = drawL(lineR.firstSegment.point, 
                arc.firstSegment.point);
slant.visible = false;
var norm = slant.getNormalAt(slant.length/2)*ln/4;
drawL(slant.getPointAt(slant.length/2), 
    slant.getPointAt(slant.length/2) - norm).visible = false;
// drawC(slant.getPointAt(slant.length/2), 10);
var rotAngle = Math.acos((lineR.firstSegment.point.x - 8 - arc.firstSegment.point.x + 8)/slant.length);
rotAngle = degrees(rotAngle);

lineTop.applyMatrix = false;
var t1 = lineTop.tween(
    {
        'position': slant.getPointAt(slant.length/2) - new Point(8, 8),
        'rotation': -rotAngle
    }, 
    {
        duration: tspan,
        start: false
    })
var stopy = Math.sin(radians(45)) * lineTop.length/2;
var stopx = 2*ln - stopy;
t1.then(function() {
    var t2 = lineTop.tween(
        {
            'position.x': lineR.position.x - stopx - 8,
            'position.y': view.center.y + ln - stopy - 8
        }, tspan)
    t2.then(function() {
        var t3 = lineTop.tween(tspan*2)
        var rotP = {x: lineR.position.x - ln*2, y: view.center.y + ln};
        t3.onUpdate = function(event) {
            var times = tspan*1.5/1000 * 61;
            lineTop.rotate(-120/times, rotP);
            lineTop.translate(-2, 0);
        }
        var t4 = arc.tween(tspan)
        t4.onUpdate = function(event) {
            var times = tspan/1000 * 61;
            var t = event.factor;
            var angle = map(t, 0, 1, 0, Math.PI * 2);
            var f = Math.sin(angle+Math.PI/2)*0.02;
            arc.scale(1+f, 1, lineM.lastSegment.point);
        }
        t4.then(function() {
            var g = new Group([lineR, lineM, arc]);
            var t5 = g.tween(tspan*2)
            t5.onUpdate = function(event) {
                var times = tspan/1000 * 61;
                var angle = map(event.factor, 0, 1, 0, Math.PI * 4);
                var f = Math.sin(angle)*1.3;
                g.rotate(f, lineR.lastSegment.point);
            }
        })
    })
})

// var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  
// window.location.href=image; 