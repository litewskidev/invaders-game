import { select, templates } from '../../settings.js';
import Background from '../elements/Background.js';
import EnemyGrid from '../elements/EnemyGrid.js';
import Explosion from '../elements/Explosion.js';
import Player from '../elements/Player.js';
import Projectile from '../elements/Projectile.js';

class Play {
  constructor(element) {
    const thisPlay = this;

    thisPlay.element = element;
    thisPlay.render();
  }

  initGame() {
    //  GAME
    let game = {
      over: false,
      active: true
    };

    //  SCORE
    const scoreDisplay = document.querySelector(select.play.score);
    const endScoreDisplay = document.querySelector(select.play.endScore);
    const endGameModal = document.querySelector(select.play.endModal);
    let score = 0;

    //  CANVAS
    const canvas = document.querySelector(select.play.canvas);
    const c = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //  BACKGROUND
    const background = [];
    let starQty;
    let starVel;
    if(window.innerWidth <= 540) {
      starQty = 30;
      starVel = .15;
    } else {
      starQty = 60;
      starVel = .3;
    }
    for(let b = 0; b < starQty; b++) {
      background.push(new Background({
        position: {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height
        },
        velocity: {
          x: 0,
          y: starVel
        },
        style: '#D6EEFF',
        radius: Math.random() * 2
      }));
    }

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
    const enemyProjectiles = [];

    //  EXPLOSIONS
    const explosions = [];
    const generateExplosions = ( {obj}, qty, color, radius ) => {
      for(let e = 0; e < qty; e++) {
        explosions.push(new Explosion({
          position: {
            x: obj.position.x + (obj.width / 2),
            y: obj.position.y + (obj.height / 2)
          },
          velocity : {
            x: (Math.random() - .5) * 2.5,
            y: (Math.random() - .5) * 2.5
          },
          style: color,
          radius: Math.random() * radius
        }));
      }
    };

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
    //  DESKTOP
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
        if(game.over) return;  //  game over
        projectiles.push(
          new Projectile({
            position: {
              x: player.position.x + (player.width / 2),
              y: player.position.y
            },
            velocity: {
              x: 0,
              y: -12
            },
            style: 'white',
            radius: 2
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
    //  MOBILE
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
      if(game.over) return;  //  game over
      projectiles.push(
        new Projectile({
          position: {
            x: player.position.x + (player.width / 2),
            y: player.position.y
          },
          velocity: {
            x: 0,
            y: -12
          },
          style: 'white',
          radius: 2
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
      return;
    });

    //  FRAMES
    let frames = 0;
    let randomFrame = Math.floor(Math.random() * 1000 + 500);

    //  !!! ANIMATE !!! !!! ANIMATE !!! !!! ANIMATE !!!
    function animate() {
      if(!game.active) return;
      window.requestAnimationFrame(animate);

      //  canvas
      c.fillStyle = 'black';
      c.fillRect(0, 0, canvas.width, canvas.height);

      //  background
      background.forEach((star) => {
        if(star.position.y - star.radius >= canvas.height) {
          star.position.x = Math.random() * canvas.width;
          star.position.y = -star.radius;
        }
        star.update();
      });

      //  player
      player.update();

      //  player projectiles
      projectiles.forEach((projectile, index) => {
        if(projectile.position.y + projectile.radius <= 0) {
          projectiles.splice(index, 1);
        } else {
          projectile.update();
        }
      });

      //  enemy projectiles
      enemyProjectiles.forEach((enemyProjectile, index) => {
        if(enemyProjectile.position.y + enemyProjectile.height >= canvas.height) {
          enemyProjectiles.splice(index, 1);
        } else {
          enemyProjectile.update();
        }
        //  player collision detection & GAME OVER
        if(enemyProjectile.position.y - enemyProjectile.radius <= player.position.y + player.height
        && enemyProjectile.position.y + enemyProjectile.radius >= player.position.y
        && enemyProjectile.position.x - enemyProjectile.radius <= player.position.x + player.width
        && enemyProjectile.position.x + enemyProjectile.radius >= player.position.x) {
          generateExplosions({ obj: player }, 50, 'white', 2);
          enemyProjectiles.splice(index, 1);
          player.opacity = 0;
          game.over = true;
          setTimeout(() => {
            game.active = false;
            endScoreDisplay.innerHTML = score;
            endGameModal.classList.add('show');
          }, 1000);
        }
      });

      //  explosions
      explosions.forEach((explosion, index) => {
        if(explosion.opacity <= 0) {
          setTimeout(() => {
            explosions.splice(index, 1);
          }, 0);
        } else {
          explosion.update();
        }
      });

      //  spawn grids of enemy
      enemyGrids.forEach((grid, index) => {
        grid.update();
        //  spawn enemy projectiles
        if(frames % 100 === 0 && grid.enemies.length > 0) {
          grid.enemies[Math.floor(Math.random() * grid.enemies.length)].shoot(enemyProjectiles);
        }
        grid.enemies.forEach((enemy, e) => {
          enemy.update( {velocity: grid.velocity} );
          //  enemies collision detection
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
                // remove enemies & projectiles & increment score
                if(enemyExist && projectileExist) {
                  score += 10;
                  scoreDisplay.innerHTML = score;
                  generateExplosions({ obj: enemy }, 30, '#8B8F92', 2);  //  & generate explosion
                  grid.enemies.splice(e, 1);
                  projectiles.splice(p, 1);
                  // recalculate grid width
                  if(grid.enemies.length > 0) {
                    const firstEnemy = grid.enemies[0];
                    const lastEnemy = grid.enemies[grid.enemies.length - 1];
                    grid.width = lastEnemy.position.x - firstEnemy.position.x + lastEnemy.width;
                    grid.position.x = firstEnemy.position.x;
                  } else {
                    enemyGrids.splice(index, 1);
                  }
                }
              }, 0);
            }
          });
        });
      });

      //  player movement
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

    animate();
  }

  render() {
    const thisPlay = this;

    const generatedHTML = templates.playWidget();
    thisPlay.dom = {};
    thisPlay.dom.wrapper = thisPlay.element;
    thisPlay.element.innerHTML = generatedHTML;
    thisPlay.initGame();
  }
}

export default Play;
