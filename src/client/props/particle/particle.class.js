"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Particle = /** @class */ (function () {
    function Particle(gameInstance, sprite) {
        var _this = this;
        this.particle = gameInstance.add.sprite(64, 64, 'dust');
        this.particle.animations.add('dust');
        this.particle.reset(sprite.body.x - 15, sprite.body.y - 15);
        this.particle.animations.play('dust', 16, false);
        setTimeout(function () {
            _this.particle.kill();
        }, 1000);
    }
    return Particle;
}());
exports.Particle = Particle;
//# sourceMappingURL=particle.class.js.map