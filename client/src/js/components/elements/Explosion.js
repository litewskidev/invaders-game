import { select } from '../../settings.js';

class Explosion {
  constructor({position, velocity, style, radius}) {
    const thisExplosion = this;

    //  POSITION
    thisExplosion.position = position;
    thisExplosion.velocity = velocity;
    thisExplosion.style = style;
    thisExplosion.radius = radius;
    thisExplosion.opacity = 1;

    //  CANVAS
    const canvas = document.querySelector(select.play.canvas);
    const c = canvas.getContext('2d');

    //  DRAW
    thisExplosion.draw = () => {
      c.save();
      c.globalAlpha = thisExplosion.opacity;
      c.beginPath();
      c.arc(
        thisExplosion.position.x,
        thisExplosion.position.y,
        thisExplosion.radius,
        0,
        Math.PI * 2
      );
      c.fillStyle = thisExplosion.style;
      c.fill();
      c.closePath();
      c.restore();
    };

    thisExplosion.update = () => {
      thisExplosion.draw();
      thisExplosion.position.x += thisExplosion.velocity.x;
      thisExplosion.position.y += thisExplosion.velocity.y;
      thisExplosion.opacity -= .008;

    };
  }
}

export default Explosion;
