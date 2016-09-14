const Game = require("./game.js");

function GameView() {
  this.game = new Game();
  this.canvas = document.getElementById('game-canvas');
  this.canvas.style.cursor = "none"; //hide the original
  this.ctx = this.canvas.getContext("2d");
  this.ship = this.game.ship;
  this.frameNo = 0;

}

GameView.prototype.start = function(){
  let currView = this;
  this.currRound = window.setInterval(function () {
    currView.game.step();
    // currView.frameNo += 1;
    // window.frameNo = currView.frameNo;
 // if (currView.frameNo == 1 || everyinterval(150)) {
 //     currView.game.addAsteroids(70);
 // }
 // debugger;
    currView.game.draw(currView.ctx);
  }, 20);
};

// function everyinterval(n) {
//     if ((this.frameNo / n) % 1 == 0) {return true;}
//     return false;
// }


module.exports = GameView;
