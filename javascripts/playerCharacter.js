function playerCharacter(x, y) {
  this.width = .5;//.47;
  this.height = 1;//.73;
  this.posX = x;
  this.posY = y;
  this.spawnX = x;
  this.spawnY = y;
  this.posA = 0;
  this.velX = 0;
  this.velY = 0;
  this.velA = 0;
  this.onGround = false;

  //this.pos
  this.getWidth = function () {
      return toPx(this.width);
  };

  this.getHeight = function () {
      return toPx(this.height);
  };

  this.die = function () {
      wallList.push(new wall(this.posX, this.posY, this.height, this.width));
      this.posX = this.spawnX;
      this.posY = this.spawnY;
  };

}