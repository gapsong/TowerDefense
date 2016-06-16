exports.prefun = function() {
    var preload = require('./serverpreload');
    preload.preload1();

    delta = function(a, b) { //delta wird berechnet
        return [
            betrag(a[0] - b[0]),
            betrag(a[1] - b[1])
        ];
    }

    betrag = function(x) {
        if (x < 0)
            return -x;
        else
            return x;
    }

    pythagoras = function(a, b) {
        var temp = delta(a, b);
        return Math.sqrt(Math.pow(temp[0], 2) + Math.pow(temp[1], 2));
    }

    convertMinionArray = function(minions) {
        var temp = [];
        for (var i = 0; i < minions.length; i++) {
            temp.push([
                Math.round(minions[i].body.position[0] * 10) / 10,
                Math.round(minions[i].body.position[1] * 10) / 10
            ]);
        }
        return temp;
    }

    convertBulletArray = function(bullets) {
        var temp = [];
        for (var i = 0; i < bullets.length; i++) {
            temp.push([
                Math.round(bullets[i].bullet.position[0] * 10) / 10,
                Math.round(bullets[i].bullet.position[1] * 10) / 10
            ]);
        }
        return temp;
    }

    moveMinion = function(bodypointer, richtung) { //der body soll richtung verändern und auf ein normales Feld zurückgestzt werden
        //how to call by refernce nachgucken
        bodypointer[0].position = [
            Math.round(bodypointer[0].position[0] / TILEDSIZE) * TILEDSIZE,
            Math.round(bodypointer[0].position[1] / TILEDSIZE) * TILEDSIZE
        ]; //diese Methode packt minion nochmal auf die bahn
        switch (richtung) {
            case 17: //rechts
                bodypointer[0].velocity = [SPEED, 0];
                break;
            case 16: //runter
                bodypointer[0].velocity = [0, SPEED];
                break;
            case 6: //hoch
                bodypointer[0].velocity = [0, -SPEED];
                break;
            case 5: //links
                bodypointer[0].velocity = [-SPEED, 0];
        }
    }

    getTime = function() {
        var d = new Date();
        return d.getTime();
    }

}
