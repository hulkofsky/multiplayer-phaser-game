import { Game, Weapon, Sprite } from 'phaser-ce';

import { Pickup } from '../pickup/pickup.class';
import { Coordinates } from '../../../../shared/models';
import { Particle } from '../../particle/particle.class';

export class Projectile {
    public weapon: Weapon;
    public bulletCount: number = 10;
    public pickup: Pickup;

    private readonly player: Sprite;
    private readonly gameInstance: Phaser.Game;

    public constructor(gameInstance: Game, player?: Sprite){
        this.gameInstance = gameInstance;
        this.weapon = this.gameInstance.add.weapon(10, 'laser');
        this.weapon.fireLimit = this.bulletCount;
        this.weapon.fireRate = 1000;

        if(player){
            this.player = player;
            this.weapon.trackSprite(this.player, 10, 0, true)
        }
    }

    public fireWeapon(): void {
        this.weapon.fire();
        this.bulletCount = this.weapon.fireLimit - this.weapon.shots;
    }

    public renderPickup(coords: Coordinates): void {
        this.pickup = new Pickup(this.gameInstance, coords);
        new Particle(this.gameInstance, this.pickup.item);
    }
}