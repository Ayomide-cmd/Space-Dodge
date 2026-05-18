// BootScene.js
// Generates all game textures programmatically — no image files needed.

export default class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  create() {
    this._makePlayer();
    this._makeEnemies();
    this._makeBullets();
    this._makeParticle();
    this._makeStars();
    this.scene.start('MenuScene');
  }

  _makePlayer() {
    const g = this.make.graphics({ x: 0, y: 0, add: false });
    // Ship body
    g.fillStyle(0x4fc3f7);
    g.fillTriangle(24, 0, 0, 52, 48, 52);
    // Cockpit
    g.fillStyle(0x81d4fa);
    g.fillTriangle(24, 8, 14, 32, 34, 32);
    // Engine glow
    g.fillStyle(0xff6f00);
    g.fillRect(12, 48, 10, 10);
    g.fillRect(26, 48, 10, 10);
    g.generateTexture('player', 48, 60);
    g.destroy();
  }

  _makeEnemies() {
    // Basic grunt
    const g = this.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0xef5350);
    g.fillTriangle(20, 40, 0, 0, 40, 0);
    g.fillStyle(0xff8a80);
    g.fillCircle(20, 16, 8);
    g.generateTexture('enemy_grunt', 40, 42);
    g.destroy();

    // Tank enemy (bigger, slower)
    const g2 = this.make.graphics({ x: 0, y: 0, add: false });
    g2.fillStyle(0xab47bc);
    g2.fillRect(0, 0, 56, 48);
    g2.fillStyle(0xce93d8);
    g2.fillRect(8, 8, 40, 28);
    g2.fillStyle(0xe040fb);
    g2.fillCircle(28, 22, 10);
    g2.generateTexture('enemy_tank', 56, 48);
    g2.destroy();
  }

  _makeBullets() {
    // Player bullet
    const g = this.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0xfff176);
    g.fillRect(1, 0, 6, 18);
    g.fillStyle(0xffee58);
    g.fillRect(3, 0, 2, 18);
    g.generateTexture('bullet_player', 8, 18);
    g.destroy();

    // Enemy bullet
    const g2 = this.make.graphics({ x: 0, y: 0, add: false });
    g2.fillStyle(0xff5252);
    g2.fillCircle(5, 5, 5);
    g2.generateTexture('bullet_enemy', 10, 10);
    g2.destroy();
  }

  _makeParticle() {
    const g = this.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0xffffff);
    g.fillCircle(4, 4, 4);
    g.generateTexture('particle', 8, 8);
    g.destroy();
  }

  _makeStars() {
    // Background star tile (tileSprite scrolls this)
    const g = this.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x000011);
    g.fillRect(0, 0, 480, 640);
    for (let i = 0; i < 120; i++) {
      const x = Phaser.Math.Between(0, 480);
      const y = Phaser.Math.Between(0, 640);
      const b = Phaser.Math.Between(100, 255);
      const r = Phaser.Math.Between(1, 2);
      g.fillStyle(Phaser.Display.Color.GetColor(b, b, b));
      g.fillCircle(x, y, r);
    }
    g.generateTexture('stars', 480, 640);
    g.destroy();
  }
}
