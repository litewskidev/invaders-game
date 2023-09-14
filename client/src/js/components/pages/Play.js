import { select, templates } from '../../settings.js';
import Background from '../elements/Background.js';
import Boss from '../elements/Boss.js';
import EnemyGrid from '../elements/EnemyGrid.js';
import Explosion from '../elements/Explosion.js';
import Player from '../elements/Player.js';
import Point from '../elements/Point.js';
import Projectile from '../elements/Projectile.js';

class Play {
  constructor(element) {
    const thisPlay = this;

    thisPlay.element = element;
    thisPlay.render();
  }

  initGame() {
    //  ELEMENTS
    const canvas = document.querySelector(select.play.canvas);
    const startBanner = document.querySelector(select.play.startBanner);
    const timeDisplay = document.querySelector(select.play.time);
    const resilienceBar = document.querySelector(select.play.resilienceBar);
    const scoreDisplay = document.querySelector(select.play.score);
    const scoreContainer = document.querySelector(select.play.scoreContainer);
    const winGameModal = document.querySelector(select.play.winModal);
    const winTime = document.querySelector(select.play.winTime);
    const endGameModal = document.querySelector(select.play.endModal);
    const restartBtn = document.querySelector(select.play.restartBtn);
    const up = document.querySelector(select.play.mobile.up);
    const down = document.querySelector(select.play.mobile.down);
    const left = document.querySelector(select.play.mobile.left);
    const right = document.querySelector(select.play.mobile.right);
    const shoot = document.querySelector(select.play.mobile.shoot);
    const healthBar = document.querySelector(select.play.healthBar);
    const healthContainer = document.querySelector(select.play.healthContainer);

    //  CANVAS
    const c = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //  TIME
    let mins = 0;
    let secs = 0;
    let startTime = 0;
    let elapsedTime = 0;
    let paused = true;
    let intervalId;
    const time = () => {
      if(paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime);
      }

      function updateTime() {
        elapsedTime = Date.now() - startTime;
        secs = Math.floor((elapsedTime / 1000) % 60);
        mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
        secs = format(secs);
        mins = format(mins);

        timeDisplay.innerHTML = `${mins}:${secs}`;

        function format(unit) {
          return (('0') + unit).length > 2 ? unit : '0' + unit;
        }
      }
    };

    //  GAME
    let game = {
      start: false,
      over: false,
      active: true
    };
    setTimeout(() => {
      startBanner.classList.add('show');
    }, 100);
    setTimeout(() => {
      startBanner.classList.add('hide');
      game.start = true;
      time();
    }, 4500);

    let frames = 0;
    let randomFrame = Math.floor(Math.random() * 250) + 500;
    let score = 0;
    const enemyGrids = [];
    const enemyProjectiles = [];
    const projectiles = [];
    const explosions = [];
    const points = [];
    let townResilience = 20;
    const bossArray = [];
    bossArray.push(new Boss());
    let bossHealth = 10;

    //  BACKGROUND
    const background = [];
    const backgroundColor = '#87CEEB';
    const randomClouds = () => {
      let randomCloud = Math.floor(Math.random() * 5) + 1;
      return randomCloud;
    };
    let cloudsQty;
    let cloudsVel;
    if(window.innerWidth <= 540) {
      cloudsQty = 15;
      cloudsVel = .2;
    } else {
      cloudsQty = 30;
      cloudsVel = .3;
    }
    for(let b = 0; b < cloudsQty; b++) {
      background.push(new Background({
        position: {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height
        },
        velocity: {
          x: 0,
          y: cloudsVel
        },
        style: '#D6EEFF',
        radius: Math.random() * 2
      }, randomClouds()));
    }

    //  PLAYER
    let bottomMargin;
    let velocityXLeft;
    let velocityXRight;
    let velocityYUp;
    let velocityYDown;
    let propellerSpaceX;
    if(window.innerWidth <= 540) {
      bottomMargin = 190;
      velocityXLeft = -4;
      velocityXRight = 4;
      velocityYUp = -4;
      velocityYDown = 4;
      propellerSpaceX = 1.25;
    } else {
      bottomMargin= 50;
      velocityXLeft = -6;
      velocityXRight = 6;
      velocityYUp = -6;
      velocityYDown = 6;
      propellerSpaceX = 2.25;
    }
    const player = new Player(bottomMargin);
    const playerGameOver = () => {
      generateExplosions({ obj: player }, 30, '#7B796D', 1.5);
      player.opacity = 0;
      game.over = true;
      if(!paused) {
        paused = true;
        startTime = Date.now() - startTime;
        clearInterval(intervalId);
      }
      setTimeout(() => {
        game.active = false;
        endGameModal.classList.add('show');
      }, 800);
    };

    //  CONTROLS
    restartBtn.addEventListener('click', () => {  //  restart game
      this.render();
    });
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
      case ' ':  //  projectiles
        if(game.over || projectiles.length > 2) return;  //  game over
        projectiles.push(
          new Projectile({
            position: {
              x: player.position.x + (player.width / 1.8),
              y: player.position.y - 15
            },
            velocity: {
              x: 0,
              y: -13
            },
            site: 'player'
          })
        );
        projectiles.push(
          new Projectile({
            position: {
              x: player.position.x + (player.width / 3.1),
              y: player.position.y - 15
            },
            velocity: {
              x: 0,
              y: -13
            },
            site: 'player'
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
    shoot.addEventListener('touchstart', () => {  //  projectiles
      if(game.over) return;  //  game over
      projectiles.push(
        new Projectile({
          position: {
            x: player.position.x + (player.width / 1.8),
            y: player.position.y - 5
          },
          velocity: {
            x: 0,
            y: -12
          },
          site: 'player'
        })
      );
      projectiles.push(
        new Projectile({
          position: {
            x: player.position.x + (player.width / 3.1),
            y: player.position.y - 5
          },
          velocity: {
            x: 0,
            y: -12
          },
          site: 'player'
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

    //  EFFECTS
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

    //  ANIMATE
    const animate = () => {
      if(!game.active) return;
      window.requestAnimationFrame(animate);

      //  canvas & background
      c.fillStyle = backgroundColor;
      c.fillRect(0, 0, canvas.width, canvas.height);
      background.forEach((cloud) => {
        if(cloud.position.y - cloud.radius >= canvas.height) {
          cloud.position.x = Math.random() * canvas.width;
          cloud.position.y = -cloud.radius;
        }
        cloud.update();
      });

      //  player
      player.update();
      if(keys.left.pressed && player.position.x >= 0) {
        player.velocity.x = velocityXLeft;
        if (player.frameX >= 1) {
          player.frameX--;
          player.imagePropeller.position.x -= propellerSpaceX;
        }
      } else if(keys.right.pressed && player.position.x <= (canvas.width - player.width)) {
        player.velocity.x = velocityXRight;
        if (player.frameX <= 24) {
          player.frameX++;
          player.imagePropeller.position.x += propellerSpaceX;
        }
      } else {
        player.velocity.x = 0;
        player.frameX = 13;
        if(player.imagePropeller) {
          player.imagePropeller.position.x = player.position.x + player.width / 2 - player.imagePropeller.width / 2 + player.spaceX;
        }
      }
      if(keys.up.pressed && player.position.y >= 0) {
        player.velocity.y = velocityYUp;
      } else if(keys.down.pressed && player.position.y <= (canvas.height - player.height - bottomMargin)) {
        player.velocity.y = velocityYDown;
      } else {
        player.velocity.y = 0;
      }

      //  player projectiles
      projectiles.forEach((projectile, index) => {
        if(projectile.position.y + projectile.height <= 0) {
          setTimeout(() => {
            projectiles.splice(index, 1);
          }, 0);
        } else {
          projectile.update();
        }
      });

      //  enemies
      if(game.start === true) {
        if(score < 1) {
          enemyGrids.forEach((grid, index) => {
            grid.update();
            if(frames % 150 === 0 && grid.enemies.length > 0) {
              grid.enemies[Math.floor(Math.random() * grid.enemies.length)].shoot(enemyProjectiles);
            }
            //  decrement score if enemy pass through the player
            if(grid.position.y > canvas.height) {
              setTimeout(() => {
                enemyGrids.splice(index, 1);
              }, 0);
              grid.enemies.forEach(() => {
                townResilience -= 1;
                resilienceBar.value -= 1;
              });
            }
            grid.enemies.forEach((enemy, e) => {
              enemy.update( {velocity: grid.velocity} );
              //  enemy collision with player
              if(enemy.position.y <= player.position.y + player.height
                && enemy.position.y + enemy.height >= player.position.y
                && enemy.position.x <= player.position.x + player.width
                && enemy.position.x + enemy.width >= player.position.x
              ){
                const enemyExist = grid.enemies.find(
                  wantedEnemy => wantedEnemy === enemy
                );
                if(enemyExist) {
                  setTimeout(() => {
                    grid.enemies.splice(e, 1);
                  }, 0);
                  generateExplosions({ obj: enemy }, 15, '#141820', 1.5);
                  playerGameOver();
                }
              }
              //  enemies collision detection
              projectiles.forEach((projectile, p) => {
                if(projectile.position.y + 15 <= enemy.position.y + enemy.height
                && projectile.position.y + (projectile.height - 15) >= enemy.position.y
                && projectile.position.x <= enemy.position.x + enemy.width
                && projectile.position.x + projectile.width >= enemy.position.x) {
                  const enemyExist = grid.enemies.find(
                    wantedEnemy => wantedEnemy === enemy
                  );
                  const projectileExist = projectiles.find(
                    wantedProjectile => wantedProjectile === projectile
                  );
                  // remove enemies, projectiles & increment score
                  if(enemyExist && projectileExist) {
                    setTimeout(() => {
                      grid.enemies.splice(e, 1);
                      projectiles.splice(p, 1);
                    }, 0);
                    generateExplosions({ obj: enemy }, 15, '#141820', 1.5);  //  & generate explosion
                    if(e % 6 === 2){
                      points.push(new Point({
                        position: {
                          x: enemy.position.x,
                          y: enemy.position.y
                        }
                      }));
                    }
                    // recalculate enemies grid width
                    if(grid.enemies.length > 0) {
                      const firstEnemy = grid.enemies[0];
                      const lastEnemy = grid.enemies[grid.enemies.length - 1];
                      grid.width = lastEnemy.position.x - firstEnemy.position.x + lastEnemy.width;
                      grid.position.x = firstEnemy.position.x;
                    } else {
                      setTimeout(() => {
                        enemyGrids.splice(index, 1);
                      }, 0);
                    }
                  }
                }
              });
            });
          });
        } else {
          //  boss
          scoreContainer.classList.add('noDisplay');
          healthContainer.classList.add('display');
          bossArray.forEach((boss, b) => {
            boss.update();
            if(frames % 80 === 0 && game.over === false) {
              boss.shoot(enemyProjectiles);
            }
            projectiles.forEach((projectile, p) => {
              if(projectile.position.y + 15 <= boss.position.y + boss.height / 2
              && projectile.position.y + (projectile.height - 15) >= boss.position.y
              && projectile.position.x <= boss.position.x + boss.width
              && projectile.position.x + projectile.width >= boss.position.x) {
                setTimeout(() => {
                  projectiles.splice(p, 1);
                }, 0);
                bossHealth -= 5;
                healthBar.value -= 5;
                generateExplosions({ obj: boss }, 15, 'white', 1);
              }
            });
            if(boss.position.y <= player.position.y + player.height
              && boss.position.y + boss.height >= player.position.y
              && boss.position.x <= player.position.x + player.width
              && boss.position.x + boss.width >= player.position.x
            ){
              playerGameOver();
            }
            if(bossHealth === 0) {
              setTimeout(() => {
                bossArray.splice(b, 1);
              }, 0);
              generateExplosions({ obj: boss }, 60, '#141820', 2);
              game.over = true;
              setTimeout(() => {
                game.active = false;
                winGameModal.classList.add('show');
                winTime.innerHTML = `${mins}:${secs}`;
              }, 800);
            }
          });
        }

        //  points
        points.forEach((point, index) => {
          if(point.position.y > canvas.height) {
            setTimeout(() => {
              points.splice(index, 1);
            }, 0);
          } else if(point.position.y + (point.height - 15) >= player.position.y
            && point.position.y + 15 <= player.position.y + player.height
            && point.position.x <= player.position.x + player.width
            && point.position.x + point.width >= player.position.x) {
            setTimeout(() => {
              points.splice(index, 1);
            }, 0);
            generateExplosions({ obj: point }, 1, '#B8FFAD', 10);
            score += 1;
            scoreDisplay.innerHTML = score;
          } else {
            point.update();
          }
        });

        //  new grids of enemies
        if(frames % randomFrame === 0) {
          enemyGrids.push(new EnemyGrid());
          randomFrame = Math.floor(Math.random() * 300) + 500;
          frames = 0;
        }

        //  enemy projectiles
        enemyProjectiles.forEach((enemyProjectile, index) => {
          if(enemyProjectile.position.y + enemyProjectile.height >= canvas.height
            || enemyProjectile.position.y <= 0
            || enemyProjectile.position.x + enemyProjectile.width >= canvas.width
            || enemyProjectile.position.x <= 0) {
            setTimeout(() => {
              enemyProjectiles.splice(index, 1);
            }, 0);
          } else {
            enemyProjectile.update();
          }
          //  player collision detection & GAME OVER
          if(enemyProjectile.position.y - 15 <= player.position.y + (player.height - 15)
          && enemyProjectile.position.y + 15 >= player.position.y
          && enemyProjectile.position.x <= player.position.x + player.width
          && enemyProjectile.position.x + enemyProjectile.width >= player.position.x) {
            setTimeout(() => {
              enemyProjectiles.splice(index, 1);
            }, 0);
            playerGameOver();
          }
        });

        //  town resilience GAME OVER
        if(townResilience < 1) {
          game.over = true;
          setTimeout(() => {
            game.active = false;
            endGameModal.classList.add('show');
          }, 800);
        }

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

        frames++;
      }
    };

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
