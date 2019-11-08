"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KeyBoardControl = /** @class */ (function () {
    function KeyBoardControl(gameInstance, playerInstance) {
        this.gameInstance = gameInstance;
        this.playerInstance = playerInstance;
        var space = Phaser.KeyCode.SPACEBAR;
        this.gameControls = {
            cursors: this.gameInstance.input.keyboard.createCursorKeys(),
            fireWeapon: this.gameInstance.input.keyboard.addKey(space),
        };
    }
    KeyBoardControl.prototype.update = function () {
        if (this.playerInstance.player.alive) {
            this.playerInstance.playerState.set('fire', false);
            var vel = this.playerInstance.angularVelocity;
            if (this.gameControls.cursors.up.isDown) {
                this.gameInstance.physics.arcade.accelerationFromRotation(this.playerInstance.player.rotation, 100, this.playerInstance.player.body.acceleration);
                this.playerInstance.player.animations.play('accelerating');
                this.playerInstance.playerState.set('moving', true);
            }
            else {
                this.playerInstance.player.body.acceleration.set(0);
                this.playerInstance.playerState.set('moving', false);
            }
            if (this.gameControls.cursors.left.isDown) {
                this.playerInstance.player.body.angularVelocity = -vel;
            }
            else if (this.gameControls.cursors.right.isDown) {
                this.playerInstance.player.body.angularVelocity = vel;
            }
            else {
                this.playerInstance.player.body.angularVelocity = 0;
            }
            if (this.gameControls.fireWeapon.isDown) {
                if (this.playerInstance.projectile) {
                    this.playerInstance.projectile.fireWeapon();
                    this.playerInstance.playerState.set('fire', true);
                    this.playerInstance.playerState.set('ammo', this.playerInstance.projectile.bulletCount);
                }
                else {
                    this.playerInstance.playerState.set('fire', false);
                }
            }
        }
    };
    return KeyBoardControl;
}());
exports.KeyBoardControl = KeyBoardControl;
//# sourceMappingURL=keyboard.class.js.map