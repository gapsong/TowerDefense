var socket = io();
var par_inc;
socket.on('update', function(inc) {
    par_inc = inc;
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
var tween;

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
    map = game.add.tilemap('karte');
    map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');
    layer = map.createLayer('World1');
    layer.resizeWorld(); // This resizes the game world to match the layer dimensions
    var levelObj = new karte(); //karte named leveObj ref
    level = levelObj.maplesen();

    tween = game.add.tween(minions[0]).to({
        x: [w, w, 0, 0],
        y: [0, h, h, 0]
    }, 4000, "Sine.easeInOut", true, -1, false);
    tween.onLoop.add(changeMethod(), this);
    /////////////////////////////////////


    //////////////////////////////////////////////////7
    //DECLARATION
    //////////////////////////////////////////////////7
    enemys.push(new minion()); //create minion
    turret = new tower(3, 3);
}

function update() {
    //sprite bewegung
    for (var k = 0; k < enemys.length; k++) {
        enemys[k].doit(par_inc);
    }
    //turret.doit(); //einfach die turrets durch die iteriert wird
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

function changeMethod() {

    method++;

    if (method === 1) {
        tween.interpolation(Phaser.Math.bezierInterpolation);
        text.text = "Bezier Interpolation";
    } else if (method === 2) {
        tween.interpolation(Phaser.Math.catmullRomInterpolation);
        text.text = "CatmullRom Interpolation";
    } else if (method === 3) {
        method = 0;
        tween.interpolation(Phaser.Math.linearInterpolation);
        text.text = "Linear Interpolation";
    }

}
