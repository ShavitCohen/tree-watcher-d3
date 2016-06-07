App.directive('hierarchy', [
    '_',
    'Utils',
    '$window', 
    '$timeout',
    'CONSTANTS',
    'HierarchyDataProvider', 
    function(_, Utils, $window, $timeout, CONSTANTS, HierarchyDataProvider) {

    var directive = {};

    directive.restrict = 'C';
    directive.templateUrl = 'modules/components/mashup/components/hierarchy/Hierarchy.tpl.html';


    directive.scope = {};

    directive.link = function(scope, element, attributes) {

        $timeout(function() {
            element.find('.hierarchy-table').colResizable({
                liveDrag: true
            });
        }, 0);

    };

    directive.controller = ['$scope', function($scope) {

        $scope.hideSubColumns = false;
        $scope.nestingShift = 20;

        HierarchyDataProvider.query(function(data) {
            $scope.allData = data;
        });

        $scope.showHideColumns = function() {
            $scope.hideSubColumns = !$scope.hideSubColumns;
        };

        $scope.expandCollapseRow = function($event, $index, row) {
            Utils.preventEventBubbling($event);

            if (row.expanded) {
                collapseAll(row);
            } else {
                expand($index, row)
            }
        };

        function expand(index, row) {
            var children = row.children;
            var nesting = row.nesting || 0;
            nesting++;
            
            for (var i = 0; i < children.length; i++) {
                children[i]['nesting'] = nesting;
            }

            _.mergeArrayIntoPosition($scope.allData, children, index + 1);
            row.expanded = true;
        };

        function getAllChildren(parent) {
            var children = [];
            children.push(parent);

            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (_.isArray(child.children)) {
                    children = children.concat(child.children);
                }
            }
            
            return children;
        };

        function collapseAll(row) {
            var children = getAllChildren(row);

            for (var i = children.length - 1; i >= 0; i--) {
                var current = children[i];
                if (current.expanded) {
                    var index = $scope.allData.indexOf(current);
                    $scope.allData.splice(index + 1, current.children.length);
                    current.expanded = false;
                }
            }
        };



    }];

    return directive;
}]);
