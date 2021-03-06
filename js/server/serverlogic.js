exports.logic = function(io) {
    io.on('connection', function(socket) {
        console.log("connected");
        socket.on('spawn_minion', function(hi) {
            minions.push(new serverminion.minion(world, startpos[0], startpos[1]));
        });
        socket.on('shoot', function() {
            turrets[0].shoot();
        });
    });
    var p2 = require('../../node_modules/p2'),
        serverfun = require('./serverfun'),
        serverminion = require('./serverminions'),
        serverturret = require('./serverturret'),
        serverkarte = require('./serverkarte'),
        preload = require('./serverpreload'),
        world = new p2.World({
            gravity: [0, 0]
        }),
        startpos = new Array(3, 2),
        turrets = new Array(),
        minions = new Array(),
        richtungsblocks = new Array(),
        timeStep = 1 / 30; // seconds

    serverfun.prefun();
    serverkarte.karte(world, richtungsblocks);
    turrets.push(new serverturret.turret(world, 4, 5));
    minions.push(new serverminion.minion(world, startpos[0], startpos[1]));
    //////////////////////////////////////////////
    //GAMELOOP
    //////////////////////////////////////////////
    setInterval(function() {
        world.step(1 / 60);
        turrets[0].doit(minions);
        io.emit('update', convertMinionArray(minions), convertBulletArray(turrets));
    }, 1000 * timeStep);

    //////////////////////////////////////////////
    //EVENTS
    ///////////////////////////////////////////////
    world.on("impact", function(event) {
        var bodyA = event.bodyA,
            bodyB = event.bodyB;
        for (var i = 0; i < richtungsblocks.length; i++) {
            if ((bodyA.shapes[0].collisionGroup & bodyB.shapes[0].collisionMask) != 0 &&
                (bodyB.shapes[0].collisionGroup & bodyA.shapes[0].collisionMask) != 0) {
                if (bodyB.id === richtungsblocks[i].body.id &&
                    bodyB.position === richtungsblocks[i].body.position) {
                    moveMinion([bodyA], bodyB.id);
                } else
                if (bodyA.id === richtungsblocks[i].body.id &&
                    bodyA.position === richtungsblocks[i].body.position) {
                    moveMinion([bodyB], bodyB.id);
                }
            }
        }
    });
}
