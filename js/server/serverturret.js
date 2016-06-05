exports.turret = function(world, x, y) {
    var p2 = require('../../node_modules/p2');
    var settings = require('../settings.json');
    var tiledsize = settings.tiledsize;
    this.enemy = null;
    this.range = settings.towerrange;
    this.min;
    /////////////////////////////////////////////////////////////
    //bullets
    /////////////////////////////////////////////////////////////
    this.bullet = new p2.Body({
        mass: 5,
        velocity: [0, 0],
        position: [x * tiledsize, y * tiledsize],
        damping: 0
    });
    this.position = new Array(x, y);
    circleshapebullet = new p2.Circle({
        radius: 10
    });
    this.bullet.addShape(circleshapebullet);
    world.addBody(this.bullet);

    this.findnearest = function(minions) {
        if (this.enemy == null) { //falls noch kein enemy gefunden wurde
            this.min = this.range; //zurücksetzen von der range<
            for (var i = 0; i < minions.length; i++) {
                //Satz des Pythagoras
                var temp = minions[i].body;
                var temptower = this.bullet;
                var deltaX = this.betrag(temp.position[0] - temptower.position[1]);
                var deltaY = this.betrag(temp.position[0] - temptower.position[1]);
                var c = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)); //Pythagoras
                if (c < this.min && c < this.range) {
                    console.log("in");
                    this.enemy = minions[i];
                    this.min = c;
                }
            }
        }
    }

    this.doit = function(minions) {
        this.findnearest(minions);
        this.enemyoutofrange();
    }

    this.enemyoutofrange = function() {
        if (this.enemy != null) {
            var deltaX = this.betrag(this.enemy.body.position[0] - this.bullet.position[0]); //Werte vom enemyposition
            var deltaY = this.betrag(this.enemy.body.position[1] - this.bullet.position[1]);
            var c = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)); //Pythagoras
            if (c >= this.range) { //Wenn gegner außerhalb der range ist, dann soll ein neuer gesucht werden
                this.enemy = null; //gegener zurücksetzen
                console.log("out");
            }
        }
    }
    this.movetopointerbullet = function(speed, incPos) {
        this.pointer = incPos;
        var dx = this.pointer[0] - this.bullet.position[0];
        var dy = this.pointer[1] - this.bullet.position[1];
        var winkel = Math.atan2(dy, dx);
        this.bullet.velocity = [speed * Math.cos(winkel), speed * Math.sin(winkel)];
    }

    this.betrag = function(x) {
        if (x < 0) {
            return -x;
        } else {
            return x;
        }
    }
}
