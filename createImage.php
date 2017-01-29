<?php

	// This also contains the class auto loading function. So it must be first.
	require("functions.php");

	// Default imgFile to use
	$defaultImg = 'imgs/uploads/joker1.jpg';

	// Autoload the classes to use
	use PHPImageWorkshop\ImageWorkshop; // For loading the background image and applying the bullets onto
	use PHPBullets\bulletObj; // This creates the bullets, including the image using the ImageWorkShop class.

	//// Setup Layer1, the background image.

	// Layer 1 - Passed/PreSelected/Uploaded Image
	if (isset($_REQUEST["imgFile"])) {
		// Check if image exists
		if (file_exists($_REQUEST["imgFile"])) {
			// Apply passed image to layer
			$layer1 = ImageWorkshop::initFromPath($_REQUEST["imgFile"]);
		}
	} else {
		$layer1 = ImageWorkshop::initFromPath($defaultImg); // Demo Pic
	}

	// Resize to fit our screen
	$layer1->resizeInPixel(400, 400, true, 0, 0, "MM");

	//// Setup some variables for the bullet holes

	// Create new array to hold bullet locations.
	$bulletcoords = [];
	// Grab the main image, smallest dim, for a max value.
	$imgSpreadMax = $layer1->getNarrowSideWidth(); // In Pixel // http://phpimageworkshop.com/doc/2/layer.html

	// Get an array of bullet hole objects
	// Pass the min/max amount of bullet holes. Amount is random between these numbers.
	$bulletcoords = createSpread(5, 20, $imgSpreadMax); // Would like to convert to mouse point click coordss

	// Apply the locations
	foreach ($bulletcoords as $bullet) {

		$layer1->addLayerOnTop($bullet->bullet, $bullet->xCoord, $bullet->yCoord, "MM");

		//echo $bullet->xCoord . ", " . $bullet->yCoord . ", Size: " . $bullet->size . "<br>";
	}
	//exit;

	$image = $layer1->getResult(); // This is the generated image !

	header('Content-type: image/png');
	imagepng($image, null, 9); // We choose to show a PNG with a quality of 100% (or 9)


?>