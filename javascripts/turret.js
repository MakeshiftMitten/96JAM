function turret(x, y, cooldown) {
  this.width = 1;//.47;
  this.height = 1;//.73;
  this.posX = x;
  this.posY = y;  
  this.fireCooldown = cooldown;
  this.fireCooldownMax = cooldown;  


  this.fire = function () {
      bulletList.push(new bullet(this.posX, this.posY+this.height/2, .1, .1, -3, 0));
      this.fireCooldown = this.fireCooldownMax;
  };

  this.draw = function () {
    ctx.fillStyle = '#FFFFFF';  
    ctx.fillRect(toPx(this.posX-playerList[0].posX + game.playerOffset), toPx(this.posY), toPx(this.width), toPx(this.height));
  };

}