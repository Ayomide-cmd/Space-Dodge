export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  /**
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {'grunt'|'tank'} type
   */
  constructor(scene, x, y, type = 'grunt') {
    const key = type === 'tank' ? 'enemy_tank' : 'enemy_grunt';
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(8);

    this.type = type;
    this._time = 0;
    this._startX = x;

    if (type === 'tank') {
      this.hp = 6; this.score = 50;
      this.setBodySize(50, 42);
      this.setVelocityY(55);
    } else {
      this.hp = 1; this.score = 10;
      this.setBodySize(34, 36);
      this.setVelocityY(120);
    }

   
    this._amp   = Phaser.Math.Between(40, 120);
    this._freq  = Phaser.Math.FloatBetween(0.8, 2.0);
    this._phase = Phaser.Math.FloatBetween(0, Math.PI * 2);

    
    this._shootCooldown = type === 'tank'
      ? Phaser.Math.Between(1200, 2200)
      : Phaser.Math.Between(2000, 4000);
    this._shootTimer = Phaser.Math.Between(500, this._shootCooldown);
  }

  update(delta, enemyBullets, playerX, playerY) {
    this._time += delta;
    this._shootTimer -= delta;

   
    const dx = Math.sin(this._time * 0.001 * this._freq + this._phase) * this._amp;
    this.x = Phaser.Math.Clamp(this._startX + dx, 20, 460);

    
    if (this._shootTimer <= 0) {
      this._shootTimer = this._shootCooldown;
      this._shoot(enemyBullets, playerX, playerY);
    }

   
    if (this.y > 700) this.destroy();
  }

  _shoot(enemyBullets, px, py) {
    const b = enemyBullets.get(this.x, this.y + 20);
    if (!b) return;
    b.setActive(true).setVisible(true).setTexture('bullet_enemy');
    b.body.reset(this.x, this.y + 20);

    const angle = Phaser.Math.Angle.Between(this.x, this.y, px, py);
    const spd = this.type === 'tank' ? 180 : 220;
    b.setVelocity(Math.cos(angle) * spd, Math.sin(angle) * spd);
    b.setDepth(7);
  }

  hit(dmg = 1) {
    this.hp -= dmg;
    this.scene.tweens.add({
      targets: this, alpha: 0.2, duration: 60, yoyo: true, repeat: 1,
      onComplete: () => this.setAlpha(1)
    });
    return this.hp <= 0;
  }
}
