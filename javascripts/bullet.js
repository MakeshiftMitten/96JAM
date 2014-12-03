function bullet(x, y, width, height, velX, velY) {
  this.posX = x;
  this.posY = y;
  this.velX = velX;
  this.velY = velY;
  this.width = width;
  this.height = height;

  this.draw = function () {
    ctx.fillStyle = '#00CCCC';  
    ctx.fillRect(toPx(this.posX-playerList[0].posX + game.playerOffset), toPx(this.posY), toPx(this.width), toPx(this.height));
  };

}