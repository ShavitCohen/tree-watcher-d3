App.service('GraphDrawService', [
    'Utils', 
    'CONSTANTS',
    'GraphUtils', 
    function(Utils, CONSTANTS, GraphUtils) {
    
    this.drawNode = function(canvas, node, position) {
        var context = canvas.getCtx();
        
        var nodeStatus = Utils.getPropertyIfExists(node, 'data._status');
        var textColor = GraphUtils.convertStatusToTextColor(nodeStatus);
        var hexColor = GraphUtils.convertStatusToHexColor(nodeStatus);
        
        var nodePos = angular.isObject(position) ? position : node.pos.getc();
        var x = nodePos.x;
        var y = nodePos.y - 8;
        
        var label = node.name;
        var width = context.measureText(label).width * 1.2 + CONSTANTS.NODE.ICON_HOLDER_WIDTH;
        var height = 13;
        var curveSize = 5;
        
        var finalWidth = width + 4;
        var finalHeight = height + 4;
        
        node.data.finalWidth = finalWidth;
        node.data.finalHeight = finalHeight;
        node.data.hexColor = hexColor;
        
        drawRectangle(context, x, y - 2, width + 4, height + 4, curveSize, '#fff');
        drawRectangle(context, x, y, width, height, curveSize, hexColor);
        drawIcon(context, x + 1, y + 1, width, height - 2, curveSize, textColor);
        drawText(context, x, y + 14, width, CONSTANTS.NODE.ICON_HOLDER_WIDTH, label);
    };
    
    function drawText(context, x, y, parentWidth, iconHolderWidth, text) {
        var textX = x + iconHolderWidth / 2;
        context.font = "12px Arial";
        context.fillText(text, textX, y);
    };

    function drawRectangle(context, x, y, width, height, curveSize, color) {
        draw(context, x, y, width, height, curveSize, 'fill', 'fillStyle', color);
    };

    function drawIcon(context, x, y, parentWidth, height, curveSize, textColor) {
        var width = 15;
        var startPos = {
            x: x - (parentWidth) / 2,
            y: y
        };

        var iconWidth = 10;

        var lineEndCoord = startPos.x + width;
        var nodeBottomRightY = y + height;
        
        context.fillStyle = '#fff';
        context.beginPath();
        context.moveTo(startPos.x, startPos.y);
        
        context.lineTo(startPos.x + width, startPos.y);
        context.lineTo(startPos.x + width, startPos.y + height + curveSize);

        context.lineTo(startPos.x, startPos.y + height + curveSize);
        context.quadraticCurveTo(startPos.x - curveSize, startPos.y + height + curveSize, startPos.x - curveSize, startPos.y + height);

        context.lineTo(startPos.x - curveSize, startPos.y + curveSize);
        context.quadraticCurveTo(startPos.x - curveSize, startPos.y, startPos.x, startPos.y);                    

        context.fill();
    };

    function draw(context, x, y, width, height, curveSize, method, styleType, color) {
        var startPos = {
            x: x - width / 2,
            y: y
        };

        var lineEndCoord = startPos.x + width;
        var nodeBottomRightY = y + height;
        
        context[styleType] = color;
        context.beginPath();
        context.moveTo(startPos.x, startPos.y);
        
        context.lineTo(startPos.x + width, startPos.y);
        context.quadraticCurveTo(startPos.x + width + curveSize, startPos.y, startPos.x + width + curveSize, startPos.y + curveSize);

        context.lineTo(startPos.x + width + curveSize, startPos.y + height);
        context.quadraticCurveTo(startPos.x + width + curveSize, startPos.y + height + curveSize, startPos.x + width, startPos.y + height + curveSize);

        context.lineTo(startPos.x, startPos.y + height + curveSize);
        context.quadraticCurveTo(startPos.x - curveSize, startPos.y + height + curveSize, startPos.x - curveSize, startPos.y + height);

        context.lineTo(startPos.x - curveSize, startPos.y + curveSize);
        context.quadraticCurveTo(startPos.x - curveSize, startPos.y, startPos.x, startPos.y);                    

        context[method]();
    };
    
}]);
