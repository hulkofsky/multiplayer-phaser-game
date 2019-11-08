import { Game, Sprite, Physics } from 'phaser-ce';

import { Particle } from "../../particle/particle.class";
import { Coordinates } from 'src/shared/models';

export class Pickup {
    public item: Sprite;
    public particle: Particle;

    constructor(game: Game, coords: Coordinates) {
        this.item = game.add.sprite(coords.x, coords.y, 'pickup');
        game.physics.enable(this.item, Physics.ARCADE);
        this.particle = new Particle(game, this.item);
    }
}