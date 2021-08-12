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
var leftArc = new Path.Arc(
    {x: view.center.x - ln*3/4, y: view.center.y - ln},
    {x: view.center.x - ln/3, y: view.center.y - ln/2},
    {x: view.center.x - ln, y: view.center.y }
    );
var leftLine = new Path([
    {x: view.center.x - ln, y: view.center.y},
    {x: view.center.x - ln/4 - ln*3/8, y: view.center.y + ln/2},
    {x: view.center.x - ln/4, y: view.center.y + ln}
    ]);
leftLine.visible = false;
var bottomArc = new Path.Arc(
    {x: view.center.x - ln, y: view.center.y},
    {x: view.center.x - ln/4, y: view.center.y + ln*3/4},
    {x: view.center.x + ln*3/4, y: view.center.y + ln/2}
    );
// bottomArc.visible = false;
    
var rightLine = new Path.Line(
    {x: view.center.x + ln*3/4, y: view.center.y - ln},
    {x: view.center.x + ln*3/4, y: view.center.y + ln});
var rightArc = new Path.Arc(
    {x: view.center.x + ln*3/4, y: view.center.y - ln/8},
    {x: view.center.x - ln/12 , y: view.center.y},
    {x: view.center.x + ln*3/4, y: view.center.y + ln/8}
    )
// rightArc.visible = false;
// leftLine.interpolate(leftLine.clone({insert: false}), bottomArc, 1)
var r = ln/4;
var circ = new Path.Circle(
    rightLine.getPointAt(rightLine.length/2) - new Point(r, 0), 
    r);
circ.visible = false;

var lineTop = new Path.Line(
            {x: view.center.x - ln-ln/8, y: view.center.y - ln},
            {x: view.center.x + ln+ln/8, y: view.center.y - ln}
            )
            
// animations 
var tspan = 1000;
// drawC(rightArc.segments[4].point, 10);
// drawC(rightArc.position, 10);
// console.log(rightArc.segments[0], rightArc.segments[4]);
var t1 = rightArc.tween(
    {
        // in out!
        'segments[0].point': circ.segments[2].point,
        'segments[0].handleOut': circ.segments[2].handleIn,
        'segments[4].point': circ.segments[2].point,
        'segments[4].handleIn': circ.segments[2].handleOut,
        
        'segments[1].point': circ.segments[1].point,
        'segments[1].handleOut': circ.segments[1].handleIn,
        'segments[1].handleIn': circ.segments[1].handleOut,
        
        'segments[2].point': circ.segments[0].point,
        'segments[2].handleOut': circ.segments[0].handleIn,
        'segments[2].handleIn': circ.segments[0].handleOut,
        
        'segments[3].point': circ.segments[3].point,
        'segments[3].handleOut': circ.segments[3].handleIn,
        'segments[3].handleIn': circ.segments[3].handleOut,
    }, {
        duration: tspan/2,
        // start: false
    });
t1.then(function() {
    var sl = new Path.Line( 
            bottomArc.lastSegment.point,
            rightLine.getPointAt(rightLine.length/2))
    var cp = new CompoundPath()
    cp.addChildren([leftArc, bottomArc, sl]);
    // cp.strokeColor = 'yellow'
    var surf = new Path(cp.pathData);
    surf.reduce();
    
    var lineTop = new Path.Line(
                {x: view.center.x - ln-ln/8, y: view.center.y - ln},
                {x: view.center.x + ln+ln/8, y: view.center.y - ln}
                )
    
    var offset = surf.length;
    var t2 = surf.tween(tspan*2)
    var normBP = leftArc.length;
    t2.onUpdate = function(event) {
        var times = tspan*2/1000 * 61;
        var p = surf.getPointAt(offset)
        // drawC(p, 20);
        
        // var r = (rightArc.position - rightArc.segments[0].point).length;
        var norm = surf.getNormalAt(offset)*r;
        if(offset <= normBP) {
            // drawL(p, p-norm);
            norm *= -1;
        }
        else {
            // drawL(p, p+norm);
        }
        
        rightArc.position = p + norm;
        
        offset -= surf.length/times;
    }
    
    t2.then(function() {
        var t3 = bottomArc.tween(tspan)
        t3.onUpdate = function(event) {
            bottomArc.interpolate(bottomArc.clone({insert: false}), leftLine, event.factor)
        }
        surf.visible = false;
        sl.visible = false;
        
        
        t3.then(function() {
            var leftG = new Group([leftArc, rightArc, bottomArc])
            var lineTop = new Path.Line(
                        {x: view.center.x - ln-ln/8, y: view.center.y - ln},
                        {x: view.center.x + ln+ln/8, y: view.center.y - ln}
                        )
            leftG.tween(
            {
                'position.x': view.center.x - ln/3
            }, tspan)
            rightLine.tween(
            {
                'position.x': view.center.x + ln/1.5
            }, tspan)
        })
        
        
    })
    
    
    
    
})