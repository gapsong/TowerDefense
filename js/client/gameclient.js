var socket = io();
var par_inc, par_inc2;

socket.on('update', function(minionsArray) {
    par_inc = minionsArray;
});

var game = new Phaser.Game(1200, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

var map, layer, level, startpos = new Array(2, 2),
    enemys = new Array(),
    towers = new Array(),
    tiledsize;

function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.scale.pageAlignHorizontally = true;
    //game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#fee';
    game.load.tilemap('karte', 'assets/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/super_mario.png');
    game.load.image('mushroom', 'assets/sprites/add.png');
    game.load.image('bullet', 'assets/sprites/bullet.png');
    game.load.json('settings', 'js/settings.json');
}

function create() {
    var settings = game.cache.getJSON('settings');
    tiledsize = settings.tiledsize;
    console.log(tiledsize);
    game.stage.backgroundColor = '#787878';
    map = game.add.tilemap('karte');
    map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');
    layer = map.createLayer('World1');
    layer.resizeWorld(); // This resizes the game world to match the layer dimensions
    var levelObj = new karte(); //karte named leveObj ref
    level = levelObj.maplesen();

    var graphics = game.add.graphics(0, 0);
    graphics.beginFill(0xFF0000, 1);
    graphics.drawCircle(4.5 * tiledsize, 5.5 * tiledsize,
        settings.towerrange * 2); //2 ist der durchmesser
    //////////////////////////////////////////////////
    //DECLARATION
    //////////////////////////////////////////////////
    enemys.push(new minion()); //create minion
    turret = new tower(4, 5);
}

function update() {
    if (game.input.activePointer.leftButton.isDown) {
        socket.emit('spawn_minion', 12);
    }
    if (par_inc.length != enemys.length) {
        enemys.push(new minion()); //create minion
    }
    //sprite bewegung
    for (var k = 0; k < enemys.length; k++) {
        enemys[k].doit(par_inc[k]);
    }

    //turret.doit(par_inc2); //einfach die turrets durch die iteriert wird
    //killminion();
}

function killminion() { //killt minion
    for (var i = 0; i < enemys.length; i++) {
        if (enemys[i].health <= 0) {
            enemys[i].sprite.kill();
            enemys.splice(i, 1);
        }
    }
}
