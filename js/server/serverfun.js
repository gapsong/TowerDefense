exports.prefun = function() {
    delta = function(a, b) { //delta wird berechnet
        return [betrag(a[0] - b[0]), betrag(a[1] - b[1])];
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
            temp.push([Math.round(minions[i].body.position[0] * 10) / 10, Math.round(minions[i].body.position[1] * 10) / 10]);
        }
        return temp;
    }
}
