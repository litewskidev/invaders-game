import { select } from '../../settings.js';

class Player {
  constructor( bottomMarginProp ) {
    const thisPlayer = this;

    //  CANVAS
    const canvas = document.querySelector(select.play.canvas);
    const c = canvas.getContext('2d');

    //  IMAGE
    const image = new Image();
    image.src = '../../images/player/airplane_2_14.png';

    //  OPACITY
    thisPlayer.opacity = 1;

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
        x: canvas.width / 2 - thisPlayer.width / 2,
        y: canvas.height - thisPlayer.height - bottomMarginProp
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
      c.save();
      c.globalAlpha = thisPlayer.opacity;
      c.translate(
        thisPlayer.position.x + thisPlayer.width / 2,
        thisPlayer.position.y + thisPlayer.height / 2
      );
      c.rotate(thisPlayer.rotation);
      c.translate(
        -thisPlayer.position.x - thisPlayer.width / 2,
        -thisPlayer.position.y - thisPlayer.height / 2
      );
      c.drawImage(
        thisPlayer.image,
        thisPlayer.position.x,
        thisPlayer.position.y,
        thisPlayer.width,
        thisPlayer.height
      );
      c.restore();
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
