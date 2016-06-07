App.factory('ContextMenuConfigProvider', ['$resource', function($resource) {
    return $resource('configs/:configName', {configName: '@configName'});
}]);
