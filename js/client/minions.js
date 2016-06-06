function minion() {
    this.sprite = game.add.sprite(startpos[0] * tiledsize, startpos[1] * tiledsize, 'mushroom');
    //this.game = game;
    //this.sprite.anchor.setTo(0.5);
    this.position = new Array(startpos[0], startpos[1]);
    this.richtung = level[this.position[0]][this.position[1]];
    this.health = 100;

    this.doit = function(temp) {
        this.sprite.x = temp[0];
        this.sprite.y = temp[1];
    }

    this.move = function() {
        if ((this.sprite.x + this.sprite.y) % tiledsize == 0) {
            this.richtung = level[this.position[0]][this.position[1]];
            this.richtungswechsel();
        }
        this.bewegen();
    }

    this.richtungswechsel = function() {
        if (this.richtung == 1)
            this.position[0]--;
        if (this.richtung == 2)
            this.position[0]++;
        if (this.richtung == 3)
            this.position[1]++;
        if (this.richtung == 4)
            this.position[1]--;
    }

    this.bewegen = function() {
        var temp = 1; //geschwindigkeit

        if (this.richtung == 1)
            this.sprite.x -= temp;
        if (this.richtung == 2)
            this.sprite.x += temp;
        if (this.richtung == 3)
            this.sprite.y += temp;
        if (this.richtung == 4)
            this.sprite.y -= temp;
    }
}
