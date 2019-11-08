"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pickup_class_1 = require("../pickup/pickup.class");
var particle_class_1 = require("../../particle/particle.class");
var Projectile = /** @class */ (function () {
    function Projectile(gameInstance, player) {
        this.bulletCount = 10;
        this.gameInstance = gameInstance;
        this.weapon = this.gameInstance.add.weapon(10, 'laser');
        this.weapon.fireLimit = this.bulletCount;
        this.weapon.fireRate = 1000;
        if (player) {
            this.player = player;
            this.weapon.trackSprite(this.player, 10, 0, true);
        }
    }
    Projectile.prototype.fireWeapon = function () {
        this.weapon.fire();
        this.bulletCount = this.weapon.fireLimit - this.weapon.shots;
    };
    Projectile.prototype.renderPickup = function (coords) {
        this.pickup = new pickup_class_1.Pickup(this.gameInstance, coords);
        new particle_class_1.Particle(this.gameInstance, this.pickup.item);
    };
    return Projectile;
}());
exports.Projectile = Projectile;
//# sourceMappingURL=projectile.class.js.map