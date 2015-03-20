/* global angular, console, d3 */

(function () {
    'use strict';

    angular
        .module('windRose')
        .directive('windRose', windRose);

    function windRose() {
        var setup = {
            restrict: 'E',
            templateUrl: 'app/WindRose/WindRose.html',
            controller: 'WindRoseController',
            controllerAs: 'ctrl',
            scope: {
                quantity: '='
            },
            link: link
        };

        var width   = 400,
            height  = 400,
            margin  = 100;

        return setup;

        // ####################################################################

        function link(scope, element, attr) {
            var vis = d3.select(element[0].querySelector('#chart'))
            .append("svg")
            .attr("width", width + margin)
            .attr("height", height + margin);

            var anglesSectors = d3.scale.linear()
                                    .domain([0, 16])
                                    .range([0, 360]);

            var anglesData = d3.scale.linear()
                                    .domain([0, 16])
                                    .range([0, 360]);

            var maxPercentage = -1;

            scope.$watch('val', updateValues, false);

            function updateValues(newVal, oldVal) {
                vis.selectAll('*').remove();

                if(!newVal) {
                    return;
                }

                var actualValues = newVal.filter(function(val) { return val!==null; }),
                    numOfValues = actualValues.length,
                    tickValues = d3.range(17).map(anglesData),
                    data = d3.layout.histogram().bins(tickValues)(actualValues);

                // concentric circles denoting percentage #####################
                maxPercentage = -1;

                for(var i=0, len=data.length; i<len; ++i) {
                    var percentage = data[i].y/numOfValues*100;

                    if(percentage>maxPercentage) {
                        maxPercentage = percentage;
                    }
                }

                maxPercentage += 5;

                var percentages = d3.scale.linear()
                                            .domain([0, 4])
                                            .range([0, maxPercentage]);

                var percentageCircles       = d3.range(5).map(percentages),
                    concentricCirclesGroup  = vis.append("g");

                concentricCirclesGroup.selectAll("circle")
                    .data(percentageCircles)
                    .enter()
                    .append("circle")
                    .attr("cx", 0)
                    .attr("cy", 0)
                    .attr("r", function(d) { return d/maxPercentage * 0.5*width; })
                    .attr("fill", "none")
                    .attr("stroke", "rgba(126, 124, 132, 0.63)")
                    .attr("transform", "translate(" + (margin+width)/2 + "," + (margin+height)/2 + ")");

                concentricCirclesGroup.selectAll("text")
                    .data(percentageCircles)
                    .enter()
                    .append("text")
                    .attr("x", function(d) {
                        return (margin+width)/2 + d/maxPercentage*0.5*width*Math.cos(-22.5*Math.PI/180);
                    })
                    .attr("y", function(d) {
                        return (margin+height)/2 + d/maxPercentage*0.5*height*Math.sin(-22.5*Math.PI/180);
                    })
                    .attr("fill", "#5e85ed")
                    .text(function(d) {
                        return '' + d.toFixed(2) + '%';
                    });
                // ############################################################

                // the 16 sectors and their direction denotations #############
                var sectors         = d3.range(17).map(anglesSectors),
                    sectorsGroup    = vis.append("g");

                sectorsGroup.selectAll("line")
                    .data(sectors)
                    .enter()
                    .append("line")
                    .attr("x1", (margin+width)/2)
                    .attr("x2", margin/2+width)
                    .attr("y1", (margin+height)/2)
                    .attr("y2", (margin+height)/2)
                    .attr("stroke", "#93b6f7")
                    .attr("stroke-width", 0.3)
                    .attr("transform", function(d) {
                        return 'rotate(' + d + ', ' + (margin+width)/2 + ', ' + (margin+height)/2 + ')';
                    });

                sectorsGroup.selectAll("text")
                    .data([{ angle: 0,      text: 'N' },
                           { angle: 45,     text: 'NW' },
                           { angle: 90,     text: 'W' },
                           { angle: 135,    text: 'SW' },
                           { angle: 180,    text: 'S' },
                           { angle: 225,    text: 'SE' },
                           { angle: 270,    text: 'E' },
                           { angle: 315,    text: 'NE' }
                          ])
                    .enter()
                    .append("text")
                    .attr("x", function(d) {
                        return (margin+width)/2 + 0.55*width*Math.cos(-Math.PI/180*d.angle-Math.PI/2);
                    })
                    .attr("y", function(d) {
                        return (margin+height)/2 + 0.55*height*Math.sin(-Math.PI/180*d.angle-Math.PI/2);
                    })
                    .attr("fill", "#4a5980")
                    .attr("dy", "0.35em")
                    .attr("dx", "-0.35em")
                    .text(function(d) {
                        return d.text;
                    });
                // ############################################################

                // data arcs ##################################################
                vis.append("g")
                    .selectAll("path")
                    .data(data)
                    .enter()
                    .append("path")
                    .attr("d", dataArc())
                    .style("fill", function(d) {
                        return "rgba(50, 201, 73, 0.65)";
                    })
                    .attr("transform", "translate(" + (margin+width)/2 + "," + (margin+height)/2 + ")")
                    .append("title").text(function(d) {
                        return (d.y/numOfValues*100).toFixed(2) + '%';
                    });

                function dataArc() {
                    return d3.svg.arc()
                        .innerRadius(function(d) {
                            if(d.y>0) {
                                return 0;
                            }

                            return 0;
                        })
                        .outerRadius(function(d) {
                            if(d.y>0) {
                                return d.y/numOfValues*(width/2)*100/maxPercentage;
                            }

                            return 0;
                    })
                    .startAngle(function(d) { return d.x * Math.PI/180; })
                    .endAngle(function(d) { return (d.x - d.dx) * Math.PI/180; });
                }
            }
        }
    }
})();
