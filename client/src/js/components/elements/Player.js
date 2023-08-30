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
    const imagePropeller = new Image();
    imagePropeller.src = '../../images/player/propeller/propeller_blue_strip.png';

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

    imagePropeller.onload = () => {
      let scale;
      let spaceX;
      let spaceY;
      if(window.innerWidth <= 540) {
        scale = .4;
        spaceX = 2.5;
        spaceY = 6.5;
      } else {
        scale = .7;
        spaceX = 4.5;
        spaceY = 10;
      }
      thisPlayer.imagePropeller = imagePropeller;
      thisPlayer.imagePropeller.spriteWidth = 69;
      thisPlayer.imagePropeller.spriteHeight = 16;
      thisPlayer.imagePropeller.width = thisPlayer.imagePropeller.spriteWidth * scale;
      thisPlayer.imagePropeller.height = thisPlayer.imagePropeller.spriteHeight * scale;
      thisPlayer.imagePropeller.position = {
        x: canvas.width / 2 - thisPlayer.imagePropeller.width / 2 + spaceX,
        y: canvas.height - thisPlayer.imagePropeller.height - thisPlayer.height - bottomMarginProp + spaceY
      };
      thisPlayer.propellerFrameX = 0;
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
      c.drawImage(
        thisPlayer.imagePropeller,
        thisPlayer.propellerFrameX * thisPlayer.imagePropeller.spriteWidth,
        0,
        thisPlayer.imagePropeller.spriteWidth,
        thisPlayer.imagePropeller.spriteHeight,
        thisPlayer.imagePropeller.position.x,
        thisPlayer.imagePropeller.position.y,
        thisPlayer.imagePropeller.width,
        thisPlayer.imagePropeller.height
      );
      c.restore();
    };

    thisPlayer.update = () => {
      if(thisPlayer.image && thisPlayer.imagePropeller) {
        /*  //  hitbox
        c.fillStyle = 'rgba(0, 255, 0, 0.2)';
        c.fillRect(thisPlayer.position.x, thisPlayer.position.y, thisPlayer.width, thisPlayer.height);
        */
        thisPlayer.draw();
        thisPlayer.position.x += thisPlayer.velocity.x;
        thisPlayer.position.y += thisPlayer.velocity.y;
        thisPlayer.imagePropeller.position.x += thisPlayer.velocity.x;
        thisPlayer.imagePropeller.position.y += thisPlayer.velocity.y;
        if (thisPlayer.propellerFrameX < 10) {
          thisPlayer.propellerFrameX++;
        } else {
          thisPlayer.propellerFrameX = 0;
        }
      }
    };
  }
}

export default Player;
