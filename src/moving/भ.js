

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
    {x: view.center.x + ln*2/3, y: view.center.y - ln},
    {x: view.center.x + ln*2/3, y: view.center.y + ln});
var r = ln/4;
var specs = new Path.Circle(
    lineR.firstSegment.point.rotate(180, 
    view.center + new Point(0, -ln)), r)
specs.position.y += r;
var line1 = new Path.Line(
    specs.position + new Point(r, 0),
    view.center + new Point(-ln*2/3+r, 0));
var line2 = new Path.Line(
    line1.lastSegment.point, 
    lineR.getPointAt(lineR.length/2));
var refp = line1.lastSegment.point;
var rcurv = r*4.5;
var seg1 = new Segment(refp, null, new Point(0, rcurv));
var seg2 = new Segment(refp, new Point(-rcurv, 0), null);
var curv = new Path([seg1, seg2]);

var lineTop = new Path.Line(
    {x: view.center.x , y: view.center.y - ln},
    {x: view.center.x + ln+ln/8, y: view.center.y - ln})
lineTop.style = {
    strokeColor: '#fae0e4',
    strokeWidth: 15,
    strokeCap: 'butt'
}

// pre animation setup
var full = new Group([lineR, specs, line1, line2, curv, lineTop]);
// full.strokeColor = 'blue';
specs.position = lineR.firstSegment.point + new Point(-ln/4, -r-8);
const makeHand = () => {
    var handA = new Path.Arc(
        line1.firstSegment.point + new Point(0, -r*2),
        specs.position + new Point(-r*2, -r),
        specs.position + new Point(-r, 0));
    var handL = new Path.Line(
        line1.firstSegment.point,
        handA.firstSegment.point)
    var hand = new CompoundPath({
        children: [handL, handA]
    });
    hand.visible = false;
    hand = new Path(hand.pathData);
    hand.strokeColor = 'red'
    hand.visible = false;
    refp = line1.firstSegment;
    var fakeHand = new Path([refp, refp.clone(), refp.clone(), refp.clone()])
    var origFake = fakeHand.clone();
    fakeHand.visible = false;
    origFake.visible = false;
    return [fakeHand, hand, origFake]
}


// animations
const takeSpecs = (tspan) => {
    console.log('taking specs..')
    var [fakeHand, hand, origFake] = makeHand();
    fakeHand.visible = true;
    // fakeHand.strokeColor = 'yellow'
    var t1 = fakeHand.tween(tspan)
    t1.onUpdate = function(event) {
        fakeHand.interpolate(fakeHand.clone({insert: false}), hand, event.factor/25)
    }
    t1.then(() => {
        var t2 = fakeHand.tween(tspan)
        t2.onUpdate = function(event) {
            fakeHand.interpolate(fakeHand.clone({insert: false}), origFake, event.factor/10)
            specs.position = fakeHand.lastSegment.point + new Point(-r, 0);
        }
        return t2;
    })
}
const jump = (path, xdist, ydist, tspan) => {
    var t = path.tween(tspan)
    var yPos = path.position.y;
    t.onUpdate = function(event) {
        var times = tspan/1000 * 61;
        var angle = map(event.factor, 0, 1, 0, Math.PI)
        path.position.x += xdist/times;
        path.position.y = yPos - Math.abs(Math.sin(angle))*ydist;
    }
    return t;
}
const turn1 = (path, tspan) => {
    var factor = 1;
    var tw = path.tween(tspan)
    tw.onUpdate = function(event) {
        var t = event.factor*2;
        factor = -Math.sin(t)*0.03;
        path.scaling = {x: 1 + factor, y: 1};
    }
    return tw;
}
const turn2 = (path, tspan) => {
    path.scale(-1, 1);
    var tw = path.tween(tspan);
    tw.onUpdate = function(event) {
        var t = event.factor*2;
        factor = Math.sin(t)*0.0305;
        path.scaling = {x: 1 + factor, y: 1};
    }
    return tw;
}

// console.log(typeof jump(full, -ln/5, ln/4, tspan/2))
// jump(full, -ln/5, ln/4, tspan/2)
var tspan = 1000
var yh = ln/6;
Promise.resolve()
.then(() => jump(full, -ln/5, yh, tspan/3))
.then(() => jump(full, -ln/5, yh, tspan/3))
.then(() => jump(full, -ln/5, yh, tspan/3))
.then(() => turn1(full, tspan/4))
.then(() => turn2(full, tspan/4))
.then(() => jump(full, ln/5, yh, tspan/3))
.then(() => jump(full, ln/5, yh, tspan/3))
.then(() => jump(full, ln/5, yh, tspan/3))
.then(() => jump(full, ln/5, yh, tspan/3))
.then(() => jump(full, ln/5, yh, tspan/3))
.then(() => jump(full, ln/5, yh, tspan/3))
.then(() => turn1(full, tspan/4))
.then(() => turn2(full, tspan/4))
.then(() => jump(full, -ln/5, yh, tspan/3))
.then(() => jump(full, -ln/5, yh, tspan/3))
.then(() => jump(full, -ln/5, yh, tspan/3))
.then(() => jump(full, -ln/5, yh, tspan/3))
.then(() => jump(full, -ln/5, yh, tspan/3))
.then(() => jump(full, -ln/5, yh, tspan/3))
.then(() => turn1(full, tspan/4))
.then(() => turn2(full, tspan/4))
.then(() => jump(full, ln/5, yh, tspan/3))
.then(() => jump(full, ln/5, yh, tspan/3))
.then(() => jump(full, ln/5, yh, tspan/3))
.then(() => turn1(full, tspan/4))
.then(() => turn2(full, tspan/4))
.then(() => takeSpecs(tspan*4))
.then(() => console.log('end'))


