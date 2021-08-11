var size = new Size(600, 600);
project.currentStyle = {
    strokeColor: 'black',
    strokeWidth: 16,
    strokeCap: 'butt'
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
var arc2 = new Path.Arc(
    {x: view.center.x + ln/4, y: view.center.y},
    {x: view.center.x + ln/4 + ln/4+ln/4, y: view.center.y + ln/2},
    {x: view.center.x + ln/4, y: view.center.y + ln});
var lineh3 = new Path.Line(
    {x: view.center.x + ln/4, y: view.center.y + ln},
    {x: view.center.x - ln/3 - ln/4, y: view.center.y + ln})
group.addChildren([lineh1, arc1, lineh2, arc2, lineh3]);    
// group.scale(0.8, 1);
// var groupC = group.clone().scale(-1, 1);
// var arc1C = arc1.clone().scale(-1, 1, view.center);
// var arc2C = arc2.clone().scale(-1, 1, view.center);
var arc1C = arc1.clone();
var arc2C = arc2.clone();
arc1C.visible = false;
arc2C.visible = false;
// arc1.visible = false;
// arc2.visible = false;

// arc1C.scale(1.2, -1.5, arc1C.lastSegment.point);
// arc2C.scale(0.8, -0.67, arc2C.firstSegment.point);


// animations
// var tspan = 4000;
// var amp = 0.1;


// var t1a1 = arc1C.tween(
//     {'firstSegment.point': arc2.lastSegment.point,
//     'firstSegment.handleOut': arc2.lastSegment.handleIn,
//     'lastSegment.point': arc2.firstSegment.point,
//     'lastSegment.handleIn': arc2.firstSegment.handleOut,
//     'segments[1].point': arc2.segments[1].point,
//     'segments[1].handleIn': arc2.segments[1].handleIn*-1,
//     'segments[1].handleOut': arc2.segments[1].handleOut*-1
//     },
//     {   
//         duration: tspan,
//         // start: false,
//     });
// var t1a2 = arc2C.tween(
//     {'lastSegment.point': arc1.firstSegment.point, 
//     'lastSegment.handleIn': arc1.firstSegment.handleOut,
//     'firstSegment.point': arc1.lastSegment.point,
//     'firstSegment.handleOut': arc1.lastSegment.handleIn,
//     'segments[1].point': arc1.segments[1].point,  
//     'segments[1].handleIn': arc1.segments[1].handleIn*-1,
//     'segments[1].handleOut': arc1.segments[1].handleOut*-1
//     },
//     {   
//         duration: tspan,
//         // start: false,
//     });

// // t1a1.start();
// t1a1.then(function() {
//     arc1C.visible = false;
//     arc2C.visible = false;
//     var t1 = arc2.tween(tspan)
//     t1.onUpdate = function(event) {
//         var times = tspan/1000 * 61;
//         var t = event.factor*times/6;
//         var f = Math.sin(t);
//         twerk(t, f);
//     }
// })


// // t1.then(function() {
//     // console.log('hello');
//     arc1C.visible = true;
//     arc2C.visible = true;
//     arc1C.scale(-1, 1, view.center);
//     arc2C.scale(-1, 1, view.center);
    
// // })

// function twerk(t, f) {
//     arc2.shear(0, -Math.sin(t*2)*0.06, arc2.firstSegment.point);
//     arc1.scale(1 + f*0.02, 1)
//     arc2C.shear(0, Math.sin(t*2)*0.06, arc2C.firstSegment.point);
//     arc1C.scale(1 + f*0.02, 1)
// }


var lineTop = new Path.Line(
            {x: view.center.x - ln + ln/8, y: view.center.y - ln},
            {x: view.center.x + ln - ln/8, y: view.center.y - ln}
            )
