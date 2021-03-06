var canvas = document.querySelector("#canvas");
if(canvas.getContext) {
	var ctx = canvas.getContext("2d");
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function Triangle(inInitPosX, inInitPosY, inPosX, inPosY, inTriSide, inDistance, inColor) {
    this.x1 = inInitPosX;
    this.y1 = inInitPosY;
    this.x2 = inPosX;
    this.y2 = inPosY;
    this.x3 = inInitPosX + inTriSide/2;
    this.y3 = inInitPosY + inDistance;
    this.triSide = inTriSide;
    this.distance = inDistance;
    this.color = inColor;
}

Triangle.prototype.draw = function() {
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.lineTo(this.x1 + this.triSide/2, this.y1 + this.distance);
    if(flag == 0) {
        ctx.closePath();
    }
    ctx.fillStyle = this.color;
    ctx.fill();
}


Triangle.prototype.update = function() {
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.lineTo(this.x1 + this.triSide/2, this.y1 + this.distance);
    if(flag == 0) {
        ctx.closePath();
    }
    ctx.fillStyle = this.color;
    ctx.fill();
}

// Algorithm for triangle generation

function drawTriangle(inEvent) {  
    if(flag==1) {
        // to get the distance between a point where mouse is clicked and a point where mouse drag ends  
        dist = Math.pow(Math.abs(parseInt(Math.pow(parseInt(inEvent.clientX-initX),2)-Math.pow(parseInt(inEvent.clientY-initY),2))),0.5);

        //To draw equilateral triangle, we have initial point and let us asssume the obtained distance as the hegiht of tringle.
        //Using this, we can get the side of the tringle, thereby we obtain the right and left side vertices points.
        triSide=1.1547*dist;
        var triangleColor = getColor();
        var triangle = new Triangle(initX, initY, inEvent.clientX, inEvent.clientY, triSide, dist, triangleColor);     
        triangles.push(triangle);
console.log(triangles);
        triangle.draw();
    }}



function getColor()
{
	return '#'+Math.random().toString(16).slice(-6);
}
function pointInTriangle(x1, y1, x2, y2, x3, y3, x, y)
{
 var denominator = ((y2 - y3)*(x1 - x3) + (x3 - x2)*(y1 - y3));
 var a = ((y2 - y3)*(x - x3) + (x3 - x2)*(y - y3)) / denominator;
 var b = ((y3 - y1)*(x - x3) + (x1 - x3)*(y - y3)) / denominator;
 var c = 1 - a - b;
 
 return 0 <= a && a <= 1 && 0 <= b && b <= 1 && 0 <= c && c <= 1;
}

    var flag = 0;
    var initX,initY;
    var dist;
    var triSide;

    var triangles = [];
    var triSel=false;


// To get the initial point 
document.addEventListener("mousedown", function(event){
    flag = 0;
    initX=event.clientX;
    initY=event.clientY;
}, false);

// To enable click into drag event 
document.addEventListener("mousemove", function(){
    if(!triSel)
    flag = 1;
else
{
    console.log('trianvle is dragged');
    console.log(event);
}
}, false);

// To draw triandle according to drag size

document.addEventListener("mouseup", function(){
   if(flag === 1){
        drawTriangle(event);
    }
    else
    {
      triSel=false;  
    }
}, false);
canvas.addEventListener("mousemove", function(event){
    
   for(var i=0;i<triangles.length;i++)
   {
    var x1=triangles[i].x1;
    var y1=triangles[i].y1;
    var x2=triangles[i].x2;
    var y2=triangles[i].y2;
    var x3=triangles[i].x3;
    var y3=triangles[i].y3;
    var x=event.clientX;
    var y=event.clientY;
    var check_point=pointInTriangle(x1, y1, x2, y2, x3, y3, x, y);
    if(check_point)
    {
        if(flag==0)
        {
        console.log('inside tri');
        triSel=true;
        var triSelected=triangles[i];

    }
    }
   }
}, false);

canvas.addEventListener("drag", function(event){
if(triSel)
 console.log('dragging');
},false);
