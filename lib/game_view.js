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
  window.setInterval(function () {
    currView.game.step();
    window.addEventListener('mousemove', function (e) {
           this.x = e.pageX;
           this.y = e.pageY;
       })

    currView.ship.pos[0] = window.x;
    currView.ship.pos[1] = window.y;
    currView.frameNo += 1;
    window.frameNo = currView.frameNo;
 if (currView.frameNo == 1 || everyinterval(150)) {
     currView.game.addAsteroids(70);
 }
    currView.game.draw(currView.ctx);
  }, 20);
};

function everyinterval(n) {
    if ((this.frameNo / n) % 1 == 0) {return true;}
    return false;
}

GameView.prototype.stop = function() {
debugger;
        clearInterval(this.interval)
      };

module.exports = GameView;
