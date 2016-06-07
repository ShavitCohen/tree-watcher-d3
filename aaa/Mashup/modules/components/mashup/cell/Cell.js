App.directive('cell', [
    'Utils', 
    '$timeout', 
    'CONSTANTS',
    'LayoutService',
    function(Utils, $timeout, CONSTANTS, LayoutService) {

    var directive = {};

    directive.restrict = 'C';
    directive.replace = true;
    directive.templateUrl = 'modules/components/mashup/cell/Cell.tpl.html';


    directive.scope = {
        data: '=',
        index: '='
    };

    directive.controller = function($scope) {};

    directive.link = function(scope, element, attributes) {
        //TODO remove next commented line
        //scope.data.element = element;
        calculateSizeAndPosition();
       
        scope.$on(CONSTANTS.EVENTS.ADD_COMPONENT, function($event, component) {
            scope.data.component = component;
        });

        scope.$on(CONSTANTS.EVENTS.RESIZE_CELLS, function($event, windowResize) {
            calculateSizeAndPosition();

            if (windowResize) {
                $timeout(function() {
                    LayoutService.calculateLayoutSize();
                    calculateSizeAndPosition();
                }, 0);
            }
        });

        scope.$on();

        scope.split = function(type) {
            var newCellData = calculatePositions(type);
            scope.$emit(CONSTANTS.EVENTS.SPLIT_CELL, scope.index, newCellData, type);
        };

        scope.remove = function() {
            scope.$emit(CONSTANTS.EVENTS.REMOVE_CELL, scope.index, {
                percent: {
                    pos: {
                        top: scope.data.percent.pos.top,
                        left: scope.data.percent.pos.left
                    },
                    size: {
                        height: scope.data.percent.size.height,
                        width: scope.data.percent.size.width
                    }
                }
            });
        };

        function calculatePositions(type) {
            var elWidth = element.outerWidth(true);
            var elHeight = element.outerHeight(true);

            var newCellData = {
                percent: {
                    pos: {
                        top: scope.data.percent.pos.top,
                        left: scope.data.percent.pos.left
                    },
                    size: {
                        height: scope.data.percent.size.height,
                        width: scope.data.percent.size.width,
                    }
                }
            };

            switch(type) {
                case CONSTANTS.LAYOUT_CHANGE_TYPE.VERTICAL_SPLIT: 
                    scope.data.percent.size.width /= 2;
                    newCellData.percent.size.width /= 2;
                    newCellData.percent.pos.left = scope.data.percent.size.width + scope.data.percent.pos.left;
                    break;

                case CONSTANTS.LAYOUT_CHANGE_TYPE.HORIZONTAL_SPLIT: 
                    scope.data.percent.size.height /= 2;
                    newCellData.percent.size.height /= 2;

                    newCellData.percent.pos.top = scope.data.percent.size.height + scope.data.percent.pos.top;
                    break;
            }

            calculateSizeAndPosition();

            return newCellData;
        };

        function calculateSizeAndPosition() {
            $timeout(function() {
                setMarginBorderWidthIfNecessary();

                var pTop = scope.data.percent.pos.top;
                var pLeft = scope.data.percent.pos.left;

                var pHeight = scope.data.percent.size.height;
                var pWidth = scope.data.percent.size.width;

                var layoutHeight = LayoutService.getLayoutSize().getHeight();
                var layoutWidth = LayoutService.getLayoutSize().getWidth();

                var top = Math.floor(layoutHeight / 100 * pTop);
                var left = Math.floor(layoutWidth / 100 * pLeft);

                var height =  Math.floor(layoutHeight / 100 * pHeight) - LayoutService.getCellMarginBorderWidth().getTopBottom() * 2;
                var width =  Math.floor(layoutWidth / 100 * pWidth) - LayoutService.getCellMarginBorderWidth().getLeftRight() * 2;

                scope.data.pos = {
                    top: top,
                    left: left
                };

                scope.data.pxSize = {
                    height: height,
                    width: width
                };
            }, 0);
        };

        function setMarginBorderWidthIfNecessary() {
            if (!LayoutService.isCellDataSet()) {
                var cellTopBottomMarginBorder = element.outerHeight(true) - element.outerHeight();
                var cellLeftRightMarginBorder = element.outerWidth(true) - element.outerWidth();

                LayoutService.setCellMarginBorderWidth(cellTopBottomMarginBorder, cellLeftRightMarginBorder);
            }
        };
    };

    return directive;
}]);
