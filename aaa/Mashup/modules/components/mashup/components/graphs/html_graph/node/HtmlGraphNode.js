App.directive('htmlGraphNode', [function() {

    var directive = {};

    directive.restrict = 'C';
    directive.templateUrl = 'modules/components/mashup/components/graphs/html_graph/node/HtmlGraphNode.tpl.html';

    directive.scope = {
        nodes: '='
    };

    directive.controller = ['$scope', function($scope) {

        $scope.hideShowChildren = function(node) {
            node.showChildren = !node.showChildren;
        };

    }];

    return directive;
}]);
