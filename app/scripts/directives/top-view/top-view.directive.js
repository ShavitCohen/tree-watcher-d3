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
      var cache = {
        watchingElements: {}
      }
      var settings = {
        consts: {
          GRAVITY_TOP_POSITION: scope.height / 2,
          NODE_HEIGHT: 15,
          GRAVITY: 0.1,
          CHARGE: -500,
          FRICTION: 0.8,
          ROOT_TO_CHILD_LINK_DISTANCE: 200,
          NODE_TO_NODE_WITH_CHILDREN_DISTANCE: 100,
          NODE_TO_EMPTY_NODE_LINK_DISTANCE: 25,
          MIN_ZOOM: 0.07,
          MAX_ZOOM: 7
        },

        width: null,
        height: null,

        data: null,

        layout: 'force',

        viewWindowHeightValue: null,
        viewWindowWidthValue: null,

        graphObjects: {
          svg: null,
          viewWindow: null,
          force: null,
          tree: null,
          graph_g: null,
          zoom: null,
          diagonal: null,
          allLinks: null,
          allNodes: null
        }
      };


      var GRAVITY_TOP_POSITION = settings.consts.GRAVITY_TOP_POSITION,
        NODE_HEIGHT = settings.consts.NODE_HEIGHT,
        GRAVITY = settings.consts.GRAVITY,
        CHARGE = settings.consts.CHARGE,
        FRICTION = settings.consts.FRICTION,
        ROOT_TO_CHILD_LINK_DISTANCE = settings.consts.ROOT_TO_CHILD_LINK_DISTANCE,
        NODE_TO_NODE_WITH_CHILDREN_DISTANCE = settings.consts.NODE_TO_NODE_WITH_CHILDREN_DISTANCE,
        NODE_TO_EMPTY_NODE_LINK_DISTANCE = settings.consts.NODE_TO_EMPTY_NODE_LINK_DISTANCE;


      scope.settingsMenuObj = {
        viewWindowMinWidth: 100,
        viewWindowMaxWidth: scope.width,
        viewWindowMinHeight: 100,

        viewWindowHeight_initialValue: null,
        viewWindowWidth_initialValue: null,

        viewWindowMaxHeight: scope.height,
        layout:settings.layout,

        logic: {
          changeViewWindowWidth: function (val) {
            settings.viewWindowWidthValue = val;
            updateViewWindowSizes(settings.graphObjects.svg, settings.graphObjects.viewWindow, val, settings.viewWindowHeightValue);
            markInFocusNodes(settings.graphObjects.graph_g, settings.graphObjects.allNodes, settings.graphObjects.viewWindow);
          },
          changeViewWindowHeight: function (val) {
            settings.viewWindowHeightValue = val;
            updateViewWindowSizes(settings.graphObjects.svg, settings.graphObjects.viewWindow, settings.viewWindowWidthValue, val);
            markInFocusNodes(settings.graphObjects.graph_g, settings.graphObjects.allNodes, settings.graphObjects.viewWindow);
          },
          changeTreeLayout: function (val) {
            settings.layout = val;
            activateLayout(settings.layout);
          }
        }
      };

      init();

      function init() {
        initSettingsObj(scope.width, scope.height);

        angular.element(elm).addClass("top-view");
        scope.$watch("data", function (val, old) {
          if (val) {
            settings.data = val;
            update(settings.data);
            activateLayout(settings.layout);

          }
        })
      }

      function initSettingsObj(width, height) {

        settings.width = width;
        settings.height = height;

        var svg = d3.select(elm[0]).append("svg")
          .attr("width", width)
          .attr("height", height);
        settings.graphObjects.svg = svg;

        /** Setting view window **/
        var svgWidth = Number(svg.attr("width"));
        var svgHeight = Number(svg.attr("height"));


        var VIEW_WINDOW_WIDTH = svgWidth - (svgWidth / 3);
        settings.viewWindowWidthValue = scope.settingsMenuObj.viewWindowWidth_initialValue = VIEW_WINDOW_WIDTH;
        var VIEW_WINDOW_HEIGHT = svgHeight - (svgHeight / 3);
        settings.viewWindowHeightValue = scope.settingsMenuObj.viewWindowHeight_initialValue = VIEW_WINDOW_HEIGHT;


        var viewWindow = setViewWindow(svg, VIEW_WINDOW_WIDTH, VIEW_WINDOW_HEIGHT);
        settings.graphObjects.viewWindow = viewWindow;
        /** End Setting view window **/


        var graph_g = svg.append("g");
        settings.graphObjects.graph_g = graph_g;

        var zoom = d3.behavior.zoom().scaleExtent([settings.consts.MIN_ZOOM, settings.consts.MAX_ZOOM]);
        zoom = setEvents(zoom, {
          'zoom': function (d) {
            graph_g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
            markInFocusNodes(settings.graphObjects.graph_g, settings.graphObjects.allNodes, settings.graphObjects.viewWindow);
          }
        });
        settings.graphObjects.zoom = zoom;

        setInitialZoom(settings.graphObjects.graph_g, settings.graphObjects.zoom, settings.graphObjects.viewWindow, GRAVITY_TOP_POSITION, settings.consts.NODE_HEIGHT);
        var allLinks = graph_g.selectAll(".link"),
          allNodes = graph_g.selectAll(".node");

        settings.graphObjects.allNodes = allNodes;
        settings.graphObjects.allLinks = allLinks;

        var force = d3.layout.force()
          .size([width, height])
          .gravity(GRAVITY)
          .charge(CHARGE)
          .friction(FRICTION)
          .on("tick", function (e) {
            arrangeElements(settings.graphObjects.allLinks, settings.graphObjects.allNodes, settings.graphObjects.graph_g, settings.graphObjects.viewWindow, settings.graphObjects.diagonal);
          });


        settings.graphObjects.force = force;

        var tree = d3.layout.tree()
          .size([width, height])

        settings.graphObjects.tree = tree;

        var diagonal = d3.svg.diagonal()
          .projection(function (d) {
            return [d.x, d.y];
          });

        settings.graphObjects.diagonal = diagonal;

        svg.call(zoom);
      }

      function update(data) {

        var flattenedNodes = flattenTreeToNodesArray(data, settings.width / 2, GRAVITY_TOP_POSITION),
          nodesData = flattenedNodes,
          linksData = d3.layout.tree().links(nodesData);


        // Update the links…
        settings.graphObjects.allLinks = settings.graphObjects.allLinks.data(linksData, function (d) {
          return d.target.id;
        });

        settings.graphObjects.allLinks.exit().remove();

        settings.graphObjects.allLinks.enter()
          .append("path")
          .attr("class", "link")
          .attr("d", function (d, i) {
            if (d.source.x !== undefined && d.source.y !== undefined && d.target.x !== undefined && d.target.y !== undefined) {
              return settings.graphObjects.diagonal(d, i)
            }
          })

        // Update the nodes…
        settings.graphObjects.allNodes = settings.graphObjects.allNodes.data(nodesData, function (d) {
          return d.id;
        });
        settings.graphObjects.allNodes.exit().remove();

        settings.graphObjects.allNodes
          .enter()
          .append("g")
          .attr("class", "node-group")
          .call(settings.graphObjects.force.drag)
          .call(paintNodes)


        //settings.graphObjects.allNodes = paintNodes(settings.graphObjects.allNodes, NODE_HEIGHT);

        updateForceBehaviour(settings.graphObjects.force, nodesData, linksData);

        settings.graphObjects.allNodes = setEvents(settings.graphObjects.allNodes, {
            'mouseover': function (d) {
              this.parentNode.appendChild(this); //on mouse over we appending the child again so it will be on top (z-index)
              highlightPathToRoot(d, settings.graphObjects.graph_g);

            },
            'mousedown': function (d) {
              d3.event.stopPropagation();
            },
            'mouseout': function (d) {
              clearPathToRoot(d, settings.graphObjects.graph_g);
            },
            'dblclick.zoom': function (d) {
              d3.event.stopPropagation();
              var dcx = (settings.width / 2 - d.x * settings.graphObjects.zoom.scale());
              var dcy = (settings.height / 2 - d.y * settings.graphObjects.zoom.scale());
              settings.graphObjects.zoom.translate([dcx, dcy]);
              settings.graphObjects.graph_g.attr("transform", "translate(" + dcx + "," + dcy + ")scale(" + settings.graphObjects.zoom.scale() + ")");
              markInFocusNodes(settings.graphObjects.graph_g, settings.graphObjects.allNodes, settings.graphObjects.viewWindow);
            },
            'click': function (d) {

            }
          }
        );

        arrangeElements(settings.graphObjects.allLinks, settings.graphObjects.allNodes, settings.graphObjects.graph_g, settings.graphObjects.viewWindow, settings.graphObjects.diagonal);

      }


      function setInitialZoom(graph_g, zoom, viewWindow, rootY, nodeHeight) {
        var yTransform = Number(viewWindow.attr("y")) + nodeHeight + (-1 * rootY);
        zoom.translate([0, yTransform]);
        graph_g.attr("transform", "translate(" + 0 + "," + yTransform + ")");
      }


      function arrangeElements(allLinks, allNodes, graph_g, viewWindow, diagonal) {
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
          .attr("d", function (d, i) {
            if (d.source.x !== undefined && d.source.y !== undefined && d.target.x !== undefined && d.target.y !== undefined) {
              return diagonal(d, i)
            }
          });

        allNodes
          .attr("transform", function (d) {
            if (d.x && d.y) {
              return "translate(" + (d.x - (this.getBBox().width / 2)) + "," + (d.y) + ")";
            }

          });
        markInFocusNodes(graph_g, allNodes, viewWindow);
      }


      function updateForceBehaviour(force, nodesData, linksData) {
        force
          .nodes(nodesData)
          .links(linksData)
          .linkDistance(function (d) {
            if (!d.source.parent) {
              return ROOT_TO_CHILD_LINK_DISTANCE
            }
            return d.target.children && d.target.children.length > 0 ? NODE_TO_NODE_WITH_CHILDREN_DISTANCE : NODE_TO_EMPTY_NODE_LINK_DISTANCE;
          })
      }


      function flattenTreeToNodesArray(root, rootPosX, rootPosY) {
        var nodes = [], i = 0;
        root.fixed = true;
        root.isRoot = true;
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
      function paintNodes(allNodes) {

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
          .attr("class", function (d) {
            var _class = "rect";
            _class = d.isRoot ? _class + " root" : _class;
            return _class;
          });

        rect
          .append("rect")
          .attr("width", function (d) {
            return d.width + _WIDTH_ADDITION_TO_RECT;
          })
          .attr("height", NODE_HEIGHT)
          .style("fill", function (d) {
            return setColorByStatus(d.status);
          })
          .style("stroke", "black")
          .style("stroke-width", "1px")
          .attr("rx", roundCornersVal)
          .attr("ry", roundCornersVal);


        var rectButtons =
          rect.append("g")
            .attr("transform",
            function (d) {
              return "translate(" + (d.width + _WIDTH_ADDITION_TO_RECT - 30).toString() + "," + 2 + ")";
            })
            .attr("class", function (d) {
              return setClassToButtonsContainer(d);
            });


        var pinButtonsContainer = rectButtons
          .append("g");


        pinButtonsContainer
          .append("svg:image")
          .attr("class", "img pin-button")
          .attr("xlink:href", "./images/eye.svg")
          .attr("width", 12)
          .attr("height", 12)


        pinButtonsContainer
          .append("svg:image")
          .attr("class", "img un-pin-button")
          .attr("xlink:href", "./images/eye-slash.svg")
          .attr("width", 12)
          .attr("height", 12)


        setEvents(pinButtonsContainer, {
          'click': function (d) {
            if (!cache.watchingElements[d.id]) {
              d.fixed = true;
              d.watchingRoot = true;
              watchNode(d);
              cache.watchingElements[d.id] = true;
            } else {
              d.watchingRoot = false;
              delete cache.watchingElements[d.id];
              unWatchNode(d);
            }
            d3.select(this)
              .classed("root-watching", d.watchingRoot);
          },
          'mouseover': function (d) {
            if (Object.keys(cache.watchingElements).length === 0) {
              watchNode(d);
            }
          },
          'mouseout': function (d) {
            if (Object.keys(cache.watchingElements).length === 0) {
              unWatchNode(d);
            }
          }
        });

        function watchNode(d) {

          setAttrToAllChildren(d, "watching", true);

          d3.select("svg")
            .classed("hide-all", true);

          allNodes.each(function(d){
            d3.select(this).classed("watching", function (d) {
              return d.watching;
            })
          })

        }

        function unWatchNode(d) {
          d.fixed = false;

          // we want to make sure that there are no children which the user already selected
          var ifFunction = function (d) {
            return !cache.watchingElements[d.id];
          };

          setAttrToAllChildren(d, "watching", false, ifFunction);

          if(Object.keys(cache.watchingElements).length == 0){
            d3.select("svg")
              .classed("hide-all", false);
          }


          allNodes
            .classed("watching", function (d) {
              return d.watching;
            })

        }


        rectButtons
          .append("svg:image")
          .attr("class", "img minus un-collpase-children")
          .attr("xlink:href", "./images/minus-square-o.svg")
          .attr("width", 12)
          .attr("height", 12)
          .attr("x", 15)
          .on("click", function (d) {
            if (d3.event.defaultPrevented) return; // ignore drag
            if (d.children) {
              d._children = d.children;
              d.children = null;
            }
            update(settings.data);
            allNodes.selectAll(".rect-buttons")
              .attr("class", function (d) {
                return setClassToButtonsContainer(d);
              })

          });

        rectButtons
          .append("svg:image")
          .attr("class", "img plus collapse-children")
          .attr("xlink:href", "./images/plus-square-o.svg")
          .attr("width", 12)
          .attr("height", 12)
          .attr("x", 15)
          .on("click", function (d) {
            if (d3.event.defaultPrevented) return; // ignore drag
            if (d._children) {
              d.children = d._children;
              d._children = null;
            }
            update(settings.data);
            allNodes.selectAll(".rect-buttons")
              .attr("class", function (d) {
                return setClassToButtonsContainer(d);
              })
          });


        var circle = allNodes
          .append("circle")
          .attr("class", "node-circle")
          .attr("r", NODE_HEIGHT / 4)
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
        return colors[status] || "#699BDD";
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

      function activateLayout(layoutName) {
        var layouts = {
          force: function (_force) {
            _force.start();
          },
          tree: function (force, _tree, duration, allNodes, allLinks, diagonal) {
            force.stop();
            _tree.nodes(settings.data);  	// recalculate tree layout

            // transition node groups
            allNodes.transition()
              .duration(duration)
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
              .duration(duration)
              .attr("d", function (d, i) {
                if (d.source.x !== undefined && d.source.y !== undefined && d.target.x !== undefined && d.target.y !== undefined) {
                  return diagonal(d, i)
                }
              });

          }
        };

        return layouts[layoutName](settings.graphObjects.force, settings.graphObjects.tree, 1000, settings.graphObjects.allNodes, settings.graphObjects.allLinks, settings.graphObjects.diagonal);
      }

      function setClassToButtonsContainer(d) {
        var _class = ["rect-buttons"];
        if (d.fixed == true && !d.isRoot) {
          _class.push("pined")
        }
        if (d.children && d.children.length > 0) {
          _class.push("has-children");
        }
        if (d._children && d._children.length > 0) {
          _class.push("has-children collapsed");
        }
        return _class.join(" ");
      }

      function setAttrToAllChildren(d, attr, value, ifFunction) {
        if (!ifFunction) {
          ifFunction = function () {
            return true
          };
        }

        if (ifFunction(d)) {
          d[attr] = value;

          var children = d.children || d._children;
          if (children) {
            children.forEach(function (child) {
              setAttrToAllChildren(child, attr, value, ifFunction);
            })
          }
        }
      }

    }
  }


})();



