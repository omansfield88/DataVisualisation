function createPie2(){

var frameWidth = 200;
var frameHeight = 200;
var radius = frameWidth / 2;
var colours = ["#E18935", "#E26635", "#DD443F", "#DB384A", "#DE5234", "#DC3E37"];

d3.json('js/data/ageband.json', function(data){

    var pie = d3.layout.pie()
                .value(function(d){
                    return d.Responders;
                })

    var arc = d3.svg.arc()
                .outerRadius(radius)

    var myChart = d3.select('#pieChart2')
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

createPie2();