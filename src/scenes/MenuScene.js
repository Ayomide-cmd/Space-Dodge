export default class MenuScene extends Phaser.Scene {
  constructor() { super('MenuScene'); }

  create() {
    this.add.tileSprite(0, 0, 480, 640, 'stars').setOrigin(0, 0);

    this.add.text(240, 200, 'SPACE DODGE', {
      fontSize: '42px', fontFamily: 'monospace',
      color: '#4fc3f7', stroke: '#000', strokeThickness: 6
    }).setOrigin(0.5);

    this.add.text(240, 270, 'by Stephanie A.', {
      fontSize: '14px', fontFamily: 'monospace', color: '#78909c'
    }).setOrigin(0.5);

    const blink = this.add.text(240, 400, 'PRESS SPACE OR CLICK TO START', {
      fontSize: '16px', fontFamily: 'monospace', color: '#ffffff'
    }).setOrigin(0.5);

    this.tweens.add({ targets: blink, alpha: 0, duration: 600, yoyo: true, repeat: -1 });

    this.add.text(240, 480, [
      'WASD / Arrow Keys  — Move',
      'Space / Z           — Shoot',
      'Hold for rapid fire'
    ], {
      fontSize: '12px', fontFamily: 'monospace',
      color: '#546e7a', align: 'center', lineSpacing: 8
    }).setOrigin(0.5);

    this.input.keyboard.once('keydown-SPACE', this._start, this);
    this.input.once('pointerdown', this._start, this);
  }

  _start() {
    this.scene.start('GameScene');
    this.scene.start('UIScene');
  }
}
