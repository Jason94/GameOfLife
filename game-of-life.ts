/// <reference path="grid.ts" />
namespace Jason {
  /**
  * Represents an immutable state in Conway's game of life, based on Grid.
  * Call the iterate() method to get the next state.
  *
  * True is a live cell, false is a dead cell.
  */
  export class GameOfLife extends Grid<boolean> {

    /**
    * Get the number of live neighbors to a cell.
    */
    numLiveNeighbors(x: number, y: number): number {
      return this.neighbors(x,y).filter( (cell) => cell[0] ).length;
    }

    /**
    * Get the state of a cell in the next iteration.
    * 0-1 & live: Dead
    * 2-3 & live: Live
    * 4+ & live: Dead
    * 3 & dead: Live
    */
    nextState(x: number, y: number, state: boolean | null): boolean {
      let numLiveNeighbors = this.numLiveNeighbors(x,y);
      if(state == null)
        state = this.at(x,y);

      if(!state)
        return numLiveNeighbors == 3;
      else
        return numLiveNeighbors == 2 || numLiveNeighbors == 3;
    }

    /**
    * Get the next iteration in the game of life.
    */
    nextIteration(): GameOfLife {
      return new GameOfLife(this.map(this.nextState.bind(this)));
    }
  }
}
