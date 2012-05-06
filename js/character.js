function Character(speed, x, y, graphics, life) {
    var self = this;
    self.baseSpeed = Math.random() * speed;
    self.speed = self.baseSpeed;
    self.rotateAmount = 15;
    self.rotateDirection = Math.round(Math.random()) === 1 ? 1 : -1;
    self.moveToPoint = null;
    self.baseLife = life;
    self.life = life;
    self.isDead = false;

    self.entity = new Shape(graphics);
    self.label = new Text(Math.round(self.entity.x) + " " + Math.round(self.entity.y), "8px Arial", "#CCC");

    self.entity.x = x;
    self.entity.y = y;
    self.entity.rotation = Math.random() * 360;
    //    var a = Math.PI * 2 * Math.random();
    var a = self.entity.rotation / 360.0 * Math.PI * 2;
    self.entity.vX = Math.cos(a) * self.speed;
    self.entity.vY = Math.sin(a) * self.speed;
    self.entity.regX = Math.round(self.entity.width / 2.0);
    self.entity.regY = Math.round(self.entity.height / 2.0);

    stage.addChild(self.entity);
    stage.addChild(self.label);

    self.update = function () {
        self.label.text = Math.round(self.life / self.baseLife * 100) + '%';

        if(self.moveToPoint !== null) {
            self.entity.rotation = Math.atan2(self.moveToPoint.y - self.entity.y, self.moveToPoint.x - self.entity.x) * 180.0 / Math.PI;
        }

        for(var i = 0; walls.length > i; i++) {
            if(walls[i].collision(self.entity.x, self.entity.y)) {
                self.entity.rotation += Math.random() * self.rotateAmount * self.rotateDirection;
                break;
            }
        }

        self.entity.x += self.entity.vX;
        self.entity.y += self.entity.vY;

        self.label.x = self.entity.x + 10;
        self.label.y = self.entity.y;

        if(self.entity.x > canvas.width) {
            self.entity.x = canvas.width;
            self.entity.rotation += Math.random() * self.rotateAmount * self.rotateDirection;
        }
        if(self.entity.x < 0) {
            self.entity.x = 0;
            self.entity.rotation += Math.random() * self.rotateAmount * self.rotateDirection;
        }
        if(self.entity.y > canvas.height) {
            self.entity.y = canvas.height;
            self.entity.rotation += Math.random() * self.rotateAmount * self.rotateDirection;
        }
        if(self.entity.y < 0) {
            self.entity.y = 0;
            self.entity.rotation += Math.random() * self.rotateAmount * self.rotateDirection;
        }



        var a = self.entity.rotation / 360.0 * Math.PI * 2;
        self.entity.vX = Math.cos(a) * self.speed;
        self.entity.vY = Math.sin(a) * self.speed;
    };

    self.distanceTo = function (character) {
        var dx = character.entity.x - self.entity.x,
            dy = character.entity.y - self.entity.y;
        return Math.sqrt((dx * dx) + (dy * dy));
    }

    return self;
}