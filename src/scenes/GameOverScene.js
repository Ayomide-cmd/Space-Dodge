export default class GameOverScene extends Phaser.Scene {
  constructor() { super('GameOverScene'); }

  init(data) {
    this._score = data.score || 0;
    this._wave  = data.wave  || 0;
  }

  create() {
    this.add.tileSprite(0, 0, 480, 640, 'stars').setOrigin(0, 0);

    this.add.text(240, 180, 'GAME OVER', {
      fontSize: '44px', fontFamily: 'monospace',
      color: '#ef5350', stroke: '#000', strokeThickness: 6
    }).setOrigin(0.5);

    this.add.text(240, 270, [
      `SCORE   ${this._score}`,
      `WAVE    ${this._wave}`
    ], {
      fontSize: '20px', fontFamily: 'monospace',
      color: '#ffffff', lineSpacing: 14, align: 'center'
    }).setOrigin(0.5);

    const blink = this.add.text(240, 390, 'CLICK TO RETRY', {
      fontSize: '16px', fontFamily: 'monospace', color: '#ffffff'
    }).setOrigin(0.5);
    this.tweens.add({ targets: blink, alpha: 0, duration: 550, yoyo: true, repeat: -1 });

    this.add.text(240, 450, 'M — Main Menu', {
      fontSize: '13px', fontFamily: 'monospace', color: '#546e7a'
    }).setOrigin(0.5);

    this.input.keyboard.once('keydown-SPACE', this._retry, this);
    this.input.keyboard.once('keydown-M',     this._menu,  this);
    this.input.once('pointerdown', this._retry, this);
  }

  _retry() {
    this.scene.start('GameScene');
    this.scene.start('UIScene');
  }

  _menu() {
    this.scene.start('MenuScene');
  }
}
