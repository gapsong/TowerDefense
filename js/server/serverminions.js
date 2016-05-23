exports.minion = function(world, x, y) {
  var p2 = require('../../node_modules/p2');

  this.body = new p2.Body({
    mass: 5,
    velocity: [0, 0],
    position: [x, y],
    damping: 0
  });

  circleShape = new p2.Circle({
    radius: 10
  });
  circleShape.sensor = false;
  this.body.addShape(circleShape);
  world.addBody(this.body);

  this.doit = function() {
    console.log("dfsdafsd");
  }
}
