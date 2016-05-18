exports.logic = function (){
  var p2 = require('../../node_modules/p2');
  var serverminion = require('./serverminions')
  var world = new p2.World({
    gravity: [0, 0]
  });
  console.log("Serverlogik startet");

  serverminion.minion(world, 10, 10);//world 1 2 
}
