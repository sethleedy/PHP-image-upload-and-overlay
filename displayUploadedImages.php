<?php

	//// Output some HTML displaying the uploaded image files
	
	// Gather the files by type at our "imgs/uploads/" directory
	$files = glob("imgs/uploads/*.*");

	// Loop the files and output the required enclosing HTML

	foreach ($files as $image) {
?>
				<div class="col-sm-4 portfolio-item pushImage">
					<div class="portfolio-link ">
						<div class="caption">
							<div class="caption-content">
								<i class="fa fa-search-plus fa-3x "></i>
							</div>
						</div>
						
						<img src="<?php echo $image; ?>" class="img-responsive " alt="<?php echo $image; ?>">
						
					</div>
				</div>
<?php
		
	}

?>