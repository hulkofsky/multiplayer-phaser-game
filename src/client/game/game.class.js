"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Phaser = require("phaser-ce");
var player_class_1 = require("../actors/player/player.class");
var projectile_class_1 = require("../props/powers/projectile/projectile.class");
var events_model_1 = require("../../shared/events.model");
var login_class_1 = require("../scenes/login.class");
var asteroid_class_1 = require("../props/asteroid/asteroid.class");
var Game = /** @class */ (function () {
    function Game() {
        window.socket = io.connect();
        this.login = new login_class_1.LoginScene();
    }
    Game.prototype.manageAssets = function (game) {
        var _this = this;
        this.actors = [];
        this.comets = [];
        window.socket.on(events_model_1.PlayerEvent.joined, function (player) {
            _this.actors.push(new player_class_1.Player(game, player, 'shooter-sprite-enemy'));
        });
        window.socket.on(events_model_1.PlayerEvent.protagonist, function (player) {
            _this.actor = new player_class_1.Player(game, player, "shooter-sprite");
            _this.actors.push(_this.actor);
        });
        window.socket.on(events_model_1.PlayerEvent.players, (function (players) {
            players.map(function (player) {
                var enemy = new player_class_1.Player(game, player, "shooter-sprite");
                if (player.ammo) {
                    enemy.assignPickup(game, enemy);
                }
                _this.actors.push(enemy);
            });
        }));
        window.socket.on(events_model_1.PlayerEvent.quit, function (playerId) {
            _this.actors
                .filter(function (actor) { return actor.player.id === playerId; })
                .map(function (actor) { return actor.player.kill(); });
        });
        window.socket.on(events_model_1.GameEvent.drop, function (coords) {
            if (_this.projectile) {
                _this.projectile.pickup.item.kill();
            }
            _this.projectile = new projectile_class_1.Projectile(game);
            _this.projectile.renderPickup(coords);
        });
        window.socket.on(events_model_1.CometEvent.create, function (comet) {
            _this.comet = new asteroid_class_1.Asteroid(game, comet);
            _this.comets.push(_this.comet);
        });
        window.socket.on(events_model_1.CometEvent.coordinates, function (coors) {
            if (_this.comet) {
                _this.comet.asteroid.x = coors.x;
                _this.comet.asteroid.y = coors.y;
            }
        });
        window.socket.on(events_model_1.CometEvent.destroy, function () {
            if (_this.comet) {
                _this.comet.asteroid.kill();
                _this.comet = null;
            }
        });
        window.socket.on(events_model_1.CometEvent.hit, function () {
            if (_this.comet) {
                _this.comet.hit();
            }
        });
        window.socket.on(events_model_1.PlayerEvent.hit, function (enemyId) {
            _this.actors
                .filter(function () { return _this.actor.player.id === enemyId; })
                .map(function () { return window.location.reload(true); });
        });
        window.socket.on(events_model_1.PlayerEvent.pickup, function (playerId) {
            _this.actors
                .filter(function (actor) { return actor.player.id === playerId; })
                .map(function (actor) { return actor.assignPickup(game, actor); });
            _this.projectile.pickup.item.kill();
        });
        window.socket.on(events_model_1.PlayerEvent.coordinates, function (player) {
            _this.actors.filter(function (actor) {
                if (actor.player.id === player.player.id) {
                    actor.player.x = player.coords.x;
                    actor.player.y = player.coords.y;
                    actor.player.rotation = player.coords.r;
                    if (actor.projectile) {
                        actor.hud.update(player.coords.a);
                    }
                    if (player.coords.f) {
                        actor.projectile.fireWeapon();
                    }
                    if (player.coords.m) {
                        actor.player.animations.play('accelerating');
                    }
                }
            });
        });
    };
    Game.prototype.gameUpdate = function (game) {
        var _this = this;
        if (this.comet) {
            game.physics.arcade.collide(this.comet.asteroid, this.actors.map(function (actor) { return actor.player; }), function (comet, actor) {
                if (actor.id !== _this.actor.player.id) {
                    actor.destroy();
                    window.socket.emit(events_model_1.PlayerEvent.hit, actor.id);
                }
                else {
                    window.location.reload(true);
                }
            });
            if (this.actor && this.actor.projectile) {
                game.physics.arcade.collide(this.actor.projectile.weapon.bullets, this.comets.map(function (comet) { return comet.asteroid; }), function (comet, projectile) {
                    window.socket.emit(events_model_1.CometEvent.hit, comet.id);
                    projectile.kill();
                    _this.comet.hit();
                });
            }
        }
        if (this.actor && this.actor.controls) {
            this.actor.view();
            window.socket.emit(events_model_1.PlayerEvent.coordinates, {
                x: this.actor.player.position.x,
                y: this.actor.player.position.y,
                r: this.actor.player.rotation,
                f: this.actor.playerState.get("fire"),
                m: this.actor.playerState.get("moving"),
                a: this.actor.playerState.get("ammo"),
            });
            game.physics.arcade.collide(this.actor.player, this.actors.map(function (actor) { return actor.player; }));
            if (this.actor.projectile) {
                game.physics.arcade.collide(this.actor.projectile.weapon.bullets, this.actors.map(function (actor) { return actor.player; }), function (enemy, projectile) {
                    if (enemy.id !== _this.actor.player.id) {
                        window.socket.emit(events_model_1.PlayerEvent.hit, enemy.id);
                        projectile.kill();
                        enemy.destroy();
                    }
                });
            }
            if (this.projectile) {
                game.physics.arcade.overlap(this.projectile.pickup.item, this.actors.map(function (actor) { return actor.player; }), function (pickup, actor) {
                    _this.actors
                        .filter(function (actorInstance) {
                        return actor.id === actorInstance.player.id;
                    })
                        .map(function (actorInstance) {
                        return actorInstance.assignPickup(game, actorInstance);
                    });
                    window.socket.emit(events_model_1.PlayerEvent.pickup, {
                        uuid: actor.id,
                        ammo: true,
                    });
                    pickup.kill();
                });
            }
        }
    };
    Game.prototype.properties = function (game) {
        game.stage.disableVisibilityChange = true;
        game.add.tileSprite(0, 0, game.width, game.height, 'space');
        game.add.sprite(0, 0, 'space');
        game.time.desiredFps = 60;
        game.renderer.clearBeforeRender = false;
        game.physics.startSystem(Phaser.Physics.ARCADE);
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.class.js.map