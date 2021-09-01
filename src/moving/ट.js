

var size = new Size(605, 605);
var back = new Path.Rectangle(view.center-size/2, size);
back.fillColor = 'black';

project.currentStyle = {
    strokeColor: 'white',
    strokeWidth: 4,
    strokeCap: 'round'
}
var lineTopStyle = {
    strokeColor: '#fae0e4',
    strokeWidth: 15,
    strokeCap: 'butt'
};

const radians = function(degrees) {
	return degrees * Math.PI / 180;
}
var ln = 150;

var rotP = new Point(view.center.x + ln/6, view.center.y - ln);

var lineR = new Path.Line(
    {x: view.center.x + ln/3, y: view.center.y - ln},
    {x: view.center.x + ln/3, y: view.center.y - ln/3});
var r = ln/2 + ln/3;
// console.log(new Point(Math.cos(radians(45))*r, Math.sin(radians(45))*r*0.6));
var arc1 = new Path.Arc(
    lineR.lastSegment.point,
    {x: view.center.x - ln/4, y: view.center.y - ln/8},
    // lineR.lastSegment.point - new Point(Math.cos(radians(45))*r, Math.sin(radians(45))*-r*0.6),
    lineR.lastSegment.point - new Point(r, -r*0.9));
var mirD = new Matrix();
mirD.scale(1, -1, arc1.lastSegment.point);
var mirR = new Matrix();
mirR.scale(-1, 1, lineR.lastSegment.point);
// console.log(lineR.lastSegment.point);
// console.log(lineR.lastSegment.point.clone().transform(mirD))
// var refc = new Path.Circle(lineR.lastSegment.point.clone().transform(mirD), 20);
var arc2 = new Path.Arc(
    arc1.lastSegment.point,
    lineR.lastSegment.point.clone().transform(mirD),
    arc1.lastSegment.point.clone().transform(mirR) - new Point(ln/4, -ln/4));
var arcG = new Group([lineR, arc1, arc2]);
arcG.scale(1.1, 1, lineR.lastSegment.point);

var lineTopL = new Path.Line(
    {x: view.center.x - ln , y: view.center.y - ln},
    {x: view.center.x + ln/6+0.5, y: view.center.y - ln});
lineTopL.style = lineTopStyle;
var lineTopR = new Path.Line(
    {x: view.center.x + ln/6+0.5, y: view.center.y - ln},
    {x: view.center.x + ln , y: view.center.y - ln});
lineTopR.style = lineTopStyle;

// animations begin
var tspan = 2000;
var t1 = arcG.tween({duration: tspan});
t1.onUpdate = function(event) {
    var t = event.factor;
    var f = -Math.sin(t)*0.1
    arcG.scale(1, 1 + f);
}
t1.then(function() {
    arcG.scale(-1, -1);
    var t2 = arcG.tween(tspan);
    t2.onUpdate = function(event) {
        var t = event.factor;
        var f = Math.sin(t)*0.10682;
        arcG.scale(1, 1 + f);
    }
    t2.then(function() {
        
        
        var t3 = arcG.tween(tspan)
        t3.onUpdate = function(event) {
            var t = event.factor*12;
            // arcG.position.x += Math.sin(t)*ln/16;
            arcG.translate(new Point(-Math.sin(t)*ln/18, 0));
        }
        t3.then(function() {
            
            // var refc = new Path.Circle(rotP, 10);
            var t4 = arcG.tween(tspan);
                // arcG.scale(0.5);
            // console.log(t4);
            t4.onUpdate = function(event) {
                rotP += new Point(-1.5/1.4, 1.5);
                // var c = new Path.Circle(rotP, 10);
                arcG.rotate(180/(62*tspan/1000), rotP);
                // arcG.translate(new Point(-5, 0));
                // lineTopL.translate(new Point(0, 1.5));
                // lineTopR.translate(new Point(0, 1.5));
            }
            
            t4.then(function() {
                var t5 = arcG.tween(1000);
                t5.onUpdate = function(event) {
                    var t = event.factor*4;
                    arcG.translate({x: 0, y: (t*t)/5.45});
                    // lineTopL.translate(new Point(0, (-t*t)/2));
                    // lineTopR.translate(new Point(0, (-t*t)/2));
                    // arcG.scale(1, 1 + Math.sin(t)*0.04);
                }
                t5.then(function() {
                    var t6 = arcG.tween(1000*0.6) 
                    t6.onUpdate = function(event) {
                        var t = event.factor*12;
                        var f = Math.sin(t + radians(90));
                        arcG.translate(0, f*10);
                        // arcG.scale(1, 1+f*0.05, rotP);
                        
                        lineTopL.lastSegment.point.y += f*10;
                        lineTopR.firstSegment.point.y += f*10;
            
                    }
                })
            })
        })
        
    })
})

// function onKeyDown(event) {
//     console.log(event.key);
//     if (event.key == 'space') {
//         console.log('space pressed!');
//         t1.start();  
//         console.log(t1);
//     }
// }


// var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  
// window.location.href=image; 