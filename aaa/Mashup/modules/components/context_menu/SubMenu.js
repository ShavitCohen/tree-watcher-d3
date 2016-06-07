App.directive('subMenu', [
    'Utils',
    '$timeout', 
    'CONSTANTS',
    function(Utils, $timeout, CONSTANTS) {

    var directive = {};

    directive.restrict = 'A';
    directive.replace = true;

    directive.scope = {
        data: '=',
        parentNum: '='
    };
    
    directive.templateUrl = 'modules/components/context_menu/ContextMenu.tpl.html';

    directive.link = function(scope, element, attributes) {
        scope.pos = {};
        scope.showContextMenu = true;

        scope.$on(CONSTANTS.EVENTS.SHOW_CONTEXT_MENU, function($event, node, pos) {
            $timeout(function() {
                var itemHeight = 19;
                var contextMenuElWidth = element.parents('.context-menu').outerWidth() - 2;
                if (angular.isNumber(contextMenuElWidth)) {
                    Utils.safeApply(scope, function() {
                        scope.pos = {
                            x: contextMenuElWidth,
                            y: scope.parentNum * itemHeight - 1
                        };
                    });
                }
            }, 0);
        });
    };

    return directive;
}]);
