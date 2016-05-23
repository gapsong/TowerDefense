exports.logic = function (io){
  var p2 = require('../../node_modules/p2');
  var serverminion = require('./serverminions');
  var serverturret = require('./serverturret');
  var gameloop = require('node-gameloop');
  var serverkarte = require('./serverkarte');

  var world = new p2.World({
    gravity: [0, 0]
  });
  console.log("Serverlogik startet");
  serverkarte.karte();

  var timeStep = 1 / 60; // seconds
  setInterval(function () {
    world.step(timeStep);
    io.emit('update', 1);
  }, 1000 * timeStep);

  io.on('connection', function(socket){
    console.log("connected");
    //socket.on('')
  });

  serverminion.minion(world, 10, 10);//world, x, y
  serverturret.turret(world);
}
