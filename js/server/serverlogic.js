exports.logic = function(io) {
  var p2 = require('../../node_modules/p2');
  var serverminion = require('./serverminions');
  var serverturret = require('./serverturret');
  var gameloop = require('node-gameloop');
  var serverkarte = require('./serverkarte');

  io.on('connection', function(socket) {
    console.log("connected");
    socket.on('spawn_minion', function() {
      console.log("minion got spawned")
    });
  });

  var tiledsize = 32;
  var world = new p2.World({
    gravity: [0, 0]
  });
  var startpos = new Array(2, 2);
  var minions = new Array();
  var turrets = new Array();
  serverkarte.karte();
  turrets.push(new serverturret.turret(world, 2 * tiledsize, 3 * tiledsize));
  minions.push(new serverminion.minion(world, startpos * tiledsize, startpos * tiledsize));
  //////////////////////////////////////////////
  //GAMELOOP
  //////////////////////////////////////////////

  var timeStep = 1 / 60; // seconds
  setInterval(function() {
    world.step(timeStep);
    minions[0].doit();
    io.emit('update', 1);
  }, 1000 * timeStep);
}
