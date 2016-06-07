var stylesFileNames = [
    'modules/pages/main_page/MainCtrl',

    'modules/components/tooltip/Tooltip',
    'modules/components/context_menu/ContextMenu',

    'modules/components/mashup/Mashup',
    'modules/components/mashup/cell/Cell',

    'modules/components/mashup/components/component_wrapper/ComponentWrapper',

    'modules/components/mashup/components/graphs/Graph',
    'modules/components/mashup/components/graphs/html_graph/HtmlGraph',
    'modules/components/mashup/components/graphs/html_graph/node/HtmlGraphNode',

    'modules/components/mashup/components/hierarchy/Hierarchy'
];

function generateNames(files, extension) {
    return files.map(function(item) {
        item += extension;
        return item
    });
};

module.exports = {
    getListOfCssFiles: function() {
        return generateNames(stylesFileNames, '.css');
    },
    getListOfLessFiles: function() {
        return generateNames(stylesFileNames, '.less');
    },
    generateCssImportsList : function() {
        var result = "";

        var css = generateNames(stylesFileNames, '.css');

        for (var i = 0; i < css.length; i++) {
            result += "<link rel='stylesheet' type='text/css' href='" + css[i] + "'>\n    ";
        }

        return result;
    },
    generateCssToLessMap: function() {
        var result = {};
        var css = generateNames(stylesFileNames, '.css');
        var less = generateNames(stylesFileNames, '.less');

        for (var i = 0; i < css.length; i++) {
            result  [css[i]] = less[i];
        }

        return result;
    }
};
