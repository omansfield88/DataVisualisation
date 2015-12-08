function createBar(){

	var frameWidth = 400;
	var frameHeight = 400;

	var colours = ["#E18935","#E26635", "#DD443F", "#DB384A", "#DE5234", "#DC3E37"];

	d3.json('js/data/ageband.json', function(data){

		
		var frame = d3.select('#barChart')
					 .append('svg')
					 .attr("viewBox", "0 0 400 400")



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
	    					.attr('x' , function (d, i){
	    						if (zScoresArray[i] < 0) {
	    							return frameWidth / 2 - xScale(Math.abs(zScoresArray[i])) /2;
	    						}
	    						else {
	    							return frameWidth / 2;
	    						}
	    					})
	    					.attr('y', function(d,i){
	    						return i * 30;
	    					})
							.attr('fill', function(d, i){
                                return colours[i];
                            })


        //Animate
      bars.transition()
          .duration(1000)    
		       .attr('width', function(d, i){
					if (zScoresArray[i] < 0){  						
						return xScale(Math.abs(zScoresArray[i])) /2;
					}
					else {
						return xScale(zScoresArray[i]) /2;
					}
				})
           //moving the bars from the bottom of the frame, minus the height of the bar.
           //Which means it'll sit at the bottom of the graph.

	});

}

createBar();