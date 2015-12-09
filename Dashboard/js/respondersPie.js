function createRespondersPie(currentData){

    //Remove all SVG elements first so they're not left on the page
    d3.selectAll("svg").remove();

    var frameWidth = 200;
    var frameHeight = 200;
    var radius = frameWidth / 2;

    d3.json(currentData, function(data){

        var pie = d3.layout.pie()
                    .value(function(d){
                        return d.Responders;
                    })

        var arc = d3.svg.arc()
                    .outerRadius(radius)

        var myChart = d3.select('#RespondersPie')
                        .append('svg')
                        .attr("viewBox", "0 0 " + frameWidth + " " + frameHeight) 
                        // .attr('width', frameWidth)
                        // .attr('height', frameHeight)
                        .append('g')
                            .attr('transform', 'translate('+(frameWidth-radius )+','+(frameHeight-radius )+')')
                            .selectAll('path').data(pie(data))
                            .enter()
                            .append('path')
                                .attr('fill', function(d, i){
                                    return colours[i];
                                })
                                .attr('d', arc)

    });

}

