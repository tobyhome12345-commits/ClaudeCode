# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git Workflow

**Commit and push after every meaningful change.** This is required — not optional. The goal is that work is never lost and the GitHub history always reflects the current state of the project.

- Stage specific files (not `git add -A`)
- Write a clean, imperative commit message describing *what* changed and *why* (e.g. `"Add player dash ability"`, `"Fix charger AI wall collision"`)
- Push immediately after committing

```
git add <files>
git commit -m "Descriptive message here"
git push
```

Don't batch up multiple features into one commit. Commit at the end of each logical unit of work — a bug fix, a new feature, a tuning pass — so the history is easy to read and revert.

Repository: https://github.com/tobyhome12345-commits/ClaudeCodeTest  
Branch: `master`

## Project Structure

Two self-contained browser games — no build step, no dependencies, no package manager. Each game is a single `.html` file with all HTML, CSS, and JavaScript inline. Open directly in a browser.

- `tictactoe.html` — Tic Tac Toe with 2-player and vs-computer modes (minimax AI with alpha-beta pruning)
- `shooter.html` — Top-down pixel shooter with wave-based enemy spawning
- `bunker9.html` — Bunker 9: The Quiet, a choice-driven text adventure with no randomness. Scenes live in the `SC` object (`enter` / `choices` / `parse` / `hint`; `hub: true` marks a location whose exits are added automatically). Story flags are listed in `FLAGS`, which is append-only because save codes store flags by position. Endings are in `ENDINGS` + `ENDING_TEXT`. `window.__b9` is a test hook for automated playthroughs.
- `bunker9-daily.html` — Bunker 9: Daily, a one-choice-a-day version that only runs as a claude.ai artifact (https://claude.ai/artifact/8kcPV6ZZVdWQXWnHJGe5ot). It uses the artifact `db` capability: `game/meta` (player + current day), `days/dNNN` (chapters), `picks/dNNN` (the player's locked choice), `gm/*` (secret Game Master bible and state, owner-only). A scheduled task writes the next chapter each night at 12:41am Sydney time. Opened as a plain file it shows a link to the artifact instead.

## shooter.html Architecture

Everything runs inside a single `requestAnimationFrame` loop. The file is organized into clearly marked sections:

**Data layer (top of file)**
- `PALETTE` — 20-color indexed palette; all sprites reference indices into this object
- `PLAYER_SPRITE`, `GRUNT_SPRITE`, `CHARGER_SPRITE`, `TANK_SPRITE`, `SHOOTER_SPRITE` — 2D arrays of palette indices (0 = transparent). Each "pixel" renders as `CELL` (4) canvas pixels via `drawSprite()`
- `ENEMY_STATS` — single source of truth for all enemy HP, speed, radius, score, damage, attackRate, attackRange

**Entity model**
- `Player` is the only class. Enemies and bullets are plain objects created by factory functions (`createEnemy`, `createBullet`, `createParticle`)
- All live entities are held in three module-level arrays: `enemies`, `bullets`, `particles` — filtered each frame by `pruneArrays()`
- `game` is a plain object holding `{ state, score, wave, lastTime }`

**Enemy AI**
Each enemy type has a dedicated update function (`updateGrunt`, `updateCharger`, `updateTank`, `updateShooter`) dispatched from `updateEnemies()`. The charger uses a 4-state machine: `idle → windingUp → charging → cooldown`. Shooter strafes at `SHOOTER_PREFERRED_DIST` and fires its own bullets into the shared `bullets` array with `isEnemy: true`.

**Wave system**
`waveManager` holds a `spawnQueue` (array of type strings). `buildWave(n)` populates the queue; `updateWaveManager()` drains it at `SPAWN_INTERVAL` ms intervals, spawning enemies from random screen edges. Wave advances when the queue is empty and all enemies are dead.

**Game loop order each frame:**
1. `updateWaveManager` → `player.update` → `updateEnemies` → `updateBullets`
2. Collision: `checkPlayerBulletsVsEnemies` → `checkEnemyBulletsVsPlayer` → `separateEnemies`
3. Draw: background → particles → bullets → enemies → player → HUD → state overlays

**Adding a new enemy type:**
1. Add a sprite constant and register it in `ENEMY_SPRITES`
2. Add a row to `ENEMY_STATS`
3. Write an `updateXxx(e, player, dt, now)` function
4. Add a `case` in `updateEnemies()`
5. Add death particle colors in `DEATH_COLORS`
6. Include the type in `buildWave()`

**Tuning gameplay** — all numeric values are constants at the top of the file. Touch only those; don't hardcode magic numbers elsewhere.

## tictactoe.html Architecture

Board state is a flat 9-element array. The minimax function is recursive with alpha-beta pruning; hard mode always plays optimally. The computer move is triggered via `setTimeout` to avoid blocking the UI thread.
