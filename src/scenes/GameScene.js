

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    preload() {
        this.load.image('cat', 'assets/characters/cat.png'); // Hintergrund
        this.load.image('rose', 'assets/objects/rose.png');
        this.load.image('virus', 'assets/objects/virusCute.png');
        this.load.image('grass', 'assets/bg/grass.png');


        this.load.spritesheet('virusCute', 'assets/spritesheets/Virus.png', {
            frameWidth: 120,
            frameHeight: 150
        });

        //audio
        this.load.audio('audio_ahh', 'assets/sounds/ahhhh.mp3');
        this.load.audio('audio_wow', 'assets/sounds/wow.mp3');
        this.load.audio('audio_coin', 'assets/sounds/coin.mp3');
        this.load.audio('audio_pokemon', 'assets/sounds/pokemon.mp3');
    }

    create() {
        this.addInputKeys();
        this.addSounds();
        this.addBackground();
        this.createPlayer();
        this.spawnObjects();
    }

    update() {

        this.managePlayerMovements();

    }

    addInputKeys(){
        // Input Events
        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    addSounds(){
        //sounds
        this.wowAudio = this.sound.add("audio_wow");
        this.ahhAudio = this.sound.add("audio_ahh");
        this.coinAudio = this.sound.add("audio_coin");
     
 
        this.bgmusic = this.sound.add("audio_pokemon");
 
        var musicConfig = {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.bgmusic.play(musicConfig);
    }

    addBackground(){
        this.grass = this.add.image(0,0,'grass');
        this.grass.setOrigin(0,0);
    }

    createPlayer() {
        this.player = this.physics.add.image(400, 500, 'cat');
        this.player.setCollideWorldBounds(true);
        this.player.roses = 0;
        this.wowAudio.play();
    }

    //input listener for playermovements
    managePlayerMovements() {
        
        if (this.a.isDown) {
            this.player.setVelocityX(-gameSettings.playerSpeed);
        }else if(!this.d.isDown){
            this.player.setVelocityX(0);
        }
        if (this.d.isDown) {
            this.player.setVelocityX(gameSettings.playerSpeed);
        }else if(!this.a.isDown){
            this.player.setVelocityX(0);
        }
        if (this.w.isDown) {
            this.player.setVelocityY(-gameSettings.playerSpeed);
        }else if(!this.s.isDown){
            this.player.setVelocityY(0);
        }
        if (this.s.isDown) {
            this.player.setVelocityY(gameSettings.playerSpeed);
        }
        else if(!this.w.isDown){
            this.player.setVelocityY(0);
        }
    }

    moveRoses(rose){
        rose.y += gameSettings.roseSpeed
    }

    moveVirus(virus){
        virus.y += gameSettings.virusSpeed
    }
 
    spawnObjects() {

        var random = Phaser.Math.Between(1,5);
        if (random < 4){
            this.spawnRose();
        } else{
            this.spawnVirus();
        }

    }

    spawnRose() {
        var randomX= Phaser.Math.Between(1,config.width);
        this.rose = this.physics.add.image(randomX, 0, 'rose');
        this.physics.add.overlap(this.rose, this.player, this.collectRose(), null, this);
       
    }

    spawnVirus() {
        var randomX= Phaser.Math.Between(1,config.width);
        this.virus = this.physics.add.image(randomX, 0, 'virus');
        this.physics.add.overlap(this.virus, this.player, this.hitVirus(this.rose), null, this);
    }

    collectRose(){
        this.coinAudio.play();
        this.player.roses +=1
        if (this.player.roses= 10){
            this.switchScene();
        }
        this.destroyRose();
    }

    destroyRose(){
        this.rose.destroy();
        this.spawnObjects();
    }

    hitVirus(){
        this.ahhAudio.play();
        this.destroyVirus();
    }

    destroyVirus(){
        this.virus.destroy();
        this.spawnObjects();
    }

    switchScene(){
        this.bgmusic.stop(); 
        this.scene.start("MenuScene");
    }
}



