const Asteroid = require("./asteroid.js");
const Ship = require("./ship.js");
const Dot = require("./dot.js")
function Game() {
  this.DIM_X = 1000;
  this.DIM_Y = 800;
  this.NUM_ASTEROIDS = 500;
  this.asteroids = [];
  window.asteroids = this.asteroids;
  this.addAsteroids(50);
  this.ship = new Ship({pos: this.randomPosition(), game: this});
  this.dots = [];
  for (var i = 0; i < 12; i++) {
    var d = new Dot();
    this.dots.push(d);}
}

Game.prototype.allObjects = function() {
  let allObs = this.asteroids.concat(this.ship);
  return allObs;
};

Game.prototype.addAsteroids = function(num) {
  for (let idx = 0; idx < num; idx++){
    this.asteroids.push(new Asteroid({pos: this.randomPosition(), game: this}));
  }
};

Game.prototype.randomPosition = function() {
  return [((this.DIM_X * Math.random()) + 900), -(this.DIM_Y * Math.random())];
};

Game.prototype.draw = function(ctx, x, y) {
  ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);


  // let x = window.x;
  // let y = window.y;
  let dots = this.dots;
  dots.forEach(function(dot,index, dots) {
    debugger;
    var nextDot = dots[index + 1] || dots[0];

    dot.x = x;
    dot.y = y;
    dot.draw();
    x += (nextDot.x - dot.x) * .6;
    y += (nextDot.y - dot.y) * .6;

  });
  this.allObjects().forEach( function (asteroid) {
    asteroid.draw(ctx);
  });
};


Game.prototype.moveObjects = function() {
  let that = this;
  this.allObjects().forEach( function(asteroid) {
    if ((asteroid.pos[0] < 0) || (asteroid.pos[1] > 800)) {
      that.remove(asteroid);
      that.addAsteroids(1);
    } else {
      asteroid.move();
    }
  });
};


Game.prototype.checkCollisions = function() {
  let currGame = this;
  let ship = this.ship;
  let that = this;
  this.asteroids.forEach(function(asteroid) {
    if (asteroid.isCollidedWith(ship)) {
      alert("WOKFJKDJFKDJFKDJF")
      that.reset()
    }
  });
};

Game.prototype.reset = function() {
  this.asteroids = [];
  this.addAsteroids(50);

}

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function(asteroid){
  let astrPos = this.asteroids.indexOf(asteroid);
  this.asteroids.splice(astrPos, 1);
};

module.exports = Game;
