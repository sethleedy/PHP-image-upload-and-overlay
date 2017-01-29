<?php

	// Good news for PHP 5.3 users with namespaced classes:
	//	When you create a subfolder structure matching the namespaces of the containing classes, you will never even have to define an autoloader.

	// setup function to autoload the classes
	spl_autoload_register(function ($class_name) {
		// convert namespace to full file path
		$class = "classes/" . str_replace("\\", "/", $class_name) . ".php";
		require_once($class);    
	});



	// function to create all the bullet holes.
	// Passed args will be a min/max of random amount of bullets.
	function createSpread($minC=3, $maxC=5, $imgSpreadMax=100) {

		// Array to return, containing the bullets as objects
		$arrOfBullets = [];

		// Then make it 1/4 of the screen and neg for use in spread shot pattern
		$imgSpreadMax = round($imgSpreadMax / 4);
		$imgSpreadMin = 0 - $imgSpreadMax; // Make it negative.

		// How many bullets ?
		$bulletsAmount = mt_rand($minC, $maxC); // using passed args
		//echo $bulletsAmount;

		// Loop $bulletsAmount and create object for each bullet, then place into array.
		for ($i=$minC; $i < $bulletsAmount; ++$i) {

			$arrOfBullets[] = new PHPBullets\bulletObj($imgSpreadMin, $imgSpreadMin, $imgSpreadMax); // Magic rabbit that holds all info of the bullet holes.

		}

	//	foreach ($arrOfBullets as $bullet) {
	//		echo $bullet->xCoord . ", " . $bullet->yCoord . "<br>";
	//	}

		// Return the array of bullet objects
		return $arrOfBullets;

	}

?>