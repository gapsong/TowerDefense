exports.karte = function(){
  var karteJSON = require('../../assets/super_mario.json');
  //console.log(karteJSON.layers[0].height);
  height = karteJSON.layers[0].height;
  width = karteJSON.layers[0].width;
  karte = karteJSON.layers[0].data;
  //console.log(karte);
  f = new Array();
  for (i = 0 ; i < width ; i ++) {
    f[i] = new Array();
    for (j = 0 ; j < height ; j++){
      f[i][j] = karte[i * width + j];
    }
  }
}
