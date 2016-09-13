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
