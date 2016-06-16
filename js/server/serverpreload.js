exports.preload1 = function() {
    settings = require('../settings.json')
    TILEDSIZE = settings.TILEDSIZE
    SPEED = settings.SPEED
    RANGE = settings.RANGE
    TURRET = settings.TURRET
    BLOCK = settings.BLOCK
    MINION = settings.MINION
    COOLDOWN = settings.COOLDOWN
    BULLETSPEED = settings.BULLETSPEED
}
