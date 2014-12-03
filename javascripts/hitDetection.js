
  function playerHitsWall(player, wall){

    //Hit from Top
    if(player.posY+player.height > wall.posY && !(player.posY + player.height > wall.posY + wall.height/4)){
      if(player.posX+player.width/2 >= wall.posX && player.posX - player.width/2 <= (wall.posX + wall.width)){        
        player.posY = wall.posY - toMeters(player.getHeight());
        player.onGround = true;
        player.velY = 0;
        console.log("hit Y!");
        return true;
      }      
    }

    //Hit from Bottom
    if (player.posY < wall.posY + wall.height && !(player.posY < wall.posY + wall.height/4*3)){
      if(player.posX+player.width/2 >= wall.posX && player.posX - player.width/2 <= (wall.posX + wall.width)){
        player.posY = wall.posY + wall.height;
        player.velY = 0;
        return true;
      }
    }

    //Hit from Left
    if(player.posX + player.width/2 > wall.posX && !(player.posX + player.width/2 > wall.posX + .2)){
      if((player.posY >= wall.posY && player.posY <= wall.posY + wall.height) //top of player in between wall vertices
        ||(player.posY + player.height >= wall.posY && player.posY + player.height <= wall.posY + wall.height)//bottom of player in between wall vertices     {
        ||(player.posY <= wall.posY && player.posY + player.height >= wall.posY + wall.height)){ //platform is skinnier than player and hits the trunk
          player.posX = wall.posX - player.width/2; //-toMeters(4);
          console.log("hit X!");
          return 0;
      }    
    }
    

    //Hit from Right
    if(player.posX - player.width/2 < wall.posX+wall.width && !(player.posX - player.width/2 < wall.posX + wall.width - .2)){
      if((player.posY >= wall.posY && player.posY <= wall.posY + wall.height) //top of player in between wall vertices
        ||(player.posY + player.height >= wall.posY && player.posY + player.height <= wall.posY + wall.height)//bottom of player in between wall vertices     {
        ||(player.posY <= wall.posY && player.posY + player.height >= wall.posY + wall.height)){ //platform is skinnier than player and hits the trunk
          player.posX = wall.posX + wall.width + player.width/2; //-toMeters(4);
          console.log("hit X!");
     
      }    
    }
    return false;
  }

  function playerHitsBullet(player, bullet){
    var bulletCenX = bullet.posX + bullet.width/2;
    var bulletCenY = bullet.posY + bullet.height/2;
      if (bulletCenX > player.posX - player.width/2 && bulletCenX < player.posX + player.width/2
      && bulletCenY > player.posY && bulletCenY < player.posY + player.height){
      return true;
    }

  }