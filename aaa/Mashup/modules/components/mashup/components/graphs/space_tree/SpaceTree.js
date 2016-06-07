App.directive('spaceTree', [
    'Utils', 
    '$timeout',
    'CONSTANTS',
    'GraphUtils',
    'TooltipService',
    'GraphDrawService', 
    'GraphDataProvider',
    'ContextMenuService',
    function(Utils, $timeout, CONSTANTS, GraphUtils, TooltipService, GraphDrawService, GraphDataProvider, ContextMenuService) {

    var directive = {};

    directive.restrict = 'C';
    directive.templateUrl = 'modules/components/mashup/components/graphs/space_tree/SpaceTree.tpl.html';


    directive.scope = {
        cellIndex: '='
    };

    directive.link = function(scope, element, attributes) {
        var st;
        var id = 'space-tree-' +  scope.cellIndex;
    
        scope.nodes = {};
        scope.numberOfNodes = 0;
        
        scope.$on(CONSTANTS.EVENTS.CHANGE_VIEW, function($event, viewName) {
            setDataToGraph(viewName);
        });
        
        scope.$on(CONSTANTS.EVENTS.CI_WIRING, function($event, ciId, componentId) {
            if (componentId != id) {
                st.onClick(ciId);
            }
        });

        $jit.ST.Plot.NodeTypes.implement({
            'top-view-node': {
                'render': function(node, canvas) {
                    if (!node.data.isCollapsed) {
                        GraphDrawService.drawNode(canvas, node);
                    }
                },
                'contains': function(node, pos) {
                    var nodePos = node.pos.getc();
                    var finalWidth = Utils.getPropertyIfExists(node, 'data.finalWidth');
                    var finalHeight = Utils.getPropertyIfExists(node, 'data.finalHeight');
                    return this.nodeHelper.rectangle.contains(nodePos, pos, finalWidth, finalHeight);
                }
            }
        });

        $timeout(function() {
            st = new $jit.ST({  
                injectInto: id,
                duration: 800,
                transition: $jit.Trans.Quart.easeInOut,
                levelDistance: 50,
                Navigation: {
                    enable:true,
                    panning:true
                },
                Node: {  
                    type: 'top-view-node'
                },
                Label: {
                    color: "transparent",
                    type: 'Native'
                },
                Edge: {  
                    type: 'bezier',  
                    overridable: true  
                },
                Events: {
                    enable: true,
                    onClick: function(node) {
                        if (node) {
                            var nodeId = node.id;

                            scope.$emit(CONSTANTS.EVENTS.CI_WIRING, nodeId, id);
                            st.onClick(nodeId);
                        }
                    },
                    onMouseEnter: function(node, eventInfo, e) {
                        TooltipService.showTooltip(scope, node, eventInfo, e, function(n) {
                            return Utils.getPropertyIfExists(n, 'pos.x');
                        });
                    },
                    onMouseMove: function(node, eventInfo, e) {
                        TooltipService.showTooltip(scope, node, eventInfo, e, function(n) {
                            return Utils.getPropertyIfExists(n, 'pos.x');
                        });
                    },
                    onMouseLeave: function(node, eventInfo, e) {
                        TooltipService.hideTooltip(scope);
                    },
                    onRightClick: function(node, eventInfo, e) {
                        ContextMenuService.showContextMenu(scope, node, e);
                    }
                },
                onBeforePlotLine: function(adj) {
                    if (adj.nodeFrom.selected && adj.nodeTo.selected) {
                        adj.data.$color = "#eed";
                        adj.data.$lineWidth = 3; 
                    } else {
                        delete adj.data.$color;
                        delete adj.data.$lineWidth;
                    }
                }
            });
            st.geom.switchOrientation('top');

            
            GraphDataProvider.then(function(data) {
                var nodes = GraphUtils.getAllNodesAsArray(data);
                scope.numberOfNodes = nodes.length;
                
                
                st.loadJSON(data);
                st.compute();
                
                st.onClick(st.root);
            });
        }, 0);
    };

    return directive;
}]);
