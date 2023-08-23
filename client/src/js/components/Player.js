import { select } from '../settings.js';

class Player {
  constructor() {
    const thisPlayer = this;

    const canvas = document.querySelector(select.play.canvas);
    const image = new Image();
    image.src = '../../images/spaceshipImg.webp';

    const scale = .25;
    thisPlayer.image = image;
    thisPlayer.width = image.width * scale;
    thisPlayer.height = image.height * scale;

    thisPlayer.position = {
      x: canvas.width / 2 - thisPlayer.width / 2,
      y: canvas.height - thisPlayer.height - 60
    };

    thisPlayer.velocity = {
      x: 0,
      y: 0
    };

    thisPlayer.draw = () => {
      const thisPlayer = this;

      const canvas = document.querySelector(select.play.canvas);
      const c = canvas.getContext('2d');

      c.drawImage(
        thisPlayer.image,
        thisPlayer.position.x,
        thisPlayer.position.y,
        thisPlayer.width,
        thisPlayer.height
      );
    };

    thisPlayer.update = () => {
      if(thisPlayer.image) {
        thisPlayer.draw();
        thisPlayer.position.x += thisPlayer.velocity.x;
      }
    };
  }
}

export default Player;
