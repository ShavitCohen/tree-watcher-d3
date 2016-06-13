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
        data: "=",
        settings: "="
      },
      link: link
    };

    function link(scope, elm, attrs) {
      init();

      function init() {
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

        var viewWindow = setViewWindow(svg, width, height);
        var zoom = setZoom();
        var graph_g = svg.append("g");


        setInitialZoom(graph_g, zoom, viewWindow, GRAVITY_TOP_POSITION, NODE_HEIGHT);

        var allLinks = graph_g.selectAll(".link"),
          allNodes = graph_g.selectAll(".node");

        var flattenedNodes = flattenTreeToNodesArray(data, width / 2, GRAVITY_TOP_POSITION);
        var nodesData = arrangeNodesAsTree(flattenedNodes, width, height),
          linksData = d3.layout.tree().links(nodesData);

        update();

        function update() {

          var force = d3.layout.force()
            .size([width, height])
            .gravity(GRAVITY)
            .charge(CHARGE)
            .friction(FRICTION)
            .on("tick", tick)
            .nodes(nodesData)
            .links(linksData)
            .linkDistance(function (d) {
              if (!d.source.parent) {
                return ROOT_TO_CHILD_LINK_DISTANCE
              }
              return d.target.children.length > 0 ? NODE_TO_NODE_WITH_CHILDREN_DISTANCE : NODE_TO_EMPTY_NODE_LINK_DISTANCE;
            })
            .start();

          // Update the links…
          allLinks = allLinks.data(linksData, function (d) {
            return d.target.id;
          });
          allLinks.exit().remove();


          // Enter any new links.
          allLinks.enter().insert("line")
            .attr("class", "link")
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
            });

          // Update the nodes…
          allNodes = allNodes.data(nodesData, function (d) {
            return d.id;
          })
            .enter()
            .append("g")
            .attr("class", "node-group")
            .attr("transform", function (d) {
              return "translate(" + d.x + "," + d.y + ")";
            })
            .call(force.drag);


          allNodes = paintNodes(allNodes, NODE_HEIGHT);

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
                markInFocusNodes(graph_g);
              },
              'mousedown.drag': function (d) {
                return null;
              }
            }
          );

          zoom = setEvents(zoom, {
            'zoom': function (d) {
              graph_g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
              markInFocusNodes(graph_g);
            }
          });


        }

        function markInFocusNodes(g) {
          var gTransform = d3.transform(g.attr("transform"));

          var gx = gTransform.translate[0];
          var gy = gTransform.translate[1];
          var gScale = gTransform.scale[0];

          allNodes.each(function (d) {
            var realX = (gx / gScale) + d.x;
            var realY = (gy / gScale) + d.y;
            d.inFocus = hitTest_roomRec(realX, realY, gScale);
          });

          allNodes
            .classed("in-focus", function (d) {
              return d.inFocus ? true : false;
            })
        }

        function setInitialZoom(graph_g, zoom, viewWindow, rootY, nodeHeight) {
          var yTransform = Number(viewWindow.attr("y")) + nodeHeight + (-1 * rootY);
          zoom.translate([0, yTransform]);
          graph_g.attr("transform", "translate(" + 0 + "," + yTransform + ")");
        }

        function hitTest_roomRec(realX, realY, gScale) {
          var zoomRectX = Number(viewWindow.attr("x")),
            zoomRectWidth = Number(viewWindow.attr("width")),
            zoomRectY = Number(viewWindow.attr("y")),
            zoomRectHeight = Number(viewWindow.attr("height"));

          return (realX >= zoomRectX / gScale && realX <= (zoomRectX + zoomRectWidth) / gScale)
            && (realY >= zoomRectY / gScale && realY <= (zoomRectY + zoomRectHeight) / gScale)
            ;
        }

        function noTreeView(e, allLinks, allNodes) {
          allLinks.attr("x1", function (d) {
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
            });
          allNodes
            .attr("transform", function (d) {
              return "translate(" + (d.x - (this.getBBox().width / 2)) + "," + (d.y) + ")";
            });

          markInFocusNodes(graph_g);
        }


        function treeView(e, allLinks, allNodes) {
          // Apply the constraints:
          //

          var dx, dy, ly = 30,r = 40;
          allNodes.forEach(function(d) {
            if (!d.fixed) {
              if (d.children) {
                var py = 0;
                if (d.parent) {
                  py = d.parent.y;
                }
                d.py = d.y = py + d.depth * d.width;
              }

              // #1a: constraint all nodes to the visible screen: links
              dx = Math.min(0, width - r - d.x) + Math.max(0, r - d.x);
              dy = Math.min(0, height - r - d.y) + Math.max(0, r - d.y);
              d.x += 2 * Math.max(-ly, Math.min(ly, dx));
              d.y += 2 * Math.max(-ly, Math.min(ly, dy));
              // #1b: constraint all nodes to the visible screen: charges ('repulse')
              dx = Math.min(0, width - r - d.px) + Math.max(0, r - d.px);
              dy = Math.min(0, height - r - d.py) + Math.max(0, r - d.py);
              d.px += 2 * Math.max(-ly, Math.min(ly, dx));
              d.py += 2 * Math.max(-ly, Math.min(ly, dy));

              // #2: hierarchy means childs must be BELOW parents in Y direction:
              if (d.parent) {
                d.y = Math.max(d.y, d.parent.y + ly);
                d.py = Math.max(d.py, d.parent.py + ly);
              }
            }
          });


          allLinks.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

          allNodes.attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; });
        }


        function tick(e) {
          noTreeView(e,allLinks,allNodes);
          //treeView(e, allLinks, allNodes);
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


      function arrangeNodesAsTree(nodesData, width, height) {
        nodesData.forEach(function (d, i) {
          if (!d.fixed) {
            d.x = width / 2 + i;
            d.y = height / 2 + 100 * d.depth;
          }
        });
        return nodesData;
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
            this.remove();
          });


        //then we add a rect and uses the width of the rect
        var rect = allNodes
          .append("rect")
          .attr("class", "rect")
          .attr("width", function (d) {
            return d.width + _WIDTH_ADDITION_TO_RECT;
          })
          .attr("height", nodeHeight)
          .style("fill", function (d) {
            return setColorByStatus(d.status);
          })
          .style("stroke", "black")
          .style("stroke-width", "1px");

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


      function setViewWindow(svg, svgWidth, svgHeight) {
        var VIEW_WINDOW_WIDTH = svgWidth - (svgWidth / 3);
        var VIEW_WINDOW_HEIGHT = svgHeight - (svgHeight / 3);

        return svg.append("rect")
          .attr("class", "viewWindow")
          .attr("width", VIEW_WINDOW_WIDTH)
          .attr("height", VIEW_WINDOW_HEIGHT)
          .style("stroke", "gray")
          .style("stroke-opacity", 0.2)
          .style("stroke-width", "1px")
          .style("fill-opacity", 0)
          .attr("ry", VIEW_WINDOW_WIDTH / 3)
          .attr("ry", VIEW_WINDOW_HEIGHT / 3)
          .attr("x", (svgWidth / 2 - VIEW_WINDOW_WIDTH / 2))
          .attr("y", (svgHeight / 2 - VIEW_WINDOW_HEIGHT / 2))
      }

      function setZoom() {
        var min_zoom = 0.08;
        var max_zoom = 7;
        return d3.behavior.zoom().scaleExtent([min_zoom, max_zoom]);
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
    }
  }


})();



