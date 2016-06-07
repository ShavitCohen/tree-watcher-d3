'use strict';

/**
 * @ngdoc function
 * @name topviewD3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the topviewD3App
 */
angular.module('topviewD3App')
  .controller('MainCtrl', ["$scope", "$http",
    function ($scope, $http) {
      $scope.topViewData = {
        width: window.innerWidth-50,
        height: window.innerHeight-50,
        data:null
      };

      init();

      function init() {
        $http.get("data/top-view-data.json")
          .then(function(res){
            $scope.topViewData.data = res.data;
          })
      }

    }]);
