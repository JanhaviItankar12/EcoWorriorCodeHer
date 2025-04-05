import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import { useNavigate, useParams } from "react-router-dom";


const RecyclingGame = () => {
  const gameRef = useRef(null);

  const navigate=useNavigate();
  const {userId}=useParams();

  useEffect(() => {
    let game;
    let score = 0;
    let scoreText;
    let timerText;
    let timeLeft = 60;
    let bins = {};

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameRef.current,
      physics: {
        default: "arcade",
        arcade: { gravity: { y: 200 }, debug: false },
      },
      scene: {
        preload,
        create,
        update,
      },
    };

    const saveScoreToDB = async (finalScore) => {
     
      try {
        const response = await fetch("http://localhost:3001/api/game/save-score", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, score: finalScore,game:"Recycling Game"}),
        });
    
        const data = await response.json();
        console.log("Score saved:", data);
      } catch (error) {
        console.error("Error saving score:", error);
      }
    };
    

    function preload() {
      this.load.image("flower", "/assets/game1/flower.png");
      this.load.audio("hitSound", "/assets/game1/gameFail.mp3");
      this.load.image("plastic", "/assets/game1/waste/plastic-bottle.png");
      this.load.image("paper", "/assets/game1/waste/paper.png");
      this.load.image("organic", "/assets/game1/waste/apple-core.png");
      this.load.image("metal", "/assets/game1/waste/can.png");

      this.load.image("bin_plastic", "/assets/game1/bins/plasticBin.png");
      this.load.image("bin_paper", "/assets/game1/bins/paper-bin.png");
      this.load.image("bin_organic", "/assets/game1/bins/organicBin.png");
      this.load.image("bin_metal", "/assets/game1/bins/metalBin.png");
    }

    function create() {
      bins = {
        plastic: this.add.image(90, 520, "bin_plastic").setScale(0.30),
        paper: this.add.image(275, 520, "bin_paper").setScale(0.30),
        organic: this.add.image(450, 520, "bin_organic").setScale(0.30),
        metal: this.add.image(625, 520, "bin_metal").setScale(0.30),
      };

      scoreText = this.add.text(16, 16, "Score: 0", {
        fontSize: "20px",
        fill: "#fff",
      });

      timerText = this.add.text(650, 16, "Time: 60", {
        fontSize: "20px",
        fill: "#fff",
      });

      this.time.addEvent({
        delay: 1000,
        callback: () => {
          timeLeft--;
          timerText.setText("Time: " + timeLeft);

          if (timeLeft <= 0) {
            let message = "Game Over!";
            if (score > 50) {
              message = "🎉 Hurray! You did great!";
              this.add.text(200, 250, message, {
                fontSize: "32px",
                fill: "#00ff99",
                fontStyle: "bold",
              });

              // Flower shower
              this.time.addEvent({
                delay: 150,
                callback: () => {
                  const flower = this.add.image(
                    Phaser.Math.Between(0, 800),
                    -50,
                    "flower"
                  ).setScale(0.03 + Math.random() * 0.02);

                  this.tweens.add({
                    targets: flower,
                    y: 600,
                    x: flower.x + Phaser.Math.Between(-100, 100),
                    angle: 360,
                    duration: Phaser.Math.Between(2500, 4000),
                    onComplete: () => {
                      flower.destroy();
                    },
                  });
                },
                repeat: 50,
              });

              // Delay pause so flower shower can finish
              this.time.delayedCall(3000, () => {
                this.scene.pause();
              });

            } else {
              this.add.text(300, 300, message, {
                fontSize: "32px",
                fill: "#fff",
              });

              saveScoreToDB(score); // Save score
              this.scene.pause();
            }
          }
        },
        callbackScope: this,
        loop: true,
      });

      dropTrash.call(this);

      this.time.addEvent({
        delay: 4000,
        callback: () => {
          dropTrash.call(this);
        },
        callbackScope: this,
        loop: true,
      });

      this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
      });

      this.input.on("dragend", (pointer, gameObject) => {
        let matched = false;

        for (const [binType, bin] of Object.entries(bins)) {
          const boundsA = gameObject.getBounds();
          const boundsB = bin.getBounds();

          if (Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB)) {
            matched = true;

            if (binType === gameObject.trashType) {
              score += 10;
            } else {
              score -= 5;
            }

            gameObject.destroy();
            dropTrash.call(this);
            break;
          }
        }

        if (!matched) {
          gameObject.setPosition(Phaser.Math.Between(100, 700), 50);
        }

        scoreText.setText("Score: " + score);
      });
    }

    function dropTrash() {
      const trashTypes = ["plastic", "paper", "organic", "metal"];
      const type = Phaser.Utils.Array.GetRandom(trashTypes);

      const fallingTrash = this.physics.add.image(
        Phaser.Math.Between(100, 700),
        0,
        type
      ).setScale(0.13);

      fallingTrash.trashType = type;
      fallingTrash.setInteractive();
      this.input.setDraggable(fallingTrash);
      fallingTrash.setBounce(0.2);
      fallingTrash.setCollideWorldBounds(false);

      fallingTrash.update = function () {
        if (this.y > 600) {
          this.scene.sound.play("hitSound");
          this.destroy();
          score -= 5;
          scoreText.setText("Score: " + score);
        }
      };
    }

    function update() {
      this.children.list.forEach(child => {
        if (child.update) child.update();
      });
    }

    game = new Phaser.Game(config);

    return () => game.destroy(true);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-800">
       <h1 className="text-3xl font-bold mb-6 text-green-400">♻ Recycling Game</h1>
       <p className="text-lg text-gray-300 mb-4">Catch the falling trash and recycle it!</p>
    <button
      onClick={() => navigate(`/allGame/${userId}`)}
      className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
    >
      ← Back
    </button>

    <div
      ref={gameRef}
      className="w-[800px] h-[600px] bg-gray-900 rounded-lg shadow-lg"
    ></div>
  </div>
  );
};


export default RecyclingGame;
