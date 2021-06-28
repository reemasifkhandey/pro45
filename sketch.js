//declaring variables globally
var bg,bgImg;
var spaceship,spaceshipImg;
var meteoroid,meteoroidImg;
var alien, alienImg;
var obstaclesGroup;
var gameOver;
var gameOverImg;
var score=0;
var gameState="PLAY";

function preload(){

//loading images
bgImg=loadImage("bg.jpeg");
spaceshipImg=loadImage("12.png");
meteoroidImg=loadImage("met.png1.png");
alienImg=loadImage("alien1.png");
gameOverImg=loadImage("gameOver.jpeg");
}

function setup() {
 //creating canvas
 createCanvas(800,400);
 
 //creating background
 bg=createSprite(400,200);
 bg.addImage(bgImg);
 bgImg.resize(1600,400);
 bg.velocityX=-(5+score/100);


 gameOver=createSprite(400,200);
 gameOver.addImage(gameOverImg);
 gameOver.scale=0.2;
 gameOver.visible=false; 
   
 spaceship=createSprite(100,200);
 spaceship.addImage(spaceshipImg);
 spaceship.scale=0.12; 
 edges= createEdgeSprites();

 meteoroid=createSprite(20,50);
 meteoroid.addImage(meteoroidImg);
 meteoroid.scale=0.3;


 obstaclesGroup = new Group();

}

function draw() {
  background(0); 
  
    if(gameState==="PLAY"){

      score=score+Math.round(frameRate()/60);

      //moving the spaceship with up and down arrow keys
      if(keyDown("UP_ARROW")){
      spaceship.velocityY=-3;    
      }
      
      if(keyDown("DOWN_ARROW")){
          spaceship.velocityY=3;    
      }
      
      //resetting the background image
      if(bg.x<0){
       bg.x=width/2;  
      }   
      
      if(spaceship.isTouching(obstaclesGroup)){
      gameState="END";    
      }
  
      spawnObstacles();
      
      }
      if(gameState==="END"){
      bg.velocityX=0;
      spaceship.velocityX=0; 
      spaceship.velocityY=0;
      gameOver.visible=true;
      obstaclesGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
      }

    //making the spaceship bounce off the edges   
    spaceship.bounceOff(edges)

      drawSprites();
      textSize(20);
      fill("white");
      text("Score :" + score,500,50);
}
function spawnObstacles(){
  if(frameCount%100===0){
  meteoroid=createSprite(800,10);
  meteoroid.addImage(meteoroidImg);
  meteoroid.velocityX=-(5+score/100);
  meteoroid.lifetime=600;
  meteoroid.debug=true;
  meteoroid.scale=0.4;
  spaceship.depth=meteoroid.depth;
  spaceship.depth+=1;
  
  alien=createSprite(600,Math.round(random(400,350)));
  alien.addImage(alienImg);
  alien.velocityX=-(5+score/100);
  alien.scale=0.15;
  alien.lifetime=600;
  alien.debug=false;
  spaceship.depth=alien.depth;
  spaceship.depth+=1;
  meteoroid.setCollider("rectangle",0,0,40,55);
  alien.setCollider("rectangle",0,0,24,55);
  obstaclesGroup.add(meteoroid);
  obstaclesGroup.add(alien);
  }    
  }