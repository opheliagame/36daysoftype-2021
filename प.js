

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
var line = new Path.Line(
    {x: view.center.x - ln/3, y: view.center.y - ln},
    {x: view.center.x - ln/3, y: view.center.y + ln});
var topL = new Path.Line(
    line.firstSegment.point, 
    line.firstSegment.point + new Point(ln*5/6, 0));
var bottomL = topL.clone().translate(0, 2*ln/3 + ln/6);
var r = (2*ln/3 + ln/6)/2;
var arc = new Path.Arc(
    topL.lastSegment.point,
    topL.lastSegment.point + new Point(r, r),    
    bottomL.lastSegment.point);
var smLine = new Path.Line(
    topL.firstSegment.point, 
    bottomL.firstSegment.point)
// var pGroup = new Group([topL, bottomL, arc, smLine]);
var zenbu = new Group([topL, bottomL, arc, smLine, line])

var lineTop = new Path.Line(
            {x: view.center.x - ln + ln/8  , y: view.center.y - ln},
            {x: view.center.x + ln - ln/8 , y: view.center.y - ln}
            )
lineTop.style = {
    strokeColor: '#fae0e4',
    strokeWidth: 15,
    strokeCap: 'butt'
}
var topRotAngle = 30;
lineTop.rotate(-topRotAngle, lineTop.firstSegment.point)
// zenbu.position.x = 200 ;
// lineTop.position.x = 200 - ln;
zenbu.position.x = view.center.x + ln/3;
lineTop.position.x = view.center.x - ln + ln/3;
// zenbu.position.y += ln/5;
// lineTop.position.y += ln/5;

// animations
var tspan = 2000;
const rotateSign = (path, rotP, tspan) => {
    path.pivot = rotP;
    path.applyMatrix = false;
    var t = path.tween(
        {
          'rotation': 90 
        },
        {
            duration: tspan/2,
            easing: 'easeOutQuart'
        })
    // path.strokeColor = 'red'
    t.then(function() {
        // var t2 = path.tween(
        //     {
        //       'rotation': 0 
        //     },
        //     {
        //         duration: tspan/2,
        //         easing: 'easeOutQuart'
        //     })
        // t2.then(function() {
        //     path.visible = false;
        // })
    })
    
}

var topPos = lineTop.position.y
const jump = (path, xdist, ydist, tspan) => {
    var t = path.tween(tspan)
    var yPos = path.position.y;
    t.onUpdate = function(event) {
        var times = tspan/1000 * 61;
        var angle = map(event.factor, 0, 1, 0, Math.PI)
        path.position.x += xdist/times;
        path.position.y = yPos - Math.abs(Math.sin(angle))*ydist;
    }
    t.then(function() {
        zenbu.translate(xdist, 0);
        zenbu.visible = true
        zenbu.strokeColor = 'black'
        zenbu.children[4].strokeColor = 'white'
        var pGroup = path.clone();
        path.visible = false;
        // pGroup.strokeColor = 'blue'
        pGroup.removeChildren(4)
        // path.visible = false;
        // zenbu.children[0].visible = false;
        // zenbu.children[1].visible = false;
        // zenbu.children[2].visible = false;
        // zenbu.children[3].visible = false;
        rotateSign(pGroup, path.children[3].firstSegment.point, tspan)
    })
}

const topTween = (path, rotA, tspan) => {
    var t = path.tween(
        {
            duration: tspan,
            easing: 'easeOutQuart'
        })
    t.onUpdate = function(event) {
        var times = tspan/1000 * 61;
        var diff = (100+ln+ln/6)/times;
        path.translate(diff, 0)
    }
    t.then(function() {
        path.applyMatrix = false;
        path.pivot = path.firstSegment.point;
        var pos = path.position.x
        var t2 = path.tween(
            {
                'rotation': rotA,
                'position.x': pos + -ln -ln/5
            },
            {
                duration: tspan/2,
                easing: 'easeOutQuart'
            })
        // t2.onUpdate = function(event) {
        //     var times = tspan/2000 * 61;
        //     var diff = -ln/times;
        //     // var diff = ln/times;
        //     path.rotate(rotA/times, path.firstSegment.point)
        //     path.translate(diff, 0)
        // }
        t2.then(function() {
            // var t3 = path.tween( 
            //     {
            //         'rotation': 0,
            //         // 'position.x': pos + ln
            //     },
            //     {
            //         duration: tspan/2,
            //         easing: 'easeOutQuart'
            //     }) 
            // t3.then(function() {
            //     path.applyMatrix = true;
            // })
            // t3.onUpdate = function(event) {
            //     var times = tspan/2000 * 61;
            //     // var diff = ln/times;
            //     path.rotate(-rotA/times, path.firstSegment.point)
            // }
        })
    })
    
}

// var t = zenbu.tween(tspan*2)
// t.onUpdate = function(event) {
    var z = zenbu.clone()
    z.strokeColor = 'white'
    zenbu.visible = false;
    jump(z, 100, 50, tspan);
    topTween(lineTop, topRotAngle, tspan)
// }

// jump(zenbu, 100, 100, tspan);
// setInterval(() => {
//     var z = zenbu.clone()
//     z.strokeColor = 'white'
//     zenbu.visible = false;
//     jump(z, 100, 50, tspan);
    
//     topTween(lineTop, topRotAngle, tspan)
// }, tspan*2);


// var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  
// window.location.href=image; 