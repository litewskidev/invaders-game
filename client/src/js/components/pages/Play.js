import { select, templates } from '../../settings.js';
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
    const player = new Player();

    //  PROJECTILES
    const projectiles = [];


    //  KEYS
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

    function animate() {
      window.requestAnimationFrame(animate);

      c.fillStyle = 'black';
      c.fillRect(0, 0, canvas.width, canvas.height);

      player.update();

      projectiles.forEach((projectile, index) => {
        if(projectile.position.y + projectile.radius <= 0) {
          setTimeout(() => {
            projectiles.splice(index, 1);
          }, 0);
        } else {
          projectile.update();
        }
      });

      if(keys.left.pressed && player.position.x >= 0) {
        player.velocity.x = -7;
        player.rotation = -.10;
      } else if(keys.right.pressed && player.position.x <= (canvas.width - player.width)) {
        player.velocity.x = 7;
        player.rotation = .10;
      } else {
        player.velocity.x = 0;
        player.rotation = 0;
      }

      if(keys.up.pressed && player.position.y >= 0){
        player.velocity.y = -7;
      } else if(keys.down.pressed && player.position.y <= (canvas.height - player.height - 100)){
        player.velocity.y = 7;
      } else {
        player.velocity.y = 0;
      }
    }

    function controls() {
      window.addEventListener('keydown', ({ key }) => {
        switch(key) {
        case 'ArrowLeft':
          keys.left.pressed = true;
          console.log('left');
          break;
        case 'ArrowRight':
          keys.right.pressed = true;
          console.log('right');
          break;
        case 'ArrowUp':
          keys.up.pressed = true;
          console.log('up');
          break;
        case 'ArrowDown':
          keys.down.pressed = true;
          console.log('down');
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
                y: -10
              }
            })
          );
          console.log('shoot');
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
              y: -10
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
      });
    }

    function init() {
      controlsMobile();
      controls();
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
