App.directive('contextMenuItem', [
    '_',
    'Utils', 
    '$compile',
    '$timeout',
    '$location',
    'CONSTANTS',
    function(_, Utils, $compile, $timeout, $location, CONSTANTS) {

    var directive = {};

    directive.restrict = 'C';
    directive.replace = true;
    
    directive.templateUrl = 'modules/components/context_menu/item/contextMenuItem.tpl.html';

    directive.scope = {
        num: '=',
        itemData: '='
    };

    directive.controller = function($scope) {
        
        $scope.processAction = function($event) {
            if ($scope.itemData.action == CONSTANTS.CONTEXT_MENU.ACTIONS.LINK) {
                $timeout(function() {
                    $location.path($scope.itemData.href);
                }, 0);
            }
        };

    };

    directive.link = function(scope, element, attributes) {
        var submenuData = Utils.getPropertyIfExists(scope, 'itemData.submenues');
        if (_.isArray(submenuData)) {
            var el = element.find('.sub-menu').attr('sub-menu', '');
            $compile(el)(scope);
        }
    }
    
    return directive;
}]);
