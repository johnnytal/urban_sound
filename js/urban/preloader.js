var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
    	progressTxt = this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '0%',{
             font: '25px', fill: 'white', fontWeight: 'normal', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);
  
        loadingTxt = this.add.text(this.game.world.centerX - 37,  this.game.world.centerY - 150, "Loading...", {
            font: '18px', fill: 'lightgrey', fontWeight: 'normal', align: 'center'
        });
                
        this.game.load.audio("friends", "assets/urban/audio/friends.mp3");
        this.game.load.audio("nature", "assets/urban/audio/nature.mp3");
        this.game.load.audio("road", "assets/urban/audio/road.mp3");
        this.game.load.audio("sea", "assets/urban/audio/sea.mp3");
        this.game.load.audio("shopping", "assets/urban/audio/shopping.mp3");
                
        this.game.load.image("kid", "assets/urban/images/kid.png");
        this.game.load.image("arrow", "assets/urban/images/arrow.png");
  
        this.game.load.image("nature", "assets/urban/images/nature.png");
        this.game.load.image("friends", "assets/urban/images/friends.png");
        this.game.load.image("sea", "assets/urban/images/sea.png");
        this.game.load.image("shopping", "assets/urban/images/shopping.png");
        this.game.load.image("road", "assets/urban/images/road.png");
    },
    
    create: function(){
        this.game.state.start("Game"); 
    }
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text = progress+"%";
};