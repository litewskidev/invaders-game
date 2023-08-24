import { select } from '../../settings.js';

class Enemy {
  constructor(enemy, {position} ) {
    const thisEnemy = this;

    //  CANVAS
    thisEnemy.canvas = document.querySelector(select.play.canvas);
    thisEnemy.c = thisEnemy.canvas.getContext('2d');

    //  IMAGE
    const image = new Image();
    image.src = `../../images/enemies/${enemy}.webp`;

    //  SIZE & POSITION
    image.onload = () => {
      let scale;
      if(window.innerWidth <= 540) {
        scale = .25;
      } else {
        scale = .45;
      }
      thisEnemy.image = image;
      thisEnemy.width = image.width * scale;
      thisEnemy.height = image.height * scale;
      thisEnemy.position = {
        x: position.x,
        y: position.y
      };
    };

    //  ROTATION & VELOCITY
    thisEnemy.rotation = 0;
    thisEnemy.velocity = {
      x: 0,
      y: 0
    };

    //  DRAW
    thisEnemy.draw = () => {
      thisEnemy.c.save();

      thisEnemy.c.translate(
        thisEnemy.position.x + thisEnemy.width / 2,
        thisEnemy.position.y + thisEnemy.height / 2
      );

      thisEnemy.c.rotate(thisEnemy.rotation);

      thisEnemy.c.translate(
        -thisEnemy.position.x - thisEnemy.width / 2,
        -thisEnemy.position.y - thisEnemy.height / 2
      );

      thisEnemy.c.drawImage(
        thisEnemy.image,
        thisEnemy.position.x,
        thisEnemy.position.y,
        thisEnemy.width,
        thisEnemy.height
      );

      thisEnemy.c.restore();
    };

    thisEnemy.update = () => {
      if(thisEnemy.image) {
        thisEnemy.draw();
        thisEnemy.position.x += thisEnemy.velocity.x;
        thisEnemy.position.y += thisEnemy.velocity.y;
      }
    };
  }
}

export default Enemy;