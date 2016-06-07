var libs = [
    'modules/js_libs/underscore/underscore-min.js',

    'modules/js_libs/jquery/jquery-2.1.4.min.js',
    'modules/js_libs/jquery/colResizable-1.6.min.js',
    'modules/js_libs/jit/jit.js',
    'modules/js_libs/d3/d3.v3.min.js',

    'modules/js_libs/angular/angular.min.js',
    'modules/js_libs/angular/resource.js',
    'modules/js_libs/angular/route.js'
];

var oursJs = [
    'modules/Templates.js',
    
    'modules/App.js',
    'modules/StubDataProvider.js',

    'modules/Constants.js',
    'modules/factories/Underscore.js',

    'modules/services/Utils.js',
    'modules/pages/main_page/MainCtrl.js',

    'modules/components/tooltip/Tooltip.js',
    'modules/components/tooltip/TooltipService.js',

    'modules/components/context_menu/ContextMenu.js',
    'modules/components/context_menu/ContextMenuService.js',
    'modules/components/context_menu/ContextMenuConfigProvider.js',
    'modules/components/context_menu/SubMenu.js',
    'modules/components/context_menu/item/ContextMenuItem.js',

    'modules/components/mashup/Mashup.js',
    'modules/components/mashup/services/LayoutService.js',
    'modules/components/mashup/services/RemoveCellService.js',

    'modules/components/mashup/cell/Cell.js',
    'modules/components/mashup/cell/component_selector/ComponentSelector.js',

    'modules/components/mashup/components/component_wrapper/ComponentWrapper.js',

    'modules/components/mashup/components/graphs/GraphUtils.js',
    'modules/components/mashup/components/graphs/GraphDataProvider.js',
    'modules/components/mashup/components/graphs/GraphDrawService.js',

    'modules/components/mashup/components/graphs/hyper_tree/HyperTree.js',
    'modules/components/mashup/components/graphs/space_tree/SpaceTree.js',

    'modules/components/mashup/components/graphs/html_graph/HtmlGraphDataProvider.js',
    'modules/components/mashup/components/graphs/html_graph/HtmlGraph.js',
    'modules/components/mashup/components/graphs/html_graph/node/HtmlGraphNode.js',

    'modules/components/mashup/components/hierarchy/HierarchyDataProvider.js',
    'modules/components/mashup/components/hierarchy/Hierarchy.js'
];

module.exports = {
    getListOfAllJsFiles: function() {
        return libs.concat(oursJs);
    },
    generateJsImportsList: function() {
        var result = "";

        var jsFiles = libs.concat(oursJs);
        for (var i = 0; i < jsFiles.length; i++) {
            result += "<script src='" + jsFiles[i] + "'></script>\n    ";
        }

        return result;
    }
};