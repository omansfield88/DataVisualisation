function createBarEnlarged(currentData){

    //Remove all SVG elements first so they're not left on the page
    d3.selectAll("svg").remove();

	var frameWidth = 400;
	var frameHeight = 400;

	d3.json(currentData, function(data){

		
		var frame = d3.select('#barChartEnlarged')
					 .append('svg')
					 .attr("viewBox", "0 0 400 450")



	    //Store ZScore values in an array before putting them into the drawing code.
	    //Because it causes an error when you try to turn negative values into width/xPos.
	    var zScoresArray = [];
	    for (i = 0; i < data.length; i++){
       		zScoresArray.push(data[i].ZScore)
    	};

    	//Turn all zScores into all positive intergers. -19 becomes 19.
    	var zScoresAllPositive = [];
    	for (i = 0; i < data.length; i++){
       		zScoresAllPositive.push(Math.abs((data[i].ZScore)))
    	};

        //Create xScale to use with horizontal sizing.
        //Have to use zScoresAllPositive otherwise the graph is off.
        // -19 could be the longest bar, but 8 would still be larger so would be considered the 'max'
        // even though -19 should be the longest bar.
    	var xScale = d3.scale.linear(data)
                    .domain([0, d3.max(zScoresAllPositive)])
                    .range([0, frameWidth]);

        //DRAWING CODE.        
	    var bars = frame.selectAll('rect')
	    				.data(data)
	    				.enter()
	    					.append('rect')
	    					.attr('width', 0)
	    					.attr('height', 20)
	    					.attr('x' , 200)
	    					.attr('y', function(d,i){
	    						return i * 30;
	    					})
							.attr('fill', function(d, i){
                                return colours[i];
                            })


        //ANIMATE
        //200 is the middle point which bars grow from.
        //If the ZScore is less than 0, the x value must be moved to the left.
        //For negative ZScores, the width and x value must be animated at the same time to create the illusion that it is growing from the midpoint. 
			bars.transition()
        			.duration(1000)
        			.attr('width', function(d, i){        			
        				return xScale(Math.abs(data[i].ZScore)) /2;
        				     				
        			})
        			.attr('x', function(d, i){
        				if (data[i].ZScore > 0){
        					return 200; //Positive ZScores start from the midpoint of the graph (200)
        				}
        				else if (data[i].ZScore < 0){
        					return 200 - xScale(Math.abs(data[i].ZScore)) /2; //Negative ZScores must have their start point moved left by the same amount as their width.
        				}
        			})



	});

}

