function minion (a){
  this.sprite = game.add.sprite(startpos[0] * 32, startpos[1] * 32, 'mushroom');
  //this.game = game;
  //this.sprite.anchor.setTo(0.5);
  this.position = new Array(startpos[0], startpos[1]);
  this.richtung = level[this.position[0]][this.position[1]];
  this.health = 100;
  this.name = a;




  this.move = function(){
    if((this.sprite.x + this.sprite.y) % 32 == 0){
      this.richtung = level[this.position[0]][this.position[1]];
      this.richtungswechsel();
    }
    this.bewegen();
  }

  this.richtungswechsel = function(){
    if(this.richtung == 1)
    this.position[0]--;

    if(this.richtung == 2)
    this.position[0]++;

    if(this.richtung == 3)
    this.position[1]++;

    if(this.richtung == 4)
    this.position[1]--;
  }

  this.bewegen = function(){
    var temp = 1;//geschwindigkeit

    if(this.richtung == 1)
    this.sprite.x -= temp;
    if(this.richtung == 2)
    this.sprite.x += temp;
    if(this.richtung == 3)
    this.sprite.y += temp;
    if(this.richtung == 4)
    this.sprite.y -= temp;
  }
}
