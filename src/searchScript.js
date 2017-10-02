$(document).ready(function () {
    $.getJSON('resorts.json', function (data) {
        $('#search').on('click', function () {
            var userDestination = $('input[name=destination]:checked').val(); 		//variable created for use with search engine
            var actSearch = $('input[name=\'activities\']:checked').map(function () {
                return this.value;					//variable created for use with search engine
            }).get();
            var comfortSearch = $('input[name=\'comfortLevel\']:checked').map(function () {			//variable created for use with search engine
                return this.value;
            }).get();
            var val = $('#slider-range-min').slider('option', 'value');			//variable created for use with search engine - takes value of slider and stores it under val variable
          
            var result = $('#datepicker').val();			//this variable stores value of a chosen date
          	var from_date = $('#from').val();
			//alert(from_date);
			var to_date = $('#to').val();
			
            var output = '<ul>';
			//if from_date.length !== 0 
            for (var i in data.resorts) {
                var actToMatch = actSearch.length;						// this variables used in for loop i responsible for lenght of array of resort holding activities 
                var comfortToMatch = comfortSearch.length;
                if ((userDestination == data.resorts[i].destination) || (userDestination == 'Any')) {	
					//if (to_date <= data.resorts[i].endDate)  {
					//	alert(data.resorts[i].endDate);
						
				//	}
					//if checked value matches destination...
                    if ((actToMatch == 0 && comfortToMatch == 0) && (val >= data.resorts[i].price) && (from_date >= data.resorts[i].startDate) && (to_date => data.resorts[i].endDate)) {  	/* if no activities is chosen or comfort level this line checks if chose price is higher than resorts price, than it checks if date matches betwween start and end date in resorts file... */
                        output += '<li data-id = ' + data.resorts[i].id + '>' + '<div class="resort">' + '<img src="' + data.resorts[i].picture + '"></img>' + '<div class="resort_name"> ' + '<h3>' + data.resorts[i].name + '</h3>' + '</div> ' + '<div class="resort_description">' + data.resorts[i].short_description + '</div> ' + '<div class="link">' + ' <a class="button" href=\'' + data.resorts[i].id + '.html\'> Visit page </a>' + '</div>' + '<div class="price">' + '£' + data.resorts[i].price + '</div>' + '</div>' + '</li> '; 
						
						/* ...then this results are displayed, all values are retrieved from JSON file, stored under output variable, li data-id has been created to use with draggable and droppable, img to display the image, resort name, short description, resorts id combined with a href used to open resorts website, and finally price used in green ribbon */
                    }  
                    else				/* if activities or comfort level has been chosen loop enters this else statement*/
                    {
                        for (var j in data.resorts[i].activities) {
                            for (var k in actSearch) {
                                if (actSearch[k] == data.resorts[i].activities[j]) {	/* to search trough array of activities*/
                                    actToMatch--;
                                }
                            }
                        }
                        for (var m in data.resorts[i].comfortLevel) {
                            for (var l in comfortSearch) {
                                if (comfortSearch[l] == data.resorts[i].comfortLevel[m] || comfortSearch == 'AnyComfort') {		/* to search trough array of comfortlevel*/
                                    comfortToMatch--;
                                }
                            }
                        }
						//alert(data.resorts[i].startDate);
						//alert(data.resorts[i].endDate);
						//if (to_date => data.resorts[i].endDate) {
						//	alert("przekroczone");
					//	}
                        if ((actToMatch == 0 && comfortToMatch == 0) && (val >= data.resorts[i].price) && (from_date => data.resorts[i].startDate) && (to_date <= data.resorts[i].endDate)) {				/* than this results are displayed */
                            output += '<li data-id = ' + data.resorts[i].id + '>' + '<div class="resort">' + '<img src="' + data.resorts[i].picture + '"></img>' + '<div class="resort_name"> ' + '<h3>' + data.resorts[i].name + '</h3>' + '</div> ' + '<div class="resort_description">' + data.resorts[i].short_description + '</div> ' + '<div class="link">' + ' <a class="button" title="Click to visit resorts website" href=\'' + data.resorts[i].id + '.html\'> Visit page </a>' + '</div>' + '<div class="price">' + '£' + data.resorts[i].price + '</div>' + '</div>' + '</li> ';
                        }
                    }
                }
            }
            output += '</ul>';
		
            if (from_date == '') alert('Please choose a Start Date');			/* if no start date is picked this message will be displayed */
			if (to_date == '') alert('Please choose a End Date')
            else if (output == '<ul></ul>') output = "No Matches Found!";		/*if no mathes found this msg will be displayed */
           
            document.getElementById('placeholder').innerHTML = output;		/* results are then placed in output variable and displayed under dvi with id placeholder  */
			
            $('#placeholder li').draggable({
                // brings the item back to its place when dragging is over
                revert: true,
            });
            $('.favourite').droppable({
                // The class that will be appended to the to-be-dropped-element (basket)
                activeClass: 'active',
                // The class that will be appended once we are hovering the to-be-dropped-element (basket)
                hoverClass: 'hover',
                // The acceptance of the item once it touches the to-be-dropped-element basket
                
                tolerance: 'touch',
                drop: function (event, ui) {
                    var favourite = $(this),						/*dragged item stored under this variable*/
                    move = ui.draggable,
                    itemId = favourite.find('ul li[data-id=\'' + move.attr('data-id') + '\']');		/*data-id of variable favourite are then found and stored under itemId*/
                 
                    if (itemId.html() != null) {												/*if item is already in the basket...*/				
                        					
						alert("Resort already added");							/*display this message...*/
                    } 
                    else {
                        // Add the dragged item to the basket
                        addBasket(favourite, move);
                       
                      
                    }
                },
                out: function (event, ui) {
                    $(ui.draggable).fadeOut(1000, function () {				/*when pulling out items from basket...*/
                        $(this).remove();									/* remove item which is being held */
                    });
                }
            });
            function addBasket(favourite, move) {
                favourite.find('ul').append('<li data-id="' + move.attr('data-id') + '">' + '<span class ="name">' + move.find('h3').html() + '</span>' +  '<button class="delete">✕</button>');			/* this part of code adds resort name to be displayed in the list */
                $('.favourite ul li button.delete').on('click', function () {				/*this function creates function for click button to remove item once clicked*/
                    $(this).closest('li').remove();
                });
                $('.favourite_list li').draggable({
                    					// brings the item back to its place when dragging is over
                    revert: true,
                });
            }
            $('.button').textillate({
                loop: true,
                in : {
                    effect: 'bounce',
                    shuffle: true,					/*	textillate used to animate VISIT PAGE links	*/
                },
                out: {
                    effect: 'shake'
                },
            });
        });
    });
    $(function () {
        $(document).tooltip({
            position: {
                my: 'center bottom-10',
                at: 'center top',
                using: function (position, feedback) {
                    $(this).css(position);																			/*tooltip used to display clues, descriptions*/
                    $('<div>').addClass('arrow').addClass(feedback.vertical).addClass(feedback.horizontal).appendTo(this);
                }
            }
        });
    });
  //  $('#datepicker').datepicker({
  //      dateFormat: 'yy-mm-dd'			/*	datepicker with same format as JSON file dates	*/
  //  });
  
   $(function() {
    $( "#from" ).datepicker({
		dateFormat: 'yy-mm-dd',
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {
        $( "#to" ).datepicker( "option", "minDate", selectedDate );
      }
    });
    $( "#to" ).datepicker({
		dateFormat: 'yy-mm-dd',
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {
        $( "#from" ).datepicker( "option", "maxDate", selectedDate );
      }
    });
  });
  
    $(function () {
       	$('.searchbutton').buttonset();
		$('.list_button').buttonset();
        $('.destination').buttonset();
        $('.activities').buttonset();				/*buttonset used to change display of buttons*/
        $('.comfort').buttonset();
		
		$("#list").click(function(){
		//	$(".favourite").toggleClass('show');
		//});
		
		//$( document ).click(function() {
  $( ".favourite" ).toggle( "slide" );
});

        $(function () {
            $('#slider-range-min').slider({
                range: 'min',
                value: 1500,
                min: 1,
                max: 5000,								/*	slider with max range used to display max price client is willing to pay */
                slide: function (event, ui) {
                    $('#amount').val('£' + ui.value);
                }
            });
            $('#amount').val('£' + $('#slider-range-min').slider('value'));
        });
    });
});
