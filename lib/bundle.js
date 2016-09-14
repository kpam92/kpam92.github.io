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

	const Game = __webpack_require__(1);

	const GameView = __webpack_require__(7);

	document.addEventListener('DOMContentLoaded', function(){
	  let g = new GameView();
	  window.g = g;
	  g.start();
	}, false);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(2);
	const Ship = __webpack_require__(4);
	const Dot = __webpack_require__(6)
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const Ship = __webpack_require__(4);
	const MovingObject = __webpack_require__(5);

	function Asteroid(options) {
	  let defaultOptions = {color: "#A0A0A0", radius: this.randomRadius(), vel: Util.randomVec()};
	  Object.assign(defaultOptions, options);
	  MovingObject.call(this, defaultOptions);
	}

	Util.inherits(Asteroid,MovingObject);

	// Asteroid.prototype.collideWith = function(otherObject) {
	//   if (otherObject instanceof Ship && this.isCollidedWith(otherObject)) {
	//     return true;
	//   }
	// };

	Asteroid.prototype.randomRadius = function() {
	  return Math.random() * (7 - 2) + 2;
	}
	module.exports = Asteroid;


/***/ },
/* 3 */
/***/ function(module, exports) {

	const Util = {};

	Util.inherits = function(child, parent) {
	  let Surrogate = function () {};
	  Surrogate.prototype = parent.prototype;
	  child.prototype = new Surrogate();
	  child.prototype.constructor = child;
	};

	Util.randomVec = function() {
	  return [-5, 5];
	  // return [5 * Math.random() * a, 5 * Math.random() * b];
	};

	Util.distance = function(pos1,pos2) {
	  return Math.sqrt(Math.pow(pos2[0] - pos1[0],2) +  Math.pow(pos2[1] - pos1[1], 2));
	};
	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(5);
	const Util = __webpack_require__(3);

	function Ship(options) {
	  let defaultOptions = {color: "#38A217", radius: 6, vel: [0, 0]};
	  Object.assign(defaultOptions, options);
	  MovingObject.call(this, defaultOptions);
	}

	Util.inherits(Ship, MovingObject);


	module.exports = Ship;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	let Util = __webpack_require__(3);

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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	
	const Util = __webpack_require__(3);

	function Dot() {
	  this.x = 0;
	  this.y = 0;
	  this.node = (function(){
	    var n = document.createElement("div");
	    n.className = "trail";
	    document.body.appendChild(n);
	    return n;
	  }());
	}

	Dot.prototype.draw = function() {
	  this.node.style.left = this.x + "px";
	  this.node.style.top = this.y + "px";
	};


	module.exports = Dot;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);

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
	    // window.frameNo = currView.frameNo;
	 // if (currView.frameNo == 1 || everyinterval(150)) {
	 //     currView.game.addAsteroids(70);
	 // }
	 // debugger;
	    currView.game.draw(currView.ctx, window.x, window.y);
	  }, 20);
	};

	function everyinterval(n) {
	    if ((this.frameNo / n) % 1 == 0) {return true;}
	    return false;
	}


	module.exports = GameView;


/***/ }
/******/ ]);