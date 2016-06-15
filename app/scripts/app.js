'use strict';

/**
 * @ngdoc overview
 * @name topviewD3App
 * @description
 * # topviewD3App
 *
 * Main module of the application.
 */


angular.module('topView.directives', []);


angular
  .module('topviewD3App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'topView.directives',
    'rzModule'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
