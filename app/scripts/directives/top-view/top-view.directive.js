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
        id: "@"
      },
      link: link
    };

    function link(scope, elm, attrs) {

      //This var will be use as a global var which holds ad-hock data for graph manipulation
      var cache = {
        watchingElements: {},
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
        },
        width: null,
        height: null,

        data: null,

        layout: 'force',

        viewWindowHeightValue: null,
        viewWindowWidthValue: null
      };

      //This var holds the settings of the graph.
      var consts = {
        ROOT_Y_POSITION: scope.height / 2,

        NODE_HEIGHT: 15,

        GRAVITY: 0.1,
        CHARGE: -500,
        FRICTION: 0.8,

        ROOT_TO_CHILD_LINK_DISTANCE: 200,

        NODE_TO_NODE_WITH_CHILDREN_DISTANCE: 100,
        NODE_TO_EMPTY_NODE_LINK_DISTANCE: 25,

        MIN_ZOOM: 0.07,
        MAX_ZOOM: 7
      };

      //We are using this object for the settingsMenu directive.
      scope.settingsMenuObj = {
        viewWindowMinWidth: 100,
        viewWindowMaxWidth: scope.width,
        viewWindowMinHeight: 100,

        viewWindowHeight_initialValue: null,
        viewWindowWidth_initialValue: null,

        viewWindowMaxHeight: scope.height,
        layout: cache.layout,

        //this attribute holds the logic for any cahnge in the layout, viewWindow width / height
        logic: {
          changeViewWindowWidth: function (val) {
            cache.viewWindowWidthValue = val;
            updateViewWindowSizes(cache.graphObjects.svg, cache.graphObjects.viewWindow, val, cache.viewWindowHeightValue);
            markInFocusNodes_general(cache.graphObjects.graph_g, cache.graphObjects.allNodes, cache.graphObjects.viewWindow);
          },
          changeViewWindowHeight: function (val) {
            cache.viewWindowHeightValue = val;
            updateViewWindowSizes(cache.graphObjects.svg, cache.graphObjects.viewWindow, cache.viewWindowWidthValue, val);
            markInFocusNodes_general(cache.graphObjects.graph_g, cache.graphObjects.allNodes, cache.graphObjects.viewWindow);
          },
          changeTreeLayout: function (val) {
            cache.layout = val;
            activateLayout(cache.layout);
          }
        }
      };

      init();


      function init() {

        angular.element(elm).addClass("top-view");

        initCacheObj(scope.width, scope.height);

        /**
         * Any change in the data should trigger an update
         */
        scope.$watch("data", function (val, old) {
          if (val) {
            cache.data = val;
            update(cache.data);
            activateLayout(cache.layout);

          }
        })
      }


      /**
       * Initiation the cache object
       * @param svgWidth
       * @param svgHeight
       */
      function initCacheObj(svgWidth, svgHeight) {

        cache.width = svgWidth;
        cache.height = svgHeight;

        //creating the svg and appending to the element
        var svg = d3.select(elm[0]).append("svg")
          .attr("width", svgWidth)
          .attr("height", svgHeight);
        cache.graphObjects.svg = svg;

        var VIEW_WINDOW_WIDTH = svgWidth - (svgWidth / 3);
        cache.viewWindowWidthValue = scope.settingsMenuObj.viewWindowWidth_initialValue = VIEW_WINDOW_WIDTH;

        var VIEW_WINDOW_HEIGHT = svgHeight - (svgHeight / 3);
        cache.viewWindowHeightValue = scope.settingsMenuObj.viewWindowHeight_initialValue = VIEW_WINDOW_HEIGHT;

        //calling a function which creates the viewWindow
        var viewWindow = setViewWindow(svg, VIEW_WINDOW_WIDTH, VIEW_WINDOW_HEIGHT);
        cache.graphObjects.viewWindow = viewWindow;

        //adding the main svg group which holds the complete graph
        var graph_g = svg.append("g");
        cache.graphObjects.graph_g = graph_g;

        //adding zoom
        var zoom = d3.behavior.zoom().scaleExtent([consts.MIN_ZOOM, consts.MAX_ZOOM]);
        zoom = setEvents(zoom, {
          'zoom': function (d) {
            graph_g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
            markInFocusNodes_general(cache.graphObjects.graph_g, cache.graphObjects.allNodes, cache.graphObjects.viewWindow);
          }
        });
        cache.graphObjects.zoom = zoom;

        setInitialZoom(cache.graphObjects.graph_g, cache.graphObjects.zoom, cache.graphObjects.viewWindow, consts.ROOT_Y_POSITION, consts.NODE_HEIGHT);

        var allLinks = graph_g.selectAll(".link");
        cache.graphObjects.allLinks = allLinks;

        var allNodes = graph_g.selectAll(".node");
        cache.graphObjects.allNodes = allNodes;

        //creating the force layout
        var force = d3.layout.force()
          .size([svgWidth, svgHeight])
          .gravity(consts.GRAVITY)
          .charge(consts.CHARGE)
          .friction(consts.FRICTION)
          .on("tick", function (e) {
            arrangeElements(cache.graphObjects.allLinks, cache.graphObjects.allNodes, cache.graphObjects.graph_g, cache.graphObjects.viewWindow, cache.graphObjects.diagonal);
          });
        cache.graphObjects.force = force;

        //creating the tree layout
        var tree = d3.layout.tree()
          .size([svgWidth, svgHeight])
        cache.graphObjects.tree = tree;


        //diagonal is the actual path which create the link between the nodes
        var diagonal = d3.svg.diagonal()
          .projection(function (d) {
            return [d.x, d.y];
          });
        cache.graphObjects.diagonal = diagonal;


        //calling the zoom function with the current svg
        svg.call(zoom);
      }


      function update(data) {

        //first we are flatting the node from a json tree structure to an array
        var flattenedNodes = flattenTreeToNodesArray(data, cache.width / 2, consts.ROOT_Y_POSITION),
          nodesData = flattenedNodes,
          linksData = d3.layout.tree().links(nodesData); //we are using the tree layout of d3 in order to create the aray which holds the objects which d3 is wokring with (d)

        // Update the links according to the linksData
        cache.graphObjects.allLinks = cache.graphObjects.allLinks.data(linksData, function (d) {
          return d.target.id;
        });

        //handling elements which were exists in the previous update run and in this iteration doesn't
        cache.graphObjects.allLinks.exit().remove();

        //handling the update / creation of the links according to the data
        cache.graphObjects.allLinks.enter()
          .append("path")
          .attr("class", "link")
          .attr("d", function (d, i) { //setting the value for set the diagonal
            if (d.source.x !== undefined && d.source.y !== undefined && d.target.x !== undefined && d.target.y !== undefined) {
              return cache.graphObjects.diagonal(d, i)
            }
          });

        // Update the nodes…
        cache.graphObjects.allNodes = cache.graphObjects.allNodes.data(nodesData, function (d) {
          return d.id;
        });
        cache.graphObjects.allNodes.exit().remove();

        //handling the update / creation of the nodes according to the data
        cache.graphObjects.allNodes.enter()
          .append("g")
          .attr("class", "node-group")
          .call(cache.graphObjects.force.drag)
          .call(paintNodes);

        //in any update we are updating the force as well
        updateForceBehaviour(cache.graphObjects.force, nodesData, linksData);


        setEvents(cache.graphObjects.allNodes, {
          'mouseover': function (d) {

            //highlightPathToRoot(d, cache.graphObjects.graph_g);
            d3.select(this).classed("on-mouse-over",true);
            cache.graphObjects.allNodes.sort(function (a, b) { // select the parent and sort the path's
              if (a.id != d.id) return -1;               // a is not the hovered element, send "a" to the back
              else return 1;
            });
          },
          'mousedown': function (d) {
            d3.event.stopPropagation();
          },
          'mouseout': function (d) {
            d3.select(this).classed("on-mouse-over",false);
            //clearPathToRoot(d, cache.graphObjects.graph_g);
          },
          'dblclick.zoom': function (d) {
            d3.event.stopPropagation();
            var dcx = (cache.width / 2 - d.x * cache.graphObjects.zoom.scale());
            var dcy = (cache.height / 2 - d.y * cache.graphObjects.zoom.scale());
            cache.graphObjects.zoom.translate([dcx, dcy]);
            cache.graphObjects.graph_g.attr("transform", "translate(" + dcx + "," + dcy + ")scale(" + cache.graphObjects.zoom.scale() + ")");
            markInFocusNodes_general(cache.graphObjects.graph_g, cache.graphObjects.allNodes, cache.graphObjects.viewWindow);
          },
          'click': function (d) {

          }
        });


        //this function actually moves the position of the different elements for an update
        arrangeElements(cache.graphObjects.allLinks, cache.graphObjects.allNodes, cache.graphObjects.graph_g, cache.graphObjects.viewWindow, cache.graphObjects.diagonal);
      }

      /**
       * settings a noew data to the force object and accordingly settings the link distance
       * @param force
       * @param nodesData
       * @param linksData
       */
      function updateForceBehaviour(force, nodesData, linksData) {
        force
          .nodes(nodesData)
          .links(linksData)
          .linkDistance(function (d) {
            if (!d.source.parent) {
              return consts.ROOT_TO_CHILD_LINK_DISTANCE
            }
            return d.target.children && d.target.children.length > 0 ? consts.NODE_TO_NODE_WITH_CHILDREN_DISTANCE : consts.NODE_TO_EMPTY_NODE_LINK_DISTANCE;
          })
      }


      /**
       * Set's the initial zoom according to the viewWindow and the root position
       * @param graph_g
       * @param zoom
       * @param viewWindow
       * @param rootY
       * @param nodeHeight
       */
      function setInitialZoom(graph_g, zoom, viewWindow, rootY, nodeHeight) {
        var yTransform = Number(viewWindow.attr("y")) + nodeHeight + (-1 * rootY);
        zoom.translate([0, yTransform]);
        graph_g.attr("transform", "translate(" + 0 + "," + yTransform + ")");
      }


      /**
       * This function set's the position of the different svg elements.
       * It will be activated in every force tick function
       * It can be called 200 times in a second
       * AVOID ANY COMPLICATED CALCULATIONS !!!
       * @param allLinks
       * @param allNodes
       * @param graph_g
       * @param viewWindow
       * @param diagonal
       */
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
          })
          .classed("in-focus", function (d) {
            return hitTest_roomRec(d, viewWindow) ? true : false;
          });

      }

      /**
       * This function returns boolean value if a node is in the view window
       * @param d
       * @param viewWindow
       * @returns {boolean}
       */
      function hitTest_roomRec(d, viewWindow) {
        var gTransform = d3.transform(cache.graphObjects.graph_g.attr("transform")),
          gx = gTransform.translate[0],
          gy = gTransform.translate[1],
          gScale = gTransform.scale[0],
          realX = (gx / gScale) + d.x,
          realY = (gy / gScale) + d.y;

        var zoomRectX = Number(viewWindow.attr("x")),
          zoomRectWidth = Number(viewWindow.attr("width")),
          zoomRectY = Number(viewWindow.attr("y")),
          zoomRectHeight = Number(viewWindow.attr("height"));

        return (realX >= zoomRectX / gScale && realX <= (zoomRectX + zoomRectWidth) / gScale)
          && (realY >= zoomRectY / gScale && realY <= (zoomRectY + zoomRectHeight) / gScale);

      }


      /**
       * this function run over all nodes and set's a in-focus class according to the nodes position
       * @param g
       * @param allNodes
       * @param viewWindow
       */
      function markInFocusNodes_general(g, allNodes, viewWindow) {
        allNodes
          .classed("in-focus", function (d) {
            return hitTest_roomRec(d, viewWindow) ? true : false;
          })
      }


      /**
       * get's an object and return a flatland array
       * @param root
       * @param rootPosX
       * @param rootPosY
       * @returns {Array}
       */
      function flattenTreeToNodesArray(root, rootPosX, rootPosY) {
        var nodes = [], i = 0;
        //we are settings some initial value to the root object
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


      /**
       * This function is creating the node
       * @param allNodes
       * @returns {*}
       */
      function paintNodes(allNodes) {

        //first we creates the nodes in order to capture their width
        var _WIDTH_ADDITION_TO_RECT = 50,
          _ROUND_CORNERS_VAL = 5;

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
          .attr("height", consts.NODE_HEIGHT)
          .style("fill", function (d) {
            return setColorByStatus(d.status);
          })
          .style("stroke", "black")
          .style("stroke-width", "1px")
          .attr("rx", _ROUND_CORNERS_VAL)
          .attr("ry", _ROUND_CORNERS_VAL);

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


        //eye
        pinButtonsContainer
          .append("svg:image")
          .attr("class", "img pin-button")
          .attr("xlink:href", "./images/eye.svg")
          .attr("width", 12)
          .attr("height", 12)


        //eye with a slash
        pinButtonsContainer
          .append("svg:image")
          .attr("class", "img un-pin-button")
          .attr("xlink:href", "./images/eye-slash.svg")
          .attr("width", 12)
          .attr("height", 12)


        setEvents(pinButtonsContainer, {
          'mouseout': function (d) {
            if (Object.keys(cache.watchingElements).length === 0) {
              unWatchNode(d);
            }
          },
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
          }

        });


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
            update(cache.data);
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
            update(cache.data);
            allNodes.selectAll(".rect-buttons")
              .attr("class", function (d) {
                return setClassToButtonsContainer(d);
              })
          });


        var circle = allNodes
          .append("circle")
          .attr("class", "node-circle")
          .attr("r", consts.NODE_HEIGHT / 4)
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


        /**
         * this function set's the classes for watching a node (when clicking the eye icon)
         * @param d
         */
        function watchNode(d) {

          setAttrToAllChildren(d, "watching", true);

          //adding a general class to the svg
          //TODO - distinguish between different SVG's (in a scenario when we will use this component more then once in a pate) the right way to do it is via an id which will be given to this controller
          d3.select("svg")
            .classed("hide-all", true);

          //adding a watching class only to the nodes that is being watched
          allNodes.each(function (d) {
            d3.select(this).classed("watching", function (d) {
              return d.watching;
            })
          })

        }

        /**
         * Returns the situation as it was before (removing the watched item)
         * @param d
         */
        function unWatchNode(d) {
          d.fixed = false;

          // we want to make sure that there are no children which the user already selected
          var ifFunction = function (d) {
            return !cache.watchingElements[d.id];
          };

          setAttrToAllChildren(d, "watching", false, ifFunction);

          if (Object.keys(cache.watchingElements).length == 0) {
            d3.select("svg")
              .classed("hide-all", false);
          }


          allNodes
            .classed("watching", function (d) {
              return d.watching;
            })

        }


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
            _tree.nodes(cache.data);  	// recalculate tree layout

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

        return layouts[layoutName](cache.graphObjects.force, cache.graphObjects.tree, 1000, cache.graphObjects.allNodes, cache.graphObjects.allLinks, cache.graphObjects.diagonal);
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

      /**
       * This is a generic function
       * it expect to have a nodeData, a attr name, a value and a condition
       * Then it adds the attribute with the value to all children recursively
       * if the condition is passing
       * @param d
       * @param attr
       * @param value
       * @param ifFunction
       */
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



