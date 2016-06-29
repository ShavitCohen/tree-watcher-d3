(function () {
  angular.module('topView.directives')
    .directive('topViewFilterMenu', topViewFilterMenu);

  topViewFilterMenu.$inject = [];

  function topViewFilterMenu() {
    return {
      restrict: 'E',
      templateUrl: "scripts/directives/top-view-filter-menu/top-view-filter-menu.directive.html",
      scope: {
        filters: "=",
        statusChange: "&"
      },
      link: link
    };

    function link(scope, elm, attrs) {
      scope.filterKeys  = Object.keys(scope.filters);
      scope.statusChanged = function (status, val) {
        scope.statusChange()(status, val);
      }
    }
  }
})();
