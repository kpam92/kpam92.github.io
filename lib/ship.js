const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');

function Ship(options) {
  let defaultOptions = {color: "#38A217", radius: 6, vel: [0, 0]};
  Object.assign(defaultOptions, options);
  MovingObject.call(this, defaultOptions);
}

Util.inherits(Ship, MovingObject);


module.exports = Ship;
