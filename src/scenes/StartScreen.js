import Phaser from 'phaser'

export default class StartScreen extends Phaser.Scene {

    constructor() {
      super({ key: 'StartScreen' });
    }
  
    create() {
        const startText = this.add.text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        'Press SPACE to move to controls',
        { fontSize: '32px', color: 'orange' }
        );
        startText.setOrigin(0.5);
        
        this.input.keyboard.on('keydown-SPACE', this.startControls, this);
    }
    
    startControls() {
        this.scene.start('Controls');
    }
}