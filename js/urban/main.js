var gameMain = function(game){
	overall_accel = 0;

	step_ended = true;
	
	STEP_ACCEL = 12.3;
	STEP_TIME = 550;

	head = 0;
	add_y = 0;
	add_x = 0;

	STEP_VALUE = WIDTH / 10; // x steps is the width and height of the room
	
	objectsKeys = ['shopping', 'nature', 'sea', 'friends', 'road'];
	objects = [];
};

gameMain.prototype = {
    create: function(){
		initPlugIns();	  	
    	loadAudio();
    	
    	game.stage.backgroundColor = '#f7f7f7';

		var graphics = game.add.graphics(0, 0);
    	graphics.lineStyle(2, 0xffd900, 1);
	    graphics.beginFill(0xadd8e6, 0.7);
	    graphics.drawCircle(this.world.centerX, this.world.centerY, 435);
	    
    	kid = game.add.sprite(this.world.centerX, this.world.centerY,  'kid');
    	kid.anchor.set(.5, .5);
	    kid.inputEnabled = true;
    	kid.events.onInputDown.add(calibrate_head, this);
    	
    	arrow = kid.addChild(game.make.sprite(0, -30, 'arrow'));
    	arrow.scale.set(.75, .75);
    	arrow.anchor.set(.5, 1);
    	arrow.angle = head;

    	for(n = 0; n < objectsKeys.length; n++){
    		objects[n] = game.add.sprite(50 + n * 138, 200, objectsKeys[n]);
    		objects[n].anchor.set(.5, .5);
    		
    		var radius = 60;
    		var distance = 5;
    		var angle = 360 / 5 * n;
    		
		    objects[n].x = kid.x + radius * Math.cos(-angle*Math.PI/180) * distance;
    	    objects[n].y = kid.y + radius * Math.sin(-angle*Math.PI/180) * distance;

    		game.physics.enable(objects[n], Phaser.Physics.ARCADE);
    		objects[n].scale.set(0.45, 0.45);
    		objects[n].inputEnabled = true;
        	objects[n].input.enableDrag(false, true);
    	}
    	
    	game.physics.enable(kid, Phaser.Physics.ARCADE);
  		game.physics.enable(arrow, Phaser.Physics.ARCADE);
  		
    	debugAccel = game.add.text(75, 25, "Accel: " + overall_accel, {font: '42px', fill: 'black'});
    	debugAngle = game.add.text(600, 25, "Angle: " + head, {font: '42px', fill: 'purple'});
   },
   update: function(){
    	for(n = 0; n < objects.length; n++){
			checkDistance(kid, objects[n]);    
    	}   
    	
    	if (game.input.activePointer.isDown){	
			for (s = 0; s < sounds.length; s++){
				if (!sounds[s].isPlaying){
					sounds[s].play();
				}
			}
    	}
    	
    	if (kid.x > WIDTH) kid.x = WIDTH;
    	else if (kid.x < 0) kid.x = 0;
    	if (kid.y > HEIGHT) kid.y = HEIGHT;
    	else if (kid.y < 0) kid.y = 0;
   }
};

function checkDistance(_kid, _object){
	var dist = Math.hypot(_kid.x - _object.x, _kid.y - _object.y);
	var centerDist = Math.hypot(game.world.centerX - _object.x, game.world.centerY - _object.y);
	
	if (centerDist < 285){
		_object.input.draggable = false;
		
		if (_object.x <= game.world.centerX) _object.x -= 2;
		else{ _object.x += 2; }
		
		if (_object.y <= game.world.centerY) _object.y -= 2;
		else{ _object.y += 2; }
	}
	else{
		_object.input.draggable = true;
	}
	
	sounds[objects.indexOf(_object)].volume = 1 - dist / 375;
	if (sounds[objects.indexOf(_object)].volume < 0) sounds[objects.indexOf(_object)].volume = 0;	
}

function readAccel(event){
	overall_accel = Math.abs(
		event.accelerationIncludingGravity.z + (event.accelerationIncludingGravity.y / 1.65)
	);
	
	debugAccel.text = "Accel: " + Math.round(overall_accel * 10) / 10;
	
	if (step_ended && overall_accel > STEP_ACCEL){
		step_ended = false;
		
		kid.x += add_x;
		kid.y += add_y;
		
		setTimeout(function(){
			step_ended = true;
		}, STEP_TIME);
	}
}

function readOrientation(event) {
    head = Math.round(360 - event.alpha);
    
    arrow.angle = head;
    
    debugAngle.text = "Angle: " + head;

	add_y = Math.cos(head * (Math.PI / 180)) * -STEP_VALUE; // cos of radians times step value
	add_x = Math.sin(head * (Math.PI / 180)) * STEP_VALUE;
}

function calibrate_head(){
	head *= -1;
}

function initPlugIns(){
	try{
		window.addEventListener('devicemotion', readAccel);
	}catch(e){}
	
	try{
		window.addEventListener("deviceorientation", readOrientation, true);
	}catch(e){}

    try{
    	window.plugins.insomnia.keepAwake();
	} catch(e){}
}

function loadAudio(){
	sfxShopping = game.add.audio('shopping',0.1 ,true);
	sfxSea = game.add.audio('sea',0.1 ,true);
	sfxRoad = game.add.audio('road',0.1 ,true);
	sfxFriends = game.add.audio('friends',0.1 ,true);
	sfxNature = game.add.audio('nature',0.1 ,true);
	
	sounds = [sfxShopping, sfxNature, sfxSea, sfxFriends, sfxRoad];
}
