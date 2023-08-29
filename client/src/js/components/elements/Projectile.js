import { select } from '../../settings.js';

class Projectile {
  constructor( {position, velocity, site} ) {
    const thisProjectile = this;

    //  POSITION
    thisProjectile.position = position;
    thisProjectile.velocity = velocity;
    thisProjectile.site = site;

    //  CANVAS
    const canvas = document.querySelector(select.play.canvas);
    const c = canvas.getContext('2d');

    //  IMAGE
    const image = new Image();
    image.src = `../../images/projectiles/bullet_${site}.png`;
    image.onload = () => {
      let scale;
      if(window.innerWidth <= 540) {
        scale = .3;
      } else {
        scale = .4;
      }
      thisProjectile.image = image;
      thisProjectile.width = image.width * scale;
      thisProjectile.height = image.height * scale;
    };

    //  DRAW
    thisProjectile.draw = () => {
      c.drawImage(
        thisProjectile.image,
        thisProjectile.position.x,
        thisProjectile.position.y,
        thisProjectile.width,
        thisProjectile.height
      );
    };

    thisProjectile.update = () => {
      if(thisProjectile.image) {
        thisProjectile.draw();
        thisProjectile.position.x += thisProjectile.velocity.x;
        thisProjectile.position.y += thisProjectile.velocity.y;
      }
    };
  }
}

export default Projectile;
