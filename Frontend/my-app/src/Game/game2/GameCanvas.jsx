import React, { useEffect } from "react";
import Phaser from "phaser";
import MainScene from "./mainScene";

const GameCanvas = () => {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: "game-container",
      scene: [MainScene],
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
        },
      },
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div id="game-container" />
    </div>
  );
};

export default GameCanvas;

