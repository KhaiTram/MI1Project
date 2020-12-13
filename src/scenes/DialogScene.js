class MenuScene extends Phaser.Scene{
    constructor(){
        super("MenuScene");
    }

    preload(){
        this.load.image('playBtn', 'assets/characters/Cat.png');
    }

    create(){
        let startBtn = this.add.image(500, 350, "playBtn");
        startBtn.setInteractive({cursor : 'pointer'}); // ändere das Cursor Symbol
        startBtn.on("pointerdown", ()=>{ // bei Click auf Element, führe diese Funktion aus
            this.scene.start("GameScene");
        });
    }
}