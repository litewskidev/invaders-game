import { select } from '../../settings.js';

class Projectile {
  constructor( {position, velocity, style, radius, site}) {
    const thisProjectile = this;

    //  POSITION
    thisProjectile.position = position;
    thisProjectile.velocity = velocity;
    thisProjectile.style = style;
    thisProjectile.radius = radius;
    thisProjectile.site = site;

    //  CANVAS
    const canvas = document.querySelector(select.play.canvas);
    const c = canvas.getContext('2d');

    //  IMAGE
    const image = new Image();
    image.src = `../../images/projectiles/bullet_2_yellow_01.png`;
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
      if(thisProjectile.site === 'enemy') {
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
      }
      if(thisProjectile.site === 'player') {
        c.drawImage(
          thisProjectile.image,
          thisProjectile.position.x,
          thisProjectile.position.y,
          thisProjectile.width,
          thisProjectile.height
        );
      }
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
