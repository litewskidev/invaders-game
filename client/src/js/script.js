import Home from './components/Home.js';
import Leaderboards from './components/LeaderBoards.js';
import Play from './components/Play.js';
import { classNames, select } from './settings.js';

const app = {

  initPages: function() {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.wrapperOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');
    let pageMatchingHash = thisApp.pages[0].id;

    for(let page of thisApp.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for(let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');
        thisApp.activatePage(id);
        window.location.hash = '#/' + id;
      });
    }

  },

  activatePage: function(pageId) {
    const thisApp = this;

    for(let page of thisApp.pages) {
      page.classList.toggle(
        classNames.pages.active,
        page.id == pageId
      );
    }

    for(let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  initHome: function() {
    const thisApp = this;

    const homeWrapper = document.querySelector(select.wrapperOf.home);
    thisApp.home = new Home(homeWrapper);
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

  init: function() {
    const thisApp = this;

    thisApp.initPages();
    thisApp.initHome();
    thisApp.initPlay();
    thisApp.initLeaderboards();
  }
};

app.init();
