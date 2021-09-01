

var size = new Size(605, 605);
var back = new Path.Rectangle(view.center-size/2, size);
back.fillColor = 'black';

project.currentStyle = {
    strokeColor: 'white',
    strokeWidth: 4,
    strokeCap: 'round'
}
var lightStyle = {
    strokeColor: 'white',
    strokeWidth: 1
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
var line = new Path.Line(
    view.center + new Point(0, ln*0.8),
    view.center + new Point(0, -ln))
line.visible = false;
var line1 = new Path.Line(
    line.getPointAt(line.length*0.2)+new Point(0, 8),
    line.lastSegment.point)
var line2 = new Path.Line(
    line.firstSegment.point, 
    line.getPointAt(line.length*0.2)+new Point(0, 8))
// drawC(line.getPointAt(line.length*0.2), 10)
// line.firstSegment.point.y = line.getPointAt(line.length*0.2).y+8
var r = ln/4;
var circ1 = new Path.Circle(
    line.firstSegment.point + new Point(-r, 0), r)
// var circ2 = new Path.Circle(
//     line.lastSegment.point + new Point(r, -r/2), r)
// circ2.closed = false;

var refl = ln/4
var hand1 = new Point(0, -refl)
var hand2 = new Point(0, refl)
var hand3 = new Point(-refl, 0)
var hand4 = new Point(refl, 0)
var points = [
    line.lastSegment.point + new Point(0, r),
    line.getPointAt(line.length*0.4) + new Point(-r*2, 0),
    line.firstSegment.point + new Point(0, -r*1.5),
    line.getPointAt(line.length*0.4) + new Point(r*1.8, 0),
    line.getPointAt(line.length*0.6),
    line.getPointAt(line.length*0.45) + new Point(-r*0.8, 0),
    line.getPointAt(line.length*0.35),
    line.getPointAt(line.length*0.45) + new Point(r*0.8, 0)]

var refp = line.lastSegment.point
// r = r*1.5
var arc1 = new Path([
    new Segment(refp, null, hand1*0.5),
    new Segment(refp + new Point(r*0.75, -r), hand3*0.5, hand4*0.5),
    new Segment(refp + new Point(r*1.5, 0), hand1.rotate(30)*0.5, hand2.rotate(30)*0.5),
    // new Segment(refp + new Point(r*2, 0), hand3.rotate(45)*0.8, hand4.rotate(45)*0.8),
    new Segment(refp + new Point(0, r), hand4.rotate(-30), null)
    ])
// arc1.selected = true;
var arc2 = new Path([
    new Segment(points[0], null, hand3.rotate(-30)*2),
    new Segment(points[1], hand1.rotate(-15), hand2.rotate(-15)),
    new Segment(points[2], hand3, hand4),
    new Segment(points[3], hand2.rotate(5), hand1.rotate(5)),
    new Segment(points[4], hand4.rotate(-15), hand3.rotate(-15)*0.5),
    new Segment(points[5], hand1.rotate(-5)*0.5, hand2.rotate(-5)*0.5),
    new Segment(points[6], hand3*0.5, hand4*0.5),
    new Segment(points[7], hand2*0.5, null)
    ])

var treble = new Group([circ1, line1, line2, arc1, arc2])
// treble.strokeColor = 'red'
treble.rotate(-90)
// treble.position.y -= ln/6
var treble1 = new Group([line1, arc1, arc2])
// treble1.strokeColor = 'blue'
var treble2 = new Group([line2, circ1])
// treble2.strokeColor = 'yellow'


var refx = line1.firstSegment.point.x;
// drawC(line1.lastSegment.point)
var lineR = new Path.Line(
    new Point(refx, view.center.y-ln),
    new Point(refx, view.center.y+ln))
lineR.position.y = view.center.y + ln*2;

var lineTop = new Path.Line(
        {x: view.center.x - ln*1.5, y: view.center.y - ln},
        {x: view.center.x + ln*1.5, y: view.center.y - ln})
lineTop.style = {
    strokeColor: '#fae0e4',
    strokeWidth: 15,
    strokeCap: 'butt'
}
lineTop.position.y = view.center.y + r*2;
var l1 = lineTop.clone()
l1.position.y -= ln/4
l1.style = lightStyle
var l2 = lineTop.clone()
l2.position.y -= ln/4*2
l2.style = lightStyle
var l3 = lineTop.clone()
l3.position.y -= ln/4*3
l3.style = lightStyle
var l4 = lineTop.clone()
l4.position.y -= ln/4*4
l4.style = lightStyle
var l5 = lineTop.clone()
l5.position.y -= ln/4*5
l5.style = lightStyle

// animations 
const moveTo = (path, targetp, tspan) => {
    var t = path.tween(
        {
            'position': targetp
        }, tspan)
    return t;
}
const swingAroundPoint = (path, rotP, sdeg, edeg, amp, tspan) => {
    var t = path.tween(tspan)
    t.onUpdate = function(event) {
        var times = map(event.factor, 0, 1, Math.PI*sdeg, Math.PI*edeg)
        var angle = Math.sin(times)*amp;
        path.rotate(angle, rotP)
        // drawC(path.position, 10);
    }
    return t;
}
const rotateAroundPoint = (path, rotP, angle, tspan) => {
    var t = path.tween(tspan)
    t.onUpdate = function(event) {
        var times = tspan/1000 * 61;
        var a = angle/times;
        path.rotate(a, rotP)
    }
    return t
}

const moveSeg = (path, seg, targetp, tspan) => {
    var t = path.tween(tspan)
    var diff = targetp - seg.point;
    t.onUpdate = function(event) {
        var times = tspan/1000*61;
        seg.point += diff/times;
    }
    return t
}
const shearAroundPoint = (path, shearP, shearX, shearY, deg, tspan) => {
    var t = path.tween(tspan)
    t.onUpdate = function(event) {
        var times = map(event.factor, 0, 1, 0, Math.PI*deg)
        var sx = Math.sin(times)*shearX;
        var sy = Math.sin(times)*shearY;
        path.shear(sx, sy, shearP)
        // drawC(path.position, 10);
    }
    return t;
}
const scaleAroundPoint = (path, scaleP, scaleX, scaleY, deg, tspan) => {
    var t = path.tween(tspan)
    t.onUpdate = function(event) {
        var times = map(event.factor, 0, 1, 0, Math.PI*deg)
        var sx = Math.sin(times)*scaleX;
        var sy = Math.sin(times)*scaleY;
        path.scale(1+sx, 1+sy, scaleP)
        // drawC(path.position, 10);
    }
    return t;
}

var tspan = 1000;
var gp;
var bottom;
var midL, left
var refp 
// lineR.visible = false;

setTimeout(() => l1.visible = false, tspan/4*1)
setTimeout(() => l2.visible = false, tspan/4*2)
setTimeout(() => l3.visible = false, tspan/4*3)
setTimeout(() => l4.visible = false, tspan/4*4)
setTimeout(() => l5.visible = false, tspan/4*5)


Promise.resolve()
.then(() => moveTo(lineR, new Point(refx, view.center.y), tspan))
.then(() => {
    // var newline = new Path.Line(line1.firstSegment.point, arc2.firstSegment.point)
    var joinl = new Path.Line(arc1.firstSegment.point, arc2.firstSegment.point)
    gp = new Group([joinl, arc1, arc2])
    // joinl.strokeColor = 'yellow'
    treble1.visible = false;
    midL = new Path(arc2.firstSegment.point, line1.firstSegment.point)
    
    swingAroundPoint(treble2, line2.lastSegment.point, 0, 1, 0.5, tspan)
    moveTo(lineTop, new Point(view.center.x, view.center.y-ln), tspan)
    return rotateAroundPoint(gp, joinl.lastSegment.point, 90, tspan)
})
.then(() => {
    // line.visible = false
    var t1 = treble2.tween(tspan)
    var diffy = view.center.y +ln - treble.position.y
    t1.onUpdate = function(event) {
        var t = event.factor;
        var times = tspan/1000*61
        treble2.position += new Point(2*t, 5*t*t)
        treble2.rotate(1)
    }
    
    bottom = new Path(arc2.segments.slice(2, 8))
    arc2.removeSegments(3, 8)
    // bottom.strokeColor = 'red'
    gp.addChild(bottom)
    // arc2.visible = false;
    // bottom.scale(0.8, 0.6, bottom.firstSegment.point)
    return scaleAroundPoint(bottom, bottom.firstSegment.point, -0.01, -0.008, 1, tspan)
})
.then(() => {
    moveTo(gp, gp.position + new Point(0, -ln/3), tspan/2)
    return moveTo(midL, midL.position + new Point(0, -ln/3), tspan/2)
})

.then(() => {
    var t = treble2.tween(tspan)
    t.onUpdate = function(event) {
        treble2.position += new Point(4, 0)
        treble2.rotate(2)
    }
    
    var t1 = bottom.tween( 
        {
            'lastSegment.point': bottom.segments[3].point + new Point(0, ln*0.75),
            'segments[4].point': bottom.segments[3].point + new Point(0, ln/2),
            'segments[4].handleIn': new Point(0, 0),
            'segments[4].handleOut': new Point(0, 0)
        }, tspan/2)
    return t
})
.then(() => {
    gp.addChild(bottom)
    
    moveSeg(lineTop, lineTop.firstSegment, lineTop.firstSegment.point + new Point(ln+ln/2, 0), tspan)
    moveSeg(lineTop, lineTop.lastSegment, lineTop.lastSegment.point + new Point(-ln/2, 0), tspan)
    
    moveTo(gp, gp.position + new Point(ln/6, 0), tspan)
    return moveSeg(midL, midL.firstSegment, midL.firstSegment.point + new Point(ln/6, 0), tspan)
})
.then(() => {
    // var g = new Group([arc1, gp.children[0]])
    scaleAroundPoint(gp, midL.firstSegment.point, 0, 0.002, 1, tspan)
    return shearAroundPoint(gp, midL.firstSegment.point, 0.005, 0, 1, tspan)
    // gp.shear(0.2, 0, midL.firstSegment.point)
    // rotateAroundPoint(arc1, midL.firstSegment.point, -30, tspan)
    // return rotateAroundPoint(gp.children[0], midL.firstSegment.point, -30, tspan)
})

.catch((e) => console.log(e))
