function tower(x, y) {
    this.position = new Array(x * TILEDSIZE, y * TILEDSIZE); //Arrayposition
    this.sprite = game.add.sprite(this.position[0], this.position[1], 'mushroom');

    this.doit = function(temp) {
        this.sprite.x = temp[0];
        this.sprite.y = temp[1];
    }
}
