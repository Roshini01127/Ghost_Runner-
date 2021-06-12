var tower,towerImg
var ghost,ghostImg
var door,doorImg,doorGroup
var climber,climberImg,climbersGroup 
var invisibleBlock,invisibleBlockGroup 
var gameState = "play"
var gameSound

function preload(){
towerImg = loadImage("tower.png");
ghostImg = loadImage("ghost-standing.png")
doorImg = loadImage("door.png")
climberImg = loadImage("climber.png")
gameSound = loadSound("spooky.wav")
}

function setup(){
createCanvas(600,600);
gameSound.loop()
tower = createSprite(300,300,600,600);
tower.addImage("tower",towerImg);
tower.velocityY = 1
ghost = createSprite(200,200,30,30)
ghost.addImage("ghost",ghostImg);
ghost.scale = 0.3
doorGroup= new Group()
climberGroup = new Group()
invisibleBlockGroup = new Group()
}


function draw(){
background(0);
if(gameState==="play"){
  if(tower.y > 400){
tower.y = 300
}  
spawnDoors();
if(keyDown("space")){
ghost.velocityY = -7
}
ghost.velocityY = ghost.velocityY+0.5
if(keyDown("right_arrow")){
ghost.x = ghost.x + 2
}
if(keyDown("left_arrow")){
ghost.x = ghost.x - 2 
}
if(climberGroup.isTouching(ghost)){
  ghost.velocityY = 0;
}
if(invisibleBlockGroup.isTouching(ghost)){
  ghost.destroy()
  gameState="end"
}
  drawSprites();
}


  if(gameState==="end"){
    stroke("yellow")
    fill("yellow")
    textSize(30)
    text("Game Over",200,200)
  }
}

function spawnDoors(){
if(frameCount%250===0){
var door = createSprite(200,-50)
door.addImage(doorImg)
door.velocityY = 2
door.x = Math.round(random(120,400))
door.lifetime = 750;
doorGroup.add(door)
var climber = createSprite(200,10)
climber.addImage(climberImg)
climber.velocityY = 2
climber.x = door.x
climber.lifetime = 750;
climberGroup.add(climber)
door.depth = ghost.depth
ghost.depth = ghost.depth + 1 
var invisibleBlock = createSprite(200,20)
invisibleBlock.width = climber.width
invisibleBlock.height = 5
invisibleBlock.x = climber.x
invisibleBlock.velocityY = 2 
invisibleBlock.lifetime = 750
invisibleBlockGroup.add(invisibleBlock)
}
}
