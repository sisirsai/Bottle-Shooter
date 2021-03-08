var gun,gunImage;
var basket,basketImage;

var ing;

var edges;

var openingBackground,playingBackground;

var gameState = 0;

var bottle,fruits;

var bottle1,bottle1Image;
var bottle2,bottle2Image;
var bottle3,bottle3Image;
var bottle4,bottle4Image;
var bottle5,bottle5Image;
var bottle6,bottle6Image;
var bottle7,bottle7Image;

var fruit1,fruit1Image;
var fruit2,fruit2Image;
var fruit3,fruit3Image;
var fruit4,fruit4Image;
var fruit5,fruit5Image;
var fruit6,fruit6Image;
var fruit7,fruit7Image;

var gunShotSound,bottleBreakSound,playBgSound,startBgSound,gameOverSound;

var start,startImage;
var restart,restartImage;

var gameOverBottle,gameOverFruits;

var o;

var b;

var bullet,bulletImage;

var bottleGroup , fruitGroup, bulletGroup;

var bulletCount = 10,fruitCount = 0,bottleCount = 0;

var bottleMiss = 0,fruitMiss = 0;

var edge;

var bot,botter;

var bulletsOver;

var ak =  0;

var youWon;

function preload(){
       bottle1Image = loadImage("assets/bottle_1.png");
       bottle2Image = loadImage("assets/bottle_2.png");
       bottle3Image = loadImage("assets/bottle_3.png");
       bottle4Image = loadImage("assets/bottle_4.png");
       bottle5Image = loadImage("assets/bottle_5.png");
       bottle6Image = loadImage("assets/bottle_6.png");
       bottle7Image = loadImage("assets/bottle_7.png");

       fruit1Image = loadImage("assets/fruit_1.png");
       fruit2Image = loadImage("assets/fruit_2.png");
       fruit3Image = loadImage("assets/fruit_3.png");
       fruit4Image = loadImage("assets/fruit_4.png");
       fruit5Image = loadImage("assets/fruit_5.png");
       fruit6Image = loadImage("assets/fruit_6.png");
       fruit7Image = loadImage("assets/fruit_7.png");

       gunShotSound = loadSound("assets/sounds/gun_shot.mp3");
       bottleBreakSound = loadSound("assets/sounds/glass_break.mp3");
       playBgSound = loadSound("assets/sounds/playBackground.mp3");
       startBgSound = loadSound("assets/sounds/StartBackground.mp3");
       gameOverSound = loadSound("assets/sounds/gameover.mp3");

       openingBackground = loadImage("assets/opening.png");
       playingBackground = loadImage("assets/Bg.png");

       startImage = loadImage("assets/start.png");
       restartImage = loadImage("assets/restart.png");

       gunImage = loadImage("assets/gun.png");
       basketImage = loadImage("assets/basket_2.png");

       gameOverBottle = loadImage("assets/gameOverBottle.png");
       gameOverFruits = loadImage("assets/gameOverFruits.png");

       bulletImage = loadImage("assets/bullet.png");

       b = loadImage("assets/more5bullets.png");

       bulletsOver = loadImage("assets/bulletsOver.png");

       youWon = loadImage("assets/youWon.png");

}

function setup() {
       createCanvas(windowWidth,windowHeight-5);

       gun = createSprite(width-100,300);
       gun.addImage(gunImage);
       gun.scale = 0.25;
       
       bottleGroup = new Group();
       fruitGroup = new Group();
       bulletGroup = new Group();
       
       ing = createSprite(width/2,height,width,5);
       ing.visible = false;

       basket = createSprite(width/2,height-80);
       basket.addImage(basketImage);
       basket.debug = false;
       basket.setCollider("rectangle",0,20,150,50);

       start = createSprite(width/2,height-35,30,70);
       start.addImage(startImage);
       start.scale = 0.7;

       edge = createSprite(width/2,height,width,10);
       edge.visible = false;

       console.log(gameState);
       console.log(fruitMiss);
       console.log(bottleMiss);

       botter = new Group();
}

function draw() {
       background(openingBackground);
     
       o = Math.round(random(20,width-150));


      

       edges =  createEdgeSprites();
       basket.collide(edges);

       gun.collide(ing);
       if(gameState === 0){
        //      startBgSound.play();
       // startBgSound.setVolume(0.5);
              gun.visible = false;
              basket.visible = false;
       if(mousePressedOver(start)){
        gameState = 1;
       }

       
       }
       else if(gameState === 1){
              background(playingBackground);
            //  playBgSound.play();


              start.visible = false;
              gun.visible = true;
              basket.visible = true;

              if(gun.y<height-50){
                     gun.y = mouseY;
                    }
                    else{
                     gun.y = 500;
                    }
             
                    if(keyDown(LEFT)){
                     basket.x -= 20;
                    }
                    else if(keyDown(RIGHT)){
                     basket.x += 20;
                    }

              if(keyWentDown("space")){
                     bullets();
                     bulletCount --;
                 //    playBgSound.pause();
                     gunShotSound.play();
              }

              spawnFruits();
              spawnBottles();
              shoot();
             
                     
              
              for(var i = 0;i < fruitGroup.length; i++){
              if(fruitGroup.isTouching(basket)&& bottleGroup.isTouching(basket))
              {

                            
              } else if(fruitGroup.isTouching(basket)){
                     fruitGroup.get(i).destroy();
                     fruitCount ++;
              }}


for(let i=0;i<bottleGroup.length;i++){
       if(bottleGroup.isTouching(ing)){
              bottleGroup.get(i).destroy();
              bottleMiss ++;
       }
       if(fruitGroup.isTouching(ing)){
              fruitGroup.get(i).destroy();
              fruitMiss ++;
       }
}

              if(bulletCount === 0 && ak === 1){
                     gameState = 2;
                     gameOverSound.play();
                  
              }
              if(bottleMiss === 3){
                     gameState = 3;
                     gameOverSound.play();
                   
              }
              if(fruitMiss === 5){
                     gameState = 4;
                     gameOverSound.play();
                   
              }
              
             
              console.log(bottleMiss , fruitMiss)
shoot();
         
         
         
             fill("pink");
             stroke("red");
             strokeWeight(5);
             textSize(25);
             text("Fruits Collected :  " + fruitCount,10,25);

             fill("pink");
             stroke("red");
             strokeWeight(5);
             textSize(25);
             text("Bottles Shooted :  " + bottleCount,10,55);

             fill("pink");
             stroke("red");
             strokeWeight(5);
             textSize(25);
             text("Bullets Remaining :  " + bulletCount,10,85);

             fill("pink");
             stroke("red");
             strokeWeight(5);
             textSize(25);
             text("Bottles Missed To shoot :   " + bottleMiss,width-350,25);

             fill("pink");
             stroke("red");
             strokeWeight(5);
             textSize(25);
             text("Fruits Missed To Collect :  " + fruitMiss,width-350,55);

             if(fruitCount === 10 && bulletCount === 0 && ak === 0){
                    var j = 225;
                    ak = 1;
                    j -= 1;
                    bulletCount += 5;
                    tint(225,j);
                    imageMode(CENTER);
                   // image(b,width/2,height/2,200,400);

             }
             if(ak === 1){
                    imageMode(CENTER)
                   // textMode(CENTER);
                   fill(0);
                   stroke(225);
                   strokeWeight(2);
                    text("You got",width/2 - 248,50);
                    image(b,width/2+50,40);
             }
             if( fruitCount === 15){
                    gameState = 5;
             }
             for(var i = 0;i < bottleGroup.length; i++){
              if(bottleGroup.get(i).isTouching(bulletGroup)){
                 bottleGroup.get(i).destroy();
                 bulletGroup.get(i).destroy();
                // playBgSound.pause();
                 bottleBreakSound.play();
                 bottleCount ++;
                 console.log("running")
                 
              }
       }


       
       }else if(gameState === 2){
              background(playingBackground)
              imageMode(CENTER);
              image(bulletsOver,width/2,height/2,500,200);
              gun.visible = false;
              basket.visible = false;
              bottleGroup.destroyEach();
              fruitGroup.destroyEach();
              fill("pink");
              stroke("red");
              strokeWeight(5);
              textSize(25);
              text("Fruits Collected :  " + fruitCount,10,25);
 
              fill("pink");
              stroke("red");
              strokeWeight(5);
              textSize(25);
              text("Bottles Shooted :  " + bottleCount,10,55);
 
              fill("pink");
              stroke("red");
              strokeWeight(5);
              textSize(25);
              text("Bullets Remaining :  " + bulletCount,10,85);
 
              fill("pink");
              stroke("red");
              strokeWeight(5);
              textSize(25);
              text("Bottles Missed To shoot :   " + bottleMiss,width-350,25);
 
              fill("pink");
              stroke("red");
              strokeWeight(5);
              textSize(25);
              text("Fruits Missed To Collect :  " + fruitMiss,width-350,55);

             
       } else if(gameState === 3){
              background(playingBackground)
              imageMode(CENTER);
              image(gameOverBottle,width/2,height/2,500,200);
              gun.visible = false;
              basket.visible = false;
              bottleGroup.destroyEach();
              fruitGroup.destroyEach();
              fill("pink");
              stroke("red");
              strokeWeight(5);
              textSize(25);
              text("Fruits Collected :  " + fruitCount,10,25);
 
              fill("pink");
              stroke("red");
              strokeWeight(5);
              textSize(25);
              text("Bottles Shooted :  " + bottleCount,10,55);
 
              fill("pink");
              stroke("red");
              strokeWeight(5);
              textSize(25);
              text("Bullets Remaining :  " + bulletCount,10,85);
 
              fill("pink");
              stroke("red");
              strokeWeight(5);
              textSize(25);
              text("Bottles Missed To shoot :   " + bottleMiss,width-350,25);
 
              fill("pink");
              stroke("red");
              strokeWeight(5);
              textSize(25);
              text("Fruits Missed To Collect :  " + fruitMiss,width-350,55);
             
       }else if(gameState === 4){
              background(playingBackground)
              imageMode(CENTER);
              image(gameOverFruits,width/2,height/2,500,500);
              gun.visible = false;
              basket.visible = false;
              bottleGroup.destroyEach();
              fruitGroup.destroyEach();
              fill("pink");
              stroke("red");
              strokeWeight(5);
              textSize(25);
              text("Fruits Collected :  " + fruitCount,10,25);
 
              fill("pink");
              stroke("red");
              strokeWeight(5);
              textSize(25);
              text("Bottles Shooted :  " + bottleCount,10,55);
 
              fill("pink");
              stroke("red");
              strokeWeight(5);
              textSize(25);
              text("Bullets Remaining :  " + bulletCount,10,85);
 
              fill("pink");
              stroke("red");
              strokeWeight(5);
              textSize(25);
              text("Bottles Missed To shoot :   " + bottleMiss,width-350,25);
 
              fill("pink");
              stroke("red");
              strokeWeight(5);
              textSize(25);
              text("Fruits Missed To Collect :  " + fruitMiss,width-350,55);
             
       }else if(gameState === 5){
              fruitsl();
              background(playingBackground);
              imageMode(CENTER);
              image(youWon,width/2,height/2,500,200);
       }
       drawSprites();
      

}

function spawnBottles(){
       if(frameCount%70 === 0){
              var r = Math.round(random(1,7));
              bottle = createSprite(10,0);
              bottle.x = o;
              bottle.velocityY = 7;
              bottle.lifetime = height/7;
              bottleGroup.add(bottle);
              
              if(r === 1){
                     bottle.addImage(bottle1Image);
                     bottle.scale = 0.15
              }
              else if(r === 2){
                     bottle.addImage(bottle2Image);
                     bottle.scale = 0.35;
              }
              else if (r === 3){
                     bottle.addImage(bottle3Image);
                     bottle.scale = 0.15;                                                                                                                                                                                                                                                                                                                     
              }
              else if(r === 4){
                     bottle.addImage(bottle4Image);
                     bottle.scale = 0.15;
              }
              else if(r === 5){
                     bottle.addImage(bottle5Image);
                     bottle.scale = 0.15;
              }
              else if(r === 6){
                     bottle.addImage(bottle6Image);
                     bottle.scale = 0.15;
              }
              else if(r === 7){
                     bottle.addImage(bottle7Image);
                     bottle.scale = 0.15;
       }


       /**switch (r){
        case 1: bottle.addImage(bottle1Image);
              break;
       case 2: bottle.addImage(bottle2Image);
              break;
       case 3: bottle.addImage(bottle3Image);
              break;
       case 4: bottle.addImage(bottle4Image);
              break;
       case 5: bottle.addImage(bottle5Image);
              break;
       case 6: bottle.addImage(bottle6Image);
              break;
       case 7: bottle.addImage(bottle7Image);
              break;
       }
       //  bottle.scale = 0.15;*/
       }

}
function spawnFruits(){
       if(frameCount%70 === 0){
              var r = Math.round(random(1,7));
              // var x = Math.round(random(20,width-150));
              fruits = createSprite(10,0);
            //  fruits.debug = true;
              fruits.x = o;
              fruits.velocityY = 7;
              fruits.lifetime = height/7;
              fruitGroup.add(fruits);
              

              /** switch (r){
               case 1: fruits.addImage(fruit1Image);
                     break;
              case 2: fruits.addImage(fruit2Image);
                     break;
              case 3: fruits.addImage(fruit3Image);
                     break;
              case 4: fruits.addImage(fruit4Image);
                     break;
              case 5: fruits.addImage(fruit5Image);
                     break;
              case 6: fruits.addImage(fruit6Image);
                     break;
              case 7: fruits.addImage(fruit7Image);
                     break;
              }
              fruits.scale = 0.5*/ 
              }
              if(r === 1){
                     fruits.addImage(fruit2Image);
                     fruits.scale = 0.5;
              }
              else if(r === 2){
                     fruits.addImage(fruit3Image);
                     fruits.scale = 0.5;
              }
              else if (r === 3){
                     fruits.addImage(fruit4Image);
                     fruits.scale = 0.13;
              }
              else if(r === 4){
                     fruits.addImage(fruit5Image);
                     fruits.scale = 0.5;
              }
              else if(r === 5){
                     fruits.addImage(fruit6Image);
                     fruits.scale = 0.5;
              }
              else if(r === 6){
                     fruits.addImage(fruit7Image);
                     fruits.scale = 0.5;
              }
              else if(r === 7){
                     fruits.addImage(fruit1Image);
                     fruits.scale = 0.083;
              } 
           
       
  }

  function bullets(){
         bullet = createSprite(10,10);
         bullet.x = gun.x;
         bullet.y = gun.y -35;
         bullet.addImage(bulletImage);
         bullet.scale = 0.08;
         bullet.velocityX = -30;
         bullet.lifetime = width/30;
         bulletGroup.add(bullet);
  }
  function shoot(){
       if(frameCount%70 === 0){
              bot = createSprite(0,0,1,1);
              bot.x = o;
              bot.visible = true;
              bot.velocityY = 5;
              bot.lifetime = height/5;
              botter.add(bot);
              console.log("running");
       }
  }
  function fruitsl(){
       if(frameCount%2 === 0){
              var r = Math.round(random(1,7));
              var w = Math.round(random(1,1280));
              console.log(width);
              // var x = Math.round(random(20,width-150));
              basket.visible = false;
              gun.visible = false;
              fruits = createSprite(-30,0);
            //  fruits.debug = true;
              fruits.x = w;
              fruits.velocityY = 5;
              fruits.lifetime = height/5;
              fruitGroup.add(fruits);
              

              /** switch (r){
               case 1: fruits.addImage(fruit1Image);
                     break;
              case 2: fruits.addImage(fruit2Image);
                     break;
              case 3: fruits.addImage(fruit3Image);
                     break;
              case 4: fruits.addImage(fruit4Image);
                     break;
              case 5: fruits.addImage(fruit5Image);
                     break;
              case 6: fruits.addImage(fruit6Image);
                     break;
              case 7: fruits.addImage(fruit7Image);
                     break;
              }
              fruits.scale = 0.5*/ 
              }
              if(r === 1){
                     fruits.addImage(fruit2Image);
                     fruits.scale = 0.7;
              }
              else if(r === 2){
                     fruits.addImage(fruit3Image);
                     fruits.scale = 0.7;
              }
              else if (r === 3){
                     fruits.addImage(fruit4Image);
                     fruits.scale = 0.19;
              }
              else if(r === 4){
                     fruits.addImage(fruit5Image);
                     fruits.scale = 0.7;
              }
              else if(r === 5){
                     fruits.addImage(fruit6Image);
                     fruits.scale = 0.7;
              }
              else if(r === 6){
                     fruits.addImage(fruit7Image);
                     fruits.scale = 0.7;
              }
              else if(r === 7){
                     fruits.addImage(fruit1Image);
                     fruits.scale = 0.13;
              } 
           
       
  }