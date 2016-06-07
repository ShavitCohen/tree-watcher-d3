App.directive('mashup', [
    'Utils',
    'CONSTANTS', 
    'LayoutService', 
    'RemoveCellService',
    function(Utils, CONSTANTS, LayoutService, RemoveCellService) {

    var directive = {};

    directive.scope = {};

    directive.restrict = 'A';
    directive.replace = true;
    directive.templateUrl = 'modules/components/mashup/Mashup.tpl.html';

    directive.controller = ['$scope', function($scope) {

        LayoutService.setScope($scope);
    
        $scope.layout = {
            "cells": [{
                "percent": {
                    "pos": {
                        "top": 0,
                        "left": 0
                    },
                    "size": {
                        "height": 100,
                        "width": 100
                    }
                },
                //calculated
                "pos": {
                    "top": 0,
                    "left": 0
                },
                "pxSize": {
                    "height": 0,
                    "width": 0
                },
                "component": ""
            }]
        };

        $scope.$on(CONSTANTS.EVENTS.SPLIT_CELL, function($event, cellNum, cell, type) {
            Utils.preventEventBubbling($event);
            $scope.layout.cells.splice(cellNum + 1, 0, cell);
        });

        $scope.$on(CONSTANTS.EVENTS.REMOVE_CELL, function($event, cellNum, hole) {
            Utils.preventEventBubbling($event);

            var numOfCells = Utils.getPropertyIfExists($scope, 'layout.cells.length');
            if (numOfCells > 1) {
                $scope.layout.cells.splice(cellNum, 1);
                
                RemoveCellService.fillHole($scope.layout.cells, [hole]);
                $scope.$broadcast(CONSTANTS.EVENTS.RESIZE_CELLS);
            }
        });

        $scope.$on(CONSTANTS.EVENTS.CI_WIRING, function($event, ciId, componentId, selfTriggered) {
            if (!selfTriggered) {
                $scope.$broadcast(CONSTANTS.EVENTS.CI_WIRING, ciId, componentId, true);
            }
        });

    }];

    return directive;
}]);

