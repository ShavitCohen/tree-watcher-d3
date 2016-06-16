/**
 * Created by cohensha on 1/5/2016.
 */
(function () {
  angular.module('topView.directives')
    .directive('topView', topView);

  topView.$inject = ["$http", "$q"];

  function topView($http, $q) {
    return {
      restrict: 'E',
      templateUrl: "scripts/directives/top-view/top-view.directive.tpl.html",
      scope: {
        width: "=",
        height: "=",
        data: "="

      },
      link: link
    };

    function link(scope, elm, attrs) {
      init();

      scope.settings = {
        layout: 'force',
        viewWindowMinWidth: 100,
        viewWindowMinHeight: 100,
        viewWindowMaxWidth: scope.width,
        viewWindowMaxHeight: scope.height,

        viewWindowHeightValue: null,
        viewWindowWidthValue: null,

        changeViewWindowWidth: function (val) {
          updateViewWindowSizes(scope.settings.graphObjects.svg, scope.settings.graphObjects.viewWindow, val, scope.settings.viewWindowHeightValue);
          markInFocusNodes(scope.settings.graphObjects.graph_g, scope.settings.graphObjects.allNodes, scope.settings.graphObjects.viewWindow);
        },
        changeViewWindowHeight: function (val) {
          updateViewWindowSizes(scope.settings.graphObjects.svg, scope.settings.graphObjects.viewWindow, scope.settings.viewWindowWidthValue, val);
          markInFocusNodes(scope.settings.graphObjects.graph_g, scope.settings.graphObjects.allNodes, scope.settings.graphObjects.viewWindow);
        },
        changeTreeLayout: function (val) {
          layouts[val](scope.settings.graphObjects.force, scope.settings.graphObjects.tree, 1000, scope.settings.graphObjects.allNodes, scope.settings.graphObjects.allLinks, scope.settings.graphObjects.diagonal);
        },

        graphObjects: {
          svg: null,
          viewWindow: null,
          force: null,
          tree: null
        }
      };

      function init() {


        angular.element(elm).addClass("top-view");
        scope.$watch("data", function (val, old) {
          if (val) {
            renderGraph(val, scope.width, scope.height);
          }
        })
      }

      function renderGraph(data, width, height) {

        var GRAVITY_TOP_POSITION = 0,
          NODE_HEIGHT = 15,
          GRAVITY = 0.1,
          CHARGE = -500,
          FRICTION = 0.7,
          ROOT_TO_CHILD_LINK_DISTANCE = 100,
          NODE_TO_NODE_WITH_CHILDREN_DISTANCE = 100,
          NODE_TO_EMPTY_NODE_LINK_DISTANCE = 25;


        var svg = d3.select(elm[0]).append("svg")
          .attr("width", width)
          .attr("height", height);

        scope.settings.graphObjects.svg = svg;

        /** Setting view window **/
        var svgWidth = Number(svg.attr("width"));
        var svgHeight = Number(svg.attr("height"));
        var VIEW_WINDOW_WIDTH = svgWidth - (svgWidth / 3);
        var VIEW_WINDOW_HEIGHT = svgHeight - (svgHeight / 3);

        scope.settings.viewWindowWidthValue = VIEW_WINDOW_WIDTH;
        scope.settings.viewWindowHeightValue = VIEW_WINDOW_HEIGHT;


        var viewWindow = setViewWindow(svg, VIEW_WINDOW_WIDTH, VIEW_WINDOW_HEIGHT);
        scope.settings.graphObjects.viewWindow = viewWindow;
        /** End Setting view window **/


        var graph_g = svg.append("g");
        scope.settings.graphObjects.graph_g = graph_g;

        var zoom = setZoom(graph_g);
        scope.settings.graphObjects.zoom = zoom;

        setInitialZoom(graph_g, zoom, viewWindow, GRAVITY_TOP_POSITION, NODE_HEIGHT);

        var allLinks = graph_g.selectAll(".link"),
          allNodes = graph_g.selectAll(".node");


        var force = d3.layout.force()
          .on("tick", tick);
        scope.settings.graphObjects.force = force;

        var tree = d3.layout.tree();
        scope.settings.graphObjects.tree = tree;

        update();
        layouts.force(force);


        function updateForceBehaviour(force, nodesData, linksData) {
          force
            .nodes(nodesData)
            .links(linksData)
            .size([width, height])
            .gravity(GRAVITY)
            .charge(CHARGE)
            .friction(FRICTION)
            .linkDistance(function (d) {
              if (!d.source.parent) {
                return ROOT_TO_CHILD_LINK_DISTANCE
              }
              return d.target.children && d.target.children.length > 0 ? NODE_TO_NODE_WITH_CHILDREN_DISTANCE : NODE_TO_EMPTY_NODE_LINK_DISTANCE;
            })
        }


        var diagonal = d3.svg.diagonal()
          .projection(function (d) {
            return [d.x, d.y];
          });

        scope.settings.graphObjects.diagonal = diagonal;

        var flattenedNodes, nodesData;

        function update() {

          flattenedNodes = flattenTreeToNodesArray(data, width / 2, GRAVITY_TOP_POSITION);
          nodesData = flattenedNodes,//arrangeNodesAsTree(flattenedNodes, width, height),
            linksData = d3.layout.tree().links(nodesData);

          updateForceBehaviour(force, nodesData, linksData);

          tree
            .size([width, height]);


          // Update the links…
          allLinks = allLinks.data(linksData, function (d) {
            return d.target.id;
          });

          allLinks.exit().remove();


          // Enter any new links.
          allLinks.enter()
            .append("path")
            .attr("class", "link")
            .attr("d", diagonal);

          // Update the nodes…
          allNodes = allNodes.data(nodesData, function (d) {
            return d.id;
          });
          allNodes.exit().remove();

          allNodes
            .enter()
            .append("g")
            .attr("class", "node-group")
            .call(force.drag);

          allNodes = paintNodes(allNodes, NODE_HEIGHT);

          scope.settings.graphObjects.allLinks = allLinks;
          scope.settings.graphObjects.allNodes = allNodes;

          allNodes = setEvents(allNodes, {
              'mouseover': function (d) {
                this.parentNode.appendChild(this); //on mouse over we appending the child again so it will be on top (z-index)
                highlightPathToRoot(d, graph_g);
              },
              'mousedown': function (d) {
                d3.event.stopPropagation();
              },
              'mouseout': function (d) {
                clearPathToRoot(d, graph_g);
              },
              'dblclick.zoom': function (d) {
                d3.event.stopPropagation();
                var dcx = (width / 2 - d.x * zoom.scale());
                var dcy = (height / 2 - d.y * zoom.scale());
                zoom.translate([dcx, dcy]);
                graph_g.attr("transform", "translate(" + dcx + "," + dcy + ")scale(" + zoom.scale() + ")");
                markInFocusNodes(graph_g, allNodes, viewWindow);
              },
              'click': function (d) {
                if (d3.event.defaultPrevented) return; // ignore drag
                if (d.children) {
                  d._children = d.children;
                  d.children = null;
                } else {
                  d.children = d._children;
                  d._children = null;
                }
                update();
              }
            }
          );

          arrangeElements();

        }

        function setZoom(graph_g) {
          var min_zoom = 0.08;
          var max_zoom = 7;
          var zoom = d3.behavior.zoom().scaleExtent([min_zoom, max_zoom]);
          return setEvents(zoom, {
            'zoom': function (d) {
              graph_g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
              markInFocusNodes(graph_g, allNodes, viewWindow);
            }
          });
        }


        function setInitialZoom(graph_g, zoom, viewWindow, rootY, nodeHeight) {
          var yTransform = Number(viewWindow.attr("y")) + nodeHeight + (-1 * rootY);
          zoom.translate([0, yTransform]);
          graph_g.attr("transform", "translate(" + 0 + "," + yTransform + ")");
        }


        function arrangeElements() {
          allLinks
            .attr("x1", function (d) {
              return d.source.x;
            })
            .attr("y1", function (d) {
              return d.source.y;
            })
            .attr("x2", function (d) {
              return d.target.x;
            })
            .attr("y2", function (d) {
              return d.target.y;
            })
            .attr("d", diagonal);

          allNodes
            .attr("transform", function (d) {

              return "translate(" + (d.x - (this.getBBox().width / 2)) + "," + (d.y) + ")";
            });
          markInFocusNodes(graph_g, allNodes, viewWindow);
        }


        function tick(e) {
          arrangeElements();
        }


        svg.call(zoom);
      }


      function flattenTreeToNodesArray(root, rootPosX, rootPosY) {
        var nodes = [], i = 0;
        root.fixed = true;
        root.x = rootPosX;
        root.y = rootPosY;

        function recurse(node, depth, parent) {

          if (node.children) {
            node.children.forEach(function (child) {
              child.parent = node;
              depth++;
              recurse(child, depth, node);
            });
          }
          if (!node.id) node.id = ++i;
          node.depth = depth;
          nodes.push(node);
        }

        recurse(root, 1);
        return nodes;
      }


      // Exit any old nodes.
      function paintNodes(allNodes, nodeHeight) {
        //first we creates the nodes in order to capture their width
        var _WIDTH_ADDITION_TO_RECT = 50;
        var text = allNodes.append("text")
          .text(function (d) {
            return d.name;
          })
          .attr("x", _WIDTH_ADDITION_TO_RECT)
          .style("font-size", "10px")
          .each(function (d) {
            d.width = this.getBBox().width;
            try {
              this.remove();
            } catch (ex) {
              this.parentNode.removeChild(this);
            }

          });

        var roundCornersVal = 5;
        //then we add a rect and uses the width of the rect
        var rect = allNodes
          .append("g")
          .attr("class", "rect")

        rect
          .append("rect")
          .attr("width", function (d) {
            return d.width + _WIDTH_ADDITION_TO_RECT;
          })
          .attr("height", nodeHeight)
          .style("fill", function (d) {
            return setColorByStatus(d.status);
          })
          .style("stroke", "black")
          .style("stroke-width", "1px")
          .attr("rx", roundCornersVal)
          .attr("ry", roundCornersVal)

        var toggleButton =
          rect.append("g")
            .attr("transform",
            function (d) {
              return "translate(" + (d.width + _WIDTH_ADDITION_TO_RECT - 15).toString() + "," + 2 + ")";
            })
            .attr("class", function (d) {
              return 'toggle-children' + (d.children && d.children.length > 0 ? " has-children" : "")
            });


        toggleButton
          .append("svg:image")
          .attr("class","img plus")
          .attr("xlink:href", "./images/plus-square-o.svg")
          .attr("width", 12)
          .attr("height", 12)

        /*toggleButton
          .append("svg:image")
          .attr("class","img minus")
          .attr("xlink:href", "./images/minus-square-o.svg")
          .attr("width", 12)
          .attr("height", 12)*/




        var circle = allNodes
          .append("circle")
          .attr("class", "node-circle")
          .attr("r", nodeHeight / 4)
          .attr("cx", function (d) {
            return (d.width + _WIDTH_ADDITION_TO_RECT) / 2;
          })
          .style("fill", function (d) {
            return setColorByStatus(d.status);
          })
          .style("stroke", "black");

        //then we add the mouse over event
        allNodes.append("text")
          .text(function (d) {
            return d.name;
          })
          .attr("class", "rect-text")
          .style("font-size", "10px")
          .attr("x", 10)
          .attr("y", 10);


        return allNodes;
      }

      function setEvents(object, json) {
        angular.forEach(json, function (val, key) {
          object.on(key, val);
        });

        return object;
      }


      function setViewWindow(svg, width, height) {

        var viewWindow = svg.append("rect")
          .attr("class", "viewWindow")
          .style("stroke", "gray")
          .style("stroke-opacity", 0.2)
          .style("stroke-width", "1px")
          .style("fill-opacity", 0);

        return updateViewWindowSizes(svg, viewWindow, width, height);
      }


      function markInFocusNodes(g, allNodes, viewWindow) {
        var gTransform = d3.transform(g.attr("transform"));

        var gx = gTransform.translate[0];
        var gy = gTransform.translate[1];
        var gScale = gTransform.scale[0];

        allNodes.each(function (d) {
          var realX = (gx / gScale) + d.x;
          var realY = (gy / gScale) + d.y;
          d.inFocus = hitTest_roomRec(realX, realY, gScale, viewWindow);
        });

        allNodes
          .classed("in-focus", function (d) {
            return d.inFocus ? true : false;
          })
      }

      function hitTest_roomRec(realX, realY, gScale, viewWindow) {
        var zoomRectX = Number(viewWindow.attr("x")),
          zoomRectWidth = Number(viewWindow.attr("width")),
          zoomRectY = Number(viewWindow.attr("y")),
          zoomRectHeight = Number(viewWindow.attr("height"));

        return (realX >= zoomRectX / gScale && realX <= (zoomRectX + zoomRectWidth) / gScale)
          && (realY >= zoomRectY / gScale && realY <= (zoomRectY + zoomRectHeight) / gScale)
          ;
      }

      function updateViewWindowSizes(svg, viewWindow, windowWidth, windowHeight) {
        var svgWidth = Number(svg.attr("width"));
        var svgHeight = Number(svg.attr("height"));
        return viewWindow
          .attr("width", windowWidth)
          .attr("height", windowHeight)
          .attr("ry", windowWidth / 3)
          .attr("ry", windowHeight / 3)
          .attr("x", (svgWidth / 2 - windowWidth / 2))
          .attr("y", (svgHeight / 2 - windowHeight / 2))

      }


      function setColorByStatus(status) {
        var colors = {
          "20": "#66CC33",
          "15": "#66CC33",
          "10": "#66CC33",
          "5": "#66CC33",
          "0": "#DC0D26",
          "-1": "#DAB426",
          "-2": "#DAB426",
          "-3": "#DAB426",
          "-4": "#DAB426"
        };
        return colors[status] || "#ffffff";
      }

      function paintPathToRoot(graph_g) {
        graph_g.selectAll(".rect")
          .style("stroke", function (d) {
            return d.pathToParent ? "red" : "black"
          });

        graph_g.selectAll(".link")
          .style("stroke", function (d) {
            return d.target.pathToParent ? "red" : "#9ecae1"
          });
      }

      function clearPathToRoot(d, graph_g) {

        setPathToParent(d);
        paintPathToRoot(graph_g);
        function setPathToParent(d) {
          d.pathToParent = false;
          if (d.parent) {
            setPathToParent(d.parent)
          }
        }
      }

      function highlightPathToRoot(d, graph_g) {
        setPathToParent(d);
        paintPathToRoot(graph_g);
        function setPathToParent(d) {
          d.pathToParent = true;
          if (d.parent) {
            setPathToParent(d.parent)
          }
        }
      }

      var layouts = {
        force: function (_force) {
          _force.start();
        },
        tree: function (force, _tree, duration, allNodes, allLinks, diagonal) {
          force.stop();
          var delay = duration;
          _tree.nodes(scope.data);  	// recalculate tree layout

          // transition node groups
          allNodes.transition()
            .duration(delay)
            .attr("transform", function (d, i) {
              var widthCorrection = this.getBBox().width / 2;

              if (widthCorrection) {
                return "translate(" + (d.x - widthCorrection).toString() + "," + d.y.toString() + ")";
              } else {
                return null;
              }

            });

          // transition link paths
          allLinks.transition()
            .duration(delay)
            .attr("d", diagonal);
        }


      }


    }
  }


})();



