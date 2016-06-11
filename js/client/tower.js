function tower(x, y) {
    this.position = new Array(x * TILEDSIZE, y * TILEDSIZE); //Arrayposition
    this.sprite = game.add.sprite(this.position[0], this.position[1], 'mushroom');

    this.doit = function(inco){
      this.sprite.x = inco[0];
      this.sprite.y = inco[1];
    }
}
