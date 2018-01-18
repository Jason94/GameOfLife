/// <reference path="game-of-life.ts" />
var Jason;
(function (Jason) {
    var grid = [];
    var gameOfLife = null;
    var iterateTimer = 0;
    /**
    * Get the timeout ms set by the user.
    */
    function ms() {
        return $('#ms').val();
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
        if (gameOfLife == null) {
            gameOfLife = new Jason.GameOfLife(grid);
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
    function tableOnClick(x, y) {
        var newLife = !grid[y][x];
        grid[y][x] = newLife;
        var $td = $("#" + x + "x" + y);
        if (newLife)
            $td.attr('class', 'live');
        else
            $td.attr('class', 'dead');
    }
    /**
    * Build an HTML cell for an x/y pair.
    */
    function $buildHtmlCell(x, y) {
        var idString = x + "x" + y;
        var tdClass = "dead";
        if (y < grid.length && x < grid[0].length && grid[y][x])
            tdClass = 'live';
        var cell = $('<td>', { id: idString, "class": tdClass });
        cell.on('click', function () { return tableOnClick(x, y); });
        return cell;
    }
    /**
    * Construct and set the table element and the internal grid structure.
    */
    function buildGrid(clearGrid) {
        var $table = $('<table>');
        if (clearGrid) {
            gameOfLife = null;
            grid = [];
        }
        var width = $('#width').val();
        var height = $('#height').val();
        for (var y = 0; y < height; y++) {
            var $rowHTML = $('<tr>');
            var rowData = [];
            for (var x = 0; x < width; x++) {
                $rowHTML.append($buildHtmlCell(x, y));
                rowData.push(false);
            }
            $table.append($rowHTML);
            grid.push(rowData);
        }
        $('#table').html('');
        $('#table').append($table);
    }
    window.onload = function () {
        buildGrid(true);
        $('#width').on('input', function () { return buildGrid(true); });
        $('#height').on('input', function () { return buildGrid(true); });
        $('#iterate').on('click', iterate);
        $('#start').on('click', start);
        $('#stop').attr('disabled', 'disabled');
        $('#stop').on('click', stop);
        $('#clear').on('click', function () { return buildGrid(true); });
    };
})(Jason || (Jason = {}));
//# sourceMappingURL=game-of-life-ui.js.map