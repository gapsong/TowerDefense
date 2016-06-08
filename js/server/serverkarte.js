exports.karte = function(world) {
    var karteJSON = require('../../assets/super_mario.json');
    var serverblock = require('./serverblock');
    //console.log(karteJSON.layers[0].height);
    height = karteJSON.layers[0].height
    width = karteJSON.layers[0].width
    karte = karteJSON.layers[0].data
        //console.log(karte);
    var richtungsblocks = new Array();
    smap = new Array()
    for (i = 0; i < width; i++) {
        smap[i] = new Array();
        for (j = 0; j < height; j++) {
            smap[i][j] = karte[i + j * height];
            if (smap[i][j] == 5 ||
                smap[i][j] == 6 ||
                smap[i][j] == 16 ||
                smap[i][j] == 17) {
                richtungsblocks.push(new serverblock.richtungsblock(world, i, j, smap[i][j]));
            }
        }
    }
    //console.log(smap);//gibt die karte aus
}
