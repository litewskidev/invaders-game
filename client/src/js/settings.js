export const select = {
  pages : {
    home: '#home',
    play: '#play',
    leaderboards: '#leaderboards'
  },

  templateOf: {
    homeWidget: '#template__home__widget',
    playWidget: '#template__play__widget',
    leaderboardsWidget: '#template__leaderboards__widget'
  },

  wrapperOf: {
    pages: '#pages',
    home: '.home__wrapper',
    play: '.play__wrapper',
    leaderboards: '.leaderboards__wrapper'
  },

  mainNav: {
    link: '.main__nav a'
  },

  home: {
    pageLinks: '.home-btn'
  },

  play: {
    canvas: 'canvas',
    score: '#score-qty',
    endScore: '#end-score',
    endModal: '#end-modal',
    pageLinks: '.play-btn'
  },

  leaderboards: {
    pageLinks: '.leaderboards-btn'
  },
};

export const classNames = {
  nav: {
    active: 'active'
  },

  pages: {
    active: 'active'
  }
};

export const templates = {
  homeWidget: Handlebars.compile(document.querySelector(select.templateOf.homeWidget).innerHTML),
  playWidget: Handlebars.compile(document.querySelector(select.templateOf.playWidget).innerHTML),
  leaderboardsWidget: Handlebars.compile(document.querySelector(select.templateOf.leaderboardsWidget).innerHTML)
};
