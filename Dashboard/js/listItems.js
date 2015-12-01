d3.json('js/data/ageband.json', function(data){

    var theLIs = d3.select('#categoryUL')
                    .selectAll('li')
                        .data(data)
                        .enter()
                        .append('li')
                        .text(function (d){
                            return d.Category;
                        })

});