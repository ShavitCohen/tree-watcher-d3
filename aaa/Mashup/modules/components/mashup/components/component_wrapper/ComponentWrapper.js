App.directive('componentWrapper', ['$timeout', '$compile', function($timeout, $compile) {
    var directive = {};

    directive.restrict = 'C';
    directive.replace = true;
    directive.templateUrl = 'modules/components/mashup/components/component_wrapper/ComponentWrapper.tpl.html';


    directive.scope = {
        componentName: '=',
        cellIndex: '='
    };

    directive.link = function(scope, element, attributes) {

        scope.$watch('componentName', function(newV, oldV) {
            var componentHolder = element.find('.component-holder');

            if (angular.isString(newV)) {
                $timeout(function() {
                    $compile(componentHolder)(scope);    
                }, 0);
            } else {
                componentHolder.empty();
            }
        });

        scope.removeComponent = function() {
            scope.componentName = null;
        };

    };

    return directive;
}]);
