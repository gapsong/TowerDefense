function minion() {
    this.sprite = game.add.sprite(startpos[0] * TILEDSIZE,
        startpos[1] * TILEDSIZE, 'mushroom');
    //this.game = game;
    //this.sprite.anchor.setTo(0.5);
    this.position = new Array(startpos[0], startpos[1]);
    this.richtung = level[this.position[0]][this.position[1]];
    this.health = 100;

    this.doit = function(temp) {
        this.sprite.x = temp[0];
        this.sprite.y = temp[1];
    }
}
