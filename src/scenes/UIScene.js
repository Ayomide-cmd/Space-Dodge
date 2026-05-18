export default class UIScene extends Phaser.Scene {
  constructor() { super({ key: 'UIScene', active: false }); }

  create() {
    this._scoreText = this.add.text(12, 12, 'SCORE  0', {
      fontSize: '16px', fontFamily: 'monospace', color: '#ffffff'
    });

    this._livesText = this.add.text(468, 12, '♥ ♥ ♥', {
      fontSize: '16px', fontFamily: 'monospace', color: '#ef5350'
    }).setOrigin(1, 0);

    // Listen to events emitted by GameScene
    const game = this.scene.get('GameScene');
    game.events.on('scoreUpdate', s => {
      this._scoreText.setText('SCORE  ' + s);
    }, this);
    game.events.on('livesUpdate', lives => {
      this._livesText.setText('♥ '.repeat(lives).trim() || '');
    }, this);
  }

  shutdown() {
    // Clean up listeners when scene stops
    const game = this.scene.get('GameScene');
    if (game) game.events.off('scoreUpdate');
    if (game) game.events.off('livesUpdate');
  }
}
