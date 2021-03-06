function Character(speed, x, y, graphics, life, stopAtTarget) {
    var self = this;
    self.baseSpeed = speed;
    self.speed = self.baseSpeed;
    self.rotateAmount = 23;
    self.rotateDirection = Math.round(Math.random()) === 1 ? 1 : -1;
    self.moveToPoint = null;
    self.baseLife = life;
    self.life = life;
    self.isDead = false;
    self.stopAtTarget = stopAtTarget;

    self.entity = new Shape(graphics);

    self.entity.x = x;
    self.entity.y = y;
    self.entity.rotation = Math.random() * 360;
    var a = self.entity.rotation / 360.0 * Math.PI * 2;
    self.entity.vX = Math.cos(a) * self.speed;
    self.entity.vY = Math.sin(a) * self.speed;
    self.entity.regX = 8;
    self.entity.regY = 8;

    stage.addChild(self.entity);

    self.update = function () {
        var move = !self.stopAtTarget;

        for(var i = 0; walls.length > i; i++) {
            if(walls[i].collision(self.entity.x, self.entity.y)) {
                self.entity.x -= self.entity.vX;
                self.entity.y -= self.entity.vY;
                self.entity.rotation += Math.random() * self.rotateAmount * self.rotateDirection;
                var a = self.entity.rotation / 360.0 * Math.PI * 2;
                self.entity.vX = Math.cos(a) * self.speed * dt;
                self.entity.vY = Math.sin(a) * self.speed * dt;
                if(!walls[i].collision(self.entity.x + self.entity.vX, self.entity.y + self.entity.vY)) {
                    self.entity.x += self.entity.vX;
                    self.entity.y += self.entity.vY;
                }
                return;
            }
        }

        if(self.moveToPoint !== null) {
            move = true;
            if(Math.round(self.moveToPoint.x) === Math.round(self.entity.x) ||
                Math.round(self.moveToPoint.y) === Math.round(self.entity.y)) {
                self.moveToPoint = null;
            } else {
                self.entity.rotation = Math.atan2(self.moveToPoint.y - self.entity.y, self.moveToPoint.x - self.entity.x) * 180.0 / Math.PI;
            }
        }

        if(move) {
            self.entity.x += self.entity.vX;
            self.entity.y += self.entity.vY;
        }

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
        self.entity.vX = Math.cos(a) * self.speed * dt;
        self.entity.vY = Math.sin(a) * self.speed * dt;
    };

    self.distanceTo = function (character) {
        if(character.entity.x === self.entity.x &&
            character.entity.y === self.entity.Y) {
            return 0;
        }
        var dx = character.entity.x - self.entity.x,
            dy = character.entity.y - self.entity.y;
        return Math.sqrt((dx * dx) + (dy * dy));
    }

    return self;
}
