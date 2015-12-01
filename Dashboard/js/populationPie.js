function createPie1(){

var frameWidth = 400;
var frameHeight = 400;
var radius = frameWidth / 2;
var colours = ["#E18935", "#E26635", "#DD443F", "#DB384A", "#DE5234", "#DC3E37"];

d3.json('js/data/ageband.json', function(data){

    var pie = d3.layout.pie()
                .value(function(d){
                    return d.UKPopulation;
                })

    var arc = d3.svg.arc()
                .outerRadius(radius)

    var myChart = d3.select('#pieChart1')
                    .append('svg')
                    .attr("viewBox", "0 0 400 400")
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

createPie1();