angular.module('Templates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("modules/components/context_menu/ContextMenu.tpl.html",
    "<div class=\"context-menu\" ng-show=\"showContextMenu\" ng-style=\"{'left': pos.x, 'top': pos.y}\">\n" +
    "    <div ng-repeat=\"item in data\" class=\"context-menu-item\" item-data=item pos=position num=$index></div>\n" +
    "</div>");
  $templateCache.put("modules/components/context_menu/item/contextMenuItem.tpl.html",
    "<div ng-mousedown=\"processAction($event)\">\n" +
    "    <div class=\"context-item-text\" ng-class=\"{'has-sub-menu': itemData.submenues}\">{{itemData.name}}</div>\n" +
    "    <div class=\"sub-menu\" data=itemData.submenues is-submenu=true parent-num=num></div>\n" +
    "</div>");
  $templateCache.put("modules/components/mashup/Mashup.tpl.html",
    "<div class=\"mashup\">\n" +
    "    <div class=\"cell\" ng-repeat=\"cell in layout.cells\" index=$index data=cell></div>\n" +
    "</div>");
  $templateCache.put("modules/components/mashup/cell/Cell.tpl.html",
    "<div ng-style=\"{\n" +
    "        'top': data.pos.top, \n" +
    "        'left': data.pos.left,\n" +
    "        'height': data.pxSize.height,\n" +
    "        'width': data.pxSize.width\n" +
    "    }\">\n" +
    "    <div ng-show=\"!data.component\">\n" +
    "        <div class=\"cell-action\" ng-click=\"showSplit = !showSplit\">\n" +
    "            <span ng-show=\"!showSplit\"> Split </span>\n" +
    "            <div ng-show=\"showSplit\">\n" +
    "                <div ng-click=\"split('vertical')\">Vertical</div>\n" +
    "                <div ng-click=\"split('horizontal')\">Horizontal</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"cell-action\" ng-click=\"remove()\"> Remove </div>\n" +
    "        <div class=\"cell-action component-selector\"></div>\n" +
    "    </div>\n" +
    "    <div ng-show=\"data.component\" class=\"component-wrapper\" component-name=\"data.component\" cell-index=\"index\"></div>\n" +
    "    <div class=\"marker\"></div>\n" +
    "</div>");
  $templateCache.put("modules/components/mashup/cell/component_selector/ComponentSelector.tpl.html",
    "<div ng-click=\"showCompList = !showCompList\">\n" +
    "    <span ng-show=\"!showCompList\">Add Component</span>\n" +
    "    <div ng-show=\"showCompList\">\n" +
    "        <div class=\"cell-action\" ng-click=\"addComponent(comp.id)\" ng-repeat=\"comp in components\"> {{comp.name}} </div>\n" +
    "    </div>\n" +
    "</div>");
  $templateCache.put("modules/components/mashup/components/component_wrapper/ComponentWrapper.tpl.html",
    "<div>\n" +
    "    <div class=\"component-header\">\n" +
    "        <span class=\"component-button\" ng-click=\"removeComponent()\">Remove Component</span>\n" +
    "    </div>\n" +
    "    <div class=\"component-body\">\n" +
    "        <div ng-class=\"componentName\" class=\"component-holder\" cell-index=cellIndex></div>\n" +
    "    </div>\n" +
    "</div>");
  $templateCache.put("modules/components/mashup/components/graphs/d3_graph/D3Graph.tpl.html",
    "<div></div>");
  $templateCache.put("modules/components/mashup/components/graphs/html_graph/HtmlGraph.tpl.html",
    "<div class=\"tree\">\n" +
    "    <ul class=\"html-graph-node\" nodes=\"tree\"></ul>\n" +
    "</div>");
  $templateCache.put("modules/components/mashup/components/graphs/html_graph/node/HtmlGraphNode.tpl.html",
    "<li ng-repeat=\"node in nodes track by $index\" class=\"single-node\">\n" +
    "    <a href=\"#\" ng-click=\"hideShowChildren(node)\" class=\"node-name\">{{node.name}}</a>\n" +
    "    <ul ng-if=\"node.children\" class=\"html-graph-node\" nodes=\"node.children\" ng-show=\"node.showChildren\"></ul>\n" +
    "</li>");
  $templateCache.put("modules/components/mashup/components/graphs/hyper_tree/HyperTree.tpl.html",
    "<div ng-attr-id=\"{{'hyper-tree-' +  cellIndex}}\" class=\"graph\"></div>");
  $templateCache.put("modules/components/mashup/components/graphs/space_tree/SpaceTree.tpl.html",
    "<div ng-attr-id=\"{{'space-tree-' +  cellIndex}}\" class=\"graph\"></div>");
  $templateCache.put("modules/components/mashup/components/hierarchy/Hierarchy.tpl.html",
    "<div class=\"hierarchy-table-wrapper\">\n" +
    "    <table class=\"hierarchy-table\">\n" +
    "        <tr class=\"table-row\">\n" +
    "            <th class=\"table-header\" rowspan=\"2\"> Name </th>\n" +
    "            <th class=\"table-header\" rowspan=\"2\"> Status </th>\n" +
    "            <th class=\"table-header\" rowspan=\"2\"> Acknowledge </th>\n" +
    "            <th class=\"table-header\" colspan=\"2\">\n" +
    "                <div class=\"expand-collapse-button vert-align-middle\" ng-click=\"showHideColumns()\"> {{hideSubColumns ? '+' : '-'}} </div> \n" +
    "                <span> Application </span>\n" +
    "            </th>\n" +
    "            <th class=\"table-header\" rowspan=\"2\"> Last Status Change </th>\n" +
    "        </tr>\n" +
    "        <tr class=\"table-row\">\n" +
    "            <th class=\"table-header\" ng-hide=\"hideSubColumns\"> Application Performance </th>\n" +
    "            <th class=\"table-header\" ng-hide=\"hideSubColumns\"> Application Availability </th>\n" +
    "        </tr>\n" +
    "        <tr class=\"table-row\" ng-repeat=\"row in allData track by $index\" ng-click=\"row.selected = !row.selected\" ng-class=\"{'selected' : row.selected}\">\n" +
    "            <td class=\"table-cell name\" ng-class=\"{'no-children' : !row.children}\">\n" +
    "                <div ng-style=\"{'padding-left': row.nesting * nestingShift + 'px'}\">\n" +
    "                    <div class=\"expand-collapse-button\" ng-show=\"row.children\" ng-click=\"expandCollapseRow($event, $index, row)\"> {{row.expanded ? '-' : '+'}} </div>\n" +
    "                    <div class=\"item-name\"> {{row.name}} </div>\n" +
    "                </div>\n" +
    "                <div class=\"details\">\n" +
    "                    details\n" +
    "                </div>\n" +
    "            </td>\n" +
    "            <td class=\"table-cell\">{{row.name}}</td>\n" +
    "            <td class=\"table-cell\">{{row.name}}</td>\n" +
    "            <td class=\"table-cell\">{{row.name}}</td>\n" +
    "            <td class=\"table-cell\">{{row.name}}</td>\n" +
    "            <td class=\"table-cell\">{{row.name}}</td>\n" +
    "        </tr>\n" +
    "\n" +
    "    </table>\n" +
    "</div>");
  $templateCache.put("modules/components/tooltip/Tooltip.tpl.html",
    "<div class=\"tooltip\" ng-show=\"showTooltip\" ng-style=\"{'left': pos.x, 'top': pos.y}\">\n" +
    "    <table class=\"tooltip-table\">\n" +
    "        <tr>\n" +
    "            <td colspan=\"2\">\n" +
    "                <center ng-style=\"{'background': node.data.hexColor}\" class=\"tooltip-header\">Details - {{node.name}}</center>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr ng-repeat=\"kpi in node.data._kpis\">\n" +
    "            <td class=\"label\">\n" +
    "                <b>{{kpi.label}}:</b>\n" +
    "            </td>\n" +
    "            <td class=\"value\">{{kpi.status}}</td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "</div>");
}]);
