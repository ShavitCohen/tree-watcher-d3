App.service('RemoveCellService', [function() {

    this.fillHole = function(cells, holes) {
        for (var i = 0; holes.length != 0; i++) {
            holes = fillFromTop(cells, holes);
            holes = fillFromRight(cells, holes);
            holes = fillFromBottom(cells, holes);
            holes = fillFromLeft(cells, holes);

            if (i > 100) {
                alert("Can't fill empty spacce. Smth went wrong!");
                break;
            }
        }
    };

    function fillFromLeft(cells, holes) {
        for (var i = 0; i < holes.length; i++) {
            var hole = holes[i];

            var leftCell = searchLeft(cells, hole);
            if (angular.isObject(leftCell)) {
                hole.filled = true;

                leftCell.percent.size.width += hole.percent.size.width;

                if (leftCell.percent.pos.top != hole.percent.pos.top) {
                    //TODO Test this IF! One of the coordinates might be wrong!
                    var newH = createHole(hole.percent.pos.top, hole.percent.pos.left, leftCell.percent.pos.top - hole.percent.pos.top, hole.percent.size.width);
                    holes[i] = newH;
                }

                if (leftCell.percent.pos.top + leftCell.percent.size.height < hole.percent.pos.top + hole.percent.size.height) {
                    var newHTop = leftCell.percent.pos.top + leftCell.percent.size.height;
                    var newHHeight = (hole.percent.pos.top + hole.percent.size.height) - (leftCell.percent.pos.top + leftCell.percent.size.height);
                    var newH = createHole(newHTop, hole.percent.pos.left, newHHeight, hole.percent.size.width);
                    holes.push(newH);
                }
            }
        }

        return getEmptyHolesArray(holes);
    };

    function fillFromBottom(cells, holes) {
        for (var i = 0; i < holes.length; i++) {
            var hole = holes[i];

            var bottomCell = searchBottom(cells, hole);
            if (angular.isObject(bottomCell)) {
                hole.filled = true;

                bottomCell.percent.pos.top = hole.percent.pos.top;
                bottomCell.percent.size.height += hole.percent.size.height;

                if (bottomCell.percent.pos.left != hole.percent.pos.left) {
                    //TODO Test this IF! One of the coordinates might be wrong!
                    var newH = createHole(hole.percent.pos.top, hole.percent.pos.left, hole.percent.size.height, bottomCell.percent.pos.left - hole.percent.pos.left);
                    holes[i] = newH;
                }

                if (bottomCell.percent.pos.left + bottomCell.percent.size.width != hole.percent.pos.left + hole.percent.size.width) {
                    var newHLeft = bottomCell.percent.pos.left + bottomCell.percent.size.width;
                    var newHWidth = (hole.percent.pos.left + hole.percent.size.width) - (bottomCell.percent.pos.left + bottomCell.percent.size.width);
                    var newH = createHole(hole.percent.pos.top, newHLeft, hole.percent.size.height, newHWidth);
                    holes.push(newH);
                }
            }
        }

        return getEmptyHolesArray(holes);
    };

    function fillFromRight(cells, holes) {
        for (var i = 0; i < holes.length; i++) {
            var hole = holes[i];

            var rightCell = searchRight(cells, hole);
            if (angular.isObject(rightCell)) {
                hole.filled = true;

                rightCell.percent.pos.left = hole.percent.pos.left;
                rightCell.percent.size.width += hole.percent.size.width;

                if (rightCell.percent.pos.top != hole.percent.pos.top) {
                    //TODO Test this IF! One of the coordinates might be wrong!
                    var newH = createHole(hole.percent.pos.top, hole.percent.pos.left, hole.percent.pos.top - rightCell.percent.pos.top, hole.percent.size.width);
                    holes[i] = newH;
                }

                if (rightCell.percent.pos.top + rightCell.percent.size.height < hole.percent.pos.top + hole.percent.size.height) {
                    var newHTop = rightCell.percent.pos.top + rightCell.percent.size.height;
                    var newHHeight = (hole.percent.pos.top + hole.percent.size.height) - (rightCell.percent.pos.top + rightCell.percent.size.height);
                    var newH = createHole(newHTop, hole.percent.pos.left, newHHeight, hole.percent.size.width);
                    holes.push(newH);
                }
            }
        }

        return getEmptyHolesArray(holes);
    };

    function fillFromTop(cells, holes) {
        for (var i = 0; i < holes.length; i++) {
            var hole = holes[i];

            var topCell = searchTop(cells, hole);
            if (angular.isObject(topCell)) {
                hole.filled = true;

                topCell.percent.size.height += hole.percent.size.height;

                if (topCell.percent.pos.left != hole.percent.pos.left) {
                    //TODO Test this IF! One of the coordinates might be wrong!
                    var newH = createHole(hole.percent.pos.top, hole.percent.pos.left, hole.percent.size.height, topCell.percent.pos.left - hole.percent.pos.left);
                    holes[i] = newH;
                }

                if (topCell.percent.pos.left + topCell.percent.size.width != hole.percent.pos.left + hole.percent.size.width) {
                    var newHWidth = (hole.percent.pos.left + hole.percent.size.width) - (topCell.percent.pos.left + topCell.percent.size.width);
                    var newH = createHole(hole.percent.pos.top, topCell.percent.pos.left + topCell.percent.size.width, hole.percent.size.height, newHWidth);
                    holes.push(newH);
                }
            }
        }

        return getEmptyHolesArray(holes);
    };

    function searchLeft(cells, hole) {
        var result = searchForProperCell(cells, hole, function(cellPos, cellSize, holePos, holeSize) {
            return  cellPos.top >= holePos.top && cellPos.top + cellSize.height <= holePos.top + holeSize.height && cellPos.left + cellSize.width == holePos.left;
        });

        return result;
    };

    function searchBottom(cells, hole) {
        var result = searchForProperCell(cells, hole, function(cellPos, cellSize, holePos, holeSize) {
            return cellPos.left >= holePos.left && cellPos.left + cellSize.width <= holePos.left + holeSize.width && cellPos.top == holePos.top + holeSize.height;
        });

        return result;
    }

    function searchRight(cells, hole) {
        var result = searchForProperCell(cells, hole, function(cellPos, cellSize, holePos, holeSize) {
            return cellPos.top >= holePos.top && cellPos.top + cellSize.height <= holePos.top + holeSize.height && cellPos.left == holePos.left + holeSize.width;
        });

        return result;
    };

    function searchTop(cells, hole) {
        var result = searchForProperCell(cells, hole, function(cellPos, cellSize, holePos, holeSize) {
            return cellPos.left >= holePos.left && cellPos.left + cellSize.width <= holePos.left + holeSize.width && (cellPos.top + cellSize.height == holePos.top);
        });

        return result;
    };

    function searchForProperCell(cells, hole, checkCellFunc) {
        var result = null;

        for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];
            var cellSize = cell.percent.size;
            var cellPos = cell.percent.pos;

            var holeSize = hole.percent.size;
            var holePos = hole.percent.pos;

            if (checkCellFunc(cellPos, cellSize, holePos, holeSize)) {
                result = cell;
                break;
            }
        }

        return result;
    };

    function getEmptyHolesArray(holes) {
        var emptyHoles = [];

        for (var i = 0; i < holes.length; i++) {
            var hole = holes[i];

            if (hole.filled) {
                continue;
            }

            emptyHoles.push(hole);
        }
        
        return emptyHoles;
    };

    function createHole(top, left, height, width) {
        var newH = {
            percent: {
                pos: {
                    top: top,
                    left: left
                },
                size: {
                    height: height,
                    width: width
                },
            },
            filled: false
        };

        return newH;
    };
}]);