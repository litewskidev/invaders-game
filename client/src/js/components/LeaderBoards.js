import { templates } from '../settings.js';

class LeaderBoards {
  constructor(element) {
    const thisLeaderBoards = this;

    thisLeaderBoards.element = element;
    thisLeaderBoards.render();
  }

  render() {
    const thisLeaderBoards = this;

    const generatedHTML = templates.leaderBoardsWidget();
    thisLeaderBoards.dom = {};
    thisLeaderBoards.dom.wrapper = thisLeaderBoards.element;
    thisLeaderBoards.element.innerHTML = generatedHTML;
  }
}

export default LeaderBoards;
