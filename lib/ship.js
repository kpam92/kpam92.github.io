const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');

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
