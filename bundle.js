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

	const GameView = __webpack_require__(8);

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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(2);
	const Ship = __webpack_require__(4);
	const Dot = __webpack_require__(6)
	const Sound = __webpack_require__(7)

	function Game(options) {
	  this.DIM_X = 1000;
	  this.DIM_Y = 700;
	  this.NUM_ASTEROIDS = 500;
	  this.asteroids = [];
	  window.asteroids = this.asteroids;
	  this.addAsteroids(options.num_asteroids, options.asteroid_color, options.vel);
	  this.ship = new Ship({pos: [0,0], game: this});
	  this.dots = [];
	  this.canvas = document.getElementById('game-canvas');
	  this.canvas.style.cursor = "none";
	  for (var i = 0; i < 60; i++) {
	    var d = new Dot();
	    this.dots.push(d);}
	  this.game_view = options.game_view;
	  this.options = options
	  this.level = 0
	  this.xi = 0;
	  this.yi = 0;
	  this.score = 0;
	  this.backgroundMusic = new Sound("./lib/appeals.wav")
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
	  return [((this.DIM_X * Math.random()) + 700), -(this.DIM_Y * Math.random())];
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
	    if ((asteroid.pos[0] < 0) || (asteroid.pos[1] > 700)) {
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
	  let crashed = false;
	  this.asteroids.forEach(function(asteroid) {
	    if (asteroid.isCollidedWith(ship)) {
	      crashed = true;
	    }
	  });
	  return crashed;
	};

	Game.prototype.checkIfInBoundaries = function() {

	  if (this.ship.pos[0] < 0 || this.ship.pos[0] >=1000 || this.ship.pos[1] >= 700) {
	    return true;
	  }
	  return false;
	}


	Game.prototype.step = function() {
	  let that = this;
	  this.moveObjects();
	  if (this.checkCollisions() || this.checkIfInBoundaries() ) {
	    that.game_view.game_over();


	  }
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
	  let defaultOptions = {radius: this.randomRadius(), vel: options.vel};
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

	  var c = document.getElementById("game-canvas");
	  var ctx = c.getContext("2d");
	  var my_gradient = ctx.createLinearGradient(0, 0, 0, 170);
	  my_gradient.addColorStop(0, "green");
	  my_gradient.addColorStop(1, "steelblue");;

	  let defaultOptions = {color: my_gradient, radius: 6, vel: [0, 0]};
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
	  ctx.shadowColor="grey";
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
/***/ function(module, exports) {

	
	function Sound(src) {
	  this.sound = document.createElement("audio");
	  this.sound.src = src;
	  this.sound.setAttribute("preload", "auto");
	  this.sound.setAttribute("controls", "none");
	  this.sound.style.display = "none";
	  document.body.appendChild(this.sound);

	}


	Sound.prototype.play = function(){
	        this.sound.play();
	    }
	Sound.prototype.stop = function(){
	        this.sound.pause();
	    }

	module.exports = Sound;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const Sound = __webpack_require__(7);

	function GameView() {
	  this.DIM_X = 1000;
	  this.DIM_Y = 700;
	  this.game = new Game({game_view: this, num_asteroids: 100, asteroid_color: "pink", vel: [-4,4]});
	  this.canvas = document.getElementById('game-canvas');
	  // this.canvas.style.cursor = "none"; //hide the original
	  this.ctx = this.canvas.getContext("2d");
	  this.ship = this.game.ship;
	  this.dots = this.game.dots;
	  this.score = this.game.score;
	  this.paused = false;
	  this.frameNo = 0;
	  window.gamegame = this;
	  // this.levels = [[100, "pink", [-4,4]],[100, "yellow", [-5,5]],[100, "red", [-6,6]]]
	  this.levels =
	  [[100, "pink", [-4,4]],
	  [120,"yellow", [-5,5]],
	  [150, "red", [-6,6]],
	  [120, "orange", [-7,7]],
	  [120, "purple", [-8,8]],
	  [120, "steelblue", [-9,9]],
	  [120, "green", [-10,10]]]
	  this.pauseDisabled = false;
	  this.backgroundMusic = this.game.backgroundMusic;
	  this.musicDisabled = false;
	}

	GameView.prototype.play = function(){
	  if (this.musicDisabled === false) {this.backgroundMusic.play()};

	  var musicButton = document.getElementById('music-pic');

	  musicButton.addEventListener("click", function(e) {


	    e.preventDefault();
	    g.musicDisabled = (g.musicDisabled  ?  false : true);
	    g.musicDisabled ? g.backgroundMusic.stop() : g.backgroundMusic.play();
	  });



	  var unpause = document.getElementById('pause');
	  unpause.style.display = "none";
	  let currView = this;
	  this.currRound = window.setInterval(function () {
	    currView.game.step();
	    currView.frameNo += 1;

	    currView.score += 1;
	    let currScore = document.getElementById('score')
	    currScore.innerHTML = `SCORE : ${currView.score}`
	    let currLvl = document.getElementById('level')
	    currLvl.innerHTML = `LVL : ${currView.game.level + 1}`
	    window.frameNo = currView.frameNo;


	    document.body.onkeyup = function(e){
	        if(e.keyCode == 32){
	            if (g.paused === false && g.pauseDisabled === false) {
	              g.paused = true;
	              currView.pause();
	            } else if (g.paused === true && g.pauseDisabled === false) {
	              g.paused = false;
	              currView.play();
	            }
	        }
	    }

	     if (everyinterval(900)) {
	         currView.game.asteroids = [];
	         currView.game.level += 1;
	         var currLevel = currView.levels[currView.game.level]
	         currView.game.addAsteroids(currLevel[0],currLevel[1],currLevel[2])
	     }


	    currView.game.draw(currView.ctx);
	  }, 20);
	};

	GameView.prototype.pause = function(){
	  g.backgroundMusic.stop();
	  clearInterval(this.currRound);
	  var pauseScreen = document.getElementById('pause');
	  pauseScreen.style.display = "block";
	}

	GameView.prototype.stop = function(){
	  clearInterval(this.currRound);
	}

	GameView.prototype.game_over = function() {
	  g.backgroundMusic.stop();
	  var quitScreen = document.getElementById('game-over');
	  quitScreen.style.display = "block";



	  var redoButton = document.getElementById('redo-button');

	  redoButton.addEventListener("click", function() {
	    quitScreen.style.display = "none";
	    g.musicDisabled ? g.backgroundMusic.stop() : g.backgroundMusic.play()
	    window.g.reset();

	  });
	}

	GameView.prototype.reset = function() {

	  let dotCollection = Array.from(document.getElementsByClassName("trail"));
	  dotCollection.forEach(element => { element.parentNode.removeChild(element);})
	  this.score = 0;
	  this.ctx.clearRect(0,0,this.game.DIM_X, this.game.DIM_Y);
	  this.game = new Game({game_view: this, num_asteroids: 100, asteroid_color: "pink", vel: [-4,4]});
	  this.canvas = document.getElementById('game-canvas');
	  this.canvas.style.cursor = "none"; //hide the original
	  this.ctx = this.canvas.getContext("2d");
	  this.ship = this.game.ship;
	  this.frameNo = 0;
	  window.gamegame = this;
	  // this.levels = [[100, "pink", [-4,4]],[100, "yellow", [-5,5]],[100, "red", [-6,6]]]
	    this.levels =
	    [[100, "pink", [-4,4]],
	    [120,"yellow", [-5,5]],
	    [150, "red", [-6,6]],
	    [120, "orange", [-7,7]],
	    [120, "purple", [-8,8]],
	    [120, "steelblue", [-9,9]],
	    [120, "green", [-10,10]],
	    [300, "green", [-10,10]]]


	}
	function everyinterval(n) {
	    if ((this.frameNo / n) % 1 == 0) {return true;}
	    return false;
	}

	// window.game_view = GameView
	module.exports = GameView;


/***/ }
/******/ ]);