const Game = require("./game");

const GameView = require("./game_view");

document.addEventListener('DOMContentLoaded', function(){
  // let g = new GameView();
  // window.g = g;
  var beginButton = document.getElementById('start-button');
  beginButton.addEventListener("click", function() {
    var startScreen = document.getElementById('start');
    startScreen.parentNode.removeChild(startScreen);
    let g = new GameView();
    window.g = g;
    g.play();
  });
  // g.play();
}, false);
