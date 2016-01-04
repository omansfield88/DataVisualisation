function createHighlight(currentData){
	d3.json(currentData, function(data){


		    //Remove all SVG elements first so they're not left on the page
    d3.selectAll('.addedText').remove();

		//Push data values into an array so I can use d3.max to find the largest interger
	 	var respondersArray = [];
	    for (i = 0; i < data.length; i++){
       		respondersArray.push(data[i].Responders)
    	};

      var sumResponders = 0;
      for(i=0; i<respondersArray.length; i++){
          sumResponders = sumResponders + respondersArray[i];
      }


      console.log(respondersArray);
    	console.log(sumResponders);

    	//Get the largest interger value
    	var biggest = d3.max(respondersArray);
    	//Get the index number of that largest value
		  var biggestIndex = (respondersArray.indexOf(biggest))

	    d3.select('#mainResponder')
	           .data(data)
	           .append('h2')
	           .attr('class', 'addedText')
	           .text(biggest)
	            .style('color', function(d, i){
	                return colours[i];
	            })

	    d3.select('#mainCategory')
               .data(data)
               .append('h2')
               .attr('class', 'addedText')
               .text(function(d,i){
               		return data[biggestIndex].Category; //Look for the index of the largest value and find the Category
               })
                .style('color', function(d, i){
                    return colours[i];
                })

  		d3.select('#mainRPercentage')
                 .data(data)
                 .append('h2')
                 .attr('class', 'addedText')
                 .text(function(d,i){
                 		return Math.round(data[biggestIndex].Responders / sumResponders * 100) + "%"; 
                 })
                  .style('color', function(d, i){
                      return colours[i];
                  })
	   
       d3.select('#totalPopulation')
               .data(data)
               .append('h2')
               .attr('class', 'addedText')
                .text(function(d,i){
                    return data[biggestIndex].UKPopulation + "%"; 
                 })
                .style('color', function(d, i){
                    return colours[i];
                })
		
	});


};

