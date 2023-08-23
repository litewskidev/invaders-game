import { classNames, select } from './settings.js';
import Home from './components/Home.js';
import Play from './components/Play.js';
import Leaderboards from './components/LeaderBoards.js';

const app = {

  initBackHome: function() {
    const thisApp = this;

    thisApp.mainNavLink = document.querySelector(select.mainNav.link);
    thisApp.mainNavLink.addEventListener('click', function(event) {
      const clickedElement = this;
      event.preventDefault();

      const id = clickedElement.getAttribute('href').replace('#', '');
      thisApp.activatePage(id);
    });
  },

  activatePage: function(pageId) {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.wrapperOf.pages).children;
    for(let page of thisApp.pages) {
      page.classList.toggle(
        classNames.pages.active,
        page.id == pageId
      );
    }
  },

  initPlay: function() {
    const thisApp = this;

    const playWrapper = document.querySelector(select.wrapperOf.play);
    thisApp.play = new Play(playWrapper);
  },

  initLeaderboards: function() {
    const thisApp = this;

    const leaderboardsWrapper = document.querySelector(select.wrapperOf.leaderboards);
    thisApp.leaderboards = new Leaderboards(leaderboardsWrapper);
  },

  initHome: function() {
    const thisApp = this;

    const homeWrapper = document.querySelector(select.wrapperOf.home);
    thisApp.home = new Home(homeWrapper);

    thisApp.homeLinks = document.querySelectorAll(select.home.pageLinks);
    for(let homeLink of thisApp.homeLinks) {
      homeLink.addEventListener('click', function(e) {
        e.preventDefault();
        const clickedElem = this;

        const homeLinkId = clickedElem.getAttribute('href').replace('#', '');
        thisApp.activatePage(homeLinkId);

        if(homeLinkId === 'play') {
          thisApp.initPlay();
        }
        if (homeLinkId === 'leaderboards') {
          thisApp.initLeaderboards();
        }
      });
    }
  },

  init: function() {
    const thisApp = this;

    thisApp.initBackHome();
    thisApp.initHome();
  }
};

app.init();
