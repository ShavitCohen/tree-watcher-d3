App.factory("_", ['$window', function($window) {
    var _ = $window._;
    delete($window._);

    _.mixin({
        withoutArray: function(arr, arrToRemove) {
            return _.without.apply(_, [arr].concat(arrToRemove));
        },
        remove: function(obj, keys) {
            for (var i = 0; i < keys.length; i++) {
                delete obj[keys[i]];
            }
            return obj;
        },
        mergeArrayIntoPosition: function(source, arrayToMerge, index) {
            return source.splice.apply(source, [index, 0].concat(arrayToMerge));
        }
    });

    return(_);
}]);
