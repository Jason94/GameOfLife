/// <reference path="grid.ts" />
namespace Jason {

  /**
  * Turn left.
  */
  function nextDirection(currentDir: Direction): Direction {
    return (currentDir + 2) % 8;
  }

  /**
  * Make an nxn grid of nulls's.
  */
  function blankGrid(width: number): Grid<number | null> {
    let grid: number|null[][] = []

    for(let y = 0; y < width; y++) {
      let row: number|null[] = [];

      for(let x = 0; x < width; x++) {
        row.push(null);
      }

      grid.push(row);
    }
    return new Grid(grid);
  }

  /**
  * Write some code that accepts an integer and prints, from 0 to that input integer, the
  * integers in a spiral format.
  * For example, if I supplied 24 the output would be:
  * 20 21 22 23 24
  * 19 6 7 8 9
  * 18 5 0 1 10
  * 17 4 3 2 11
  * 16 15 14 13 12
  */
  export class Spiral extends Grid<number | null> {

    private n: number;

    constructor(n: number) {
      let gridWidth = Math.ceil(Math.sqrt(n+1));
      // Current number in the spiral (increases by 1).
      let i = 0;
      // Keep track of how many times we've moved on the current side.
      let currentSideN = 1;
      // After currentSideLength # of hits, we turn left and
      // increase currentSideLength by 2.
      let currentSideLength = 2;
      let grid = blankGrid(gridWidth);

      // Find our starting x & y coordinates. For odd numbers, we
      // start in the middle. For even numbers, we start in the
      // upper-left corner in the middle square.
      let x = 0;
      if(gridWidth % 2 == 1)
        x = Math.floor(gridWidth / 2);
      else
        x = Math.floor(gridWidth / 2) - 1;
      let y = x;
      let direction = Direction.Down;

      // Repeat until we've dropped each number, starting with 0.
      while(i < n) {
        // Drop the current number onto the grid.
        grid = grid.alter(x,y,i);
        // Get the next x & y coordinates in our current direction.
        // Given this algorithm, we're guaranteed to not extend
        // bounds so we're safe.
        [,x,y] = grid.toThe(direction,x,y) as [number | null, number, number];
        // We dropped i, so we move onto i + 1.
        i++;
        // We've moved another square along the current side.
        currentSideN += 1;
        // If we've reached the end of our current side, turn.
        if(currentSideN == currentSideLength) {
          currentSideN = 1;
          direction = nextDirection(direction);
        }
        // If we've reached a diagonal, then our current side
        // length gets bigger.
        if(x == y) {
          currentSideLength += 1;
        }
      }

      // We have to drop the last integer onto our grid
      // (fencepost bug) and then pass into the constructor.
      super(grid.alter(x,y,i).gridCopy());

      // Cache n for later.
      this.n = n;
    }

    toString(): string {
      let textWidth = Math.floor(Math.log(this.n) / Math.log(10)) + 1;
      let str = "";
      this.each( (x,y,i) => {
        let nSpaces = 0
        if(x == 0 && y > 0)
          str += "\n";
        if(i != null) {
          str += i;
          if(i > 0)
            nSpaces = Math.floor(Math.log(i) / Math.log(10)) + 1;
          else
            nSpaces = 1;
        }
        for(let z = nSpaces; z < textWidth + 1; z++)
          str += " ";
      });

      return str;
    }
  }
}
