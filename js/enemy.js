
function Enemy(x, y, sensorRange, attackRange, attackStrength, life) {
    var self = this;
    self.sensorRange = sensorRange;
    self.attackRange = attackRange;
    self.attackStrength = attackStrength;
    self.life = life;

    var g = new Graphics();
    g.beginFill("#f00");
    g.rect(-4, -4, 10, 10);
    g.beginFill("#00f");
    g.drawCircle(5, 1, 3);
    self.character = new Character(x, y, g);

    self.update = function () {
        var i = 0;
        for(i = 0; i < towers.length; i += 1) {
            var d = self.character.distanceTo(towers[i].character);
            if(d <= self.sensorRange) {
                self.character.moveToPoint = new Point(towers[i].character.entity.x, towers[i].character.entity.y);
                break;
            }
        }
        this.character.update();
    }
}
