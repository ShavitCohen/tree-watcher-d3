App.directive('contextMenu', [
    '_',
    'Utils', 
    'CONSTANTS',
    'ContextMenuService', 
    function(_, Utils, CONSTANTS, ContextMenuService) {

    var directive = {};

    directive.restrict = 'A';
    directive.replace = true;
    
    directive.templateUrl = 'modules/components/context_menu/ContextMenu.tpl.html';

    directive.scope = {
        data: '='
    };

    directive.controller = function($scope) {
        $scope.node = {};
        $scope.showContextMenu = false;
        
        $scope.$on(CONSTANTS.EVENTS.SHOW_CONTEXT_MENU, function($event, node, pos) {
            Utils.safeApply($scope, function() {
                $scope.node = node;
                $scope.pos = pos;
                $scope.showContextMenu = true;
            });
        });

        $scope.$on(CONSTANTS.EVENTS.HIDE_CONTEXT_MENU, function($event) {
            Utils.safeApply($scope, function() {
                $scope.showContextMenu = false;
            });
        });

        (function(_, $scope, ContextMenuService) {
            if (_.isEmpty($scope.data)) {
                ContextMenuService.getConfig().then(function(data) {
                    $scope.data = data.items;
                }, function(err) {});
            }
        })(_, $scope, ContextMenuService);
    };
    
    return directive;
}]);
