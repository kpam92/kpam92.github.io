/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);

	const GameView = __webpack_require__(1);

	document.addEventListener('DOMContentLoaded', function(){
	  let g = new GameView();
	  g.start();
	}, false);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);

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
	    window.addEventListener('mousemove', function (e) {
	           this.x = e.pageX;
	           this.y = e.pageY;
	       })

	    currView.ship.pos[0] = window.x;
	    currView.ship.pos[1] = window.y;

	    currView.game.step();
	    currView.game.draw(currView.ctx);
	  }, 20);
	};

	GameView.prototype.bindKeyHandlers = function() {
	  key('a', function(){ this.game.ship.power() });
	};

	module.exports = GameView;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);
	const Ship = __webpack_require__(5);

	function Game() {
	  this.DIM_X = 1000;
	  this.DIM_Y = 800;
	  this.NUM_ASTEROIDS = 5;
	  this.asteroids = [];
	  for (let idx = 0; idx < this.NUM_ASTEROIDS; idx++){
	    this.addAsteroids();
	  }
	  this.ship = new Ship({pos: this.randomPosition(), game: this});
	}

	Game.prototype.allObjects = function() {
	  let allObs = this.asteroids.concat(this.ship);
	  return allObs;
	};

	Game.prototype.addAsteroids = function() {
	  this.asteroids.push(new Asteroid({pos: this.randomPosition(), game: this}));
	};

	Game.prototype.randomPosition = function() {
	  return [this.DIM_X * Math.random(), this.DIM_Y * Math.random()];
	};

	Game.prototype.draw = function(ctx) {
	  ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
	  window.addEventListener('mousemove', function (e) {
	            this.x = e.pageX;
	            this.y = e.pageY;
	        })
	        if (this.x && this.y) {
	        this.ship.x = this.x;
	        this.ship.y = this.y;
	    }
	  this.allObjects().forEach( function (asteroid) {
	    asteroid.draw(ctx);
	  });
	};

	Game.prototype.moveObjects = function() {
	  this.allObjects().forEach( function(asteroid) {
	    asteroid.move();
	  });
	};

	Game.prototype.wrap = function(pos) {
	  let x = pos[0];
	  x = (x > this.DIM_X) ? 0 : x;
	  x = (x < 0) ? this.DIM_X : x;
	  let y = pos[1];
	  y = (y > this.DIM_Y) ? 0 : y;
	  y = (y < 0) ? this.DIM_Y : y;
	  return [x, y];
	};

	Game.prototype.checkCollisions = function() {
	  let currGame = this;
	  this.allObjects().forEach(function(ob1) {
	    currGame.allObjects().forEach(function(ob2) {
	      if (ob1 !== ob2) {
	        ob1.collideWith(ob2);
	      }
	    });
	  });
	};

	Game.prototype.step = function() {
	  this.moveObjects();
	  this.checkCollisions();
	};

	Game.prototype.remove = function(asteroid){
	  let astrPos = this.asteroids.indexOf(asteroid);
	  this.asteroids.splice(astrPos, 1);
	};

	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const Ship = __webpack_require__(5);
	const MovingObject = __webpack_require__(6);

	function Asteroid(options) {
	  let defaultOptions = {color: "#808080", radius: 15, vel: Util.randomVec()};
	  Object.assign(defaultOptions, options);
	  MovingObject.call(this, defaultOptions);
	}

	Util.inherits(Asteroid,MovingObject);

	Asteroid.prototype.collideWith = function(otherObject) {
	  if (otherObject instanceof Ship && this.isCollidedWith(otherObject)) {
	    otherObject.relocate();
	  }
	};

	module.exports = Asteroid;


/***/ },
/* 4 */
/***/ function(module, exports) {

	const Util = {};

	Util.inherits = function(child, parent) {
	  let Surrogate = function () {};
	  Surrogate.prototype = parent.prototype;
	  child.prototype = new Surrogate();
	  child.prototype.constructor = child;
	};

	Util.randomVec = function() {
	  let a = Math.random();
	  let b = Math.random();
	  a = (a > 0.5) ? 1 : -1;
	  b = (b > 0.5) ? 1 : -1;
	  return [5 * Math.random() * a, 5 * Math.random() * b];
	};

	Util.distance = function(pos1,pos2) {
	  return Math.sqrt(Math.pow(pos2[0] - pos1[0],2) +  Math.pow(pos2[1] - pos1[1], 2));
	};
	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(6);
	const Util = __webpack_require__(4);

	function Ship(options) {
	  let defaultOptions = {color: "#800000", radius: 15, vel: [0, 0]};
	  Object.assign(defaultOptions, options);
	  MovingObject.call(this, defaultOptions);
	}

	Util.inherits(Ship, MovingObject);

	Ship.prototype.relocate = function() {
	  this.pos = this.game.randomPosition();
	  this.vel = [0, 0];
	};

	Ship.prototype.power = function(impulse) {
	  //TODO
	};

	module.exports = Ship;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	let Util = __webpack_require__(4);

	function MovingObject(options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
	  this.game = options.game;
	}

	MovingObject.prototype.draw = function(ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();

	  ctx.arc(
	    this.pos[0],
	    this.pos[1],
	    this.radius,
	    0,
	    2 * Math.PI,
	    false
	  );

	  ctx.fill();
	};

	MovingObject.prototype.move = function() {
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	  this.pos = this.game.wrap(this.pos);
	};

	MovingObject.prototype.isCollidedWith = function(otherObject) {
	  let radialDist = this.radius + otherObject.radius;
	  return (Util.distance(this.pos,otherObject.pos) < radialDist);
	};


	MovingObject.prototype.collideWith = function(otherObject) {
	  // if (this.isCollidedWith(otherObject)) {

	    // this.game.remove(otherObject);
	    // this.game.remove(this);
	  // }
	};

	module.exports = MovingObject;


/***/ }
/******/ ]);