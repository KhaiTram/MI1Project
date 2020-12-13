const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 620,
    physics: {
        default: 'arcade',
        arcade: {
            tileBias: 32,
            debug: false
        }
    },
    scene: [
        MenuScene,
        GameScene,
      ]
};

var gameSettings = {
    playerSpeed: 200,
    roseSpeed: 100,
    virusSpeed: 200
} 

var game = new Phaser.Game(config);