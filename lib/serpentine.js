const Game = require("./game");

const GameView = require("./game_view");

document.addEventListener('DOMContentLoaded', function(){
  let g = new GameView();
  window.g = g;
  g.play();
}, false);
