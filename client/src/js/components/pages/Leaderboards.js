import { onValue } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
import { templates } from '../../settings.js';
import { scoresDB } from '../../firebase.js';

class Leaderboards {
  constructor(element) {
    const thisLeaderboards = this;

    thisLeaderboards.element = element;
    thisLeaderboards.render();
  }

  scoreList() {
    const leaderboardsList = document.querySelector('#leaderboards-list');

    onValue(scoresDB, (snapshot) => {
      let scoresArray = Object.values(snapshot.val());
      scoresArray.forEach((score) => {
        leaderboardsList.innerHTML += `
        <div class="leaderboards__container__list__element">
          <div>${score.name}</div>
          <div>${score.score}</div>
        </div>
        `;
      });
    });
  }

  render() {
    const thisLeaderboards = this;

    const generatedHTML = templates.leaderboardsWidget();
    thisLeaderboards.dom = {};
    thisLeaderboards.dom.wrapper = thisLeaderboards.element;
    thisLeaderboards.element.innerHTML = generatedHTML;
    this.scoreList();
  }
}

export default Leaderboards;
