"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Explode = /** @class */ (function () {
    function Explode(gameInstance, player, big) {
        var _this = this;
        if (big) {
            this.explosions = gameInstance.add.sprite(152, 152, 'kaboom-big');
        }
        else {
            this.explosions = gameInstance.add.sprite(64, 64, 'kaboom');
        }
        this.explosions.animations.add('kaboom');
        this.explosions.reset(player.body.x + -20, player.body.y - 30);
        this.explosions.animations.play('kaboom', 15, false);
        setTimeout(function () {
            _this.explosions.kill();
        }, 500);
    }
    return Explode;
}());
exports.Explode = Explode;
//# sourceMappingURL=explosion.class.js.map