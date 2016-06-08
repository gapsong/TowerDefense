exports.turret = function(world, x, y) {
    var p2 = require('../../node_modules/p2');
    var settings = require('../settings.json');
    var serverfun = require('./serverfun');
    serverfun.prefun();
    var tiledsize = settings.tiledsize;
    this.range = settings.towerrange;
    this.enemy = null;
    this.min = this.range;
    /////////////////////////////////////////////////////////////
    //bullets
    /////////////////////////////////////////////////////////////
    this.bullet = new p2.Body({
        mass: 5,
        velocity: [0, 0],
        position: [x * tiledsize, y * tiledsize]
    });

    this.position = new Array(x, y);
    circleshapebullet = new p2.Circle({
        radius: 10
    });
    this.bullet.addShape(circleshapebullet);
    world.addBody(this.bullet);

    this.doit = function(minions) {
        var temptower = this.bullet;
        var c;
        if (this.enemy == null) { //falls noch kein enemy gefunden wurde
            this.min = this.range; //zurücksetzen von der range<
            for (var i = 0; i < minions.length; i++) {
                var temp = minions[i].body;
                c = pythagoras(temp.position, temptower.position);
                if (c < this.min && c < this.range) {
                    console.log(i + " is in");
                    this.enemy = minions[i];
                    this.min = c;
                    console.log(c);
                }
            }
        } else {
            c = pythagoras(this.enemy.body.position, temptower.position);
            if (c >= this.range) { //Wenn gegner außerhalb der range ist, dann soll ein neuer gesucht werden
                console.log("out");
                this.enemy = null; //gegener zurücksetzen
                console.log(c);
            }
        }
    }

    this.movetopointerbullet = function(speed, incPos) {
        this.pointer = incPos;
        var dx = this.pointer[0] - this.bullet.position[0]; //refactor
        var dy = this.pointer[1] - this.bullet.position[1];
        var winkel = Math.atan2(dy, dx);
        this.bullet.velocity = [speed * Math.cos(winkel), speed * Math.sin(winkel)];
    }
}
