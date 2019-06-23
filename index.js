var canvas= document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");
var x=canvas.width/2;
var y=canvas.height-30;
var dx=2;
var dy=-2;
var ballRadius=10;
//below we define variables for the paddle
var paddleHeight =10;
var paddleWidth =75;
var paddleX=(canvas.width-paddleWidth)/2;
//variable for storing the key pressed values (default false)
var rightPressed=false;
var leftPressed=false;
//below variable for creating blocks(bricks)
var brickRowCount=3;
var brickColumnCount=5;
var brickWidth=75;
var brickHeight=20;
var brickPadding=10;
var brickOffsetTop=30;
var brickOffsetLeft=30;
//laying the brick on top of the screen
var bricks=[];
for(var c=0; c<brickColumnCount;c++){
    bricks[c]=[];
    for(var r=0;r<brickRowCount;r++){
        bricks[c][r]={x:0,y:0};
    }
}

//below creating function for drawing paddle
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle="#4cff00";
    ctx.fill();
    ctx.closePath();
}
//below creating fuction which draws the ball
function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2);
    ctx.fillStyle="yellow";
    ctx.fill();
    ctx.closePath();
}
//creating function that creates frames continuesly
function draw(){
    //here we create the code for 
    //here we implement function to clear the ball
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //below function calling to draw the ball
    drawBall();
    //below function calling for drawing the paddle
    drawPaddle();
    //here we are adding the differential change of the direction of the movement of ball
    x+=dx;
    y+=dy;
    //setting up simple collision detection
    //looking for the top and game over if bottom
    if(y+dy<ballRadius){
        dy=-dy;
    }
    //here we look the ball touch the paddle
    else if(y+dy>canvas.height-ballRadius){
        if(x>paddleX && x<paddleX+paddleWidth){
            dy=-dy;
        }
        //if the ball pitches outside the paddle
        else{
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval);
        }
    }
    //now looking for left and right collisions 
    if(x+dx<ballRadius || x+dx>canvas.width-ballRadius){
        dx=-dx;
    }
    //below code to move the padlle according to the keypress
    if(rightPressed && paddleX<canvas.width-paddleWidth){
        paddleX+=9;
    }
    if(leftPressed && paddleX>0){
        paddleX-=9;
    }
}
//here we are going to create two event listeners to find whether the key is pressed or not
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false)

//creating two key evaent handler function
function keyDownHandler(e){
    if(e.key=="Right" || e.key=="ArrowRight"){
        rightPressed=true;

    }
    if(e.key=="Left" || e.key=="ArrowLeft"){
        leftPressed=true;
    }
}
function keyUpHandler(e){
    if(e.key=="Right" || e.key=="ArrowRight"){
        rightPressed=false;
    }
    if(e.key=="Left" || e.key=="ArrowLeft"){
        leftPressed=false;
    }
}
//
//here we set the interval
//variable for setting interval
var interval=setInterval(draw,10);
