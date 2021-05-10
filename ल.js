

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
const random = function(v1, v2) {
    return map(Math.random(), 0, 1, v1, v2);
}

var ln = 150;
var lineR = new Path.Line(
    {x: view.center.x + ln*3/4, y: view.center.y - ln},
    {x: view.center.x + ln*3/4, y: view.center.y + ln})
var refp = lineR.getPointAt(lineR.length*0.5);
var arcR = new Path.Arc(
    refp,
    refp + new Point(-ln*3/8, -ln*3/12),
    refp + new Point(-ln*3/4, 0))
var arc1 = arcR.clone().scale(-1, 1, view.center)
var arc2 = new Path.Arc(
    arc1.firstSegment.point,
    arc1.firstSegment.point + new Point(0, ln*0.6),
    view.center + new Point(-ln/3, ln))
var arcL = new Group([arc1, arc2]);
arcL.scale(1.2, 1, arcR.lastSegment.point);


var lineTop = new Path.Line(
    {x: view.center.x - ln-ln/8, y: view.center.y - ln},
    {x: view.center.x + ln+ln/8, y: view.center.y - ln})
lineTop.style = {
    strokeColor: '#fae0e4',
    strokeWidth: 15,
    strokeCap: 'butt'
}
lineTop.applyMatrix = false; 


// animations
const turn1 = (path, hor=true, rotp=null, tspan) => {
    if(rotp == null) rotp = path.position;
    var factor = 1;
    var tw = path.tween(tspan)
    tw.onUpdate = function(event) {
        var t = event.factor*2;
        factor = -Math.sin(t)*0.03;
        if(hor) path.scale(1 + factor, 1, rotp);
        else path.scale(1, 1 + factor, rotp);
    }
    return tw;
}
const turn2 = (path, hor=true, rotp=null, tspan) => {
    if(rotp == null) rotp = path.position
    if(hor) path.scale(-1, 1, rotp);
    else path.scale(1, -1, rotp);
    var tw = path.tween(tspan);
    tw.onUpdate = function(event) {
        var t = event.factor*2;
        factor = Math.sin(t)*0.0305;
        if(hor) path.scale(1 + factor, 1, rotp);
        else path.scale(1, 1 + factor, rotp);
    }
    return tw;
}

const tap = (path, xdist, tspan) => {
    var t = path.tween(tspan)
    var prev = lineTop.position;
    t.onUpdate = function(event) {
        var times = tspan/1000 * 61;
        var angle = map(event.factor, 0, 1, 0, Math.PI*10);
        var move = map(angle, 0, Math.PI*2, -1, 1);
        // path.lastSegment.point = pos + new Point(Math.sin(angle)*xdist, 0)
        path.shear(Math.sin(angle)*0.01, 0, arc1.firstSegment.point)
        // lineTop.position.x = Math.max(prev.x, arc2.lastSegment.point.x + lineTop.length/2)
        prev = lineTop.position
    }
    
    // var pos = lineTop.position;
    var t2 = lineTop.tween(
        {
            'position.x': arc2.lastSegment.point.x + lineTop.length/2
        }, tspan/10)
    return t;
}

const final = (tspan) => {
    lineTop.tween( 
        {
            'position': view.center + new Point(0, -ln)
        }, tspan)
}


var tspan = 1000
Promise.resolve()
.then(() => {
    turn1(arcL, false, arcR.lastSegment.point, tspan)
    return turn1(arcR, false, arcR.firstSegment.point, tspan)
})
.then(() => {
    turn2(arcL, false, arcR.lastSegment.point, tspan)
    return turn2(arcR, false, arcR.firstSegment.point, tspan)  
})
.then(() => tap(arc2, -ln/10, tspan*6))
.then(() => {
    turn1(arcL, false, arcR.lastSegment.point, tspan)
    return turn1(arcR, false, arcR.firstSegment.point, tspan)
})
.then(() => {
    turn2(arcL, false, arcR.lastSegment.point, tspan)
    return turn2(arcR, false, arcR.firstSegment.point, tspan)  
})
.then(() => final(tspan))
.then(() => console.log('end'))



