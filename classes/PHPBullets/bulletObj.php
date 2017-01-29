<?php

namespace PHPBullets;

use PHPImageWorkshop\ImageWorkshop;

class bulletObj {
	
	public $bullet=1;
	public $xCoord=0;
	public $yCoord=0;
	private $rotateDegree=25;
	private $size=0;

	function __construct($minX=0, $minY=0, $max=25) {

			
		// Bullet type 1 - 3
		// Picks the image.
		// Pass the max amount of files.
		// Returns a class of "PHPImageWorkshop\ImageWorkshop" holding the image
		$this->bullet = $this->getBulletType(3);

		
		//// Gather numbers before manipulation of image in $this->bullet
		
		// Coords for X, Y
		// Set by inital arguments
		// Min=0, Max=1
		$this->xCoord = $this->getXCoord($minX, $max);
		$this->yCoord = $this->getYCoord($minY, $max);

		// rotation
		// 360 degrees ?
		$this->rotateDegree = $this->getDegree();

		// get size in percent
		$this->size = $this->getSize();

		//// manipulation of image
		
		// Resize
		$this->bullet->resizeByLargestSideInPercent($this->size, true); // http://phpimageworkshop.com/doc/17/resizing.html
		// Rotate
		$this->bullet->rotate($this->rotateDegree); // http://phpimageworkshop.com/doc/18/rotating.html
		
		
	}
	
	// Default for the files are 1 based. So count from 1 to passed $max
	// This will choose a file name base of "hole1.png" or "hole3.png" etc..
	private function getBulletType($max) {
		$type = mt_rand(1, $max);
		
		// Layer 2 - Bullet Holes
		$layer2 = ImageWorkshop::initFromPath("imgs/hole" . $type . ".png"); // Overlay of bullet hole
		
		return $layer2;
		
	}
	
	// Return some x coords between $min and $max
	private function getXCoord($min, $max) {
		return mt_rand($min, $max);
	}	
		
	// Return some y coords between $min and $max
	private function getYCoord($min, $max) {
		return mt_rand($min, $max);
	}
	
	private function getDegree() {
		return mt_rand(0, 359);	
	}
	
	// Trying to vary the size of the bullet hole a little. Not sure what range will work here.
	private function getSize() {
		return mt_rand(40, 100); // Percent
	}
	

}

?>