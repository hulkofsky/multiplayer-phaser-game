"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var game_class_1 = require("../game/game.class");
var PhaserSpaceGame = /** @class */ (function (_super) {
    __extends(PhaserSpaceGame, _super);
    function PhaserSpaceGame() {
        var _this = _super.call(this) || this;
        _this.game = new Phaser.Game(1024, 768, Phaser.AUTO, 'space-shooter', {
            preload: _this.preload,
            create: _this.create,
            update: _this.update
        });
        return _this;
    }
    PhaserSpaceGame.prototype.preload = function () {
        var game = this.game.load;
        game.crossOrigin = 'anonymous';
        game.image('space', 'assets/background.jpg');
        game.image('laser', 'assets/bullet.png');
        game.spritesheet('dust', 'assets/dust.png', 64, 64, 16);
        game.spritesheet('kaboom', 'assets/explosions.png', 64, 64, 16);
        game.spritesheet('big-kaboom', 'assets/explosions-big.png', 152, 152, 16);
        game.image('pickup', 'assets/pickup.png');
        game.spritesheet('shooter-sprite', 'assets/ship.png', 32, 32);
        game.spritesheet('shooter-sprite-enemy', 'assets/ship-enemy.png', 32, 32);
        game.spritesheet('asteroid', 'assets/asteroids.png', 128, 128, 31);
    };
    PhaserSpaceGame.prototype.create = function () {
        _super.prototype.properties.call(this, this.game);
        _super.prototype.manageAssets.call(this, this.game);
    };
    PhaserSpaceGame.prototype.update = function () {
        _super.prototype.gameUpdate.call(this, this.game);
    };
    Object.defineProperty(PhaserSpaceGame.prototype, "gameInstance", {
        get: function () {
            return this.game;
        },
        enumerable: true,
        configurable: true
    });
    return PhaserSpaceGame;
}(game_class_1.Game));
exports.PhaserSpaceGame = PhaserSpaceGame;
//# sourceMappingURL=phaser-engine.class.js.map