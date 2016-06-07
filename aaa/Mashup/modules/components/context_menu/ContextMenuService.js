App.service('ContextMenuService', [
    'CONSTANTS', 
    'ContextMenuConfigProvider', 
    function(CONSTANTS, ContextMenuConfigProvider) {

    var configPomise = ContextMenuConfigProvider.get({'configName': 'context-menu-config.json'}).$promise;
    var lastScope = null;
    var contextIsShown = false;

    this.showContextMenu = function(scope, node, e) {
        if (angular.isObject(node) && node.id != CONSTANTS.NODE.ROOT_ID) {
            var shift = 3;
            contextIsShown = true;
            lastScope = scope;

            scope.$emit(CONSTANTS.EVENTS.SHOW_CONTEXT_MENU, node, {
                x: e.clientX + shift,
                y: e.clientY + shift
            });
        }
    };

    this.getConfig = function() {
        return configPomise;
    };

    (function(CONSTANTS, ContextMenuConfigProvider) {
        var doc = angular.element(document).on('mousedown', function() {
            if (contextIsShown) {
                contextIsShown = false;
                lastScope.$emit(CONSTANTS.EVENTS.HIDE_CONTEXT_MENU);
                lastScope = null;
            }
        });
    })(CONSTANTS, ContextMenuConfigProvider);

}]);
