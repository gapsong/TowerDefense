exports.turret = function(world, x, y) {
    var p2 = require('../../node_modules/p2'),
        serverfun = require('./serverfun'),
        preload = require('./serverpreload');
    serverfun.prefun();
    preload.preload1();
    this.range = RANGE;
    this.enemy = null;
    this.min = this.range;
    this.position = new Array(x * TILEDSIZE, y * TILEDSIZE);
    this.timer = getTime();

    /////////////////////////////////////////////////////////////
    //bullets
    /////////////////////////////////////////////////////////////
    this.bullet = new p2.Body({
        mass: 5,
        velocity: [0, 0],
        position: [x * TILEDSIZE, y * TILEDSIZE]
    });

    circleshapebullet = new p2.Circle({
        radius: 10
    });
    
    this.bullet.addShape(circleshapebullet);
    circleshapebullet.collisionGroup = TURRET;
    circleshapebullet.collisionMask = MINION;
    world.addBody(this.bullet);

    this.doit = function(minions) {
        this.findEnemy(minions);
    }

    this.findEnemy = function(minions) {
        //var temptower = this.position;
        var c;
        if (this.enemy == null) { //falls noch kein enemy gefunden )
            this.min = this.range; //zurücksetzen von der range<
            for (var i = 0; i < minions.length; i++) {
                var temp = minions[i].body;
                c = pythagoras(temp.position, this.position);
                if (c < this.min && c < this.range) {
                    this.enemy = minions[i];
                    this.min = c;
                }
            }
        } else {
            c = pythagoras(this.enemy.body.position, this.position);
            if (c >= this.range) { //Wenn gegner außerhalb der range ist, dann soll ein neuer gesucht werden
                this.enemy = null; //gegener zurücksetzen
            }
            this.shoot();
        }
    }

    this.shoot = function() {
        if (this.timer + COOLDOWN <= getTime()) {
            this.timer = getTime();
            this.bullet.position = [x * TILEDSIZE, y * TILEDSIZE];
            this.moveToPosition();
        }
    }

    this.moveToPosition = function() {
        if (this.enemy != null) {
            var temp = this.enemy.body,
                dx = temp.position[0] - this.position[0],
                dy = temp.position[1] - this.position[1],
                winkel = Math.atan2(dy, dx);
            this.bullet.velocity = [BULLETSPEED * Math.cos(winkel), BULLETSPEED * Math.sin(winkel)];
        }
    }
}
