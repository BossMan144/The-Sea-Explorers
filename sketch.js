var sea,sub,mine,shark,squid,coins,chest;
var seaImg,subImg,sub_collidedImg,mineImg,sharkImg,squidImg,coinsImg,chestImg;
var minesG,sharksG,squidsG,coinsG,chestsG;

var score = 0;

var gameOverImg,restartImg;

var subSound,sharkSound;
//Game States
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
subSound = loadSound("Class 19 Project Images/Sub sound effect.mp3");
sharkSound = loadSound("Class 19 Project Images/Shark sound effect.mp3");

seaImg = loadImage("Class 19 Project Images/Sea Background.png");

subImg = loadAnimation("Class 19 Project Images/Sub Sprite 1.png","Class 19 Project Images/Sub Sprite 2.png","Class 19 Project Images/Sub Sprite 3.png","Class 19 Project Images/Sub Sprite 4.png","Class 19 Project Images/Sub Sprite 5.png");
sub_collidedImg = loadAnimation("Class 19 Project Images/Destroyed Sub.png");

mineImg = loadImage("Class 19 Project Images/Sea Mine.png");
sharkImg = loadAnimation("Class 19 Project Images/Shark Sprite 1.png","Class 19 Project Images/Shark Sprite 2.png","Class 19 Project Images/Shark Sprite 3.png","Class 19 Project Images/Shark Sprite 4.png","Class 19 Project Images/Shark Sprite 5.png","Class 19 Project Images/Shark Sprite 6.png","Class 19 Project Images/Shark Sprite 7.png","Class 19 Project Images/Shark Sprite 8.png","Class 19 Project Images/Shark Sprite 9.png","Class 19 Project Images/Shark Sprite 10.png","Class 19 Project Images/Shark Sprite 11.png","Class 19 Project Images/Shark Sprite 12.png");
squidImg = loadAnimation("Class 19 Project Images/Squid Sprite 1.png","Class 19 Project Images/Squid Sprite 2.png","Class 19 Project Images/Squid Sprite 3.png");

coinsImg = loadImage("Class 19 Project Images/Small Pile of Coins.png");
chestImg = loadImage("Class 19 Project Images/Treasure Chest.png");

restartImg = loadImage("Class 19 Project Images/Reset Button.png");
gameOverImg = loadImage("Class 19 Project Images/Game Over.png");


}

function setup() {
createCanvas(windowWidth,windowHeight);

sub = createSprite(width/2-600,height/2-100,10,10);
sub.addAnimation("working", subImg);
sub.addAnimation("collided",sub_collidedImg)
sub.setCollider('circle',0,0,32)
sub.scale = 2.5

invisibleceiling = createSprite(width/2,height/2-465,width,10);
invisibleground = createSprite(width/2,height/2+465,width,10);

gameOver = createSprite(width/2,height/2-50);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;

restartbutt = createSprite(width/2,height/2+50);
restartbutt.addImage(restartImg)
restartbutt.scale = 0.3;

minesG = new Group();
sharksG = new Group();
squidsG = new Group();
coinsG = new Group();
chestsG = new Group();
}

function draw() {
background(seaImg);
textSize(35);
fill(255,223,0);
text("Score: "+score,width/2-850,height/2-400);
if(gameState===PLAY){
  createMines();
  createSharks();
  createSquids();
  createCoins();
  createChests();  
    score = score + Math.round(getFrameRate()/60);
    gameOver.visible = false;
    restartbutt.visible = false;
    invisibleceiling.visible = false;
    invisibleground.visible = false;

    if(sub.isTouching(invisibleceiling)){
      sub.bounce(invisibleceiling);
    }
    if(sub.isTouching(invisibleground)){
      sub.bounce(invisibleground);
    }

    if(keyDown("space")) {
      subSound.play();
    }

  if(keyDown("up_arrow")) {
    sub.y = sub.y - 5.5;
  }
  if(keyDown("down_arrow")) {
    sub.y = sub.y + 5.5;
  }

  if (coinsG.isTouching(sub)) {
    coinsG[0].destroy();
    score = score + 250;
  }
  if (chestsG.isTouching(sub)) {
    chestsG[0].destroy();
    score = score + 500;

  }
  if(minesG.isTouching(sub)) {
      gameState = END;
   }
   if(sharksG.isTouching(sub)) {
      gameState = END;
          }
   if(squidsG.isTouching(sub)) {
      gameState = END;
          } 
            
    }


else if(gameState === END) {
  sub.changeAnimation("collided",sub_collidedImg);
  sharkSound.stop();
  subSound.stop();

  gameOver.visible = true;
  restartbutt.visible = true;
  invisibleceiling.visible = false;
  invisibleground.visible = false;

  if(keyDown("up_arrow")) {
    sub.velocityY = 0;
  }
  if(keyDown("down_arrow")) {
    sub.velocityY = 0;
  }

  minesG.setVelocityXEach(0);
  sharksG.setVelocityXEach(0);
  squidsG.setVelocityXEach(0);
  coinsG.setVelocityXEach(0);
  chestsG.setVelocityXEach(0);

  minesG.setLifetimeEach(-1);
  sharksG.setLifetimeEach(-1);
  squidsG.setLifetimeEach(-1);
  coinsG.setLifetimeEach(-1);
  chestsG.setLifetimeEach(-1);

  if(mousePressedOver(restartbutt)) {
    reset();
  }
}

drawSprites();
}

function createMines(){
    if (World.frameCount % 30 == 0) {
        var mine = createSprite(width+5, Math.round(random(75, height-75), 10, 10));
        mine.setCollider("circle",0,0,20)
        mine.addImage(mineImg);
        mine.scale=2.5;
        mine.velocityX = -30;
        mine.lifetime = 600;
        minesG.add(mine);
    }
}

function createSharks(){
  if (World.frameCount % 600 == 0) {
      var shark = createSprite(width+5, Math.round(random(75, height-75), 10, 10));
      shark.addAnimation("swimming",sharkImg);
      sharkSound.play();
      shark.scale=2;
      shark.velocityX = -6;
      shark.lifetime = 600;
      sharksG.add(shark);
  }
}

function createSquids(){
  if (World.frameCount % 1300 == 0) {
      var squid = createSprite(width+5, Math.round(random(75, height-75), 10, 10));
      squid.addAnimation("moving",squidImg);
      squid.scale=2;
      squid.velocityX = -6;
      squid.lifetime = 600;
      squidsG.add(squid);
  }
}

function createCoins(){
  if (World.frameCount % 123 == 0) {
      var coins = createSprite(width+5, Math.round(random(75, height-75), 10, 10));
      coins.addImage(coinsImg);
      coins.scale=0.2;
      coins.velocityX = -6;
      coins.lifetime = 600;
      coinsG.add(coins);
  }
}

function createChests(){
  if (World.frameCount % 251 == 0) {
      var chest = createSprite(width+5, Math.round(random(75, height-75), 10, 10));
      chest.addImage(chestImg);
      chest.scale=0.2;
      chest.velocityX = -6;
      chest.lifetime = 600;
      chestsG.add(chest);
  }
}

function reset() {
gameState = PLAY;
gameOver.visible = false;
restartbutt.visible = false;
coinsG.destroyEach();
chestsG.destroyEach();
minesG.destroyEach();
sharksG.destroyEach();
squidsG.destroyEach();
sub.changeAnimation("working",subImg);
score = 0
sub.x = width/2-600;
sub.y = height/2-100;
}