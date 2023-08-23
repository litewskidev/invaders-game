import { select } from '../settings.js';

class Player {
  constructor() {
    const thisPlayer = this;

    //  CANVAS
    thisPlayer.canvas = document.querySelector(select.play.canvas);
    thisPlayer.c = thisPlayer.canvas.getContext('2d');

    //  IMAGE
    const image = new Image();
    image.src = '../../images/spaceshipImg.webp';
    thisPlayer.image = image;

    //  SIZE
    const scale = .25;
    thisPlayer.width = image.width * scale;
    thisPlayer.height = image.height * scale;

    //  POSITION
    thisPlayer.rotation = 0;

    thisPlayer.position = {
      x: thisPlayer.canvas.width / 2 - thisPlayer.width / 2,
      y: thisPlayer.canvas.height - thisPlayer.height - 50
    };

    thisPlayer.velocity = {
      x: 0,
      y: 0
    };

    //  DRAW
    thisPlayer.draw = () => {
      const thisPlayer = this;

      thisPlayer.c.save();

      thisPlayer.c.translate(
        thisPlayer.position.x + thisPlayer.width / 2,
        thisPlayer.position.y + thisPlayer.height / 2
      );

      thisPlayer.c.rotate(thisPlayer.rotation);

      thisPlayer.c.translate(
        -thisPlayer.position.x - thisPlayer.width / 2,
        -thisPlayer.position.y - thisPlayer.height / 2
      );

      thisPlayer.c.drawImage(
        thisPlayer.image,
        thisPlayer.position.x,
        thisPlayer.position.y,
        thisPlayer.width,
        thisPlayer.height
      );

      thisPlayer.c.restore();
    };

    thisPlayer.update = () => {
      if(thisPlayer.image) {
        thisPlayer.draw();
        thisPlayer.position.x += thisPlayer.velocity.x;
        thisPlayer.position.y += thisPlayer.velocity.y;
      }
    };
  }
}

export default Player;
