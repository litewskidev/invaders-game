import { select } from '../../settings.js';
import Projectile from './Projectile.js';

class Enemy {
  constructor( enemyProp, {positionProp} ) {
    const thisEnemy = this;

    //  CANVAS
    const canvas = document.querySelector(select.play.canvas);
    const c = canvas.getContext('2d');

    //  IMAGE
    const image = new Image();
    image.src = `../../images/enemies/${enemyProp}.webp`;

    //  SIZE & POSITION
    image.onload = () => {
      let scale;
      if(window.innerWidth <= 540) {
        scale = .20;
      } else {
        scale = .40;
      }
      thisEnemy.image = image;
      thisEnemy.width = image.width * scale;
      thisEnemy.height = image.height * scale;
      thisEnemy.position = {
        x: positionProp.x,
        y: positionProp.y
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
      c.drawImage(
        thisEnemy.image,
        thisEnemy.position.x,
        thisEnemy.position.y,
        thisEnemy.width,
        thisEnemy.height
      );
    };

    thisEnemy.update = ( {velocity} ) => {
      if(thisEnemy.image) {
        thisEnemy.draw();
        thisEnemy.position.x += velocity.x;
        thisEnemy.position.y += velocity.y;
      }
    };

    thisEnemy.shoot = (enemyProjectiles) => {
      enemyProjectiles.push(new Projectile({
        position: {
          x: thisEnemy.position.x + (thisEnemy.width / 2),
          y: thisEnemy.position.y + thisEnemy.height
        },
        velocity: {
          x: 0,
          y: 5
        },
        style: 'red',
        radius: 3
      }));
    };
  }
}

export default Enemy;