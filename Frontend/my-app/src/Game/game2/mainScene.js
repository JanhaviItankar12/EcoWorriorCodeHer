import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.score = 0;
    this.wasteMeter = 0;
    this.appliances = [];
    this.gameOverShown = false;
    this.gameWon = false;
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
    this.scoreText = this.add.text(20, 20, "Score: 0", {
      fontSize: "20px",
      fill: "#fff",
    });
    
    this.wasteText = this.add.text(20, 50, "Waste: 0%", {
      fontSize: "20px",
      fill: "#f00",
    });

    // Player setup - fully draggable
    this.player = this.add.sprite(400, 300, "player").setScale(0.2);
    
    // Make player draggable
    this.player.setInteractive({ draggable: true });
    
    // Drag handling
    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
      
      // Check for nearby lights while dragging
      this.checkLightProximity();
    });

    // Create lights
    this.createLights(10);

    // Instructions
    this.add.text(400, 560, "Drag the player to turn off lights", {
      fontSize: "16px",
      fill: "#ffffff",
    }).setOrigin(0.5);
  }

  createLights(numLights) {
    const margin = 80;
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
        
        if (distance < 50) {
          // Turn off the light
          light.setTexture("lightOff");
          light.setData("on", false);
          light.setData("touched", true);
          
          // Play sound and update score
          this.sound.play("hitSound");
          this.score += 10;
          this.scoreText.setText(`Score: ${this.score}`);
          
          // Optional visual effect
          this.tweens.add({
            targets: light,
            alpha: 0.8,
            duration: 300,
            yoyo: true
          });
        }
      }
    });
  }

  update() {
    // Calculate waste from remaining active lights
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
      this.add.text(400, 300, "Game Over! Too much energy wasted!", {
        fontSize: "24px",
        fill: "#fff",
      }).setOrigin(0.5);
      this.gameOverShown = true;
    }
    
    // Win condition
    const allLightsOff = this.appliances.every(light => !light.getData("on"));
    if (allLightsOff && !this.gameWon) {
      this.add.text(400, 250, "You Win! All lights turned off!", {
        fontSize: "24px",
        fill: "#0f0",
      }).setOrigin(0.5);
      this.gameWon = true;
    }
  }
}
