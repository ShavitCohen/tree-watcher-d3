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
        var nodeHeight = 20,
          linkDistance = 50;

        var force = d3.layout.force()
          .size([width, height])
          .on("tick", tick);

        var svg = d3.select(elm[0]).append("svg")
          .attr("width", width)
          .attr("height", height);

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


          force
            .nodes(nodes)
            .links(links)
            .charge(-500)
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
              return "translate(" + d.x + "," + d.y + ")";
            })
            .call(force.drag);

          //node.on('mousedown.drag', null);


          // Exit any old nodes.

          var text = node.append("text")
            .text(function (d) {
              return d.name;
            })
            .style("font-size", "12px")
            .attr("dy", "1em")
            .each(function (d) {
              d.width = this.getBBox().width;
              this.remove();
            });


          var rect = node.
            append("rect")
            .attr("class", "rect")
            .attr("width", function (d) {
              return d.width
            })
            .attr("height", nodeHeight)
            .style("fill", color)
            .style("stroke", "black")
            .style("stroke-width", "1px");

          node.append("text")
            .text(function (d) {
              return d.name;
            })
            .style("font-size", "12px")
            .attr("dy", "1em");


          node.on("mouseover", function (d) {
            this.parentNode.appendChild(this);
            highlightPath(d);
            paintPath();
          })
            .on("mousedown", function (d) {
              d3.event.stopPropagation();


            }).on("mouseout", function (d) {
              clearPath(d);
              paintPath();
            });

          node.on("dblclick.zoom", function (d) {
            d3.event.stopPropagation();
            var dcx = (width / 2 - d.x * zoom.scale());
            var dcy = (height / 2 - d.y * zoom.scale());
            zoom.translate([dcx, dcy]);
            g.attr("transform", "translate(" + dcx + "," + dcy + ")scale(" + zoom.scale() + ")");
          });


          function paintPath() {
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


          function highlightPath(d) {
            d.pathToParent = true;
            if (d.parent) {
              highlightPath(d.parent)
            }
          }


          zoom.on("zoom", function() {
            g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
          });


        }

        function color(d) {
          return d.children && d.children.length > 0 ? "#3182bd" : "#fd8d3c";
        }

        function tick(e) {
/*

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
              return "translate(" + (d.x) + "," + (d.y) + ")";
            })

*/


          // Apply the constraints:
          //
          force.nodes().forEach(function(d) {
            if (!d.fixed) {
              var r = d.width * 10, dx, dy, ly = 30;

              // #1: constraint all nodes to the visible screen:
              //d.x = Math.min(width - r, Math.max(r, d.x));
              //d.y = Math.min(height - r, Math.max(r, d.y));

              // #1.0: hierarchy: same level nodes have to remain with a 1 LY band vertically:
              if (d.children || d._children) {
                var py = 0;
                if (d.parent) {
                  py = d.parent.y;
                }
                d.py = d.y = py +  ly/2;
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


          _link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

          node
            .attr("transform", function (d) {
              return "translate(" + (d.x - (d.width /2)) + "," + (d.y) + ")";
            })


        }



        svg.call(zoom);

        function flatten(root) {
          var nodes = [], i = 0;

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
          recurse(root,1);

          return nodes;
        }
      }


    }
  }


})();



