var size = new Size(600, 600);
project.currentStyle = {
    strokeColor: 'black',
    strokeWidth: 16,
    strokeCap: 'butt'
}

const radians = function(degrees) {
	return degrees * Math.PI / 180;
}
const drawC = function(point, radius) {
    var refc = new Path.Circle(point, radius);
    refc.strokeWidth = 1;
    refc.strokeColor = 'red';
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
var pGroup = new Group([line, topL, bottomL, arc]);
// pGroup.position.x = 100;
var py = pGroup.position.y;
var lineTop = new Path.Line(
            {x: view.center.x - ln - ln/8, y: view.center.y - ln},
            {x: view.center.x + ln + ln/8, y: view.center.y - ln}
            )
lineTop.rotate(90, view.center);
lineTop.position.x = 800;

// animations
var tspan = 2000;
var t1 = pGroup.tween(tspan)
t1.onUpdate = function(event) {
    var times = tspan/1000 * 61;
    var t = event.factor;
    var angle = map(t, 0, 1, 0, Math.PI * 4);
    var f = Math.sin(angle)*50;
    pGroup.position.x += 2;
    pGroup.position.y = py + f;
    
    lineTop.position.x -= 2;
    lineTop.position.y = py + f;
}
t1.then(function() {
    var t2 = arc.tween(tspan)
    t2.onUpdate = function(event) {
        var angle = map(event.factor, 0, 1, 0, Math.PI * 4);
        var f = Math.sin(event.factor*angle)*0.01;
        arc.scale(1+f, 1, topL.lastSegment.point);
    }
    t2.then(function() {
        var arcGroup = new Group([arc, topL, bottomL]);
        // drawC(arcGroup.position, 20);
        // arcGroup.scale(-1, 1);
        var dist = lineTop.position.x - (arcGroup.position.x - line.position.x) - arcGroup.position.x;
        dist = dist/2;
        
        var t3 = arcGroup.tween(tspan)
        t3.onUpdate = function(event) {
            var times = tspan/1000 * 61;
            var angle = map(event.factor, 0, 1, 0, Math.PI * 4);
            var f = -Math.sin(event.factor*2)*0.1;
            arcGroup.position.x += dist/times;
            arcGroup.scale(1+f, 1);
        }
        t3.then(function() {
            arcGroup.scale(-1, 1);
            var t4 = arcGroup.tween(tspan)
            t4.onUpdate = function(event) {
                var times = tspan/1000 * 61;
                var angle = map(event.factor, 0, 1, 0, Math.PI * 4);
                var f = Math.sin(event.factor*2)*0.108;
                arcGroup.position.x += dist/times;
                arcGroup.scale(1+f, 1);
            }
            t4.then(function() {


                // drawC(arcGroup.position, 20);
                var t7 = arcGroup.tween(
                    {
                        'position.y': view.center.y - ln/3 
                    }, tspan)
                t7.then(function() {
                    var g1 = new Group([arc, topL, bottomL, lineTop]);
                    g1.applyMatrix = false;
                    var t5 = g1.tween(
                        {
                            rotation: -90,
                            'position.y': view.center.y - ln/2 + ln/8,
                            'position.x': view.center.x
                        }, tspan)
                    var t6 = line.tween(
                        {
                            'position.x': view.center.x + ln/2 + ln/6
                        }, tspan*2)
                })
                
                
                // t5.then(function() {
                //     var arcGroup = new Group([g1.children[0], g1.children[1], g1.children[2]])
                    
                // })
                
                
                // t5.onUpdate = function(event) {
                //     var times = tspan/1000 * 61;
                //     g1.rotate(-90/times);
                //     g1.translate
                // }
            })
        })
    })
    
    
})
