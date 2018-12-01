$(function() {

	$('.winners, .floating_numbers, .table, .progress_bar').hide();

	$('.submit_btn').click(function(e) {
		e.preventDefault();
		$('.progress_bar').show();

		setTimeout(function() {
			$('.winners, .floating_numbers, .table').slideDown(700);
		}, 3000);

		

	});

	

	$('.table_wrapper').mCustomScrollbar({
		axis: 'y',
		scrollInertia: 100,
		scrollEasing: "linear",
		scrollButtons: {
			enable: true,
			scrollAmount: 50,
			scrollType: "stepped"
		},
		mouseWheel:{ scrollAmount: 50 }
	});

});
