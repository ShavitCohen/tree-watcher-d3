App.factory('HtmlGraphDataProvider', ['$timeout', 'StubDataProvider', function($timeout, StubDataProvider) {
    return {
        query: function(callback) {
            var data = [StubDataProvider.getData(10, 2, 0, null)];

            $timeout(function() {
                callback(data);
            }, 0);
        }
    }
}]);