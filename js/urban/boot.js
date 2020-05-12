//window.onload = start;

document.addEventListener("deviceready", start, false);

function start(){ 
    WIDTH = 850; 
    HEIGHT = 850; 

    game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, "game");    
      
    game.state.add("Boot", boot);
    game.state.add("Preloader", preloader);
    game.state.add("Game", gameMain);
    
    game.state.start("Boot");  
}

var boot = function(game){};
 
boot.prototype = {
    create: function(){
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        if (!this.game.device.desktop){
            this.scale.maxWidth = window.innerWidth * window.devicePixelRatio;
            this.scale.maxHeight = window.innerHeight * window.devicePixelRatio;
            
            this.scale.forceOrientation(true, false);
        }
        
        else{
            this.scale.maxWidth = window.innerWidth * window.devicePixelRatio;
            this.scale.maxHeight = window.innerHeight * window.devicePixelRatio;	
        }

        game.state.start('Preloader');
    }
};
