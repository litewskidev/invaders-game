import { select } from '../../settings.js';

class Player {
  constructor( bottomMarginProp ) {
    const thisPlayer = this;

    thisPlayer.bottomMargin = bottomMarginProp;

    //  CANVAS
    const canvas = document.querySelector(select.play.canvas);
    const c = canvas.getContext('2d');

    //  IMAGE
    const image = new Image();
    image.src = '../../images/player/airplane_strip.png';
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
        scale = .5;
      }
      thisPlayer.image = image;
      thisPlayer.spriteWidth = 247.5;
      thisPlayer.spriteHeight = 208;
      thisPlayer.width = thisPlayer.spriteWidth * scale;
      thisPlayer.height = thisPlayer.spriteHeight * scale;
      thisPlayer.position = {
        x: canvas.width / 2 - thisPlayer.width / 2,
        y: canvas.height - thisPlayer.height - thisPlayer.bottomMargin
      };
      thisPlayer.frameX = 13;
      thisPlayer.frameY = 0;
    };

    imagePropeller.onload = () => {
      let scale;
      thisPlayer.spaceX;
      let spaceY;
      if(window.innerWidth <= 540) {
        scale = .4;
        thisPlayer.spaceX = 3.1;
        spaceY = 6.2;
      } else {
        scale = .7;
        thisPlayer.spaceX = 5.5;
        spaceY = 10.5;
      }
      thisPlayer.imagePropeller = imagePropeller;
      thisPlayer.imagePropeller.spriteWidth = 69;
      thisPlayer.imagePropeller.spriteHeight = 16;
      thisPlayer.imagePropeller.width = thisPlayer.imagePropeller.spriteWidth * scale;
      thisPlayer.imagePropeller.height = thisPlayer.imagePropeller.spriteHeight * scale;
      thisPlayer.imagePropeller.position = {
        x: canvas.width / 2 - thisPlayer.imagePropeller.width / 2 + thisPlayer.spaceX,
        y: canvas.height - thisPlayer.imagePropeller.height - thisPlayer.height - thisPlayer.bottomMargin + spaceY
      };
      thisPlayer.propellerFrameX = 0;
      thisPlayer.propellerFrameY = 0;
    };

    //  VELOCITY
    thisPlayer.velocity = {
      x: 0,
      y: 0
    };

    //  DRAW
    thisPlayer.draw = () => {
      c.save();
      c.globalAlpha = thisPlayer.opacity;
      c.drawImage(
        thisPlayer.image,
        thisPlayer.frameX * thisPlayer.spriteWidth,
        thisPlayer.frameY,
        thisPlayer.spriteWidth,
        thisPlayer.spriteHeight,
        thisPlayer.position.x,
        thisPlayer.position.y,
        thisPlayer.width,
        thisPlayer.height
      );
      c.drawImage(
        thisPlayer.imagePropeller,
        thisPlayer.propellerFrameX * thisPlayer.imagePropeller.spriteWidth,
        thisPlayer.propellerFrameY,
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
