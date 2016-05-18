var game = new Phaser.Game(480, 480, Phaser.AUTO, null, {
  preload: preload, create: create, update: update
});

var map;
var layer;
var level;
var startpos = new Array(2,2);
var enemys = new Array();
var towers = new Array();

function preload(){
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = '#fee';
  game.load.tilemap('karte', 'assets/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles', 'assets/super_mario.png');
  game.load.image('mushroom', 'assets/sprites/add.png');
}

function create() {
  game.stage.backgroundColor = '#787878';
  //  The 'mario' key here is the Loader key given in game.load.tilemap
  map = game.add.tilemap('karte');
  //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
  //  The second parameter maps this name to the Phaser.Cache key 'tiles'
  map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');
  //  Creates a layer from the World1 layer in the map data.
  //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
  layer = map.createLayer('World1');
  layer.resizeWorld();// This resizes the game world to match the layer dimensions
  var levelObj = new karte();//karte named leveObj ref
  //map eingelesen als Array darstellen
  level = levelObj.maplesen();

  //Das ist einfach nur ein testminion
  enemys.push(new minion("1"));
  setTimeout(function(){enemys.push(new minion("2"))}, 1500);

  turret = new tower(3,3);
  turret2 = new tower(4,3);
  turret3 = new tower (5,3);
}

function update(){
  //sprite bewegung
  for(var k = 0 ; k < enemys.length ; k++){
    enemys[k].move();
  }

  turret.doit();//einfach die turrets durch die iteriert wird
  turret2.doit();
  turret3.doit();
  console.log(enemys);
  killminion();
}

function killminion(){//killt minion
  for(var i = 0; i < enemys.length ; i++){
    if(enemys[i].health <= 0){
      enemys[i].sprite.kill();
      enemys.splice(i,1);
      console.log(enemys);
    }
  }
}
