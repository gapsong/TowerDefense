function tower(x, y) {
    this.position = new Array(x * TILEDSIZE, y * TILEDSIZE); //Arrayposition
    this.turret = game.add.sprite(this.position[0], this.position[1], 'bullet');
    this.sprite = game.add.sprite(this.position[0], this.position[1], 'turret');

    this.doit = function(temp) {
        this.sprite.x = temp[0];
        this.sprite.y = temp[1];
    }
}
