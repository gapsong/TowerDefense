exports.minions = function (){
  var p2 = require('../../node_modules/p2');
  var world = new p2.World({
    gravity: [0, 0]
  });
  console.log("ffsa");
  this.body = new p2.Body({
    mass: 5,
    velocity: [0, 30],
    position: [10, 10],
    damping: 0
  });

  circleShape = new p2.Circle({radius: 10});
  circleShape.sensor = false;
  this.body.addShape(circleShape);
  world.addBody(this.body);

}
