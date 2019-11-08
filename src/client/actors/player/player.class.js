"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var keyboard_class_1 = require("../../controls/keyboard.class");
var projectile_class_1 = require("../../props/powers/projectile/projectile.class");
var hud_class_1 = require("../../hud/hud.class");
var particle_class_1 = require("../../props/particle/particle.class");
var explosion_class_1 = require("../../../client/props/explosion/explosion.class");
var Player = /** @class */ (function () {
    function Player(gameInstance, playerInstance, type) {
        this.gameInstance = gameInstance;
        this.playerInstance = playerInstance;
        this.angularVelocity = 300;
        this.createPlayer(this.gameInstance, type);
        this.playerState = new Map();
    }
    Player.prototype.createPlayer = function (gameInstance, type) {
        var _this = this;
        this.hud = new hud_class_1.Hud();
        this.addControls();
        this.player = gameInstance.add.sprite(this.playerInstance.x, this.playerInstance.y, type);
        this.player.id = this.playerInstance.id;
        this.player.anchor.setTo(0.5, 0.5);
        this.player.animations.add('accelerating', [1, 0], 60, false);
        this.player.name = this.playerInstance.name;
        this.attachPhysics(gameInstance);
        this.player.destroy = function () {
            new explosion_class_1.Explode(_this.gameInstance, _this.player);
            _this.player.kill();
        };
        this.particle = new particle_class_1.Particle(gameInstance, this.player);
        this.hud.setName(gameInstance, this.player);
    };
    Player.prototype.assignPickup = function (game, player) {
        this.projectile = new projectile_class_1.Projectile(game, player.player);
        this.playerState.set('ammo', this.projectile.bulletCount);
        this.hud.setAmmo(game, player.player, this.projectile);
    };
    Player.prototype.view = function () {
        this.controls.update();
        if (this.projectile) {
            this.hud.update(this.playerState.get('ammo'));
        }
    };
    Player.prototype.addControls = function () {
        this.controls = new keyboard_class_1.KeyBoardControl(this.gameInstance, this);
    };
    Player.prototype.attachPhysics = function (gameInstance) {
        gameInstance.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        this.player.body.bounce.setTo(10, 10);
        this.player.body.gravity.y = 0;
        this.player.body.drag.set(80);
        this.player.body.maxVelocity.set(100);
        this.player.body.immovable = false;
    };
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=player.class.js.map