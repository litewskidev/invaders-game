import { select } from '../../settings.js';

class Projectile {
  constructor({position, velocity, style}) {
    const thisProjectile = this;

    //  POSITION
    thisProjectile.position = position;
    thisProjectile.velocity = velocity;
    thisProjectile.radius = 2;

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
      c.fillStyle = style;
      c.fill();
      c.closePath();
    };

    thisProjectile.update = () => {
      thisProjectile.position.x += thisProjectile.velocity.x;
      thisProjectile.position.y += thisProjectile.velocity.y;
      thisProjectile.draw();
    };
  }
}

export default Projectile;
