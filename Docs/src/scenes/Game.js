import { Bounds, Collision } from "matter";
import Phaser, { Scene } from "phaser";
import { Pointer } from "scenes";
import { Color, Texture } from "three";

export default class Game extends Phaser.Scene {

  constructor(){
    super({key : 'Game'});
    this.score = 0;
    this.scoreText = null;
    this.gameOver = false;
    this.restartButton = null;
  }

    preload() {
      this.load.audio('brickBreakSound', 'assets\brick-dropped-on-other-bricks-14722.mp3');
    }
  create() {

    //To Display The Score
    this.scoreText = this.add.text(10, 100, 'Score: 0', { fontSize: '32px',color: 'lightblue' });

    // Set Boundary For The Game
    this.physics.world.setBounds(0,0,745,600,true,true,true,false);

    // To create the ball and its functions
    this.ball = this.add.circle(400, 300, 10, 0xffffff, 1);
    this.physics.add.existing(this.ball);
    this.ball.body.setBounce(1, 1);

    this.ball.body.setCollideWorldBounds(true, 1, 1);
    this.ball.body.setVelocity(160,160);

    // To create the slider and its functions
    this.slider = this.add.rectangle(400, 530, 100, 20, 0xfffff);
    this.physics.add.existing(this.slider);
    this.slider.body.setBounce(1, 1);
    this.slider.body.setImmovable(true);

    // Bricks
    const bricks = [];

    for (let i = 0; i < 33; i++) {
      const brick = this.add.rectangle(38 + 67 * (i % 11), 12 + 26 * Math.floor(i / 11), 60, 20, 0xff0000);
      this.physics.add.existing(brick);
      brick.body.setBounce(1, -1);
      brick.body.setImmovable(true);
      brick.body.setCollideWorldBounds(true);
      bricks.push(brick);
    }

    //This Helps To Hit Each Brick

    bricks.forEach(brick => {
      this.physics.add.collider(brick, this.ball, () => this.handleBrickCollision(this.ball, brick));
    });
    
    // This will help in hitting the ball to the slider
    this.physics.add.collider(this.slider, this.ball, pushBall, null, this);

    function create() {
      let canPush = true;
    }
    function pushBall(slider, ball) {
      if (ball.body.touching.up) {
        ball.setVelocityY(-250);
        canPush = false;
      }
    }

    // On GameOver Displays Text (Game Over)
    this.gameOverText = this.add.text(
      this.physics.world.bounds.width/2,
      this.physics.world.bounds.height/2,
      'Game Over',
      {
        fontSize: '64px',
        color : 'green',
        align : 'center'
      }
    );
    this.gameOverText.setOrigin(0.5);
    this.gameOverText.setVisible(false);
    
    // Input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Restart Game Button
    this.createRestartButton();

  }
    update()
    {
      const body = this.slider.body;

      if(this.cursors.left.isDown){
        this.slider.x -= 5;
      }
      else if(this.cursors.right.isDown)
      {
        this.slider.x += 5;
      }

      // Game Over
      if(this.ball.y > this.physics.world.bounds.height) {
        this.gameOver = true;
        this.handleGameOver();
      }
    }  

    handleGameOver(){
      this.gameOverText.setVisible(true);
      this.restartButton.setVisible(true);
    }

    // It gradually updates the score
    updateScoreText() {
      this.scoreText.setText('Score: ' + this.score);
    }

      // This code will help in hitting the brick and increase the score by 10 for each brick
    handleBrickCollision(ball, brick) {
      brick.destroy();
      this.score += 10; // Increase score
      this.updateScoreText(); // Update the score display
      ball.body.velocity.y *= 1.15; // Increase the speed of ball as the score increases
    }

    // This is the restart code to restart game
    createRestartButton() {
      this.restartButton = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2 + 50,
        'Restart Game',
        { fontSize: '24px', color: 'white' }
      );
      this.restartButton.setOrigin(0.5);
      this.restartButton.setInteractive();
  
      this.restartButton.on('pointerdown', () => {
        // Restart the scene
        this.scene.restart();
      });
  
      // Hide the button initially
      this.restartButton.setVisible(false);
    }
}
