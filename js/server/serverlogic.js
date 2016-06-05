exports.logic = function(io) {
    var p2 = require('../../node_modules/p2');
    var serverminion = require('./serverminions');
    var serverturret = require('./serverturret');
    var serverkarte = require('./serverkarte');

    io.on('connection', function(socket) {
        console.log("connected");
        socket.on('spawn_minion', function() {
            console.log("minion got spawned");
        });
    });

    var tiledsize = 32;
    var world = new p2.World({
        gravity: [0, 0]
    });
    var startpos = new Array(3, 2);
    var minions = new Array();
    var turrets = new Array();
    serverkarte.karte(world);
    minions.push(new serverminion.minion(world, startpos[0], startpos[1]));
    turrets.push(new serverturret.turret(world, 2, 3));

    //////////////////////////////////////////////
    //GAMELOOP
    //////////////////////////////////////////////

    var timeStep = 1 / 60; // seconds
    setInterval(function() {
        world.step(timeStep);
        //console.log(minions[0].body.position);
        minions[0].doit2();
        turrets[0].findnearest(minions);
        io.emit('update', minions[0].body.position, turrets[0].bullet.position);

    }, 1000 * timeStep);

    world.on("beginContact", function(event) {
        if (event.bodyB === minions[0].body) {
            minions[0].move2(event.bodyA.id);
        }
        if (event.bodyA === minions[0].body) {
            minions[0].move2(event.bodyB.id);
        }
    });
}
