App.service('TooltipService', [
    'Utils', 
    'CONSTANTS',
    function(Utils, CONSTANTS) {

    var self = this;

    var tooltipCreated = false;

    this.setTooltipCreated = function(value) {
        tooltipCreated = value;
    };

    this.showTooltip = function(scope, node, eventInfo, e, getX) {
        if (angular.isObject(node) && node.id != CONSTANTS.NODE.ROOT_ID) {
            var nodeCenterPosX = getX(node);
            var nodeWidth = Utils.getPropertyIfExists(node, 'data.finalWidth');
            var nodePosX = nodeCenterPosX - (nodeWidth / 2);

            var eventPosX = Utils.getPropertyIfExists(eventInfo, 'pos.x');
            if (eventPosX <= nodePosX + CONSTANTS.NODE.ICON_HOLDER_WIDTH) {
                var shift = 3;

                scope.$emit(CONSTANTS.EVENTS.SHOW_TOOLTIP, node, {
                    x: e.clientX + shift,
                    y: e.clientY + shift
                });
            } else {
                self.hideTooltip(scope);
            }
        }
    };

    this.hideTooltip = function(scope, isMouseLeave) {
        scope.$emit(CONSTANTS.EVENTS.HIDE_TOOLTIP);
    };

}]);