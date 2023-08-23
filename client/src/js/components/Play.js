import { select, templates } from '../settings.js';
import Player from './Player.js';

class Play {
  constructor(element) {
    const thisPlay = this;

    thisPlay.element = element;
    thisPlay.render();
  }

  initCanvas() {
    const canvas = document.querySelector(select.play.canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const c = canvas.getContext('2d');
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
  }

  initPlayer() {
    function animate() {
      window.requestAnimationFrame(animate);
      new Player();
    }

    animate();
  }

  initControls() {
    window.addEventListener('keydown', ({ key }) => {
      switch(key) {
      case 'ArrowLeft':
        console.log('left');
        break;
      case 'ArrowRight':
        console.log('right');
        break;
      case 'ArrowUp':
        console.log('shoot');
        break;
      }
    });
  }

  render() {
    const thisPlay = this;

    const generatedHTML = templates.playWidget();
    thisPlay.dom = {};
    thisPlay.dom.wrapper = thisPlay.element;
    thisPlay.element.innerHTML = generatedHTML;
    thisPlay.initCanvas();
    thisPlay.initPlayer();
    thisPlay.initControls();
  }
}

export default Play;
