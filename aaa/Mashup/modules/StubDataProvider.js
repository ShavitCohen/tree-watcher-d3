App.service('StubDataProvider', [function() {
    
    this.getData = function(childrenNum, nestingNum, currNesting, parent) {
        var parent = parent || {
            name: "1",
            children: []
        };

        for (var i = 0; i < childrenNum; i++) {
            parent.children.push({
                name: parent.name + "." + i
            });

            if (currNesting < nestingNum - 1) {
                var currentChild = parent.children[i];
                currentChild.children = [];

                this.getData(childrenNum, nestingNum, currNesting + 1, currentChild);
            }
        }
        
        return parent;
    };

}]);