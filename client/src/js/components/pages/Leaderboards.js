import { templates } from '../../settings.js';

class Leaderboards {
  constructor(element) {
    const thisLeaderboards = this;

    thisLeaderboards.element = element;
    thisLeaderboards.render();
  }

  render() {
    const thisLeaderboards = this;

    const generatedHTML = templates.leaderboardsWidget();
    thisLeaderboards.dom = {};
    thisLeaderboards.dom.wrapper = thisLeaderboards.element;
    thisLeaderboards.element.innerHTML = generatedHTML;
  }
}

export default Leaderboards;
