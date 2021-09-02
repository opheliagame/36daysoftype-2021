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

var ln = 150;
var group = new Group();
var line1 = new Path.Line(
    {x: view.center.x + ln/2, y: view.center.y - ln},
    {x: view.center.x + ln/2, y: view.center.y - ln*2/3});
group.addChild(line1);

var lineh1 = new Path.Line(
    {x: view.center.x + ln/2, y: view.center.y - ln*2/3},
    {x: view.center.x - ln/3, y: view.center.y - ln*2/3});
var arc1 = new Path.Arc(
    {x: view.center.x - ln/3, y: view.center.y - ln*2/3},
    {x: view.center.x - ln/3 - ln/4-ln/12, y: view.center.y - ln*1/3},
    {x: view.center.x - ln/3, y: view.center.y });
var ref1 = {x: view.center.x + ln/4, y: view.center.y};
var ref2 = {x: view.center.x + ln/2 + ln/4, y: view.center.y - ln/8};
var lineh2 = new Path.Line(
    {x: view.center.x - ln/3, y: view.center.y},
    {x: view.center.x + ln/4, y: view.center.y});
lineh2.insertSegments(1, [lineh2.getPointAt(lineh2.length/2)]);
// console.log(lineh2.segments.length)
var arc2 = new Path.Arc(
    {x: view.center.x + ln/4, y: view.center.y},
    {x: view.center.x + ln/4 + ln/4+ln/8, y: view.center.y + ln/4+ln/8},
    {x: view.center.x + ln/4, y: view.center.y + ln/2+ln/4});
arc2.removeSegment(2);
var arc3 = new Path.Arc(
    lineh2.firstSegment.point,
    lineh2.firstSegment.point + new Point(-ln/4-ln/12, ln/3),
    lineh2.lastSegment.point + new Point(0, ln+ln/4));
arc3.shear(0, 0.3, lineh2.firstSegment.point);

group.addChildren([lineh1, arc1, lineh2, arc2, arc3]);    
group.scale(0.9, 0.9, new Point(group.position.x, view.center.y - ln))


// var lip1 = new Group([lineh1, arc1, lineh2]);
// var lip2 = new Group([lineh2.clone(), arc3]);
// lip1.strokeColor = 'blue';
// lip2.strokeColor = 'violet';

var lineTop = new Path.Line(
        {x: view.center.x - ln+ln/6, y: view.center.y - ln},
        {x: view.center.x + ln-ln/6, y: view.center.y - ln})


var letterPath = new CompoundPath({
    children: [line1, lineh1, arc1, lineh2, arc2, arc3, lineTop]
})
window.letterPath = letterPath

// animations 
var rot2 = arc2.firstSegment.point;

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
const move = (path, seg, target, start, tspan) => {
    
    var t = path.tween(tspan)
    
    t.onUpdate = function(event) {
        var times = tspan/1000*61;
        var targetp = target;
        // drawC(targetp, 10);
        if(start == true) {
            var f = 1-event.factor;
            var step = (targetp-seg.point)/(f*times);
            if(f == 0)  step = 0;
        }
        else {
            step = (targetp-seg.point);
        }
        
        seg.point += step;
        
        path.smooth({ type: 'catmull-rom', factor: 0.5 })
        // drawC(targetp, 2);
    }
    return t;
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

const smoothen = (path, tspan) => {
    var t = path.tween(tspan)
    t.onUpdate = function(event) {
        path.smooth({ type: 'continuous' })
    }
    return t;
}

// lineh2.selected = true;
// lineh1.selected = true;
// lip2.children[0].removeSegment(1);
// lip1.addChild(new Path.Line(lineh2.lastSegment.point, line1.lastSegment.point))
// lip1.closed = true;
// lip1.fillColor = 'black';
// lip1.fillRule = 'evenodd';
// lip1.selected = true;
// lip1.lastChild.visible = false;
// lip1.shadowColor = 'red';

var tspan = 4000;
// Promise.resolve()
// .then(() => {
//     shearAroundPoint(arc1, lineh1.lastSegment.point, -0.02/2, 0.05/4, 8, tspan)
//     shearAroundPoint(arc3, arc3.lastSegment.point, 0, -0.05/8, 8, tspan)
    
//     move(lineh2, lineh2.lastSegment, arc2.firstSegment.point, false, tspan)
//     move(lineh2, lineh2.firstSegment, arc1.lastSegment.point, false, tspan)
//     move(lip2.children[0], lip2.children[0].firstSegment, arc3.firstSegment.point, false, tspan)
    
//     return swingAroundPoint(lip1, line1.lastSegment.point, 0, 8, 0.2, tspan)
//     // return swingAroundPoint(lip2, arc2.firstSegment.point, 0, -4, 0.5/2, tspan)
// })
// .then(() => {

//     tspan = tspan
//     // smoothen(lip1, tspan)
//     // lip2.firstChild.visible = false;
 
//     move(lineh2, lineh2.segments[1], arc1.lastSegment.point + new Point(0, 0), false, tspan)
    
//     move(lineh1, lineh1.lastSegment, arc1.firstSegment.point, false, tspan)
//     move(lineh2, lineh2.firstSegment, arc1.lastSegment.point, false, tspan)
//     move(lip2.children[0], lip2.firstChild.firstSegment, arc3.firstSegment.point, false, tspan)
    
//     // drawC(arc1.position + new Point(ln/6, 0), 10)
//     // shearAroundPoint(arc1, lineh1.lastSegment.point, -0.01*2/3, 0.01*2/3, 2, tspan)
//     shearAroundPoint(arc1, arc1.position + new Point(ln/6, -ln/12), -0.01*3/4, 0.015*2/3, 2, tspan)
//     scaleAroundPoint(arc1, lineh2.lastSegment.point, 0.01/2, 0, 2, tspan)
//     return scaleAroundPoint(arc3, arc3.lastSegment.point, 0.01/2, 0, 2, tspan)
// })
// .catch((e) => console.log(e))