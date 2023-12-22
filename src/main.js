import Phaser, { Scene, Scenes } from 'phaser'

import Game from './scenes/Game'

import StartScreen from './scenes/StartScreen'

import Controls from './scenes/Controls';

const config = {
    width: 745,
    height: 600,
    type: Phaser.AUTO,
    scene : [StartScreen,Controls,Game],
    physics:{
        default:'arcade',
        arcade: {
            gravity:{y:0},
            debug: false
        }
    }
};

const game = new Phaser.Game(config)

this.scene.add('StartScreen', StartScreen);
this.scene.start('StartScreen');
this.scene.add('Controls',Controls);
this.scene.start('Controls');
this.scene.add('Game',Game);
this.scene.start('Game');


