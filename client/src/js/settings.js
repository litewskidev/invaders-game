export const select = {
  pages: {
    home: '#home',
    play: '#play',
    leaderboards: '#leaderboards',
    instructions: '#instructions'
  },

  homeLinkIDs: {
    play: 'play',
    leaderboards: 'leaderboards',
    instructions: 'instructions'
  },

  templateOf: {
    homeWidget: '#template__home__widget',
    playWidget: '#template__play__widget',
    leaderboardsWidget: '#template__leaderboards__widget',
    instructionsWidget: '#template__instructions__widget'
  },

  wrapperOf: {
    pages: '#pages',
    home: '.home__wrapper',
    play: '.play__wrapper',
    leaderboards: '.leaderboards__wrapper',
    instructions: '.instructions__wrapper'
  },

  mainNav: {
    link: '.main__nav a'
  },

  home: {
    pageLinks: '.home-btn'
  },

  play: {
    canvas: 'canvas',
    startBanner: '#startgame-banner',
    resilienceBar: '#town',
    score: '#score-qty',
    scoreContainer: '#play-score',
    time: '#time',
    winTime: '#win-time',
    winModal: '#win-modal',
    endScore: '#end-score',
    endModal: '#end-modal',
    restartBtn: '#restart-btn',
    pageLinks: '.play-btn',
    healthBar: '#health',
    healthContainer: '#boss-bar',
    firebaseForm: {
      form: '#win-form',
      input: '#input-field-name',
      score: '#field-score'
    },
    mobile: {
      up: '#up',
      down: '#down',
      left: '#left',
      right: '#right',
      shoot: '#shoot'
    }
  },

  leaderboards: {
    pageLinks: '.leaderboards-btn',
    list: '#leaderboards-list'
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
  leaderboardsWidget: Handlebars.compile(document.querySelector(select.templateOf.leaderboardsWidget).innerHTML),
  instructionsWidget: Handlebars.compile(document.querySelector(select.templateOf.instructionsWidget).innerHTML)
};
