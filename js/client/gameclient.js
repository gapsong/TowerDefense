var socket = io();
socket.on('update', function(inc) {
  //console.log(inc);
});

var game = new Phaser.Game(1200, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});

var map;
var layer;
var level;
var startpos = new Array(2, 2);
var enemys = new Array();
var towers = new Array();
var tilesize = 32;

function preload() {
  game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
  game.scale.pageAlignHorizontally = true;
  //game.scale.pageAlignVertically = true;
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
  layer.resizeWorld(); // This resizes the game world to match the layer dimensions
  var levelObj = new karte(); //karte named leveObj ref
  //map eingelesen als Array darstellen
  level = levelObj.maplesen();

  //Der Rote kreis aka the range
  var graphics = game.add.graphics(0, 0);
  graphics.beginFill(0xFF0000, 1);
  graphics.drawCircle(3.5 * tilesize, 3.5 * tilesize, 90);

  //////////////////////////////////////////////////7
  //DECLARATION
  //////////////////////////////////////////////////7
  enemys.push(new minion()); //create minion
  turret = new tower(3, 3);
}

function update() {
  //sprite bewegung
  for (var k = 0; k < enemys.length; k++) {
    enemys[k].move();
  }
  turret.doit(); //einfach die turrets durch die iteriert wird
  killminion();
}

function killminion() { //killt minion
  for (var i = 0; i < enemys.length; i++) {
    if (enemys[i].health <= 0) {
      enemys[i].sprite.kill();
      enemys.splice(i, 1);
      console.log(enemys);
    }
  }
}
