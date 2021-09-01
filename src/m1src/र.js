var size = new Size(600, 600);
project.currentStyle = {
    strokeColor: 'black',
    strokeWidth: 16,
    strokeCap: 'butt'
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
const random = function(v1, v2) {
    return map(Math.random(), 0, 1, v1, v2);
}

var ln = 150;

var refp = new Point(view.center.x, view.center.y - ln);
var r = ln*0.4
var refc = refp + new Point(0, r);
var leftArc = new Path.Arc(
    refc + new Point(0, -r),
    refc + new Point(r, 0),
    refc + new Point(0, r));
var leftLine = new Path(
    leftArc.lastSegment.point, 
    leftArc.lastSegment.point + new Point(ln*0.8, ln));
// leftLine.rotate(-50, leftArc.lastSegment.point)

var chair = new Group([leftArc, leftLine]);
var lineTop = new Path.Line(
    {x: view.center.x - ln+ln/4, y: view.center.y - ln},
    {x: view.center.x + ln-ln/4, y: view.center.y - ln})
// chair.position.x = view.center.x;
// chair.rotate(-90)
// leftLine.scale(1, 1.5, leftArc.lastSegment.point);

// chair.position = view.center + new Point(ln, ln/3);
// lineTop.rotate(90)
// lineTop.position = view.center - new Point(ln, ln/2)
// lineTop.visible = false;



// animations
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

const turn = (path, angle, tspan) => {
    path.applyMatrix = false;
    var t = path.tween(
        {
            'rotation': angle
        }, tspan)
    return t;
}

var tspan = 500
const final = () => {
    lineTop.applyMatrix = false;
    var t1 = lineTop.tween(
        {
            'rotation': 90,
            'position': view.center - new Point(0, ln),
            'firstSegment.point.y': view.center.x - ln*0.8,
            'lastSegment.point.y': view.center.x + ln*0.8
        }, tspan)
    var t = chair.tween(tspan)
    t.onUpdate = function(event) {
        var times = tspan/1000 * 61;
        var angle = 50/times;
        leftLine.rotate(angle, leftArc.lastSegment.point);
        leftLine.lastSegment.point.y += 2.8;
        leftLine.lastSegment.point.x -= 1.5;
        chair.position += new Point(3.3, -0.5);
    }
}

const squish = (path, point, dir, tspan) => {
    var t = path.tween(tspan)
    // console.log(dir)
    t.onUpdate = function(event) {
        var f = event.factor;
        path.scale(1+dir.x*Math.sin(f)*0.01, 1+dir.y*Math.sin(f)*0.01, point)
    }
    return t;
}

// squish(leftArc, leftLine.firstSegment.point, {x: -1,y: 1}, tspan)


// Promise.resolve()
// .then(() => jump(chair, -ln/4, ln/8, 'hor', tspan))
// .then(() => squish(leftArc, leftLine.firstSegment.point, {x: 1,y: -1}, tspan/2))
// .then(() => squish(leftArc, leftLine.firstSegment.point, {x: -1,y: 1}, tspan/2))
// .then(() => jump(chair, -ln/4, ln/8, 'hor', tspan))
// .then(() => squish(leftArc, leftLine.firstSegment.point, {x: 1,y: -1}, tspan/2))
// .then(() => squish(leftArc, leftLine.firstSegment.point, {x: -1,y: 1}, tspan/2))
// .then(() => jump(chair, -ln/4, ln/8, 'hor', tspan))
// .then(() => squish(leftArc, leftLine.firstSegment.point, {x: 1,y: -1}, tspan/2))
// .then(() => squish(leftArc, leftLine.firstSegment.point, {x: -1,y: 1}, tspan/2))
// .then(() => jump(chair, -ln/4, ln/8, 'hor', tspan))
// .then(() => squish(leftArc, leftLine.firstSegment.point, {x: 1,y: -1}, tspan/2))
// .then(() => squish(leftArc, leftLine.firstSegment.point, {x: -1,y: 1}, tspan/2))
// .then(() => jump(chair, -ln/4, ln/8, 'hor', tspan))
// .then(() => squish(leftArc, leftLine.firstSegment.point, {x: 1,y: -1}, tspan/2))
// .then(() => squish(leftArc, leftLine.firstSegment.point, {x: -1,y: 1}, tspan/2))


// .then(() => turn(chair, 90, tspan))
// .then(() => jump(chair, ln/8, -ln/4, 'ver', tspan))
// .then(() => squish(leftArc, leftLine.firstSegment.point, {x: 1,y: -1}, tspan/2))
// .then(() => squish(leftArc, leftLine.firstSegment.point, {x: -1,y: 1}, tspan/2))
// .then(() => jump(chair, ln/8, -ln/4, 'ver', tspan))
// .then(() => squish(leftArc, leftLine.firstSegment.point, {x: 1,y: -1}, tspan/2))
// .then(() => squish(leftArc, leftLine.firstSegment.point, {x: -1,y: 1}, tspan/2))
// .then(() => jump(chair, ln/8, -ln/4, 'ver', tspan))
// .then(() => squish(leftArc, leftLine.firstSegment.point, {x: 1,y: -1}, tspan/2))
// // .then(() => squish(leftArc, leftLine.firstSegment.point, {x: -1,y: 1}, tspan/2))

// .then(() => final())