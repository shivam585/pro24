
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var parachuteboyimage,parachuteboy,crow1,crow2,crow2image,paraglider,paragliderimage,hotairballoon,hotairballoonimage
var gamestate="play"
var nextbutton,nextbuttonimage
var crowgroup,hotairballoongroup,paraglidergroup
var distance,time
var crashedboy,crashedboyimage,restartbutton,restartbuttonimage

function preload()
{
	parachuteboyimage=loadImage("plane.png")
	crow2image=loadAnimation("crow1.png","crow2.png","crow3.png")	
	paragliderimage=loadImage("parachuteboy2.png")
	hotairballoonimage=loadImage("hotairballoon1.png")
	nextbuttonimage=loadImage("nextbutton3.png")
	crashedboyimage=loadImage("crashedparachuteboy.png")
	restartbuttonimage=loadImage("r.png")

	
}

function setup() {
	createCanvas(windowWidth,windowHeight);


	engine = Engine.create();
	world = engine.world;
	Engine.run(engine);
	//Create the Bodies Here.
	parachuteboy=createSprite(width/10,height/2,20,20)
	parachuteboy.addImage(parachuteboyimage)
	parachuteboy.scale=1.5
	
	nextbutton=createSprite(width/2,height/1.3,20,20)

	nextbutton.visible=false

	
	crashedboy=createSprite(parachuteboy.x+600,height/2.4,20,20)
	crashedboy.addImage(crashedboyimage)
	crashedboy.scale=1.5
	crashedboy.visible=false

	restartbutton=createSprite(crashedboy.x+100,height/1.8,20,20)
	restartbutton.addImage(restartbuttonimage)
	restartbutton.scale=0.3
	restartbutton.visible=false
	
	//restartbutton.visible=false

	crowgroup=new Group()
	hotairballoongroup=new Group()
	paraglidergroup=new Group()

	distance=1000
	time=100
}


function draw() {
  rectMode(CENTER);
  background("lightblue");
  translate(-parachuteboy.x + width/2 ,0);





  

  drawSprites();


  if(gamestate==="play"){
	nextbutton.visible=false
	crashedboy.visible=false
	parachuteboy.visible=0.1	
	restartbutton.visible=false


  spawncrow()
  spawnparaglider()
  spawnhotairballoon()
  fill("blue")
  textSize(40)
  textFont("Algerian")

  text("distance  :"+distance,parachuteboy.x+100,height/10)

  time= time -(getFrameRate()/1100);

  fill("red")
  textSize(40)
  textFont("Algerian")
  text("time  :"+time,parachuteboy.x-700,height/10)


  if(keyDown("right")){
	right()

	distance=  distance - Math.round(getFrameRate()/40);

	
  }
 

  if(keyDown("down")){
	parachuteboy.y=parachuteboy.y+7
  }

  if(keyDown("up")){
	parachuteboy.y=parachuteboy.y-7
  }

}


  
  if(crowgroup.isTouching(parachuteboy)){
	gamestate="end"
	
  }

  if(gamestate==="end"){
	  crowgroup.destroyEach()
	 gamestate="play"
	 distance=1000
	 distance=1000
	time=100

  }
  

  if(distance===0||distance<0&&time===0||time<0){

	parachuteboy.visible=false

	crowgroup.destroyEach()

	fill("yellow")
	textSize(40)
	textFont("Algerian")
	text("you won",width/2,height/2)
  }
 
  if(gamestate==="win"){

	crowgroup.destroyEach()

parachuteboy.visible=1.3

  }
 
}

function right(){
	parachuteboy.x=parachuteboy.x+7
}

function spawncrow(){
if(frameCount%70===0){
	crow1=createSprite(parachuteboy.x+700,Math.round(random(height/10,height/1)),40,40)
crow1.addAnimation("crow",crow2image)
crow1.scale=0.4
crow1.velocityX=-2
crowgroup.add(crow1)



}


}

function spawnparaglider(){
if(frameCount%450===0){
	paraglider=createSprite(parachuteboy.x+700,height/10,40,40)
paraglider.addImage(paragliderimage)
paraglider.velocityY=2
crowgroup.add(paraglider)

}

}

function spawnhotairballoon(){
	if(frameCount%200===0){
		hotairballoon=createSprite(parachuteboy.x+700,height/10,40,40)
		hotairballoon.addImage( hotairballoonimage)
		hotairballoon.velocityY=random(2,-2)
		crowgroup.add(hotairballoon)
	
	}
	
	}



