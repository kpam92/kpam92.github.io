const Asteroid = require("./asteroid.js");
const Ship = require("./ship.js");
const Dot = require("./dot.js")
function Game(options) {
  this.DIM_X = 1000;
  this.DIM_Y = 800;
  this.NUM_ASTEROIDS = 500;
  this.asteroids = [];
  window.asteroids = this.asteroids;
  this.addAsteroids(options.num_asteroids, options.asteroid_color, options.vel);
  this.ship = new Ship({pos: [0,0], game: this});
  this.dots = [];
  this.canvas = document.getElementById('game-canvas');
  this.canvas.style.cursor = "none";
  for (var i = 0; i < 500; i++) {
    var d = new Dot();
    this.dots.push(d);}
  this.game_view = options.game_view;
  this.options = options
  this.level = 0
  this.xi = 0;
  this.yi = 0;
  debugger;
}

Game.prototype.allObjects = function() {
  let allObs = this.asteroids.concat(this.ship);
  return allObs;
};

Game.prototype.addAsteroids = function(num, color, vel) {
  for (let idx = 0; idx < num; idx++){
    this.asteroids.push(new Asteroid({color: color, pos: this.randomPosition(), game: this, vel: vel}));
  }
};

Game.prototype.randomPosition = function() {
  return [((this.DIM_X * Math.random()) + 900), -(this.DIM_Y * Math.random())];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);

  window.addEventListener('mousemove', function (e) {
         this.x = e.pageX;
         this.y = e.pageY;
     })

  this.ship.pos[0] = window.x;
  this.ship.pos[1] = window.y;
  // let x = window.x;
  // let y = window.y;
  // debugger;
  let dots = this.dots;
  this.xi = window.x || 0;
  this.yi = window.y || 0;

  let that = this;
  dots.forEach(function(dot,index, dots) {
    var nextDot = dots[index + 1] || dots[1];

    dot.x = that.xi;
    dot.y = that.yi;
    dot.draw();
    that.xi += (nextDot.x - dot.x) * .6;
    that.yi += (nextDot.y - dot.y) * .6;

  });
  this.allObjects().forEach( function (asteroid) {
    asteroid.draw(ctx);
  });
};


Game.prototype.moveObjects = function() {
  let that = this;
  this.allObjects().forEach( function(asteroid) {
    if ((asteroid.pos[0] < 0) || (asteroid.pos[1] > 800)) {
      that.addAsteroids(1, asteroid.color, asteroid.vel);
      that.remove(asteroid);
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
      debugger;
      that.game_view.reset()
    }
  });
};

Game.prototype.reset = function() {
  this.asteroids = [];
  this.addAsteroids(100, this.options.asteroid_color, this.options.vel);

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
