const Game = require("./game.js");

function GameView() {
  this.game = new Game({game_view: this, num_asteroids: 100, asteroid_color: "pink", vel: [-4,4]});
  this.canvas = document.getElementById('game-canvas');
  this.canvas.style.cursor = "none"; //hide the original
  this.ctx = this.canvas.getContext("2d");
  this.ship = this.game.ship;
  this.frameNo = 0;
  window.gamegame = this;
}

GameView.prototype.play = function(){
  let currView = this;
  this.currRound = window.setInterval(function () {
    currView.game.step();
    currView.frameNo += 1;
    window.frameNo = currView.frameNo;
 if (everyinterval(900)) {
     currView.game.asteroids = [];
     currView.game.addAsteroids(100, "yellow", [-5,5])
     currView.game.level += 1;
 }
 // debugger;
    currView.game.draw(currView.ctx);
  }, 20);
};

GameView.prototype.stop = function(){
  clearInterval(this.currRound);
}


GameView.prototype.reset = function() {
  debugger;
  this.ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
  this.game = new Game();
  this.canvas = document.getElementById('game-canvas');
  // this.canvas.style.cursor = "none"; //hide the original
  this.ctx = this.canvas.getContext("2d");
  this.ship = this.game.ship;
  this.frameNo = 0;
  window.gamegame = this;

}
function everyinterval(n) {
    if ((this.frameNo / n) % 1 == 0) {return true;}
    return false;
}

// window.game_view = GameView
module.exports = GameView;
