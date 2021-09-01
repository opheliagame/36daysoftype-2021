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
    {x: view.center.x + ln/2, y: view.center.y + ln})
var arc1 = new Path.Arc(
    lineR.getPointAt(lineR.length/2) + new Point(0, -ln/8),
    view.center + new Point(-ln/2, 0),
    lineR.getPointAt(lineR.length/2) + new Point(0, ln/8))
var arc2 = new Path.Arc(
    arc1.segments[4].point,
    lineR.getPointAt(lineR.length/2) + new Point(ln/64, 0),
    arc1.segments[0].point)
arc1.fillColor = 'black'
arc2.fillColor = 'black';
var lineM = new Path.Line(
    arc1.getPointAt(arc1.length/2 - arc1.length/8),
    arc1.getPointAt(arc1.length - arc1.length/12));
var pGroup = new Group([arc1, arc2, lineM]);
// pGroup.position = new Point(view.center.x - ln, view.center.y + ln/2 + ln/4)

var lineTop = new Path.Line(
            {x: view.center.x - ln + ln/12, y: view.center.y - ln},
            {x: view.center.x + ln - ln/12, y: view.center.y - ln}
            )
lineTop.style = {
    strokeColor: '#fae0e4',
    strokeWidth: 15,
    strokeCap: 'butt'
}

// animations
const shake = (path, degree, tspan) => {
    var t = path.tween(tspan)
    t.onUpdate = function(event) {
        var times = map(event.factor, 0, 1, Math.PI/2, Math.PI*degree)
        var angle = Math.sin(times)*3;
        path.rotate(angle)
    }
    return t;
}

const roll = (path, point, tspan) => {
    path.applyMatrix = false;
    var t = pGroup.tween(
        {
            'position': view.center + point,
            'rotation': 360
        }, tspan)
    return t;
}

const jump = (path, xdist, ydist, dir, tspan) => {
    var t = path.tween(tspan)
    var yPos = path.position.y;
    var xPos = path.position.x;
    t.onUpdate = function(event) {
        var times = tspan/1000 * 61;
        var angle = map(event.factor, 0, 1, 0, Math.PI)
        if(dir == 'hor') {
            path.position.x += xdist/times;
            path.position.y = yPos - Math.abs(Math.sin(angle))*ydist;     
        }
        else if(dir == 'ver') {
            path.position.y += ydist/times;
            path.position.x = xPos + Math.abs(Math.sin(angle))*xdist;     
        }
       
    }
    return t;
}

const rollAndClimb = (path, tspan) => {
    path.applyMatrix = false;
    var t = path.tween(
        {
            'position': new Point(view.center.x, view.center.y + ln/2),
            'rotation': 180
        }, tspan/2)
    t.then(function() {
      var t2 = path.tween(
          {
              'position': view.center,
              'rotation': -180
          }, tspan/2);  
    })
    return t;
}

const returnToOrig = (path, tpan) => {
    var t = path.tween(
        {
            'rotation': 0
        }, tspan)
    return t;
}

const disappear = (path, point, tspan) => {
    var t = path.tween(
        {
            'firstSegment.point': point,
            'lastSegment.point': point
        }, tspan)
    return t;
}

lineTop.applyMatrix = false;
lineR.applyMatrix = false;

var tspan = 2000
Promise.resolve()
.then(() => disappear(lineM, pGroup.position, tspan))
.then(() => {
    lineM.visible = false;
    var t = pGroup.tween(tspan/2)
    t.onUpdate = function(event) {
        var times = tspan/2000*61;
        var t = event.factor;
        var xdist = -ln/2;
        var ydist = ln*6/4;
        pGroup.translate(xdist/times, ydist/times*t*t);
    }
    // return jump(pGroup, -ln/2, ln, 'hor', tspan)
    return t;
})
.then(() => {
    shake(lineR, 4, tspan)
    shake(lineTop, 4, tspan)
    var r = map(Math.random(), 0, 1, -1, 1)
    return jump(pGroup, r*ln/2, ln/2, 'hor', tspan)
})
.then(() => {
    shake(lineR, 4, tspan)
    shake(lineTop, 4, tspan)
    var r = map(Math.random(), 0, 1, -1, 1)
    return jump(pGroup, r*ln/2, ln/2, 'hor', tspan)
})
.then(() => {
    shake(lineR, 4, tspan)
    shake(lineTop, 4, tspan)
    var r = map(Math.random(), 0, 1, -1, 1)
    return jump(pGroup, r*ln/2, ln/2, 'hor', tspan)
})
.then(function() {
    rollAndClimb(pGroup, tspan*2)
    returnToOrig(lineR, tspan)
    returnToOrig(lineTop, tspan)
})