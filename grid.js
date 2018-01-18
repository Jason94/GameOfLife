var Jason;
(function (Jason) {
    var Direction;
    (function (Direction) {
        Direction[Direction["Left"] = 0] = "Left";
        Direction[Direction["Right"] = 4] = "Right";
        Direction[Direction["Up"] = 6] = "Up";
        Direction[Direction["Down"] = 2] = "Down";
        Direction[Direction["UpLeft"] = 7] = "UpLeft";
        Direction[Direction["UpRight"] = 5] = "UpRight";
        Direction[Direction["DownLeft"] = 1] = "DownLeft";
        Direction[Direction["DownRight"] = 3] = "DownRight";
    })(Direction = Jason.Direction || (Jason.Direction = {}));
    /**
     * Get an array of each direction.
     */
    function directions() {
        return [Direction.Left, Direction.Right, Direction.Up, Direction.Down,
            Direction.UpLeft, Direction.UpRight, Direction.DownLeft, Direction.DownRight];
    }
    Jason.directions = directions;
    ;
    function notNull(val) {
        return val !== null && val !== undefined;
    }
    Jason.notNull = notNull;
    /**
    * An immutable, 2-D, rectangular grid container.
    *
    * The grid is 0-indexed, with the top left corner being (0,0) and the
    * bottom-right corner being (length-1, width-1)
    */
    var Grid = /** @class */ (function () {
        /**
        * Create a new grid based on a 2-D array of data elements.
        * The arrays will be checked for rectangularity.
        */
        function Grid(grid) {
            // Store a list of rows.
            this.grid = [];
            var width = grid[0].length;
            for (var row in grid) {
                if (row.length != width)
                    throw "Non-rectangular grid";
            }
            this.grid = grid;
        }
        /**
        * Get the width of the grid.
        */
        Grid.prototype.width = function () {
            return this.grid[0].length;
        };
        /**
        * Get the height of the grid.
        */
        Grid.prototype.height = function () {
            return this.grid.length;
        };
        /**
        * Get whether an x/y coordinate is in the grid.
        */
        Grid.prototype.inGrid = function (x, y) {
            return x < this.width() && x >= 0 && y < this.height() && y >= 0;
        };
        /**
        * Get the value stored at a point in the grid. Returns null if out of grid.
        *
        * The grid is 0-indexed, with the top left corner being (0,0) and the
        * bottom-right corner being (length-1, width-1)
        */
        Grid.prototype.at = function (x, y) {
            if (this.inGrid(x, y))
                return this.grid[y][x];
            else
                return null;
        };
        /**
        * Get the value and coordinates of a cell in the given direction of the coords.
        * Returns null if out of grid.
        */
        Grid.prototype.toThe = function (dir, x, y) {
            var x2 = x;
            var y2 = y;
            switch (dir) {
                case Direction.Left:
                    x2 -= 1;
                    break;
                case Direction.Right:
                    x2 += 1;
                    break;
                case Direction.Up:
                    y2 -= 1;
                    break;
                case Direction.Down:
                    y2 += 1;
                    break;
                case Direction.DownLeft:
                    y2 += 1;
                    x2 -= 1;
                    break;
                case Direction.DownRight:
                    y2 += 1;
                    x2 += 1;
                    break;
                case Direction.UpLeft:
                    y2 -= 1;
                    x2 -= 1;
                    break;
                case Direction.UpRight:
                    y2 -= 1;
                    x2 += 1;
                    break;
            }
            if (this.inGrid(x2, y2))
                return [this.grid[y2][x2], x2, y2];
            else
                return null;
        };
        /**
        * Get an array of the cell in each direction from the point.
        * Will not include off-of-grid coordinates.
        */
        Grid.prototype.neighbors = function (x, y) {
            var _this = this;
            // Note: The filter call at the end will drop the null values.
            return directions().map(function (dir) { return _this.toThe(dir, x, y); }).filter(notNull);
        };
        /**
        * Get a cloned copy of the grid.
        */
        Grid.prototype.gridCopy = function () {
            return this.grid.slice().map(function (row) { return row.slice(); });
        };
        /**
        * Execute a side-effectful function for each member of the grid.
        * Executes in a left-to-right first, top-to-bottom second order.
        */
        Grid.prototype.each = function (fun) {
            this.grid.forEach(function (row, y) {
                row.forEach(function (val, x) { return fun(x, y, val); });
            });
        };
        /**
        * Apply a function to each cell in the grid, getting a [[T]] value back.
        */
        Grid.prototype.map = function (fun) {
            return this.grid.map(function (row, y) { return row.map(function (val, x) { return fun(x, y, val); }); });
        };
        /**
        * Return a copy of the grid with a value changed.
        */
        Grid.prototype.alter = function (x, y, val) {
            var newGrid = this.gridCopy();
            newGrid[y][x] = val;
            return new Grid(newGrid);
        };
        return Grid;
    }());
    Jason.Grid = Grid;
})(Jason || (Jason = {}));
//# sourceMappingURL=grid.js.map