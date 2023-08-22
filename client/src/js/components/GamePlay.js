import { templates } from '../settings.js';

class GamePlay {
  constructor(element) {
    const thisGamePlay = this;

    thisGamePlay.element = element;
    thisGamePlay.render();
  }

  render() {
    const thisGamePlay = this;

    const generatedHTML = templates.gamePlayWidget();
    thisGamePlay.dom = {};
    thisGamePlay.dom.wrapper = thisGamePlay.element;
    thisGamePlay.element.innerHTML = generatedHTML;
  }
}

export default GamePlay;
