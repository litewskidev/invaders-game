export const select = {
  pages : {
    startGame: '#start-game',
    gamePlay: '#game-play',
    leaderBoards: '#leader-boards'
  },

  templateOf: {
    startGameWidget: '#template__startgame__widget',
    gamePlayWidget: '#template__gameplay__widget',
    leaderBoardsWidget: '#template__leaderboards__widget'
  },

  wrapperOf: {
    pages: '#pages',
    startGame: '.startgame__wrapper',
    gamePlay: '.gameplay__wrapper',
    LeaderBoards: '.leaderboards__wrapper'
  },
};

export const templates = {
  startGameWidget: Handlebars.compile(document.querySelector(select.templateOf.startGameWidget).innerHTML),
  gamePlayWidget: Handlebars.compile(document.querySelector(select.templateOf.gamePlayWidget).innerHTML),
  leaderBoardsWidget: Handlebars.compile(document.querySelector(select.templateOf.leaderBoardsWidget).innerHTML)
};
