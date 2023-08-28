import { select, templates } from '../../settings.js';
import EnemyGrid from '../elements/EnemyGrid.js';
import Player from '../elements/Player.js';
import Projectile from '../elements/Projectile.js';

class Play {
  constructor(element) {
    const thisPlay = this;

    thisPlay.element = element;
    thisPlay.render();
  }

  initPlayer() {
    //  CANVAS
    const canvas = document.querySelector(select.play.canvas);
    const c = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    //  PLAYER
    let bottomMargin;
    let velocityXLeft;
    let velocityXRight;
    let velocityYUp;
    let velocityYDown;

    if(window.innerWidth <= 540) {
      bottomMargin = 190;
      velocityXLeft = -5;
      velocityXRight = 5;
      velocityYUp = -5;
      velocityYDown = 5;
    } else {
      bottomMargin= 50;
      velocityXLeft = -7;
      velocityXRight = 7;
      velocityYUp = -7;
      velocityYDown = 7;
    }
    const player = new Player(bottomMargin);

    //  ARRAY WITH GRIDS OF ENEMIES
    const enemyGrids = [];

    //  PROJECTILES
    const projectiles = [];
    /*  auto projectiles
    let projectilesFrequency = 500;
    function projectilesDraw() {
      setInterval(() => {
        projectiles.push(
          new Projectile({
            position: {
              x: player.position.x + (player.width / 2),
              y: player.position.y
            },
            velocity: {
              x: 0,
              y: -12
            }
          })
        );
      }, projectilesFrequency);
    }
    */

    //  CONTROLS
    const keys = {
      left: {
        pressed: false
      },
      right: {
        pressed: false
      },
      up: {
        pressed: false
      },
      down: {
        pressed: false
      }
    };
    function controlsDesktop() {
      window.addEventListener('keydown', ({ key }) => {
        switch(key) {
        case 'ArrowLeft':
          keys.left.pressed = true;
          break;
        case 'ArrowRight':
          keys.right.pressed = true;
          break;
        case 'ArrowUp':
          keys.up.pressed = true;
          break;
        case 'ArrowDown':
          keys.down.pressed = true;
          break;
        case ' ':
          projectiles.push(
            new Projectile({
              position: {
                x: player.position.x + (player.width / 2),
                y: player.position.y
              },
              velocity: {
                x: 0,
                y: -12
              }
            })
          );
          break;
        }
      });

      window.addEventListener('keyup', ({ key }) => {
        switch(key) {
        case 'ArrowLeft':
          keys.left.pressed = false;
          break;
        case 'ArrowRight':
          keys.right.pressed = false;
          break;
        case 'ArrowUp':
          keys.up.pressed = false;
          break;
        case 'ArrowDown':
          keys.down.pressed = false;
          break;
        }
      });
    }
    function controlsMobile() {
      const up = document.querySelector('#up');
      const down = document.querySelector('#down');
      const left = document.querySelector('#left');
      const right = document.querySelector('#right');
      const shoot = document.querySelector('#shoot');

      up.addEventListener('touchstart', () => {
        keys.up.pressed = true;
      });
      down.addEventListener('touchstart', () => {
        keys.down.pressed = true;
      });
      left.addEventListener('touchstart', () => {
        keys.left.pressed = true;
      });
      right.addEventListener('touchstart', () => {
        keys.right.pressed = true;
      });
      shoot.addEventListener('touchstart', () => {
        projectiles.push(
          new Projectile({
            position: {
              x: player.position.x + (player.width / 2),
              y: player.position.y
            },
            velocity: {
              x: 0,
              y: -12
            }
          })
        );
      });

      up.addEventListener('touchend', () => {
        keys.up.pressed = false;
      });
      down.addEventListener('touchend', () => {
        keys.down.pressed = false;
      });
      left.addEventListener('touchend', () => {
        keys.left.pressed = false;
      });
      right.addEventListener('touchend', () => {
        keys.right.pressed = false;
      });
      shoot.addEventListener('touchend', () => {
        console.log(projectiles);
      });
    }

    //  FRAMES
    let frames = 0;
    let randomFrame = Math.floor(Math.random() * 1000 + 500);

    //  ANIMATE
    function animate() {
      window.requestAnimationFrame(animate);

      //  canvas
      c.fillStyle = 'black';
      c.fillRect(0, 0, canvas.width, canvas.height);

      //  player
      player.update();

      //  projectiles
      projectiles.forEach((projectile, index) => {
        if(projectile.position.y + projectile.radius <= 0) {
          projectiles.splice(index, 1);
        } else {
          projectile.update();
        }
      });

      //  spawn grids of enemy
      enemyGrids.forEach((grid, gridIndex) => {
        grid.update();

        grid.enemies.forEach((enemy, e) => {
          enemy.update( {velocity: grid.velocity} );
          //  collision detection
          projectiles.forEach((projectile, p) => {
            if(projectile.position.y - projectile.radius <= enemy.position.y + enemy.height
            && projectile.position.y + projectile.radius >= enemy.position.y
            && projectile.position.x - projectile.radius <= enemy.position.x + enemy.width
            && projectile.position.x + projectile.radius >= enemy.position.x) {
              setTimeout(() => {
                const enemyExist = grid.enemies.find(
                  wantedEnemy => wantedEnemy === enemy
                );
                const projectileExist = projectiles.find(
                  wantedProjectile => wantedProjectile === projectile
                );
                // remove enemies & projectiles
                if(enemyExist && projectileExist) {
                  grid.enemies.splice(e, 1);
                  projectiles.splice(p, 1);
                  // recalculate grid width
                  if(grid.enemies.length > 0) {
                    const firstEnemy = grid.enemies[0];
                    const lastEnemy = grid.enemies[grid.enemies.length - 1];
                    grid.width = lastEnemy.position.x - firstEnemy.position.x + lastEnemy.width;
                    grid.position.x = firstEnemy.position.x;
                  } else {
                    enemyGrids.splice(gridIndex, 1);
                  }
                }
              }, 0);
            }
          });
        });
      });

      if(keys.left.pressed && player.position.x >= 0) {
        player.velocity.x = velocityXLeft;
        player.rotation = -.10;
      } else if(keys.right.pressed && player.position.x <= (canvas.width - player.width)) {
        player.velocity.x = velocityXRight;
        player.rotation = .12;
      } else {
        player.velocity.x = 0;
        player.rotation = 0;
      }

      if(keys.up.pressed && player.position.y >= 0) {
        player.velocity.y = velocityYUp;
      } else if(keys.down.pressed && player.position.y <= (canvas.height - player.height - bottomMargin)) {
        player.velocity.y = velocityYDown;
      } else {
        player.velocity.y = 0;
      }

      //  generate grids of enemies
      if(frames % randomFrame === 0) {
        enemyGrids.push(new EnemyGrid());
        randomFrame = Math.floor(Math.random() * 1000 + 500);
        frames = 0;
      }

      frames++;
    }

    //  INIT
    function init() {
      controlsDesktop();
      controlsMobile();
      //projectilesDraw();
      animate();
    }

    init();
  }

  render() {
    const thisPlay = this;

    const generatedHTML = templates.playWidget();
    thisPlay.dom = {};
    thisPlay.dom.wrapper = thisPlay.element;
    thisPlay.element.innerHTML = generatedHTML;
    thisPlay.initPlayer();
  }
}

export default Play;
