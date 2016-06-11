exports.turret = function(world, x, y) {
    var p2 = require('../../node_modules/p2');
    var serverfun = require('./serverfun');
    var preload = require('./serverpreload');
    serverfun.prefun();
    preload.preload1();
    this.range = RANGE;
    this.enemy = null;
    this.min = this.range;
    this.position = new Array(x * TILEDSIZE, y * TILEDSIZE);
    this.cooldown = COOLDOWN;

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
        }
    }

    this.shoot = function() {
        if (this.enemy != null) {
            d = delta(this.enemy.body.position, this.position);
            var winkel = Math.atan2(d[0], d[1]);
            this.bullet.velocity = [SPEED * Math.cos(winkel), SPEED * Math.sin(winkel)];
        }
    }
}
