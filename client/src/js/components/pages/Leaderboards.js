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
      scoresArray.sort((a, b) => parseInt(a.score.replace(':','')) - parseInt(b.score.replace(':','')));
      scoresArray.slice(0, 10).forEach((score, p) => {
        leaderboardsList.innerHTML += `
        <div class="leaderboards__container__list__element__box box__${p + 1}">
          <div class="leaderboards__container__list__element__box__place">
            <p>#${p + 1}</p>
          </div>
          <div class="leaderboards__container__list__element">
            <div class="leaderboards__container__list__element__name">
              <p>${score.name}</p>
            </div>
            <div class="leaderboards__container__list__element__score">
              <p>${score.score}</p>
            </div>
          </div>
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
