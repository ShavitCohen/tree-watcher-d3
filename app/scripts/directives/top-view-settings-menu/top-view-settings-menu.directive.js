(function () {
  angular.module('topView.directives')
    .directive('topViewSettingsMenu', topViewSettingsMenu);

  topViewSettingsMenu.$inject = [];

  function topViewSettingsMenu() {
    return {
      restrict: 'E',
      templateUrl: "scripts/directives/top-view-settings-menu/top-view-settings-menu.directive.html",
      scope: {
        layout: "=",

        viewWindowMinWidth: "=",
        viewWindowMaxWidth: "=",

        viewWindowMinHeight: "=",
        viewWindowMaxHeight: "=",

        viewWindowWidthValue: "=",
        viewWindowHeightValue: "=",

        viewWindowWidthChange: "&",
        viewWindowHeightChange: "&",
        treeLayoutChange: "&"
      },
      link: link
    };

    function link(scope, elm, attrs) {
      scope.sliderOptionsHeight = {
        floor: scope.viewWindowMinHeight,
        ceil: scope.viewWindowMaxHeight,
        onChange: function (id, val) {
          scope.viewWindowHeightChange()(val);
        }
      };

      scope.sliderOptionsWidth = {
        floor: scope.viewWindowMinWidth,
        ceil: scope.viewWindowMaxWidth,
        onChange: function (id, val) {
          scope.viewWindowWidthChange()(val);
        }
      };

      scope.$watch('layout', function (val) {
        if (val) {
          scope.treeLayoutChange()(val);
        }

      })

    }
  }
})();
