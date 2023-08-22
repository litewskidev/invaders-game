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

  nav: {
    links: '.main__nav a'
  }
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
