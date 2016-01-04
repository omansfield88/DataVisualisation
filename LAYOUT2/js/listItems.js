function createList(currentData){
	d3.json(currentData, function(data){

		//Remove all <li>s first so they're not left on the page
		d3.selectAll(".leftSVG").remove();

	    var theLIs = d3.select('#categoryUL')
	                    .selectAll('li')
	                        .data(data)
	                        .enter()
	                        .append('li')
	                        .attr('class','leftSVG')
	                        .text(function (d){
	                            return d.Category;
	                        })
	                        .style('color', function(d, i){
	                        	return colours[i];
	                        })

	});
};