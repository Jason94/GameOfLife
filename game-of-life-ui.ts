/// <reference path="game-of-life.ts" />
namespace Jason {

  let grid: boolean[][] = [];
  let gameOfLife: GameOfLife | null = null;

  let iterateTimer = 0;

  /**
  * Get the timeout ms set by the user.
  */
  function ms(): number {
    return $('#ms').val() as number;
  }

  /**
  * Start the timer and enable/disable buttons.
  */
  function start() {
    iterateTimer = setInterval(iterate, ms());
    $('#start').attr('disabled', 'disabled');
    $('#stop').removeAttr('disabled');
  }

  /**
  * Stop the timer and enable/disable buttons.
  */
  function stop() {
    clearInterval(iterateTimer);
    $('#stop').attr('disabled', 'disabled');
    $('#start').removeAttr('disabled');
  }

  /**
  * Set the game of life to the next iteration, and re-draw the grid.
  * If the game of life is null, start it.
  */
  function iterate() {
    if(gameOfLife == null) {
      gameOfLife = new GameOfLife(grid);
      gameOfLife = gameOfLife.nextIteration();
    }
    else {
      gameOfLife = gameOfLife.nextIteration();
    }

    grid = gameOfLife.gridCopy();
    buildGrid(false);
  }

  /**
  * Handle the onClick event for a table cell.
  * Change the grid and flip the color.
  */
  function tableOnClick(x: number, y: number): void {
    let newLife = !grid[y][x];
    grid[y][x] = newLife;

    let $td = $(`#${x}x${y}`);

    if(newLife)
      $td.attr('class', 'live');
    else
      $td.attr('class', 'dead');
  }

  /**
  * Build an HTML cell for an x/y pair.
  */
  function $buildHtmlCell(x: number, y: number): JQuery<HTMLElement> {
    let idString = `${x}x${y}`;
    let tdClass = "dead";
    if(y < grid.length && x < grid[0].length && grid[y][x])
      tdClass = 'live';

    let cell = $('<td>', {id: idString, class: tdClass});
    cell.on('click', () => tableOnClick(x,y) );

    return cell;
  }

  /**
  * Construct and set the table element and the internal grid structure.
  */
  function buildGrid(clearGrid: boolean): void {
    let $table = $('<table>');
    if(clearGrid) {
      gameOfLife = null;
      grid = [];
    }

    let width: number = $('#width').val() as number;
    let height: number = $('#height').val() as number;

    for(let y = 0; y < height; y++) {
      let $rowHTML = $('<tr>');
      let rowData: boolean[] = [];

      for(let x = 0; x < width; x++) {
        $rowHTML.append($buildHtmlCell(x, y));
        rowData.push(false);
      }

      $table.append($rowHTML);
      grid.push(rowData);
    }

    $('#table').html('')
    $('#table').append($table)
  }

  window.onload = function() {
    buildGrid(true);
    $('#width').on('input',() => buildGrid(true));
    $('#height').on('input',() => buildGrid(true));
    $('#iterate').on('click',iterate);
    $('#start').on('click', start);
    $('#stop').attr('disabled', 'disabled');
    $('#stop').on('click', stop);
    $('#clear').on('click', () => buildGrid(true));
  }
}
