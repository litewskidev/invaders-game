import { select } from '../../settings.js';
import Projectile from './Projectile.js';

class Boss {
  constructor() {
    const thisBoss = this;

    let bossVel;
    let scale;
    if(window.innerWidth <= 540) {
      scale = .40;
      bossVel = 1;
    } else {
      scale = .80;
      bossVel = 3.5;
    }

    //  CANVAS
    const canvas = document.querySelector(select.play.canvas);
    const c = canvas.getContext('2d');

    //  IMAGE
    const image = new Image();
    image.src = `../../images/enemies/boss.png`;

    //  SIZE & POSITION
    image.onload = () => {
      thisBoss.image = image;
      thisBoss.width = image.width * scale;
      thisBoss.height = image.height * scale;
      thisBoss.position = {
        x: canvas.width / 2 - thisBoss.width / 2,
        y: 100
      };
    };

    // VELOCITY
    thisBoss.velocity = {
      x: bossVel,
      y: bossVel
    };

    //  DRAW
    thisBoss.draw = () => {
      c.drawImage(
        thisBoss.image,
        thisBoss.position.x,
        thisBoss.position.y,
        thisBoss.width,
        thisBoss.height
      );
    };

    thisBoss.update = () => {
      if(thisBoss.image) {
        /*  //  hitbox
        c.fillStyle = 'rgba(255, 0, 0, 0.2)';
        c.fillRect(thisBoss.position.x, thisBoss.position.y, thisBoss.width, thisBoss.height);
        */
        thisBoss.draw();
        thisBoss.position.x += thisBoss.velocity.x;
        thisBoss.position.y += thisBoss.velocity.y;
        if(thisBoss.position.x >= (canvas.width - thisBoss.width) || thisBoss.position.x <= 0) {
          thisBoss.velocity.x = -thisBoss.velocity.x;
        } else if(thisBoss.position.y >= (canvas.height - thisBoss.height) || thisBoss.position.y <= 0) {
          thisBoss.velocity.y = -thisBoss.velocity.y;
        }
      }
    };

    thisBoss.shoot = (enemyProjectiles) => {
      enemyProjectiles.push(new Projectile({
        position: {
          x: thisBoss.position.x + (thisBoss.width / 2),
          y: thisBoss.position.y + (thisBoss.height / 2)
        },
        velocity: {
          x: 0,
          y: 5
        },
        site: 'enemy'
      }));
      enemyProjectiles.push(new Projectile({
        position: {
          x: thisBoss.position.x + (thisBoss.width / 2),
          y: thisBoss.position.y + (thisBoss.height / 2)
        },
        velocity: {
          x: 0,
          y: -5
        },
        site: 'enemy',
        rotation: 3.12
      }));
      enemyProjectiles.push(new Projectile({
        position: {
          x: thisBoss.position.x + (thisBoss.width / 2),
          y: thisBoss.position.y + (thisBoss.height / 2)
        },
        velocity: {
          x: 5,
          y: 0
        },
        site: 'enemy',
        rotation: -1.56
      }));
      enemyProjectiles.push(new Projectile({
        position: {
          x: thisBoss.position.x + (thisBoss.width / 2),
          y: thisBoss.position.y + (thisBoss.height / 2)
        },
        velocity: {
          x: -5,
          y: 0
        },
        site: 'enemy',
        rotation: 1.56
      }));
    };
  }
}

export default Boss;
