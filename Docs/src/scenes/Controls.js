import Phaser from 'phaser'

export default class Controls extends Phaser.Scene
{
    constructor() {
        super({ key: 'Controls' });
      }

      create() {
        const startText = this.add.text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        'Use Left and Right arrows to play\n      Now to start the game,\n      Simply click SPACE',
        { fontSize: '32px', color: 'green' }
        );
        startText.setOrigin(0.5,0.5);
        
        this.input.keyboard.on('keydown-SPACE', this.startGame, this);
    }
    
    startGame() {
        this.scene.start('Game');
    }
}