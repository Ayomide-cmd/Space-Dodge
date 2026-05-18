import BootScene    from './scenes/BootScene.js';
import MenuScene    from './scenes/MenuScene.js';
import GameScene    from './scenes/GameScene.js';
import UIScene      from './scenes/UIScene.js';
import GameOverScene from './scenes/GameOverScene.js';

const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  backgroundColor: '#00000',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false }
  },
  scene: [BootScene, MenuScene, GameScene, UIScene, GameOverScene]
};

new Phaser.Game(config);
