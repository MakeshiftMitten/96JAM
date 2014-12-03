function button(name, x, y, size, text) {
  this.name = name;
  this.posX = x - 5;
  this.posY = y;
  this.content = text;
  this.text = this.content;
  this.size = size; //fontsize
  this.width = this.text.length * this.size / 1.8;
  this.height = this.size + 3;
  this.down = false;

  this.draw = function () {
      ctx.save();

      ctx.font = "" + this.size + "px Impact";
      ctx.fillStyle = "#aaa";
      ctx.fillRect(this.posX, this.posY, this.width, this.height);

      ctx.fillStyle = "Black";
      ctx.fillText(this.text, this.posX + 11, this.posY + this.size);
      ctx.fillStyle = 'rgba(256, 256, 256, .4)';
      ctx.fillRect(this.posX + 2, this.posY + 1, this.width - 4, this.size - 8);
      ctx.fillStyle = 'rgba(0,0,0,.3)';
      ctx.fillRect(this.posX + 2, this.posY + 13, this.width - 4, this.size - 11);

      ctx.restore();
  };

  this.isHit = function (clickX, clickY) {
      if (clickX > this.posX && clickX < (this.posX + this.width) && clickY > this.posY && clickY < (this.posY + this.height)) {
          //this.text = "STOP HITTING ME";
          return true;
      } else {
          //this.text = "MISSED ME";  
          return false;
      }


  }

}