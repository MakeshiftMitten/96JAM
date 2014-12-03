keys = [];

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60);
  };
})();

var game = new gameObject();
var clock = new gameClock(new Date().getTime() / 1000);
var tracer = new gameTracer();
var imgPlayer = new Image();
imgPlayer.src = 'astronaut.png';

var canvas = document.getElementById('c');
if (canvas.getContext) {
  var ctx = canvas.getContext('2d');
} else {
  alert('Canvas not supported');
}

window.addEventListener("keydown", function (e) {
  keys[e.keyCode] = true;
  if (e.keyCode == 77) game.debug = !game.debug;
  if (e.keyCode == 78) game.pause = !game.pause;
});

window.addEventListener("keyup", function (e) {
  keys[e.keyCode] = false;
});

canvas.addEventListener("mousedown", function (e) {
  var x = e.layerX - 2; // - canvas.position.X (-2 due to border);   
  var y = e.layerY - 2; // - canvas.position.Y;
  //tracer.log(x);
  game.mouse.down = true;
  game.mouse.x = x;
  game.mouse.y = y;
  for (var t = 0; t < buttons.length; t++) {
      if (buttons[t].isHit(x, y)) {
          game.setState(buttons[t].name);
          //console.log(buttons[t].name);
      }
  }

});

canvas.addEventListener("mouseup", function (e) {
  var x = e.layerX; // - canvas.position.X;   
  var y = e.layerY; // - canvas.position.Y;
  //tracer.log(x);
  game.mouse.down = false;
  game.mouse.x = x;
  game.mouse.y = y;

});

var numS = 35; // number of star layers; number of stars per level
var stars = [[],[],[]]; // master array for all star data;
for (var j = 0; j < 3; j++) {
    for (var i = 0; i < numS; i++) {
        stars[j].push([Math.random() * (canvas.width), Math.random() * (canvas.height), (j + 1) * 0.3 + 0.25, (j + 1) * 0.2]);
    } // [x,y,size,speed mult.]
}

var gameHeight = 20.0; //1 Meter = 6px
var gameWidth = 40.0;


var canvasHeight = canvas.height;
var canvasWidth = canvas.width;

var buttons = [];
//Top Level Buttons
var gameButton = new button("game", 260, 120, 30, "PL AY");
var settingsButton = new button("settings", 100, 0, 15, "SETTINGS");
var menuButton = new button("menu", 52, 0, 15, "MENU ");


//Shared Buttons
var nextButton = new button("next", 250, 0, 15, "NEXT LEVEL");

//Settings Buttons
var easyButton = new button("easy", 20, 80, 15, "E ASY");
var mediumButton = new button("medium", 180, 80, 15, "MEDIUM ");
var hardButton = new button("hard", 260, 80, 15, "H ARD");

//Game Select Buttons
//level

//Settings Buttons

//Auxiliary Buttons

//buttons.push(gameButton);

//Game Buttons
//buttons.push(

var playerList = [];

var wallList = [];
wallList.push(new wall(0, gameHeight-2, gameWidth/2, 1));
wallList.push(new wall(gameWidth/2 + 2, gameHeight-2, gameWidth/2, 1));
wallList.push(new wall(gameWidth/2 + 8, gameHeight-8, gameWidth/2, 1));

var bulletList = [];
bulletList.push(new bullet(12, gameHeight-4, .1, .1, -3, 0));

var turretList = [];
turretList.push(new turret(12, gameHeight - 4, 3));

var blockList = [];
var cargoList = [];

function wall(x, y, width, height) {
  this.posX = x;
  this.posY = y;
  this.width = width;
  this.height = height;

  this.draw = function () {
    ctx.fillStyle = '#00CCCC';  
    ctx.fillRect(toPx(this.posX-playerList[0].posX + game.playerOffset), toPx(this.posY), toPx(this.width), toPx(this.height));
  };

}

function block(x, y, width, height, landingPad) {
  this.posX = x; 
  this.posY = y; 
  this.width = 1; 
  this.height = 1;
  this.angle = 90;
  this.landingPad = landingPad;
  this.landingPad = typeof landingPad !== 'undefined' ? landingPad : "";

  this.draw = function () {
      var huehue = 5 + Math.floor((this.posY / canvasHeight * 10) % 5)
      ctx.fillStyle = '#' + huehue + huehue + huehue;
      if(this.landingPad == "end")
        ctx.fillStyle = '#00CCCC';  
      
      //ctx.fillStyle = '#999';

      ctx.fillRect(toPx(this.posX), toPx(this.posY), 20, 20);
      ctx.fillStyle = '#bbb';
      ctx.fillRect(toPx(this.posX), toPx(this.posY), 20, 2);
      ctx.fillRect(toPx(this.posX + 18/30), toPx(this.posY), 2, 20);
      //draw code here
  };


}
playerList.push(new playerCharacter(2, gameHeight / 2));


function drawGame() {
  d = clock.delta();
  physics(d);
  refresh();
  drawWalls();
  drawBullets();
  drawTurrets();

  //Draw players
  for (var y = 0; y < playerList.length; y++) {
      var player = playerList[y];

      ctx.save();

      ctx.fillStyle = '#8ED6FF';
      ctx.translate(toPx(game.playerOffset), toPx(player.posY) + player.getHeight() / 2);            
    

      console.log(toPx(player.posX));
      ctx.drawImage(imgPlayer, -player.getWidth() / 2, -player.getHeight() / 2, player.getWidth(), player.getHeight());
          if(player.hasCargo)
          {                      
            cargoList[0].draw();
          }

      ctx.restore();
  }
}

function drawMenu() {
  ctx.save();

  ctx.fillStyle = '#999';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = "white";
                ctx.save();
                ctx.font = "bold 40px Arial";
               ctx.fillText("TRAMPLE",canvasWidth/2-55, canvasHeight/2-40);
               ctx.fillStyle = "black";
               ctx.fillText("YOUR",canvasWidth/2-55, canvasHeight/2);
               ctx.fillStyle = "white";
               ctx.fillText("ANCESTORS",canvasWidth/2-55, canvasHeight/2+40);
                ctx.restore();

  ctx.restore();
}

function drawSettings() {
  // I dont thing save/restore is necessary here
  //ctx.save();
  ctx.fillStyle = '#444';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  //ctx.restore();             
}

function drawBlocks() {
  for (var u = 0; u < blockList.length; u++)
  blockList[u].draw();
}

function drawWalls() {
  for (var u = 0; u < wallList.length; u++)
    wallList[u].draw();
}

function drawBullets() {
  for (var u = 0; u < bulletList.length; u++)
    bulletList[u].draw();
}

function drawTurrets() {
  for (var u = 0; u < turretList.length; u++)
    turretList[u].draw();
}

function drawToolbar() {
  for (var x = 0; x < buttons.length; x++)
  buttons[x].draw();
}

//Draw Canvas 
(function updateCanvas() {

  if (game.pause) requestAnimFrame(updateCanvas);

  for (var x = 0; x < buttons.length; x++) {
      var cur = buttons[x];      
  }
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);



  ctx.clearRect(0, 0, canvasHeight, canvasWidth);
  for (var block in blockList) {
      var b = blockList[block];
      ctx.fillRect(toPx(b.posX), toPx(b.posY), toPx(b.width), toPx(b.height));

  }

  if (game.state == "game") drawGame();
  else if (game.state == "menu") drawMenu();
  else if (game.state == "settings") drawSettings();
  else {
      drawRect(0, 0, canvasWidth, canvasHeight);
  }
  drawToolbar();


  if (game.debug) {
      tracer.print();
  }
  tracer.clear();
  //ctx.fillRect(player.posX, player.posY, 50, 50);
  requestAnimFrame(updateCanvas);
})();

function gameClock(time) {
  this.oldTime = time;

  this.delta = function () {
      var newTime = new Date().getTime() / 1000;
      var delta = new Date().getTime() / 1000 - this.oldTime;
      this.oldTime = newTime;
      return delta;


  }
  this.time = function () {
      return new Date().getTime() / 1000;
  };
}

var levels = [];

function gameObject() {
  this.mouse = new mouse(0, 0);
  this.state = "game"; //menu, settings, game   
  this.pause = false;
  this.debug = true;
  this.lost = false;
  this.won = false;
  this.level = 1;

  this.playerOffset = 2;

  this.restore = function(){
    this.won = false;
    this.lost = false;
    
    this.state = "menu";
  }

  
  this.setState = function (newState) {
      switch (newState) {
          case "game":
              this.restore();
              this.state = "game";
              buttons.length = 0;              
              break;

          case "next":
              this.state = "game";
              this.level++;              
              importLevel(this.level);
              break;
          case "menu":

              this.state = "menu";
              buttons.length = 0;
              buttons.push(gameButton);
              break;
      }
  }


}

function mouse(x, y) {
  this.posX = x;
  this.posY = y;
  this.down = false;
}

function gameTracer() {
  this.logList = [];
  this.log = function (text) {
      this.logList.push(text);
  };

  this.clear = function () {
      this.logList.length = 0;
  };

  this.print = function () {
      ctx.save();
      ctx.fillStyle = "white";
      ctx.font = "bold 15px Arial";

      for (var x = 0; x < this.logList.length; x++) {
          ctx.fillText(this.logList[x], canvasWidth/2-100, x * 15 + 100);
      }
      ctx.restore();
  };
}

function settingsObject() {

  this.gravity = false;
  this.velocityDampening = false;
  this.rotationDampening = true;

}





function toPx(inMeters) {
  return inMeters * (canvasHeight / gameHeight);
}

function toMeters(inPx) {
  console.log(inPx + " " + canvasHeight + " " + gameHeight);
  return inPx / canvasHeight * gameHeight;
}

//Convert from degrees to radians
function toRad(deg) {
  return deg * Math.PI / 180;
}

function refresh(){
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = '#fff';
    for (var sj = 0; sj < 3; sj++) {
        for (var si = 0; si < numS; si++) {
            stars[sj][si] = getStars(stars[sj][si]); // updates stars (x,y)
        }
}}
function getStars(n) {
    var r = [(n[0] + canvasWidth + playerList[0].velX * n[3]) % canvasWidth, (n[1] + canvasHeight + playerList[0].velY * n[3]) % canvasHeight, n[2], n[3]]; // updates stars (x,y)
    ctx.fillRect(r[0], r[1], r[2], r[2]); // draws stars    
    
    return r;
}
function physics(d) {  

  for (var turretNum = 0; turretNum < turretList.length; turretNum++) {
      var turret = turretList[turretNum];      
      if(turret.fireCooldown <= 0){
        turret.fire();
      }
      turret.fireCooldown -= d;
  }


  for (var bulletNum = 0; bulletNum < bulletList.length; bulletNum++) {
      var bullet = bulletList[bulletNum];      

      bullet.posY -= bullet.velY * d;    
      bullet.posX += bullet.velX * d;
  }
  for (var playerNum = 0; playerNum < playerList.length; playerNum++) {
      var player = playerList[playerNum];
      player.velY -= 10*d;//  player.velA * d * .75;
      player.suicideCooldown -= d;
      var dAngle = 0;
      var dPower = 0;
      var dVelX = 0;
      var dVelY = 0;

      

      if (keys[37]) { //Left
        player.velX += -1;
      }
      else if (keys[39]) { //Right
        player.velX += 1;
      }
      else{
        player.velX *= .97*d;
      }

      if (Math.abs(player.velX) > 5){
        player.velX = (player.velX > 0) ? 5:-5;
      }



      if (keys[32]) { //Space
        if(player.onGround){
          player.velY = 5  
          player.onGround = false;          
        }
      }


      if (keys[75]) {
        player.suicide();
        console.log("DIE");
      }


      for (var p = 0; p < playerList.length; p++){
        for (var b = 0; b < bulletList.length; b++){
          if(playerHitsBullet(playerList[p], bulletList[b])){
            player.die();
          }
        }
        for (var w = 0; w < wallList.length; w++){
          if(playerHitsWall(playerList[p], wallList[w])){

          }
        }
      }



      for (var bnum in blockList) {
          var blockVList = [];
          var block = blockList[bnum];
          //player.velX = -player.velX;
          //player.velY = -player.velY;
          //player.velA = -player.velA;
      }
          player.posY -= player.velY * d;    
          player.posX += player.velX * d;
          if(player.posY + player.height/2 > gameHeight-player.height/2){
            player.die();
          }
    }


      


  }

 
