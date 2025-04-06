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

    // Score and Waste Text
    this.scoreText = this.add.text(20, 20, "Score: 0", {
      fontSize: "20px",
      fill: "#fff",
    });
    this.wasteText = this.add.text(20, 50, "Waste: 0%", {
      fontSize: "20px",
      fill: "#f00",
    });

    // Add player without physics
   this.player = this.physics.add.sprite(400, 300, "player").setScale(0.2).setInteractive();
    this.input.setDraggable(this.player);

    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    // Create lights with physics
    this.createLights(10);

    // Set up overlap detection
    this.physics.add.overlap(this.player, this.appliances, this.handleOverlap, null, this);

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

      const light = this.physics.add.sprite(x, y, "lightOn").setScale(0.15).setData({
        on: true,
        wasteRate: 0.2,
      });

      this.appliances.push(light);
    }
  }

  handleOverlap(player, light) {
    if (light.getData("on")) {
      light.setTexture("lightOff");
      light.setData("on", false);
      this.sound.play("hitSound");
      this.score += 10;
      this.scoreText.setText(`Score: ${this.score}`);
    }
  }

  update() {
    let wasteIncrement = 0;
    this.appliances.forEach((light) => {
      if (light.getData("on")) {
        wasteIncrement += light.getData("wasteRate");
      }
    });

    this.wasteMeter += wasteIncrement * 0.01;
    this.wasteText.setText(`Waste: ${Math.floor(this.wasteMeter)}%`);

    if (this.wasteMeter >= 100 && !this.gameOverShown) {
      this.scene.pause();
      this.add.text(400, 300, "Game Over! Too much energy wasted!", {
        fontSize: "24px",
        fill: "#fff",
      }).setOrigin(0.5);
      this.gameOverShown = true;
    }

    const allLightsOff = this.appliances.every((light) => !light.getData("on"));
    if (allLightsOff && !this.gameWon) {
      this.add.text(400, 250, "You Win! All lights turned off!", {
        fontSize: "24px",
        fill: "#0f0",
      }).setOrigin(0.5);
      this.gameWon = true;
    }
  }
}
