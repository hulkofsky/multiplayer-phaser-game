"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hud = /** @class */ (function () {
    function Hud() {
        this.style = { font: '10px Arial', fill: '#ffffff' };
    }
    Hud.prototype.setName = function (game, player) {
        this.name = game.add.text(0, 10, player.name.substring(0, 6), this.style);
        player.addChild(this.name);
    };
    Hud.prototype.update = function (ammo) {
        this.ammo.setText("" + (ammo ? ammo : ''));
    };
    Hud.prototype.setAmmo = function (game, player, weapon) {
        if (this.ammo) {
            this.ammo.setText('');
        }
        this.ammo = game.add.text(0, 25, weapon.bulletCount.toString(), this.style);
        player.addChild(this.ammo);
    };
    return Hud;
}());
exports.Hud = Hud;
//# sourceMappingURL=hud.class.js.map