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
var lineR = new Path.Line(
    {x: view.center.x + ln/2, y: view.center.y - ln},
    {x: view.center.x + ln/2, y: view.center.y + ln});
var diag = new Path.Line(
    {x: view.center.x - ln/2, y: view.center.y - ln},
    lineR.getPointAt(lineR.length/2.5));

var r = 10;
var sBody = new Path.Circle(view.center, r);
sBody.scale(0.7, 1);
sBody.fillColor = 'black';
var sLeg = new Path([
    sBody.position,
    sBody.position + new Point(r*1.2, -r),
    sBody.position + new Point(r*2, -r/2)]);
var leg1 = sLeg.clone().rotate(30, sBody.position);
var leg2 = sLeg.clone().rotate(60, sBody.position);
var sLegOpp = sLeg.clone().scale(-1, 1, sBody.position);
var leg3 = sLegOpp.clone().rotate(-30, sBody.position);
var leg4 = sLegOpp.clone().rotate(-60, sBody.position);


var leftL = new Path.Line(
    diag.firstSegment.point, 
    diag.firstSegment.point + new Point(0, ln*2/2.5));
var arc = new Path.Arc(
    leftL.lastSegment.point, 
    view.center + new Point(0, ln/3.5),
    diag.lastSegment.point);
var trailPath = new CompoundPath();
trailPath.addChildren([leftL, arc]);
trailPath = new Path(trailPath.pathData);
trailPath.visible = false;
// trailPath.strokeColor = 'red';
// trailPath.visible = false;
// for(let i = 0; i < trailPath.segments.length; i++) {
//     let s = trailPath.segments[i];
//     drawC(s.point, 10);
// }



var trail = new Path();

var lineTop = new Path.Line(
        {x: view.center.x - ln-ln/8, y: view.center.y - ln},
        {x: view.center.x + ln+ln/8, y: view.center.y - ln})

var spider = new Group([sLeg, leg1, leg2, sLegOpp, leg3, leg4, sBody]);
spider.position = view.center + new Point(-ln/2, -ln);    
spider.rotate(180);

var letterPath = new CompoundPath({
    children: [leftL, arc, lineR, diag, lineTop]
})
window.letterPath = letterPath

// animations 
var tspan = 8000;
const shake = (path, start, degree, tspan) => {
    var t = path.tween(tspan)
    t.onUpdate = function(event) {
        var times = map(event.factor, 0, 1, Math.PI*start, Math.PI*degree)
        var angle = Math.sin(times)*3;
        path.rotate(angle)
    }
    return t;
}

const moveSpider = (tspan) => {
    var t1 = trailPath.tween(
        {
            duration: tspan,
            easing: 'easeInQuart',
        })
    var offset = 0;
    t1.onUpdate = function(event) {
        // trail.interpolate(trail.clone({insert: false}), trailPath, event.factor);
        var times = tspan/1000*61;
        var step = trailPath.length/times;
        var p = trailPath.getPointAt(offset);
        var n = trailPath.getNormalAt(offset);
        var t = trailPath.getTangentAt(offset);
        var diff = t-n;
        var angle = Math.atan(diff.y, diff.x);
            
        // drawC(p, 10);
        spider.position = p;
        // console.log(n-t);
        spider.rotation = angle;
        trail.add(p);
        offset += step;
    }
}

var sp = 3000;
// Promise.resolve()
// .then(() => {
//     shake(spider.children[0], 1/2, 10, sp)
//     shake(spider.children[1], 1/2, 10, sp)
//     shake(spider.children[2], 1/2, 10, sp)
//     shake(spider.children[3], 1/2, -10, sp)
//     shake(spider.children[4], 1/2, -10, sp)
//     return shake(spider.children[5], 1/2, -10, sp)
// })
// .then(() => {
//     shake(spider.children[0], 1/2, 10, sp)
//     shake(spider.children[1], 1/2, 10, sp)
//     shake(spider.children[2], 1/2, 10, sp)
//     shake(spider.children[3], 1/2, -10, sp)
//     shake(spider.children[4], 1/2, -10, sp)
//     return shake(spider.children[5], 1/2, -10, sp)
// })
// .then(() => {
//     shake(spider.children[0], 1/2, 10, sp)
//     shake(spider.children[1], 1/2, 10, sp)
//     shake(spider.children[2], 1/2, 10, sp)
//     shake(spider.children[3], 1/2, -10, sp)
//     shake(spider.children[4], 1/2, -10, sp)
//     return shake(spider.children[5], 1/2, -10, sp)
// })


// setTimeout(() => {
//     console.log('bell..')
//     moveSpider(tspan-2000);
// }, 2000);

spider.visible = false;