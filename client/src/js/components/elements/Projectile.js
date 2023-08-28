import { select } from '../../settings.js';

class Projectile {
  constructor({position, velocity, style, radius}) {
    const thisProjectile = this;

    //  POSITION
    thisProjectile.position = position;
    thisProjectile.velocity = velocity;
    thisProjectile.style = style;
    thisProjectile.radius = radius;

    //  CANVAS
    const canvas = document.querySelector(select.play.canvas);
    const c = canvas.getContext('2d');

    //  DRAW
    thisProjectile.draw = () => {
      c.beginPath();
      c.arc(
        thisProjectile.position.x,
        thisProjectile.position.y,
        thisProjectile.radius,
        0,
        Math.PI * 2
      );
      c.fillStyle = thisProjectile.style;
      c.fill();
      c.closePath();
    };

    thisProjectile.update = () => {
      thisProjectile.draw();
      thisProjectile.position.x += thisProjectile.velocity.x;
      thisProjectile.position.y += thisProjectile.velocity.y;
    };
  }
}

export default Projectile;
