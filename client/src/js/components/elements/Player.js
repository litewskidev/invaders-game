import { select } from '../../settings.js';

class Player {
  constructor(bottomMargin) {
    const thisPlayer = this;
    thisPlayer.margin = bottomMargin;

    //  CANVAS
    thisPlayer.canvas = document.querySelector(select.play.canvas);
    thisPlayer.c = thisPlayer.canvas.getContext('2d');

    //  IMAGE
    const image = new Image();
    image.src = '../../images/player/spaceshipImg.webp';

    //  SIZE & POSITION
    image.onload = () => {
      let scale;
      if(window.innerWidth <= 540) {
        scale = .3;
      } else {
        scale = .50;
      }
      thisPlayer.image = image;
      thisPlayer.width = image.width * scale;
      thisPlayer.height = image.height * scale;
      thisPlayer.position = {
        x: thisPlayer.canvas.width / 2 - thisPlayer.width / 2,
        y: thisPlayer.canvas.height - thisPlayer.height - thisPlayer.margin
      };
    };

    //  ROTATION & VELOCITY
    thisPlayer.rotation = 0;
    thisPlayer.velocity = {
      x: 0,
      y: 0
    };

    //  DRAW
    thisPlayer.draw = () => {
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
