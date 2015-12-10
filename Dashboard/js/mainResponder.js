function createMainResponder(currentData){
	d3.json(currentData, function(data){


		    //Remove all SVG elements first so they're not left on the page
    d3.selectAll('.addedText').remove();

	//Push data values into an array so I can use d3.max to find the largest interger
	 var respondersArray = [];
	    for (i = 0; i < data.length; i++){
       		respondersArray.push(data[i].Responders)
    	};

    	//Get the largest interger value
    	var biggest = d3.max(respondersArray);
    	//Get the index number of that largest value
		var biggestIndex = (respondersArray.indexOf(biggest))

	    var theH2 = d3.select('#mainResponder')
	                   .data(data)
	                   .append('h2')
	                   .attr('class', 'addedText')
	                   .text(biggest)
	                    .style('color', function(d, i){
	                        return colours[i];
	                    })

	    var theHeader = d3.select('#mainCategory')
	                   .data(data)
	                   .append('h2')
	                   .attr('class', 'addedText')
	                   .text(function(d,i){
	                   		return data[biggestIndex].Category; //Look for the index of the largest value and find the Category
	                   })
	                    .style('color', function(d, i){
	                        return colours[i];
	                    })
		
	});


};

