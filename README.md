# Space Dodge — Phaser 3 Starter

A fully working vertical scrolling shooter to build on top of.

## Quick Start

You need a local dev server (browsers block ES modules from `file://`).

```bash
# Option A — Node (recommended)
npx serve .

# Option B — Python
python3 -m http.server 8080

# Option C — VS Code
Install the "Live Server" extension, right-click index.html → Open with Live Server
```

Then open `http://localhost:3000` (or whatever port).

---

## Controls

| Key              | Action      |
|------------------|-------------|
| Arrow Keys / WASD | Move        |
| Space / Z        | Shoot       |

---

## Project Structure

```
shmup/
├── index.html
└── src/
    ├── main.js              ← Phaser config + scene list
    ├── scenes/
    │   ├── BootScene.js     ← Generates all textures procedurally
    │   ├── MenuScene.js     ← Title screen
    │   ├── GameScene.js     ← Core game loop
    │   ├── UIScene.js       ← HUD overlay (runs parallel to GameScene)
    │   └── GameOverScene.js ← Score + retry screen
    └── objects/
        ├── Player.js        ← Player sprite + input + shooting
        └── Enemy.js         ← Enemy AI + movement patterns + shooting
```

---

## Architecture Notes

### Scenes
Phaser lets you run multiple scenes simultaneously. `GameScene` handles all gameplay physics, and `UIScene` runs on top of it to render the HUD. They communicate via `scene.events.emit/on`.

### Object Pooling
Bullets use `physics.add.group({ maxSize })` — Phaser reuses dead objects instead of creating new ones every frame. This keeps GC pressure low.

### No Asset Files
All textures are drawn with `Graphics.generateTexture()` in `BootScene`. Great for prototyping — swap them with real sprites any time by just changing the texture key.

---

## Ideas to Add Next

- [ ] **Power-ups** — spread shot, shield, speed boost (drop from enemies)
- [ ] **Boss fights** — a large enemy with multiple HP phases every 10 waves
- [ ] **Parallax background** — multiple star layers at different scroll speeds
- [ ] **High score** — `localStorage` to persist best score
- [ ] **Sound** — `this.sound.add(...)` with Web Audio synth via Tone.js
- [ ] **Mobile controls** — on-screen joystick + fire button
- [ ] **Enemy formations** — V-shape, row sweep, spiral patterns
