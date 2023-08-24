import Enemy from './Enemy.js';

class EnemyGrid {
  constructor() {
    const thisEnemyGrid = this;

    //  POSITION & VELOCITY
    thisEnemyGrid.position = {
      x: 0,
      y: 0
    };
    thisEnemyGrid.velocity = {
      x:0,
      y:0
    };

    //  ENEMIES
    const enemyOne = 1;
    const enemyTwo = 2;
    const enemyThree = 3;
    const enemyFour = 4;
    const enemyBoss = 'boss';
    let enemySpaceX;
    let enemySpaceY;
    let enemyNumberX;
    let enemyNumberY;
    if(window.innerWidth <= 540) {
      enemyNumberX = 5;
      enemyNumberY = 3;
      enemySpaceX = 60;
      enemySpaceY = 55;
    } else {
      enemyNumberX = 10;
      enemyNumberY = 5;
      enemySpaceX = 110;
      enemySpaceY = 100;
    }

    thisEnemyGrid.enemies = [];
    for(let x = 0; x < enemyNumberX; x++) {
      for(let y = 0; y < enemyNumberY; y++) {
        thisEnemyGrid.enemies.push(new Enemy(enemyThree, {position: {
          x: x * enemySpaceX,
          y: y * enemySpaceY
        }}));
      }
    }

    //  DRAW
    thisEnemyGrid.update = () => {

    };
  }
}

export default EnemyGrid;
