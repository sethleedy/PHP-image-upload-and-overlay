$(document).ready(function (e) {
	$("#uploadimage").on('submit', (function (e) {
		
		e.preventDefault();
		$("#message").empty();
		$('#loading').show();
		
		$.ajax({
			url: "ajax_php_file.php", // Url to which the request is send
			type: "POST", // Type of request to be send, called as method
			data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
			contentType: false, // The content type used when sending data to the server.
			cache: false, // To unable request pages to be cached
			processData: false, // To send DOMDocument or non processed data file it is set to false
			success: function (data) // A function to be called if request succeeds
				{
					$('#loading').hide();
					$("#message").html(data);
					
					// Do the last bit to display the newly uploaded image on the main screen.
					finishUpload();
				}
		});
		
	}));

	// Function to preview image after validation
	$(function () {
		
		$("#file").change(function () {
			
			$("#message").empty(); // To remove the previous error message
			
			var file = this.files[0];
			var imagefile = file.type;
			var match = ["image/jpeg", "image/png", "image/jpg"];
			
			if (!((imagefile == match[0]) || (imagefile == match[1]) || (imagefile == match[2]))) {
				
				$('#previewing').attr('src', 'noimage.png');
				$("#message").html("<p id='error'>Please Select A valid Image File</p>" + "<h4>Note</h4>" + "<span id='error_message'>Only jpeg, jpg and png Images type allowed</span>");
				
				return false;
				
			} else {
				
				var reader = new FileReader();
				reader.onload = imageIsLoaded; // Set the image on the screen
				reader.readAsDataURL(this.files[0]);
								
			}
		});
	});

	function imageIsLoaded(e) {
		$("#file").css("color", "green");
		$('#image_preview').css("display", "block");
		$('#previewing').attr('src', e.target.result);
		$('#previewing').attr('width', '250px');
		$('#previewing').attr('height', '230px');

	};
	
	// This is the last bit to execute after the image is uploaded.
	function finishUpload() {
		
		// Refresh the portfolio. The new image becomes available to set as the poster.
		loadPortfolio(false); // Override the default of loading the poster. We do it below with a specific image

		// Change the poster to this new image.
		// Key in on the filename within the portfolio.
		$("#portfolio .pushImage img[src='imgs/uploads/" + file.name + "']");
		
		// Close the modal upload form
		$("#portfolioModal1 .close-modal").trigger("click");

	}
	
});
