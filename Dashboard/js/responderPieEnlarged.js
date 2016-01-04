function createRespondersPieEnlarged(currentData){

    //Remove all SVG elements first so they're not left on the page
    d3.selectAll("svg").remove();

    var frameWidth = 200;
    var frameHeight = 200;
    var radius = frameWidth / 2;

    d3.json(currentData, function(data){

            var pieChart = d3.select("#RespondersPieEnlarged")
            .append("svg")
            .attr("id", "pie")
            .attr("viewBox", "0 0 " + frameWidth + " " + frameHeight) 
            .append("g")
            .attr('transform', 'translate('+(frameWidth-radius )+','+(frameHeight-radius )+')')

             var arc = d3.svg.arc()
              .outerRadius(radius)

              // Create the pie chart layout
              var pie = d3.layout.pie()
                .value(function(d) {
                  return d.Responders;
                })
                .sort(null); // Sort is set to null to allow for better looking tweens

              // Create "slices" for each data element
              var arcs = pieChart.selectAll("g.slice")
                .data(pie(data)) // Bind the pie layout to the slices
                .attr("id", "arcs")
                .enter()
                .append("g")
                .attr("class", "slice");

              // Create the graphics for each slice and colour them
              arcs.append("path")
                .attr("fill", function(d, i) {
                  return colours[i];
                })
                //.attr("d", arc)
                .each(function(d) {
                  this._current = d;
                })
                .transition()
                .duration(1000)
                .attrTween('d', arcTweenStart);
            

            function arcTweenStart(b) {
              var start = {
                startAngle: b.startAngle,
                endAngle: b.startAngle
              };
              var i = d3.interpolate(start, b);
              return function(t) {
                return arc(i(t));
              };
            }

    });

}

