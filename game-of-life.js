var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path="grid.ts" />
var Jason;
(function (Jason) {
    /**
    * Represents an immutable state in Conway's game of life, based on Grid.
    * Call the iterate() method to get the next state.
    *
    * True is a live cell, false is a dead cell.
    */
    var GameOfLife = /** @class */ (function (_super) {
        __extends(GameOfLife, _super);
        function GameOfLife() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
        * Get the number of live neighbors to a cell.
        */
        GameOfLife.prototype.numLiveNeighbors = function (x, y) {
            return this.neighbors(x, y).filter(function (cell) { return cell[0]; }).length;
        };
        /**
        * Get the state of a cell in the next iteration.
        * 0-1 & live: Dead
        * 2-3 & live: Live
        * 4+ & live: Dead
        * 3 & dead: Live
        */
        GameOfLife.prototype.nextState = function (x, y, state) {
            var numLiveNeighbors = this.numLiveNeighbors(x, y);
            if (state == null)
                state = this.at(x, y);
            if (!state)
                return numLiveNeighbors == 3;
            else
                return numLiveNeighbors == 2 || numLiveNeighbors == 3;
        };
        /**
        * Get the next iteration in the game of life.
        */
        GameOfLife.prototype.nextIteration = function () {
            return new GameOfLife(this.map(this.nextState.bind(this)));
        };
        return GameOfLife;
    }(Jason.Grid));
    Jason.GameOfLife = GameOfLife;
})(Jason || (Jason = {}));
//# sourceMappingURL=game-of-life.js.map