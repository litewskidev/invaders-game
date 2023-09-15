import { classNames, select } from './settings.js';
import Home from './components/pages/Home.js';
import Play from './components/pages/Play.js';
import Leaderboards from './components/pages/Leaderboards.js';
import Instructions from './components/pages/Instructions.js';

const app = {

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

  initInstructions: function() {
    const thisApp = this;

    const instructionsWrapper = document.querySelector(select.wrapperOf.instructions);
    thisApp.instructions = new Instructions(instructionsWrapper);
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

        if(homeLinkId === select.homeLinkIDs.play) {
          thisApp.initPlay();
        }
        if (homeLinkId === select.homeLinkIDs.leaderboards) {
          thisApp.initLeaderboards();
        }
        if (homeLinkId === select.homeLinkIDs.instructions) {
          thisApp.initInstructions();
        }
      });
    }
  },

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

  init: function() {
    const thisApp = this;

    thisApp.initHome();
    thisApp.initBackHome();
  }
};

app.init();
