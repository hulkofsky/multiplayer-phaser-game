"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameEvent = /** @class */ (function () {
    function GameEvent() {
    }
    GameEvent.authentication = 'authentication:successful';
    GameEvent.end = 'game:over';
    GameEvent.start = 'game:start';
    GameEvent.drop = 'drop';
    return GameEvent;
}());
exports.GameEvent = GameEvent;
var CometEvent = /** @class */ (function () {
    function CometEvent() {
    }
    CometEvent.create = 'comet:create';
    CometEvent.destroy = 'comet:destroy';
    CometEvent.hit = 'comet:hit';
    CometEvent.coordinates = 'comet:coordinates';
    return CometEvent;
}());
exports.CometEvent = CometEvent;
var ServerEvent = /** @class */ (function () {
    function ServerEvent() {
    }
    ServerEvent.connected = 'connection';
    ServerEvent.disconnected = 'disconnect';
    return ServerEvent;
}());
exports.ServerEvent = ServerEvent;
var PlayerEvent = /** @class */ (function () {
    function PlayerEvent() {
    }
    PlayerEvent.joined = 'player:joined';
    PlayerEvent.protagonist = 'player:protagonist';
    PlayerEvent.players = 'actors:collection';
    PlayerEvent.quit = 'player:left';
    PlayerEvent.pickup = 'player:pickup';
    PlayerEvent.hit = 'player:hit';
    PlayerEvent.coordinates = 'player:coordinates';
    return PlayerEvent;
}());
exports.PlayerEvent = PlayerEvent;
//# sourceMappingURL=events.model.js.map