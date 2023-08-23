import { select } from '../../settings.js';

class Projectile {
  constructor({position, velocity}) {
    const thisProjectile = this;

    //  POSITION
    thisProjectile.position = position;
    thisProjectile.velocity = velocity;
    thisProjectile.radius = 3;

    //  CANVAS
    thisProjectile.canvas = document.querySelector(select.play.canvas);
    thisProjectile.c = thisProjectile.canvas.getContext('2d');

    //  DRAW
    thisProjectile.draw = () => {
      thisProjectile.c.beginPath();
      thisProjectile.c.arc(
        thisProjectile.position.x,
        thisProjectile.position.y,
        thisProjectile.radius,
        0,
        Math.PI * 2
      );
      thisProjectile.c.fillStyle = 'white';
      thisProjectile.c.fill();
      thisProjectile.c.closePath();
    };

    thisProjectile.update = () => {
      thisProjectile.draw();
      thisProjectile.position.x += thisProjectile.velocity.x;
      thisProjectile.position.y += thisProjectile.velocity.y;
    };
  }
}

export default Projectile;
