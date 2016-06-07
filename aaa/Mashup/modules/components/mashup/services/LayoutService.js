App.service('LayoutService', [
    '_', 
    '$window',
    '$timeout', 
    'CONSTANTS', 
    function(_, $window, $timeout, CONSTANTS) {
    var self = this;

    var scope;
    var layoutSize;
    var layoutEl;

    $timeout(function() {
        self.calculateLayoutSize();
    }, 0);

    var cellTopBottomMarginBorder;
    var cellLeftRightMarginBorder;

    this.calculateLayoutSize = function() {
        if (_.isEmpty(layoutEl)) {
            layoutEl = angular.element('.mashup');
        }
        layoutSize = {
            height: layoutEl.height(),
            width: layoutEl.width()
        };
    };

    this.getLayoutSize = function() {
        return {
            height: layoutSize.height,
            width: layoutSize.width,
            getHeight: function() {
                return layoutSize.height;
            },
            getWidth: function() {
                return layoutSize.width;
            }
        };
    };

    this.getCellMarginBorderWidth = function() {
        return {
            topBottom: cellTopBottomMarginBorder,
            leftRight: cellLeftRightMarginBorder,
            getTopBottom: function() {
                return cellTopBottomMarginBorder;
            },
            getLeftRight: function() {
                return cellLeftRightMarginBorder;
            }
        };
    };

    this.setCellMarginBorderWidth = function(tb, lr) {
        cellTopBottomMarginBorder = tb;
        cellLeftRightMarginBorder = lr;
    };

    this.isCellDataSet = function() {
        return angular.isNumber(cellTopBottomMarginBorder) && angular.isNumber(cellLeftRightMarginBorder);
    };

    this.setScope = function(s) {
        scope = s;
    };

    angular.element($window).resize(function() {
        self.calculateLayoutSize();
        scope.$broadcast(CONSTANTS.EVENTS.RESIZE_CELLS, true);
    });
}]);