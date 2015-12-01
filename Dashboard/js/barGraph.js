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

    	//Create xScale to use with horizontal sizing
    	var xScale = d3.scale.linear(data)
                    .domain([0, d3.max(zScoresArray)])
                    .range([0, frameWidth]);

        //DRAWING CODE.
        //
	    var bars = frame.selectAll('rect')
	    				.data(data)
	    				.enter()
	    					.append('rect')
	    					.attr('width', function(d, i){
	    						if (zScoresArray[i] < 0){  						
	    							return xScale(Math.abs(zScoresArray[i])) /2;
	    						}
	    						else {
	    							return xScale(zScoresArray[i]) /2;
	    						}
	    					})
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




	});

}

createBar();