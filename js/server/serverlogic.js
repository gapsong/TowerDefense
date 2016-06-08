exports.logic = function(io) {
    var p2 = require('../../node_modules/p2');
    var serverminion = require('./serverminions');
    var serverturret = require('./serverturret');
    var serverkarte = require('./serverkarte');
    var settings = require('../settings.json');

    io.on('connection', function(socket) {
        console.log("connected");
        socket.on('spawn_minion', function() {
            console.log("minion got spawned");
        });
    });

    var world = new p2.World({
        gravity: [0, 0]
    });
    var startpos = new Array(3, 2);
    var turrets = new Array();
    var minions = new Array();
    serverkarte.karte(world);
    turrets.push(new serverturret.turret(world, 4, 5));
    minions.push(new serverminion.minion(world, startpos[0], startpos[1]));
    setTimeout(function() {
        minions.push(new serverminion.minion(world, startpos[0], startpos[1]));
    }, 1000);
    //////////////////////////////////////////////
    //GAMELOOP
    //////////////////////////////////////////////

    var timeStep = 1 / 60; // seconds
    setInterval(function() {
        world.step(timeStep);
        //console.log(minions[0].body.position);
        turrets[0].findEnemy(minions);
        io.emit('update', convertMinionArray(minions));
    }, 1000 * timeStep);

    world.on("beginContact", function(event) {
        for (var i = 0; i < minions.length; i++) {
            if (event.bodyB === minions[i].body) {
                minions[i].move2(event.bodyA.id);
            }
            if (event.bodyA === minions[i].body) {
                minions[i].move2(event.bodyB.id);
            }
        }
    });
}
