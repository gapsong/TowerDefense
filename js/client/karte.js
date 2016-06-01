function karte() {
    this.maplesen = function() { //wandelt map in array um
        f = new Array();
        for (i = 0; i < map.width; i++) {
            f[i] = new Array();
            for (j = 0; j < map.height; j++) {
                var tile = map.getTile(i, j, layer);
                var temp = tile.properties.richtung;
                switch (temp) {
                    case "left":
                        f[i][j] = 1;
                        break;
                    case "right":
                        f[i][j] = 2;
                        break;
                    case "down":
                        f[i][j] = 3;
                        break;
                    case "up":
                        f[i][j] = 4;
                        break;
                    default:
                        f[i][j] = 0;
                }
            }
        }
        return f;
    }
}
