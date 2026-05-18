export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setDepth(10);
    this.setBodySize(36, 48, true);

    this.hp         = 3;
    this.maxHp      = 3;
    this.fireRate   = 180;       // ms between shots
    this._lastShot  = 0;
    this._invincible = false;
  }

  // Call each frame, pass cursors + keys + bulletGroup + time
  update(cursors, keys, bullets, time) {
    const speed = 280;
    this.setVelocity(0);

    if (cursors.left.isDown  || keys.A.isDown) this.setVelocityX(-speed);
    if (cursors.right.isDown || keys.D.isDown) this.setVelocityX(speed);
    if (cursors.up.isDown    || keys.W.isDown) this.setVelocityY(-speed);
    if (cursors.down.isDown  || keys.S.isDown) this.setVelocityY(speed);

    const shooting = keys.SPACE.isDown || keys.Z.isDown;
    if (shooting && time > this._lastShot + this.fireRate) {
      this._lastShot = time;
      this._shoot(bullets);
    }
  }

  _shoot(bullets) {
    const b = bullets.get(this.x, this.y - 28);
    if (!b) return;
    b.setActive(true).setVisible(true);
    b.setTexture('bullet_player');
    b.body.reset(this.x - 4, this.y - 28);
    b.setVelocityY(-700);
    b.setDepth(9);
  }

  hit() {
    if (this._invincible) return false;
    this.hp--;
    this._invincible = true;
    // Flash effect
    this.scene.tweens.add({
      targets: this, alpha: 0, duration: 80, yoyo: true,
      repeat: 6,
      onComplete: () => { this.setAlpha(1); this._invincible = false; }
    });
    return true;
  }
}
