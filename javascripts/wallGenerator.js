function wallGenerator() {  

	this.lastGenerated = 40;

	this.generate = function(increment, difficulty){		
		wallList.push(new wall(this.lastGenerated, gameHeight/4*3, 10,  1));				
		console.log(increment);
		for(var block = 0; block < increment/8; block++){
			for(var c = 0; c < 5; c++){
				var x = Math.floor((Math.random() * increment) + 1) + this.lastGenerated;
				var y = Math.floor((Math.random() * (gameHeight - 5) + 5));
				var length = Math.floor((Math.random() * 5) + 5);
				var height = Math.floor((Math.random() * 1) + 1);		
				var w = new wall(x, y, length, height);
				
				
				console.log(w);
				wallList.push(w);
				var coinflip = Math.floor((Math.random() * 3) + 1) ;				
				if(coinflip =1) {
					var tOffset = Math.floor((Math.random() * length) + 1) ;
					var tShotspeed = Math.floor((Math.random() * 4) + 1) ;
					var tCooldown = 8/tShotspeed;
					var tLifetime = (Math.random() * 2) + 1 ;
					var t = new turret(x+tOffset, y-1, tCooldown, tShotspeed, tLifetime);		
					console.log(t);
					turretList.push(t);
				}
			}			
		}

		this.lastGenerated += increment;
	}
}