/*
OPENS AN INLINE POP AND DISPLAYS THE SPECIFIED URL WITHIN THE POPUP
*/

$(document).ready(function () {
    //When you click on a link with class of poplight and the href starts with a # 
    $('a.inlinePopper').click(function () {
        var popID = "PopPop-" + $(this).attr('rel'); //Get Popup Name
        var popURL = $(this).attr('href'); //Get Popup href to determine data to fetch
		
		//assemble the pop...option to style the class inlinePopper
		var popperAssembly = "<div class=\"inlinePopperBox\" id="+ popID +" style=\"z-index: 99999; padding:6px 0 6px 0; color:#fff; display:none; position:fixed; background:#333333; top:5%; width:90%; margin:0 auto 0 auto; height:90%; max-width:800px; max-height:800px; overflow-x:hidden; overflow-y:scroll;\"></div>";
		
		//create the Pop in the DOM
		$("body").append(popperAssembly);
	
		//Fade in the Popup and add close button
        $('#' + popID).fadeIn();

        //Fade in Background
        $('body').append('<div id="fade" style="display: none; box-shadow:2px 2p 4px rgba(0,0,0,0.8); background: #000; position: fixed; left: 0; top: 0; width: 100%; height: 100%; opacity: .50; z-index: 9999;"></div>'); //Add the fade layer to bottom of the body tag.
        $('#fade').css({ 'filter': 'alpha(opacity=50)' }).fadeIn(); //Fade in the fade layer - .css({'filter' : 'alpha(opacity=80)'}) is used to fix the IE Bug on fading transparencies 

        //stops the background from moving while popup is up...more sites should be doing this lol :D
		$('html, body').css('overflowY', 'hidden').css('overflowX', 'hidden');
		//get page to display (see docs for reqs)
		var htmlData;
		$.get(popURL, function(data) {
			htmlData = data;
			$('#' + popID).append(htmlData);
		});
		
		//$('#' + PopID).append("dumb");
        //Prevents the click from doing anything
        return false;
    });

    //Close Popups and Fade Layer
	//TOUCH EVENT
    $('a.close, #fade').live('touchend', function () { //When clicking on the close or fade layer...
        $('html, body').css('overflowY', 'inherit').css('overflowX', 'inherit'); //allow scrolling again
		$('#fade , .inlinePopperBox').fadeOut(function () {
            $('#fade, a.close, .inlinePopperBox').remove();  //fade them both out
        });
        return false;
    });
	
	//CLICK EVENT
	$('a.close, #fade').live('click', function () { //When clicking on the close or fade layer...
        $('html, body').css('overflowY', 'inherit').css('overflowX', 'inherit'); //allow scrolling again
		$('#fade , .inlinePopperBox').fadeOut(function () {
            $('#fade, a.close, .inlinePopperBox').remove();  //fade them both out
        });
        return false;
    });
});