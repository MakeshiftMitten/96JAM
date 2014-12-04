function playerCharacter(x, y) {
  this.width = .5;//.47;
  this.height = .9;//.73;
  this.posX = x;
  this.posY = y;
  this.spawnX = x;
  this.spawnY = y;
  this.posA = 0;
  this.velX = 0;
  this.velY = 0;
  this.velA = 0;
  this.onGround = false;
  this.suicideCooldown = 0;
  this.suicideCooldownMax = 3;
  this.platformCooldown = 0;
  this.platformCooldownMax = 3;
  this.lives = 10;
  this.platforms = 2;

  //this.pos
  this.getWidth = function () {
      return toPx(this.width);
  };

  this.getHeight = function () {
      return toPx(this.height);
  };

  this.suicide = function () {
    if(this.suicideCooldown <= 0){
      this.die();  
      this.lives -= 1;
    }
    

  }
  this.die = function () {
      wallList.push(new wall(this.posX-this.width/2, this.posY+this.height/4*3, 1, .7));
      this.suicideCooldown = this.suicideCooldownMax;
      if(this.lives > 1){
        this.posX = game.score - 30;
        if(this.posX < 0) this.posX = 2;
        this.posY = 1;
        this.velX = 0;
        this.velY = 0;
        bulletList = [];
        this.lives -= 1;
      }
  };

  this.platform = function() {
    wallList.push(new wall(this.posX-this.width/2, this.posY+this.height/4*3, 1, .7));
    this.platformCooldown = this.platformCooldownMax;
    this.platforms -= 1;
  }

}