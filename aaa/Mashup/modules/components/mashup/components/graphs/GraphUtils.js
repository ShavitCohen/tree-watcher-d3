App.service('GraphUtils', function() {
    var self = this;

    var statusToColor = {
        "20": {
            "text": "green",
            "hex": "#66CC33"
        },
        "15": {
            "text": "green",
            "hex": "#66CC33"
        },
        "10": {
            "text": "green",
            "hex": "#66CC33"
        },
        "5": {
            "text": "green",
            "hex": "#66CC33"
        },
        "0": {
            "text": "red",
            "hex": "#DC0D26"
        },
        "-1": {
            "text": "yellow",
            "hex": "#DAB426"
        },
        "-2": {
            "text": "yellow",
            "hex": "#DAB426"
        },
        "-3": {
            "text": "yellow",
            "hex": "#DAB426"
        },
        "-4": {
            "text": "yellow",
            "hex": "#DAB426"
        }
    };

    function covertStatusToColor(status, type) {
        var result = statusToColor[status][type];
        return angular.isString(result) ? result : statusToColor["-2"][type];
    };
    
    this.convertStatusToTextColor = function(status) {
        return covertStatusToColor(status, 'text');
    };
    
    this.convertStatusToHexColor = function(status) {
        return covertStatusToColor(status, 'hex');
    };

    this.getAllNodesAsArray = function(rootNode) {
        var result = [];
        result.push(rootNode);
        
        var traverseTree = function(node) {
            node.children.forEach(function(item, i, arr) {
                result.push(item);
                traverseTree(item);
            });
        };
        
        traverseTree(rootNode);
        
        return result;
    };

});
