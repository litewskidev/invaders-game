import { select } from '../../settings.js';

class Background {
  constructor( {position, velocity, style, radius} ) {
    const Background = this;

    //  POSITION
    Background.position = position;
    Background.velocity = velocity;
    Background.style = style;
    Background.radius = radius;

    //  CANVAS
    const canvas = document.querySelector(select.play.canvas);
    const c = canvas.getContext('2d');

    //  DRAW
    Background.draw = () => {
      c.beginPath();
      c.arc(
        Background.position.x,
        Background.position.y,
        Background.radius,
        0,
        Math.PI * 2
      );
      c.fillStyle = Background.style;
      c.fill();
      c.closePath();
    };

    Background.update = () => {
      Background.draw();
      Background.position.x += Background.velocity.x;
      Background.position.y += Background.velocity.y;
    };
  }
}

export default Background;
