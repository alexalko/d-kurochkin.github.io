$(document).ready(function() {
	$('#aside__menu-icon').click(function () {
		$('#aside').toggleClass('active');
		$('#gallery').toggleClass('active');
		$('main').toggleClass('active');
		$('#aside__menu-icon').toggleClass('active');
	});
	
	$("#gallery").unitegallery({
		gallery_theme:"tiles",
		tiles_max_columns: 4,
		tiles_min_columns: 1,
		tiles_space_between_cols: 5,			//space between images
		tiles_space_between_cols_mobile: 5  
	});
});
