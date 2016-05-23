function tower(x,y){
  this.position = new Array(x,y);//Arrayposition
  this.range = 50;//ein array aus den feldern, welche die reichweite sind
  this.min = 2;
  this.sprite = game.add.sprite(this.position[0] * tilesize, this.position[1] * tilesize, 'mushroom');
  this.dmg = 10;
  this.enemy = null;
  this.speed = 500;
  this.cooldowncounter = 1000;//das ist eine sekunde cooldown
  this.currenttime = 0; //aktuelle zeit


  this.doit = function(){//man iteriert durch die range
    //ab hier gehts ab
    this.findnearest2(); //setzt this.enemy auf den nähsten
    this.enemyoutofrange2(); //und wenn er außerhalb ist, dann wird er gekillt
    this.attack();
  }

  this.findnearest = function(){//diese methode funktioniert noch nicht ganz so wie ichs will
    if(this.enemy == null){//falls noch kein enemy gefunden wurde
      this.min = this.range;//zurücksetzen von der range
      for (var i = -this.range ;  i < this.range ; i ++){//hier wird alles iteriert. also die ganze range
        for (var j = -this.range ; j < this.range ; j++){
          for(var k = 0; k < enemys.length ; k++){//hier werden alle gegner einmal durch iteriert
            //was ist das hier für eine berechnung
            //if (this.betrag(i) + this.betrag(j) < this.min && enemys[k].position[0] == (this.position[0] + i) && enemys[k].position[1] == (this.position[1] + j)){
            if(this.min > this.betrag (i) + this.betrag (j) && enemys[k].position[0] == this.position[0] + i && enemys[k].position[1] == this.position[1] + j){
              this.min = this.betrag(i) + this.betrag(j);
              //console.log(this.min + " nachher");
              this.enemy = enemys[k];
            }
          }
        }
      }
    }
    if(this.enemy != null)
    console.log(this.enemy.name);
  }

  this.findnearest2 = function(){
    if(this.enemy == null){//falls noch kein enemy gefunden wurde
      this.min = this.range;//zurücksetzen von der range<
      for(var i = 0 ; i < enemys.length ; i++){
        //Satz des Pythagoras
        var temp = enemys[i].sprite;
        var temptower = this.sprite;
        var deltaX = this.betrag (temp.x - temptower.x);
        var deltaY = this.betrag (temp.y - temptower.y);
        var c = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));//Pythagoras
        if(c < this.min && c < this.range){
          console.log(c);
          this.enemy = enemys[i];
          this.min = c;
        }
      }
    }
  }

  this.enemyoutofrange = function(){
    if(this.enemy != null){
      var temp = this.enemy.position[0] + this.enemy.position[1];//Werte vom enemyposition
      var temp2 = this.position[0] + this.position[1];
      if(this.betrag(temp - temp2) >= this.range ){//Wenn gegner außerhalb der range ist, dann soll ein neuer gesucht werden
        this.enemy = null;//gegener zurücksetzen
        //console.log("out of range");
      }
    }
  }

  this.enemyoutofrange2 = function(){
    if(this.enemy != null){
      var deltaX = this.betrag(this.enemy.sprite.x - this.sprite.x);//Werte vom enemyposition
      var deltaY = this.betrag(this.enemy.sprite.y - this.sprite.y);
      var c = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));//Pythagoras
      if(c >= this.range ){//Wenn gegner außerhalb der range ist, dann soll ein neuer gesucht werden
        this.enemy = null;//gegener zurücksetzen
        console.log("out");
      }
    }
  }

  this.betrag = function (x){
    if (x < 0){
      return -x;
    } else {
      return x;
    }
  }

  this.attack = function () {
    var d = new Date();
    var n = d.getTime();

    if(this.enemy != null && n - this.currenttime > this.cooldowncounter){
      this.currenttime = n;
      this.enemy.health -= this.dmg;
      if(this.enemy.health <= 0){
        var temp = enemys.indexOf(this.enemy);
        this.enemy = null;
      }
    }
  }

  this.movetopointerbullet = function () {
    this.pointer = incPos;
    var dx = this.pointer[0] - this.bullet.position[0];
    var dy = this.pointer[1] - this.bullet.position[1];
    var winkel = Math.atan2(dy, dx);
    this.bullet.velocity = [speed * Math.cos(winkel), speed * Math.sin(winkel)];
  }
}
