App.directive('tooltip', [
    'Utils', 
    'CONSTANTS',
    function(Utils, CONSTANTS) {
    
    var directive = {};
    
    directive.restrict = 'A';
    directive.replace = true;
    
    directive.templateUrl = 'modules/components/tooltip/Tooltip.tpl.html';
    
    directive.scope = {};
    
    directive.controller = function($scope) {
        $scope.node = {};
        $scope.pos = {};
        $scope.showTooltip = false;
        
        $scope.$on(CONSTANTS.EVENTS.SHOW_TOOLTIP, function($event, node, pos) {
            Utils.safeApply($scope, function() {
                $scope.node = node;
                $scope.pos = pos;
                $scope.showTooltip = true;
            });
        });

        $scope.$on(CONSTANTS.EVENTS.HIDE_TOOLTIP, function($event) {
            Utils.safeApply($scope, function() {
                $scope.showTooltip = false;
            });
        });
    };
    
    return directive;
    
}]);