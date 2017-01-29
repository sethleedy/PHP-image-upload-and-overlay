'use strict';

// Run after the document is done loading
// Load other .js files
$(function () {

	// Bootstrap Core JavaScript
	$.getScript("js/bootstrap.min.js");

	// Plugin JavaScript
	$.getScript("http://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js");
	$.getScript("js/classie.js");
	$.getScript("js/cbpAnimatedHeader.js");

	// Custom Theme JavaScript
	$.getScript("js/freelancer.js");

	// Upload Code
	$.getScript("js/upload.js");

	// Use URL parameters
	// https://websanova.com/plugins/url
	$.getScript("js/url.min.js"); // JQuery plugin

	
//// Auto exec these on page load

	// Function to load the portfolio of images
	loadPortfolio();
	

//// Setup events

	// On the portfolio.
	// If the class pushImage, applied to <img> tags, is clicked pass the src file and refresh the posterImage
	$(document).on("click", ".pushImage", getPostImage);

	// If the top right link "Refresh Image" is clicked
	$(document).on("click", "#refreshImage", refreshPoster);

	// Smooth scroll to ID of links
	// handle links with @href started with '#' only
	$(document).on('click', 'a[href^="#"]', function (e) {
		// target element id
		var id = $(this).attr('href');

		// target element
		var $id = $(id);

		if ($id.length === 0) {
			return;
		}
		// If it only equals a '#', then return. Nothing to scroll to.
		if (id == "#") {
			return;
		}


		// prevent standard hash navigation (avoid blinking in IE)
		e.preventDefault();

		doScroll(id);
	});


	//	// Open a large image on click of the poster
	//	$("#posterImage").on("click", function() {
	//		// PosterImage src
	//		var newImgURLComponentTmp = $("#posterImage").attr("src");
	//		window.open(newImgURLComponentTmp, "_blank");
	//	});

});

// Load the portfolio images
function loadPortfolio(loadPoster=true) {

	// Load the portfolio of images from the server PHP file displayUploadedImages.php
	$("#portfolio .row:nth-of-type(2)").load("displayUploadedImages.php", function (response, status, xhr) {
		if (status == "error") {
			var msg = "Sorry but there was an error: ";
			console.log(msg + xhr.status + " " + xhr.statusText);
			
		} else {
			
			if (loadPoster=true) {
				// If no error, try see if we have at least one portfolio image
				// Must come in here due to delay of ajax loading above.

				// If at least one already exists(one is included), then display that image on the poster
				if ( $("#portfolio .row img").length ) { // Get the $(this) refrence
					//alert("test");
					$("#portfolio .pushImage:first").trigger("click"); // Call existing function by a click trigger. Trigger function getPostImage()
				}
			}
		}
	});

}

// Pass a URL to the PHP script and refresh the postImage ID with the new content
function getPostImage() {
	
	var newImgURLComponent = $(this).find("img").attr("src");
	
	// URL encode
	newImgURLComponent = encodeURIComponent(newImgURLComponent);

	// Create the URL to the image.
	var newImg = "createImage.php?imgFile=" + newImgURLComponent;

	// Assign a new image	
	$("#posterImage").attr("src", newImg);

	// Scroll the page to the posterImage ID
	doScroll($("#page-top"));
}

// Just refresh the poster
function refreshPoster() {
	// PosterImage src
	var newImgURLComponentTmp = $("#posterImage").attr("src");
	//console.log(newImgURLComponentTmp);
	var newImgURLComponent = url("?imgFile", newImgURLComponentTmp);
	//console.log("imgFile: " + newImgURLComponent);

	// Create the URL to the image.
	var newImg = "createImage.php?imgFile=" + newImgURLComponent;
	// Attach a cache breaker to the URL
	newImg += "&c=" + new Date().getTime();

	// Erase current, forcing a refresh.
	//$("#posterImage").attr("src", "");
	// Assign a new image
	$("#posterImage").attr("src", newImg);

	// Scroll the page to the posterImage ID
	doScroll($("#page-top"));
}



function doScroll(id) {

	// top position relative to the document
	var pos = $(id).offset().top;

	// Sometimes the function will error when the page loads.
	// Error: m.easing[this.easing] is not a function
	try {
		// animated top scrolling
		$('html, body').stop().animate({scrollTop: pos}, 1500, 'easeInOutExpo');
		
	} catch(err) {
		console.log("Error doing the scrolling to ID. Error: " + err);
	}
	
	// Incase of a hyperlink click, prevent leaving the page.
	event.preventDefault();
	
}
