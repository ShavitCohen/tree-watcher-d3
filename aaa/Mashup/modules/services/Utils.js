App.service('Utils', ['_', function(_) {
    var self = this;

    this.preventEventBubbling = function(e) {
        if (angular.isObject(e)) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    this.getPropertyIfExists = function(obj, path, delimiter) {
        var temp = _.isEmpty(obj) ? null : obj;

        if (temp != null) {
            delimiter = angular.isString(delimiter) ? delimiter : '.';

            var pathEls = path.split(delimiter);
            
            var pathElsNum = pathEls.length;
            var result = null;

            for (var i = 0; i < pathElsNum; i++) {
                var curPathEl = pathEls[i];
                if (temp[curPathEl] != undefined && temp[curPathEl] != null) {
                    temp = temp[curPathEl];
                    if (i == pathElsNum - 1) {
                        break;
                    }
                } else {
                    temp = null;
                    break;
                }
            }
        }
        
        return temp;
    };

    this.safeApply = function(scope, func) {
        if (!scope.$$phase) {
            scope.$apply(func);
        } else {
            func();
        }
    };
}]);
