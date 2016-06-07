App.directive('htmlGraph', ['HtmlGraphDataProvider', function(HtmlGraphDataProvider) {

    var directive = {};

    directive.restrict = 'C';
    directive.templateUrl = 'modules/components/mashup/components/graphs/html_graph/HtmlGraph.tpl.html';

    directive.scope = {};

    directive.controller = ['$scope', function($scope) {
        $scope.tree = {};

        HtmlGraphDataProvider.query(function(data) {
            $scope.tree = data;
        });

    }];

    return directive;
}]);
