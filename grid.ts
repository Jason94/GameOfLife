namespace Jason {
  export enum Direction {
    Left = 0, Right = 4, Up = 6, Down = 2,
     UpLeft = 7, UpRight = 5, DownLeft = 1, DownRight = 3
  }

  /**
   * Get an array of each direction.
   */
  export function directions() {
    return [Direction.Left, Direction.Right, Direction.Up, Direction.Down,
      Direction.UpLeft, Direction.UpRight, Direction.DownLeft, Direction.DownRight];
  };

  export function notNull<T>(val: T | null | undefined): val is T {
    return val !== null && val !==undefined;
  }

  /**
  * An immutable, 2-D, rectangular grid container.
  *
  * The grid is 0-indexed, with the top left corner being (0,0) and the
  * bottom-right corner being (length-1, width-1)
  */
  export class Grid<T> {
    // Store a list of rows.
    private grid: T[][] = [];

    /**
    * Create a new grid based on a 2-D array of data elements.
    * The arrays will be checked for rectangularity.
    */
    constructor(grid: T[][]) {
      let width = grid[0].length;
      for(let y = 0; y < grid.length; y++) {
        if(grid[y].length != width)
          throw "Non-rectangular grid";
      }
      this.grid = grid;
    }

    /**
    * Get the width of the grid.
    */
    width() {
      return this.grid[0].length;
    }

    /**
    * Get the height of the grid.
    */
    height() {
      return this.grid.length;
    }

    /**
    * Get whether an x/y coordinate is in the grid.
    */
    inGrid(x: number, y: number) {
      return x < this.width() && x >= 0 && y < this.height() && y >= 0;
    }

    /**
    * Get the value stored at a point in the grid. Returns null if out of grid.
    *
    * The grid is 0-indexed, with the top left corner being (0,0) and the
    * bottom-right corner being (length-1, width-1)
    */
    at(x: number, y: number): T | null {
      if(this.inGrid(x,y))
        return this.grid[y][x];
      else
        return null;
    }

    /**
    * Get the value and coordinates of a cell in the given direction of the coords.
    * Returns null if out of grid.
    */
    toThe(dir: Direction, x: number, y: number): [T,number,number] | null {
      let x2 = x;
      let y2 = y;

      switch(dir) {
        case Direction.Left: x2 -= 1; break;
        case Direction.Right: x2 += 1; break;
        case Direction.Up: y2 -= 1; break;
        case Direction.Down: y2 += 1; break;
        case Direction.DownLeft: y2 += 1; x2 -=1; break;
        case Direction.DownRight: y2 += 1; x2 +=1; break;
        case Direction.UpLeft: y2 -= 1; x2 -=1; break;
        case Direction.UpRight: y2 -= 1; x2 +=1; break;
      }

      if(this.inGrid(x2,y2))
        return [this.grid[y2][x2],x2,y2];
      else
        return null;
    }

    /**
    * Get an array of the cell in each direction from the point.
    * Will not include off-of-grid coordinates.
    */
    neighbors(x: number, y: number): Array<[T,number,number]> {
      // Note: The filter call at the end will drop the null values.
      return directions().map(dir => this.toThe(dir,x,y)).filter(notNull)
    }

    /**
    * Get a cloned copy of the grid.
    */
    gridCopy(): T[][] {
      return this.grid.slice().map( (row) => row.slice() );
    }

    /**
    * Execute a side-effectful function for each member of the grid.
    * Executes in a left-to-right first, top-to-bottom second order.
    */
    each(fun: (x: number, y: number, val: T) => void): void {
      this.grid.forEach( (row,y) => {
          row.forEach( (val,x) => fun(x,y,val) )
        }
      );
    }

    /**
    * Apply a function to each cell in the grid, getting a [[T]] value back.
    */
    map(fun: (x: number, y: number, val: T) => T): T[][] {
      return this.grid.map( (row,y) => row.map( (val,x) => fun(x,y,val) ) );
    }

    /**
    * Return a copy of the grid with a value changed.
    */
    alter(x: number, y: number, val: T): Grid<T> {
      let newGrid = this.gridCopy();
      newGrid[y][x] = val;
      return new Grid(newGrid);
    }
  }
}
