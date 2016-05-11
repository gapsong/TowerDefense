function tower(x,y){
  this.position = new Array(x,y);//Arrayposition
  this.range = 2;//ein array aus den feldern, welche die reichweite sind
  this.min = 2;
  this.sprite = game.add.sprite(this.position[0] * 32, this.position[1] * 32, 'mushroom');
  this.dmg = 10;
  this.enemy = null;

  //für den cooldown wichtig
  this.cooldowncounter = 1000;//das ist eine sekunde cooldown
  this.currenttime = 0; //aktuelle zeit

  this.doit = function(){//man iteriert durch die range
    //ab hier gehts ab
    this.findnearst(); //setzt this.enemy auf den nähsten
    this.enemyoutofrange(); //und wenn er außerhalb ist, dann wird er gekillt
    this.attack();
  }

  this.findnearst = function(){//diese methode funktioniert noch nicht ganz so wie ichs will
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
      //    console.log(this.enemy.name);

      this.currenttime = n;
      this.enemy.health -= this.dmg;
      //  console.log(this.enemy.health);
      if(this.enemy.health <= 0){
        var temp = enemys.indexOf(this.enemy);
        this.enemy = null;
        console.log(enemys);


      }
    }
  }
}
