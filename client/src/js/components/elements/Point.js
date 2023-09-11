import { select } from '../../settings.js';

class Point {
  constructor( {position} ) {
    const thisPoint = this;

    thisPoint.position = position;

    //  CANVAS
    const canvas = document.querySelector(select.play.canvas);
    const c = canvas.getContext('2d');

    //  IMAGE
    const image = new Image();
    image.src = '../../images/points/points_strip.png';

    image.onload = () => {
      let scale;
      if(window.innerWidth <= 540) {
        scale = .35;
      } else {
        scale = .7;
      }
      thisPoint.image = image;
      thisPoint.spriteWidth = 67.66;
      thisPoint.spriteHeight = 75;
      thisPoint.width = thisPoint.spriteWidth * scale;
      thisPoint.height = thisPoint.spriteHeight * scale;
      thisPoint.position = {
        x: thisPoint.position.x,
        y: thisPoint.position.y
      };
      thisPoint.frameX = 0;
      thisPoint.frameY = 0;
    };

    //  GAME FRAMES
    let gameFrame = 0;
    const frameBuffer = 5;

    //  VELOCITY
    thisPoint.velocity = {
      x: 0,
      y: 1.5
    };

    //  DRAW
    thisPoint.draw = () => {
      c.drawImage(
        thisPoint.image,
        thisPoint.frameX * thisPoint.spriteWidth,
        thisPoint.frameY,
        thisPoint.spriteWidth,
        thisPoint.spriteHeight,
        thisPoint.position.x,
        thisPoint.position.y,
        thisPoint.width,
        thisPoint.height
      );
    };

    thisPoint.update = () => {
      if(thisPoint.image) {
        /*  //  hitbox
        c.fillStyle = 'rgba(0, 255, 0, 0.2)';
        c.fillRect(thisPoint.position.x, thisPoint.position.y, thisPoint.width, thisPoint.height);
        */
        thisPoint.draw();
        thisPoint.position.x += thisPoint.velocity.x;
        thisPoint.position.y += thisPoint.velocity.y;
        if(gameFrame % frameBuffer === 0) {
          if (thisPoint.frameX < 14) {
            thisPoint.frameX++;
          } else {
            thisPoint.frameX = 0;
          }
        }
      }

      gameFrame ++;
    };
  }
}

export default Point;
