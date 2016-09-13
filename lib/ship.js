const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');

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
