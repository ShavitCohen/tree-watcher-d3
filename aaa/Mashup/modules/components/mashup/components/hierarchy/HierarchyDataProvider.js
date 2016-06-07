App.factory('HierarchyDataProvider', ['$timeout', 'StubDataProvider', function($timeout, StubDataProvider) {
    return {
        query: function(callback) {
            var data = [StubDataProvider.getData(2, 2, 0, null)];

            $timeout(function() {
                callback(data);
            }, 0);
        }
    }
}]);