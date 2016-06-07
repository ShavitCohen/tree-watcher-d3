App.directive('componentSelector', ['CONSTANTS', function(CONSTANTS) {

    var directive = {};

    directive.restrict = 'C';
    directive.replace = true;
    directive.templateUrl = 'modules/components/mashup/cell/component_selector/ComponentSelector.tpl.html';


    directive.scope = {};

    directive.link = function(scope, element, attributes) {
        scope.components = [{
            "id": "hyper-tree",
            "name": "HyperTree"
        },{
            "id": "space-tree",
            "name": "SpaceTree"
        },{
            "id": "html-graph",
            "name": "HTML Graph"
        },{
            "id": "hierarchy",
            "name": "Hierarchy"
        }];

        scope.addComponent = function(id) {
            scope.$emit(CONSTANTS.EVENTS.ADD_COMPONENT, id);
        };
    };

    return directive;
}]);
