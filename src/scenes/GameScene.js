import Player from '../objects/Player.js';
import Enemy  from '../objects/Enemy.js';

export default class GameScene extends Phaser.Scene {
  constructor() { super({ key: 'GameScene', active: false }); }

  create() {
   
    this._bg = this.add.tileSprite(0, 0, 480, 640, 'stars').setOrigin(0, 0);

   
    this._playerBullets = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
      maxSize: 40, runChildUpdate: false
    });
    this._enemyBullets = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
      maxSize: 80, runChildUpdate: false
    });
    this._enemies = this.physics.add.group();

   
    this._player = new Player(this, 240, 560);

    
    this._cursors = this.input.keyboard.createCursorKeys();
    this._keys    = this.input.keyboard.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D,
      Z: Phaser.Input.Keyboard.KeyCodes.Z,
      SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE
    });

    
    this.score  = 0;
    this.lives  = 3;
    this._wave  = 0;
    this._waveTimer = 0;
    this._waveInterval = 4000; 

   
    this.physics.add.overlap(
      this._playerBullets, this._enemies,
      this._onBulletHitEnemy, null, this
    );
    this.physics.add.overlap(
      this._player, this._enemyBullets,
      this._onPlayerHitByBullet, null, this
    );
    this.physics.add.overlap(
      this._player, this._enemies,
      this._onPlayerHitByEnemy, null, this
    );

    // --- Particles ---
    this._particles = this.add.particles(0, 0, 'particle', {
      speed: { min: 60, max: 200 },
      scale: { start: 1.2, end: 0 },
      lifespan: 400,
      blendMode: 'ADD',
      emitting: false
    });
  }

  update(time, delta) {
    
    this._bg.tilePositionY -= 1.4;

   
    this._player.update(this._cursors, this._keys, this._playerBullets, time);

    
    this._enemies.getChildren().forEach(e =>
      e.update(delta, this._enemyBullets, this._player.x, this._player.y)
    );

   
    this._playerBullets.getChildren().forEach(b => {
      if (b.active && b.y < -20) b.setActive(false).setVisible(false);
    });
    this._enemyBullets.getChildren().forEach(b => {
      if (b.active && (b.y > 660 || b.x < -20 || b.x > 500)) {
        b.setActive(false).setVisible(false);
      }
    });

    
    this._waveTimer += delta;
    if (this._waveTimer >= this._waveInterval) {
      this._waveTimer = 0;
      this._spawnWave();
    }
  }

  

  _spawnWave() {
    this._wave++;

    
    const tankChance = Math.min(0.1 + this._wave * 0.05, 0.4);
    const count = Math.min(3 + Math.floor(this._wave / 2), 8);

    for (let i = 0; i < count; i++) {
      const x   = Phaser.Math.Between(30, 450);
      const y   = Phaser.Math.Between(-80, -20);
      const type = Math.random() < tankChance ? 'tank' : 'grunt';
      // Stagger spawns slightly
      this.time.delayedCall(i * 300, () => {
        const e = new Enemy(this, x, y, type);
        this._enemies.add(e);
      });
    }
  }

  // ------------------------------------------------------------------ overlaps

  _onBulletHitEnemy(bullet, enemy) {
    bullet.setActive(false).setVisible(false);
    const dead = enemy.hit(1);
    if (dead) {
      this._explode(enemy.x, enemy.y);
      this.score += enemy.score;
      this.events.emit('scoreUpdate', this.score);
      enemy.destroy();
    }
  }

  _onPlayerHitByBullet(player, bullet) {
    bullet.setActive(false).setVisible(false);
    this._damagePlayer();
  }

  _onPlayerHitByEnemy(player, enemy) {
    this._explode(enemy.x, enemy.y);
    enemy.destroy();
    this._damagePlayer();
  }

  _damagePlayer() {
    const hit = this._player.hit();
    if (!hit) return;
    this.lives = this._player.hp;
    this.events.emit('livesUpdate', this.lives);
    if (this.lives <= 0) this._gameOver();
  }

 

  _explode(x, y) {
    this._particles.setPosition(x, y);
    this._particles.explode(18);
    this.cameras.main.shake(80, 0.006);
  }
   

  _gameOver() {
    this.scene.stop('UIScene');
    this.scene.start('GameOverScene', { score: this.score, wave: this._wave });
  }
}
