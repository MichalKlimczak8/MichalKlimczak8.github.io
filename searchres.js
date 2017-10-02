$(document).ready(function () {
    $.getJSON('resorts.json', function (data) {
        $( function () {
       var description = '<p>'; /* variables created for purpose of use in this java script */
	   var price;
	   var activities = '<p>';
	   var name = '<h1>';
	   var destination = '<h1>';
	   var s_description = '<p>';
	   var comfort;
	   var location = '<h2>';
          var title = document.getElementById('title').innerHTML; /* this statement gets page title and stores it under title variable which is than later used for comparison (if statement )*/
		  
		  for (var i in data.resorts) {				 /*  this part of script I've created to reuse JSON data which then puts approppriate values into chosen fields */
		  		if (title === data.resorts[i].id){			/* this if statement compares title taken earlier to match apropriate resort*/
		                        description = '<p>'  + data.resorts[i].long_description ; /* this statement gets data from JSON file and stores it under description variable */
                   				price = data.resorts[i].price;	/*   like above, but with price which is stored in price variable */
    							activities = '<p>' + data.resorts[i].activities; /* as above but with activities */
           						name = '<h1>' + data.resorts[i].name; /* same as above but this goes on top of the page of each resort page */
             					destination = '<h1>' + data.resorts[i].destination;
        						s_description = '<p>' +data.resorts[i].short_description;
								comfort = data.resorts[i].comfortLevel;
                				location = data.resorts[i].location;
            
			$(".ribbon-green").append('&#163;' + price); /* similiar as above but with append function, I've tried diffrent approaches to get required result hence use of append here, this statement append ribbon with price on each resorts page on right top corner */
			$(".activities").append(activities); /* this statement appends activities on each resorts page - using values stored in sctivities variable */
			$(".container-top h1").append(name); /* as above but with name  */
			$(".banner h1").append(destination);
			$(".banner h2").append(location);
			$(".banner p").append(s_description);
			$("#tab-1 p").append(description);
			if (comfort == 1) comfort = '&#9734;' ;
			if (comfort == 2) comfort = '&#9734;' + '&#9734;' ;
			if (comfort == 3) comfort = '&#9734;' + '&#9734;' + '&#9734;' ;					/* This piece of code was made to display stars accordingly to comfort level inside ribbon */
			if (comfort == 4) comfort = '&#9734;' + '&#9734;' + '&#9734;' + '&#9734;';
			if (comfort == 5) comfort = '&#9734;' + '&#9734;' + '&#9734;' + '&#9734;' + '&#9734;';
			$(".ribbon-green-comfort").append(comfort);
			
			
				
				}
		  }
        });
    });
	
	$(function() {
    $( "#accordion" ).accordion({			/*accordion with approppriate values like, show collapsed, and easing added*/
       collapsible: true,
	   heightStyle: "content",
	   animate: { easing: 'easeInOutCubic', duration: 1000 }, 
	   active: false 
    });
	$('.pic').cycle({ 				/*	plugin to cycle trough thumbnail images within pic class div, with fade effect*/
    fx:    'fade', 
    speed:  2500 
 });
	
  });
});