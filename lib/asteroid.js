const Util = require("./utils.js");
const Ship = require("./ship.js");
const MovingObject = require('./moving_object.js');

function Asteroid(options) {
  let defaultOptions = {color: "#A0A0A0", radius: this.randomRadius(), vel: Util.randomVec()};
  Object.assign(defaultOptions, options);
  MovingObject.call(this, defaultOptions);
}

Util.inherits(Asteroid,MovingObject);

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Ship && this.isCollidedWith(otherObject)) {
    return true;
  }
};

Asteroid.prototype.randomRadius = function() {
  return Math.random() * (7 - 2) + 2;
}
module.exports = Asteroid;
