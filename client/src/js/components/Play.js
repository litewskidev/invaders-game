import { select, templates } from '../settings.js';
import Player from './Player.js';

class Play {
  constructor(element) {
    const thisPlay = this;

    thisPlay.element = element;
    thisPlay.render();
  }

  initPlayer() {
    const canvas = document.querySelector(select.play.canvas);
    const c = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const player = new Player();

    const keys = {
      left: {
        pressed: false
      },
      right: {
        pressed: false
      },
      shoot: {
        pressed: false
      }
    };

    function animate() {
      window.requestAnimationFrame(animate);
      c.fillStyle = 'black';
      c.fillRect(0, 0, canvas.width, canvas.height);
      player.update();

      if(keys.left.pressed && player.position.x >= 0) {
        player.velocity.x = -8;
      } else if (keys.right.pressed && player.position.x <= (canvas.width - player.width)) {
        player.velocity.x = 8;
      } else {
        player.velocity.x = 0;
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
        case ' ':
          keys.shoot.pressed = true;
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
        case ' ':
          keys.shoot.pressed = false;
          break;
        }
      });
    }

    function init() {
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
