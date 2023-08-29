import { select } from '../../settings.js';

class Background {
  constructor( {position, velocity, style, radius}, cloudsProp ) {
    const Background = this;

    //  POSITION
    Background.position = position;
    Background.velocity = velocity;
    Background.style = style;
    Background.radius = radius;

    //  CANVAS
    const canvas = document.querySelector(select.play.canvas);
    const c = canvas.getContext('2d');

    //  IMAGE
    const image = new Image();
    image.src = `../../images/clouds/cloud_shape_${cloudsProp}.png`;
    image.onload = () => {
      let scale;
      if(window.innerWidth <= 540) {
        scale = .4;
      } else {
        scale = .8;
      }
      Background.image = image;
      Background.width = image.width * scale;
      Background.height = image.height * scale;
    };

    //  DRAW
    Background.draw = () => {
      c.drawImage(
        Background.image,
        Background.position.x,
        Background.position.y,
        Background.width,
        Background.height
      );
    };

    Background.update = () => {
      if(Background.image){
        Background.draw();
        Background.position.x += Background.velocity.x;
        Background.position.y += Background.velocity.y;
      }
    };
  }
}

export default Background;
