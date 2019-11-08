"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var explosion_class_1 = require("../explosion/explosion.class");
var Asteroid = /** @class */ (function () {
    function Asteroid(gameInstance, cometInstance) {
        var _this = this;
        this.gameInstance = gameInstance;
        this.cometInstance = cometInstance;
        this.gameInstance = gameInstance;
        this.asteroid = gameInstance.add.sprite(0, -128, 'asteroid');
        this.asteroid.animations.add('asteroid');
        this.asteroid.animations.play("asteroid", 10, true, false);
        this.attachPhysics(gameInstance);
        this.asteroid.destroy = function () {
            new explosion_class_1.Explode(_this.gameInstance, _this.asteroid, true);
            _this.asteroid.kill();
        };
        this.asteroid.id = this.cometInstance.id;
    }
    Asteroid.prototype.hit = function () {
        this.asteroid.destroy();
    };
    Asteroid.prototype.attachPhysics = function (gameInstance) {
        gameInstance.physics.enable(this.asteroid, Phaser.Physics.ARCADE);
        this.asteroid.body.collideWorldBounds = false;
        this.asteroid.body.bounce.setTo(0);
        this.asteroid.body.gravity.y = 0;
        this.asteroid.body.drag.set(80);
        this.asteroid.body.maxVelocity.set(100);
        this.asteroid.body.immovable = true;
    };
    return Asteroid;
}());
exports.Asteroid = Asteroid;
//# sourceMappingURL=asteroid.class.js.map