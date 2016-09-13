const Game = require("./game.js");

function GameView() {
  this.game = new Game();
  this.canvas = document.getElementById('game-canvas');
  this.canvas.style.cursor = "none"; //hide the original
  // this.canvas.width = Game.DIM_X;
  // this.canvas.height = Game.DIM_Y;
  this.ctx = this.canvas.getContext("2d");
  this.ship = this.game.ship;
}

GameView.prototype.start = function(){
  let currView = this;
  window.setInterval(function () {
    currView.game.step();
    window.addEventListener('mousemove', function (e) {
           this.x = e.pageX;
           this.y = e.pageY;
       })

    currView.ship.pos[0] = window.x;
    currView.ship.pos[1] = window.y;

    currView.game.draw(currView.ctx);
  }, 20);
};

GameView.prototype.bindKeyHandlers = function() {
  key('a', function(){ this.game.ship.power() });
};

module.exports = GameView;
