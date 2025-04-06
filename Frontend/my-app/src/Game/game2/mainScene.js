import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.score = 0;
    this.wasteMeter = 0;
    this.appliances = [];
    this.gameOverShown = false;
    this.gameWon = false;
    this.lightsTurnedOff = 0;
    this.totalLights = 20;
  }

  preload() {
    this.load.image("room", "/assets/game2/room.jpeg");
    this.load.image("lightOn", "/assets/game2/light-bulb-on.png");
    this.load.image("lightOff", "/assets/game2/light-bulb-off.png");
    this.load.image("player", "/assets/game2/player.png");
    this.load.audio("hitSound", "/assets/game2/hit.mp3");
  }

  create() {
    // Background
    this.add.image(400, 300, "room");

    // Score and waste displays
    this.scoreText = this.add.text(20, 20, `Score: ${this.score}`, {  // Display initial score
      fontSize: "24px",
      fill: "#fff",
      fontStyle: "bold"
    });
    
    this.wasteText = this.add.text(20, 50, "Waste: 0%", {
      fontSize: "24px",
      fill: "#f00",
      fontStyle: "bold"
    });

    // Player setup
    this.player = this.add.sprite(400, 300, "player")
      .setScale(0.2)
      .setInteractive({ draggable: true });
    
    // Drag handling
    this.input.on('dragstart', () => {
      this.player.setScale(0.22);
    });

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.setPosition(dragX, dragY);
      this.checkLightProximity();
    });

    this.input.on('dragend', () => {
      this.player.setScale(0.2);
    });

    // Create lights
    this.createLights(this.totalLights);

    // Instructions
    this.add.text(400, 560, "Drag the player to turn off lights", {
      fontSize: "20px",
      fill: "#ffffff",
      backgroundColor: "#000000",
      padding: { x: 10, y: 5 }
    }).setOrigin(0.5);

    // Light counter
    this.lightsText = this.add.text(20, 80, `Lights: ${this.lightsTurnedOff}/${this.totalLights}`, {
      fontSize: "20px",
      fill: "#ffff00"
    });
  }

  createLights(numLights) {
    const margin = 60;
    const maxX = 800 - margin;
    const maxY = 600 - margin;
    
    for (let i = 0; i < numLights; i++) {
      const x = Phaser.Math.Between(margin, maxX);
      const y = Phaser.Math.Between(margin, maxY);
      
      const light = this.add.sprite(x, y, "lightOn")
        .setScale(0.15)
        .setData({
          on: true,
          wasteRate: 0.2,
          id: i,
          touched: false
        });
      
      this.appliances.push(light);
    }
  }

  checkLightProximity() {
    this.appliances.forEach((light) => {
      if (light.getData("on") && !light.getData("touched")) {
        const distance = Phaser.Math.Distance.Between(
          this.player.x,
          this.player.y,
          light.x,
          light.y
        );
        
        if (distance < 60) {
          // Turn off the light
          light.setTexture("lightOff");
          light.setData("on", false);
          light.setData("touched", true);
          
          // Update game state
          this.score += 10;
          this.lightsTurnedOff++;
          
          // Update UI - CRITICAL FIX: Use setText to update the score display
          this.scoreText.setText(`Score: ${this.score}`);
          this.lightsText.setText(`Lights: ${this.lightsTurnedOff}/${this.totalLights}`);
          
          // Play sound
          this.sound.play("hitSound");
          
          // Visual effect
          this.tweens.add({
            targets: light,
            scale: 0.18,
            duration: 200,
            yoyo: true,
            ease: "Sine.easeOut"
          });
        }
      }
    });
  }

  update() {
    // Calculate waste
    let wasteIncrement = 0;
    this.appliances.forEach((light) => {
      if (light.getData("on")) {
        wasteIncrement += light.getData("wasteRate");
      }
    });
    
    this.wasteMeter += wasteIncrement * 0.01;
    this.wasteText.setText(`Waste: ${Math.floor(this.wasteMeter)}%`);
    
    // Game over check
    if (this.wasteMeter >= 100 && !this.gameOverShown) {
      this.scene.pause();
      this.add.text(400, 300, `Game Over! Final Score: ${this.score}`, {
        fontSize: "32px",
        fill: "#ff0000",
        backgroundColor: "#000000",
        padding: { x: 20, y: 10 }
      }).setOrigin(0.5);
      this.gameOverShown = true;
    }
    
    // Win condition
    if (this.lightsTurnedOff >= this.totalLights && !this.gameWon) {
      this.add.text(400, 250, `You Win! Final Score: ${this.score}`, {
        fontSize: "32px",
        fill: "#00ff00",
        backgroundColor: "#000000",
        padding: { x: 20, y: 10 }
      }).setOrigin(0.5);
      this.gameWon = true;
    }
  }
}