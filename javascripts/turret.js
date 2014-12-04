function turret(x, y, cooldown, shotspeed, lifetime) {
  this.width = 1;//.47;
  this.height = 1;//.73;
  this.posX = x;
  this.posY = y;
  this.shotspeed = shotspeed; 
  this.fireCooldown = cooldown;
  this.fireCooldownMax = cooldown;  
  this.lifetime = lifetime;


  this.fire = function () {
      bulletList.push(new bullet(this.posX, this.posY+this.height/2, .2, .2, -this.shotspeed, 0, lifetime));
      this.fireCooldown = this.fireCooldownMax;
  };

  this.draw = function () {
    ctx.fillStyle = '#FFFFFF';  
    ctx.fillRect(toPx(this.posX-playerList[0].posX + game.playerOffset), toPx(this.posY), toPx(this.width), toPx(this.height));
  };

}