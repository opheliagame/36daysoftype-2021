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
    {x: view.center.x + ln*2/3, y: view.center.y - ln},
    {x: view.center.x + ln*2/3, y: view.center.y + ln});
var r = ln/4;

var refp = lineR.firstSegment.point.rotate(180, 
    view.center + new Point(0, -ln));
var line1 = new Path.Line(
    refp + new Point(r, 0),
    view.center + new Point(-ln*2/3+r, 0));
var line2 = new Path.Line(
    line1.lastSegment.point, 
    lineR.getPointAt(lineR.length/2));
refp = line1.lastSegment.point;
var rcurv = r*4.5;
var seg1 = new Segment(refp, null, new Point(0, rcurv));
var seg2 = new Segment(refp, new Point(-rcurv, 0), null);
var curv1 = new Path([seg1, seg2]);
var curv2 = curv1.clone();
var note1 = new Group([line1, curv1]);
var note2 = new Group([line2, curv2]);
var lineTop = new Path.Line(
    {x: view.center.x - ln-ln/8, y: view.center.y - ln},
    {x: view.center.x + ln+ln/8, y: view.center.y - ln})

var stand = new Group([lineR, lineTop]);

var letterPath = new CompoundPath({
    children: [line1, line2, curv1, curv2, lineR, lineTop]
})
window.letterPath = letterPath


// var beforeAnim = {
//     "note1": {
//         "pos": note1.position,
//         "rot": -180
//     },
//     "note2": {
//         "pos": note2.position,
//         "rot": -90
//     },
//     "stand": {
//         "pos": stand.position,
//         "rot": 0
//     }
// };

// stand.position.y += ln*1.5;
// note1.rotate(180)
// note2.rotate(90);
// var diff1 = line1.firstSegment.point.y - note1.position.y;
// var diff2 = line2.lastSegment.point.y - note2.position.y;
// note1.position.y = lineR.firstSegment.point.y - diff1 - 8;
// note2.position.y = lineR.firstSegment.point.y - diff2 - 8;
// note2.position.x += ln/3;

// animations
// var tspan = 300
const up = (path, xdist, ydist, tspan) => {
    path.applyMatrix = false;
    var fy = path.position.y - ydist;
    var fx = path.position.x - xdist;
    var t = path.tween(
        {
            'position.x': fx,
            'position.y': fy
        }, tspan)
    return t;
}

const hit = (path, targetp, rot, tspan) => {
    path.applyMatrix = false;
    var t = path.tween(
        {
            'rotation': rot,
            'position': targetp
        }, tspan)
    return t;
}

const getHitPoint = (path, curve, rot, side) => {
    var hitp = path.position.rotate(rot, curve.getPointAt(curve.length/2));
    // drawC(hitp, 10);
    // drawC(path.position, 10)
    var refl = new Path.Line(curve.getPointAt(curve.length/2), hitp);
    var norm = refl.getNormalAt(refl.length)*rcurv/3.5;
    var norml = new Path.Line(
        refl.lastSegment.point, 
        refl.lastSegment.point + norm*side);
    refl.visible = false;
    norml.visible = false;
    return norml.lastSegment.point;
}

const returnToOrig = (path, pathName, tspan) => {
    console.log(beforeAnim[path])
    var t = path.tween(
        {
            'position' : beforeAnim[pathName].pos,
            'rotation' : beforeAnim[pathName].rot
        }, tspan)
    return t;
}


// drawC(getHitPoint(note2, curv1), 10);
// drawC(curv1.position, 10)
// var note2Pos = note2.position;
// var note1Pos = note1.position;
// var yh = ln/2;

// Promise.resolve()
// .then(() => up(note2, 40, yh, tspan))
// .then(() => getHitPoint(note2, curv1))
// .then(() => hit(note2, getHitPoint(note1, curv1, -45, 1), -30, tspan))
// .then(() => hit(note2, note2Pos, 0, tspan))
// .then(() => up(note1, -40, yh, tspan))
// .then(() => hit(note1, getHitPoint(note2, curv2, 45, -1), 30, tspan))
// .then(() => hit(note1, note1Pos, 0, tspan))

// .then(() => up(note2, 40, yh, tspan))
// .then(() => getHitPoint(note2, curv1))
// .then(() => hit(note2, getHitPoint(note1, curv1, -45, 1), -30, tspan))
// .then(() => hit(note2, note2Pos, 0, tspan))
// .then(() => up(note1, -40, yh, tspan))
// .then(() => hit(note1, getHitPoint(note2, curv2, 45, -1), 30, tspan))
// .then(() => hit(note1, note1Pos, 0, tspan))

// .then(() => up(note2, 40, yh, tspan))
// .then(() => getHitPoint(note2, curv1))
// .then(() => hit(note2, getHitPoint(note1, curv1, -45, 1), -30, tspan))
// .then(() => hit(note2, note2Pos, 0, tspan))
// .then(() => up(note1, -40, yh, tspan))
// .then(() => hit(note1, getHitPoint(note2, curv2, 45, -1), 30, tspan))
// .then(() => hit(note1, note1Pos, 0, tspan))

// .then(() => {
//     returnToOrig(note1, "note1", tspan*4)
//     returnToOrig(note2, "note2", tspan*4)
//     returnToOrig(stand, "stand", tspan*4)
// })
// .then(() => console.log('end'))