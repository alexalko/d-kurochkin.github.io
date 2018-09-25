$(document).ready(function(){

    $('.product-litle-img img').click(function(){
		$('.product-img-block > img').attr('src', $(this).data('src'));
	})
	$('.product-img-block > img').click(function(){
	  $('a[href="'+$(this).attr("src")+'"]').click()
	})
	$('#count').keypress(function(e) {
		if(e.which!=8 && e.which!=0 && e.which!=109 && e.which!=188 && e.which!=190 && (e.which<48 || e.which>57)) return false;
	});


	if ($('.product-litle-img>img').length>1) {

        var images = $('.product-litle-img>img'),
            count = images.length,
            animated = $('.product-img-block > img'),
            i = 0;

        $('.product-img-block').hover(function() {
            $(this).addClass('hover');
        }, function() {
            $(this).removeClass('hover');
        });


        setInterval(function() {

            if ($('.product-img-block').hasClass('hover')) {
                return 0;
            }

            i == count-1 ? i = 0 : i++;

            animated.css('opacity', 0);



            setTimeout(function() {
                images.eq(i).trigger('click');
            }, 100);

            setTimeout(function() {
                animated.css('opacity', 1);
            }, 200);

        }, 4000);

	}

    if ($('.main-banner .carousel-block').length>3) {
        setInterval("$('.main-banner .carousel-button-right a').click()", 5000);
    }

})
