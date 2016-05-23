exports.turret = function (world){
  var p2 = require('../../node_modules/p2');
  /////////////////////////////////////////////////////////////
  //bullets
  /////////////////////////////////////////////////////////////
  this.bullet = new p2.Body({
    mass: 5,
    velocity: [0, 0],
    position: [-20, -20],
    damping: 0
  });

  circleshapebullet = new p2.Circle({radius: 10});
  this.bullet.addShape(circleshapebullet);
  world.addBody(this.bullet);

  this.movetopointerbullet = function (speed, incPos) {
    this.pointer = incPos;
    var dx = this.pointer[0] - this.bullet.position[0];
    var dy = this.pointer[1] - this.bullet.position[1];
    var winkel = Math.atan2(dy, dx);
    this.bullet.velocity = [speed * Math.cos(winkel), speed * Math.sin(winkel)];
  }
}