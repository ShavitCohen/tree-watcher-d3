App.directive('hyperTree', [
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
    directive.templateUrl = 'modules/components/mashup/components/graphs/hyper_tree/HyperTree.tpl.html';


    directive.scope = {
        cellIndex: '='
    };

    directive.link = function(scope, element, attributes) {
        var ht;
        var id = 'hyper-tree-' +  scope.cellIndex;

        scope.nodes = {};
        scope.numberOfNodes = 0;

        scope.$on(CONSTANTS.EVENTS.CHANGE_VIEW, function($event, viewName) {
            setDataToGraph(viewName);
        });

        scope.$on(CONSTANTS.EVENTS.CI_WIRING, function($event, ciId, componentId) {
            if (componentId != id) {
                ht.onClick(ciId);
            }
        });

        $jit.Hypertree.Plot.NodeTypes.implement({
            'top-view-node': {
                'render': function(node, canvas) {
                    if (!node.data.isCollapsed) {
                        var position = node.pos.getc().$scale(node.scale);
                        GraphDrawService.drawNode(canvas, node, position);
                    }
                },
                'contains': function(node, pos) {
                    var nodePos = node.pos.getc().$scale(node.scale);
                    var finalWidth = Utils.getPropertyIfExists(node, 'data.finalWidth');
                    var finalHeight = Utils.getPropertyIfExists(node, 'data.finalHeight');
                    return this.nodeHelper.rectangle.contains(nodePos, pos, finalWidth, finalHeight);
                }
            }
        });

        $timeout(function() {
            ht = new $jit.Hypertree({
                injectInto: id,
                offset: 0.2,
                //radius: 400,
                transition: $jit.Trans.Back.easeOut,
                duration: 1000,
                Node: {
                    type: 'top-view-node'
                },
                Label: {
                    color: "transparent",
                    type: 'Native'
                },
                Edge: {
                    type: "hyperline",
                    lineWidth: 3,
                    color: "#477186"
                },
                Navigation: {
                    type: "Native",
                    enable: true,
                    //panning: true,
                    zooming: 20
                },
                Events: {
                    enable: true,
                    onClick: function (node) {
                        if (node) {
                            var nodeId = node.id;

                            scope.$emit(CONSTANTS.EVENTS.CI_WIRING, nodeId, id);
                            ht.onClick(nodeId);
                        }
                    },
                    onDragStart: function (node, eventInfo, e) {
                        pos = eventInfo.getPos();
                    },
                    onDragMove: function (node, eventInfo, e) {
                        if (ht.busy) return;
                        var npos = eventInfo.getPos();
                        ht.move({
                            x: (pos.x - npos.x) / node.scale,
                            y: (pos.y - npos.y) / node.scale
                        }, {
                            duration: 0,
                            hideLabels: false
                        });
                        pos = npos;
                    },
                    onMouseEnter: function(node, eventInfo, e) {
                        TooltipService.showTooltip(scope, node, eventInfo, e, function(n) {
                            var nodePos = n.pos.getc().$scale(n.scale);
                            return nodePos.x;
                        });
                    },
                    onMouseMove: function(node, eventInfo, e) {
                        TooltipService.showTooltip(scope, node, eventInfo, e, function(n) {
                            var nodePos = n.pos.getc().$scale(n.scale);
                            return nodePos.x;
                        });
                    },
                    onMouseLeave: function(node, eventInfo, e) {
                        TooltipService.hideTooltip(scope)
                    },
                    onRightClick: function(node, eventInfo, e) {
                        ContextMenuService.showContextMenu(scope, node, e);
                    }
                }
            });


            GraphDataProvider.then(function(data) {
                var nodes = GraphUtils.getAllNodesAsArray(data);
                scope.numberOfNodes = nodes.length;

                ht.loadJSON(data);
                ht.refresh();

                ht.onClick('1');
            });
        }, 0);
    };

    return directive;
}]);
