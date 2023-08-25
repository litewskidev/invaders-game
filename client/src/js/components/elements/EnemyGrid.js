import { select } from '../../settings.js';
import Enemy from './Enemy.js';

class EnemyGrid {
  constructor() {
    const thisEnemyGrid = this;

    //  CANVAS
    const canvas = document.querySelector(select.play.canvas);

    //  ENEMIES
    let enemySpaceX;
    let enemySpaceY;
    let enemyColumns;
    let enemyRows;
    let enemyVelocity;

    if(window.innerWidth <= 540) {
      enemyColumns = Math.floor(Math.random() * 4 + 2);
      enemyRows = Math.floor(Math.random() * 2 + 2);
      enemySpaceX = 55;
      enemySpaceY = 50;
      enemyVelocity = 1;
    } else {
      enemyColumns = Math.floor(Math.random() * 8 + 5);
      enemyRows = Math.floor(Math.random() * 2 + 2);
      enemySpaceX = 105;
      enemySpaceY = 100;
      enemyVelocity = 4;
    }

    const randomEnemies = () => {
      let randomEnemy = Math.floor(Math.random() * 3) + 1;
      return randomEnemy;
    };

    thisEnemyGrid.enemies = [];
    for(let x = 0; x < enemyColumns; x++) {
      for(let y = 0; y < enemyRows; y++) {
        thisEnemyGrid.enemies.push(new Enemy(randomEnemies(), {positionProp: {
          x: x * enemySpaceX,
          y: y * enemySpaceY
        }}));
      }
    }

    //  POSITION & VELOCITY
    thisEnemyGrid.position = {
      x: 0,
      y: 0
    };
    thisEnemyGrid.velocity = {
      x: enemyVelocity,
      y: 0
    };

    //  GRID SIZE
    thisEnemyGrid.width = enemyColumns * enemySpaceX;

    //  DRAW
    thisEnemyGrid.update = () => {
      thisEnemyGrid.position.x += thisEnemyGrid.velocity.x;
      thisEnemyGrid.position.y += thisEnemyGrid.velocity.y;

      thisEnemyGrid.velocity.y = 0;

      if(thisEnemyGrid.position.x >= (canvas.width - thisEnemyGrid.width) || thisEnemyGrid.position.x <= 0) {
        thisEnemyGrid.velocity.x = -thisEnemyGrid.velocity.x;
        thisEnemyGrid.velocity.y = enemySpaceY;
      }
    };
  }
}

export default EnemyGrid;
