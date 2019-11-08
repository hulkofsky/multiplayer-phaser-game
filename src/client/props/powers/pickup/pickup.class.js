"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phaser_ce_1 = require("phaser-ce");
var particle_class_1 = require("../../particle/particle.class");
var Pickup = /** @class */ (function () {
    function Pickup(game, coords) {
        this.item = game.add.sprite(coords.x, coords.y, 'pickup');
        game.physics.enable(this.item, phaser_ce_1.Physics.ARCADE);
        this.particle = new particle_class_1.Particle(game, this.item);
    }
    return Pickup;
}());
exports.Pickup = Pickup;
//# sourceMappingURL=pickup.class.js.map