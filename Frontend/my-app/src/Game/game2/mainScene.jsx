// src/game/mainScene.js
export default class MainScene extends Phaser.Scene {
    constructor() {
      super("MainScene");
      this.score = 0;
      this.wasteMeter = 0;
      this.appliances = [];
    }
  
    preload() {
      this.load.image("room", "/assets/game2/room.jpeg");
      this.load.image("lightOn", "/assets/game2/light-bulb-on.png");
      this.load.image("lightOff", "/assets/game2/light-bulb-off.png");
      this.load.image("player", "/assets/game2/player.png", 
       );
    }
  
    create() {
        this.add.image(400, 300, "room");
      
        this.scoreText = this.add.text(20, 20, "Score: 0", {
          fontSize: "20px",
          fill: "#fff",
        });
      
        this.wasteText = this.add.text(20, 50, "Waste: 0%", {
          fontSize: "20px",
          fill: "#f00",
        });
      
        // Player (draggable)
        this.player = this.physics.add.sprite(400, 300, "player").setScale(0.2);
    this.player.setCollideWorldBounds(true);

    // Create a draggable input zone over the player
    this.playerDragZone = this.add.zone(this.player.x, this.player.y, this.player.displayWidth, this.player.displayHeight);
    this.playerDragZone.setOrigin(0.5);
    this.playerDragZone.setInteractive();
    this.input.setDraggable(this.playerDragZone);

    // Sync drag with player position
    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      if (gameObject === this.playerDragZone) {
        this.player.setPosition(dragX, dragY);
        gameObject.setPosition(dragX, dragY);
      }
    });
      
        // Create lights randomly
        const numLights = 5;
        for (let i = 0; i < numLights; i++) {
          const x = Phaser.Math.Between(100, 700);
          const y = Phaser.Math.Between(100, 500);
      
          const light = this.physics.add
            .sprite(x, y, "lightOn")
            .setScale(0.15)
            .setData({ on: true, wasteRate: 0.2 });
      
          this.appliances.push(light);
        }
      
        // Use Arcade Physics for manual overlap check
        this.physics.world.enable(this.player);
      }
      
      update(time, delta) {
        // Waste logic
        let wasteIncrement = 0;
      
        this.appliances.forEach((light) => {
          if (light.getData("on")) {
            wasteIncrement += light.getData("wasteRate");
      
            // Check overlap manually
            if (
              Phaser.Math.Distance.Between(
                this.player.x,
                this.player.y,
                light.x,
                light.y
              ) < 30
            ) {
              light.setTexture("lightOff");
              light.setData("on", false);
              this.score += 10;
              this.scoreText.setText(`Score: ${this.score}`);
            }
          }
        });
      
        this.wasteMeter += wasteIncrement;
        this.wasteText.setText(`Waste: ${Math.floor(this.wasteMeter)}%`);
      
        if (this.wasteMeter >= 100 && !this.gameOverShown) {
          this.scene.pause();
          this.add.text(200, 280, "Game Over! Too much energy wasted!", {
            fontSize: "24px",
            fill: "#fff",
          });
      
          this.gameOverShown = true;
        }
      }
  }
  
  