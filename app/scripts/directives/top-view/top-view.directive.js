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
            renderGraph(val);
          }
        })
      }

      function renderGraph(data) {
        var width = scope.width,
          height = scope.height;
        var nodeHeight = 15,
          linkDistance = 100;

        var force = d3.layout.force()
          .size([width, height])
          .on("tick", tick);

        var svg = d3.select(elm[0]).append("svg")
          .attr("width", width)
          .attr("height", height);


        var zoomRectWidth = width - (width / 3);
        var zoomRectHeight = height - (height / 3);

        var zoomRect = svg.append("rect")
          .attr("class", "zoomRect")
          .attr("width", zoomRectWidth)
          .attr("height", zoomRectHeight)
          .style("stroke", "gray")
          .style("stroke-opacity", 0.2)
          .style("stroke-width", "1px")
          .style("fill-opacity", 0)
          .attr("ry", zoomRectWidth/3)
          .attr("ry", zoomRectHeight/3)
          .attr("x", (width / 2 - zoomRectWidth / 2))
          .attr("y", (height / 2 - zoomRectHeight / 2))


        var g = svg.append("g");

        svg.style("cursor", "move");

        var _link = g.selectAll(".link"),
          node = g.selectAll(".node");

        var min_zoom = 0.1;
        var max_zoom = 7;
        var zoom = d3.behavior.zoom().scaleExtent([min_zoom, max_zoom])


        update();

        function update() {


          var nodes = flatten(data),
            links = d3.layout.tree().links(nodes);

          nodes.forEach(function (d, i) {
            d.x = width / 2 + i;
            d.y = height / 2 + 100 * d.depth;
          });


          force
            .nodes(nodes)
            .links(links)
            .charge(-500)
            .linkDistance(function (d) {
              return d.target.children.length > 0 ? 50 : 30;
            })
            .size([width, height])
            .start();

          // Update the links…
          _link = _link.data(links, function (d) {
            return d.target.id;
          });
          _link.exit().remove();


          // Enter any new links.
          _link.enter().insert("line")
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
          node = node.data(nodes, function (d) {
            return d.id;
          })
            .enter()
            .append("g")
            .attr("transform", function (d) {
              return "translate(" + d.x  + "," + d.y + ")";
            })
            .call(force.drag);

          //node.on('mousedown.drag', null);


          // Exit any old nodes.

          var text = node.append("text")
            .text(function (d) {
              return d.name;
            })
            .attr("x", 50)
            .style("font-size", "10px")
            .each(function (d) {
              d.width = this.getBBox().width;
              this.remove();
            });


          var rect = node
            .append("rect")
            .attr("class", "rect")
            .attr("width", function (d) {
              return d.width + 50;
            })
            .attr("height", nodeHeight)
            .style("fill", fillNodeColor)
            .style("stroke", "black")
            .style("stroke-width", "1px");

          node.append("text")
            .text(function (d) {
              return d.name;
            })
            .style("font-size", "10px")
            .attr("x", 10)
            .attr("y", 10);


          node.on("mouseover", function (d) {
            this.parentNode.appendChild(this);
            highlightPathToRoot(d);
            paintPathToRoot();
          })
            .on("mousedown", function (d) {
              d3.event.stopPropagation();


            }).on("mouseout", function (d) {
              clearPath(d);
              paintPathToRoot();
            });

          node.on("dblclick.zoom", function (d) {
            d3.event.stopPropagation();
            var dcx = (width / 2 - d.x * zoom.scale());
            var dcy = (height / 2 - d.y * zoom.scale());
            zoom.translate([dcx, dcy]);
            g.attr("transform", "translate(" + dcx + "," + dcy + ")scale(" + zoom.scale() + ")");
            markInFocusNodes(g);
          });


          function paintPathToRoot() {
            d3.selectAll(".rect")
              .style("stroke", function (d) {
                return d.pathToParent ? "red" : "black"
              });

            d3.selectAll(".link")
              .style("stroke", function (d) {
                return d.target.pathToParent ? "red" : "#9ecae1"
              });
          }

          function clearPath(d) {
            d.pathToParent = false;
            if (d.parent) {
              clearPath(d.parent)
            }
          }


          function highlightPathToRoot(d) {
            d.pathToParent = true;
            if (d.parent) {
              highlightPathToRoot(d.parent)
            }
          }


          zoom.on("zoom", function () {
            g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
            markInFocusNodes(g);


          });


        }

        function markInFocusNodes(g) {
          var gTransform = d3.transform(g.attr("transform"));

          var gx = gTransform.translate[0];
          var gy = gTransform.translate[1];
          var gScale = gTransform.scale[0];

          node.each(function (d) {
            var realX = (gx / gScale) + d.x;
            var realY = (gy / gScale) + d.y;
            d.inFocus = hitTest_roomRec(realX, realY, gScale);
          });

          node
            .style("opacity", function (d) {
              return d.inFocus ? 1 : 0;
            })
        }

        function hitTest_roomRec(realX, realY, gScale) {
          var zoomRectX = Number(zoomRect.attr("x")),
            zoomRectWidth = Number(zoomRect.attr("width")),
            zoomRectY = Number(zoomRect.attr("y")),
            zoomRectHeight = Number(zoomRect.attr("height"));

          return (realX >= zoomRectX / gScale && realX <= (zoomRectX + zoomRectWidth) / gScale)
            && (realY >= zoomRectY / gScale && realY <= (zoomRectY + zoomRectHeight) / gScale)
            ;
        }


        function fillNodeColor(d) {
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
          return colors[d.status] || "#ffffff";
        }


        function tick(e) {




          // Push sources up and targets down to form a weak tree.
          var k = 5 * e.alpha;

          // Push sources up and targets down to form a weak tree.
          _link
            .each(function (d) {
              d.source.y -= k, d.target.y += k;
            })
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


          node
            .attr("transform", function (d) {
              return "translate(" + (d.x - (this.getBBox().width /2)) + "," + (d.y) + ")";
            });


          _link.attr("x1", function (d) {
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


          markInFocusNodes(g);


        }


        svg.call(zoom);


        function flatten(root) {
          var nodes = [], i = 0;
          root.fixed = true;
          root.x = width / 2;
          root.y = height / 2;

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
      }


    }
  }


})();



