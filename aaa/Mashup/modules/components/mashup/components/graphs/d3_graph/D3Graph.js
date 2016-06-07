App.directive('d3Graph', ['HtmlGraphDataProvider', function(HtmlGraphDataProvider) {

    var directive = {};

    directive.restrict = 'C';
    directive.templateUrl = 'modules/components/mashup/components/graphs/d3_graph/D3Graph.tpl.html';

    directive.scope = {};

    directive.link = function(scope, element, attributes) {
        
    };

    return directive;
}]);
  