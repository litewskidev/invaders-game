import { templates } from '../settings.js';

class StartGame {
  constructor(element) {
    const thisStartGame = this;

    thisStartGame.element = element;
    thisStartGame.render();
  }

  render() {
    const thisStartGame = this;

    const generatedHTML = templates.startGameWidget();
    thisStartGame.dom = {};
    thisStartGame.dom.wrapper = thisStartGame.element;
    thisStartGame.element.innerHTML = generatedHTML;
  }
}

export default StartGame;
