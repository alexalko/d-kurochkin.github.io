$(function () {

	$('.range').on('input', function () {
		let th = $(this);
		$('.jsRangeAmount').html(th.val());
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
		mouseWheel: {
			scrollAmount: 50
		}
	});

	$('.winners, .floating_numbers, .table, .progress').hide();
	function showThings() {
		$('.winners, .floating_numbers, .table').slideDown(700);
	}

	$('.submit_btn').click(function (e) {
		e.preventDefault();

		$('.progress').show();

		let status = 0;
		const img100 = $('.progress_100');

		let progressing =	
			setInterval(function () {
				if (status < 100) {
					status += 8;
					img100.css('width', status + '%');
					$('.progress_amount').css('left', status-4 + '%').html(status + '%');
				};
				if (status > 50) {
					$('.progress_amount').css('left', status-6 + '%').html(status + '%');
				};
				if (status >= 100) {
					$('.progress_amount').css('left', '86%').html('100%');
					img100.css('width', '100%');
					clearInterval(progressing);
					showThings();
				};

			}, 500);

	});


});