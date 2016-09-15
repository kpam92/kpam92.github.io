const Game = require("./game.js");

function GameView() {
  this.DIM_X = 1000;
  this.DIM_Y = 800;
  this.game = new Game({game_view: this, num_asteroids: 100, asteroid_color: "pink", vel: [-4,4]});
  this.canvas = document.getElementById('game-canvas');
  this.canvas.style.cursor = "none"; //hide the original
  this.ctx = this.canvas.getContext("2d");
  this.ship = this.game.ship;
  this.dots = this.game.dots;
  this.frameNo = 0;
  window.gamegame = this;
  this.levels = [[100, "pink", [-4,4]],[120, "yellow", [-5,5]],[150, "red", [-6,6]],[120, "purple", [-7,7]]]
}

GameView.prototype.play = function(){
  let currView = this;
  this.currRound = window.setInterval(function () {
    currView.game.step();
    currView.frameNo += 1;
    window.frameNo = currView.frameNo;
 if (everyinterval(900)) {
     currView.game.asteroids = [];
     currView.game.level += 1;
     var currLevel = currView.levels[currView.game.level]
     currView.game.addAsteroids(currLevel[0],currLevel[1],currLevel[2])
 }
 // debugger;
    currView.game.draw(currView.ctx);
  }, 20);
};

GameView.prototype.stop = function(){
  clearInterval(this.currRound);
}


GameView.prototype.reset = function() {
  this.game.dots = [];
  this.ctx.clearRect(0,0,this.game.DIM_X, this.game.DIM_Y);
  this.game = new Game({game_view: this, num_asteroids: 100, asteroid_color: "pink", vel: [-4,4]});
  this.canvas = document.getElementById('game-canvas');
  this.canvas.style.cursor = "none"; //hide the original
  this.ctx = this.canvas.getContext("2d");
  this.ship = this.game.ship;
  this.frameNo = 0;
  window.gamegame = this;
  this.levels = [[100, "pink", [-4,4]],[100, "yellow", [-5,5]],[100, "red", [-6,6]]]

}
function everyinterval(n) {
    if ((this.frameNo / n) % 1 == 0) {return true;}
    return false;
}

// window.game_view = GameView
module.exports = GameView;
