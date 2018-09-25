
$(function () {


    $('.carousel-items>div').each(function () {
        $(this).attr('data-index', $(this).index());
        $('.carousel-pages').append('<div data-index="' + $(this).index() + '"></div>');
    });

    $('.carousel-pages>div').eq(0).addClass('active');

    if ($(window).width() < 1024 && $(window).width() >= 601) {
        $('.banner .carousel-block').css('width', $('#wrapper').width()*0.66);
    }
    else if ($(window).width() < 601) {
        $('.banner .carousel-block').css('width', $('#wrapper').width());
    }

    $('.carousel-pages>div').click(function () {

        if (!$(this).hasClass('active')) {

            $('.carousel-pages>div').removeClass('active');
            $(this).addClass('active');

            var thisCaruosel = $(this).closest('.carousel'),
                index = $(this).attr('data-index');

            var i = 0;

            $('.carousel-items>div').each(function () {


                if ($(this).attr('data-index') != index) {

                    thisCaruosel.find(".carousel-items").append($(this)[0].outerHTML);

                    $(this).remove();

                }
                else {
                    return false;
                }

            });

            //var block_width = thisCaruosel.find('.carousel-block').outerWidth();
            //thisCaruosel.find(".carousel-items .carousel-block[data-index='"+$(this).attr('data-index')+"']").clone().prependTo(thisCaruosel.find(".carousel-items"));


            //thisCaruosel.find(".carousel-items").css({"left":"-"+block_width+"px"});
            //thisCaruosel.find(".carousel-items .carousel-block[data-index='"+$(this).attr('data-index')+"']").eq(1).remove();
            //thisCaruosel.find(".carousel-items").animate({left: "0px"}, 300);
        }

    });

});


//Обработка клика на стрелку вправо
$(document).on('click', ".carousel-button-right",function(){ 
	var carusel = $(this).parents('.carousel');
	right_carusel(carusel);
	return false;
});
//Обработка клика на стрелку влево
$(document).on('click',".carousel-button-left",function(){ 
	var carusel = $(this).parents('.carousel');
	left_carusel(carusel);
	return false;
});
function left_carusel(carusel) {
    $('.carousel-pages>div').removeClass('active');
   var block_width = $(carusel).find('.carousel-block').outerWidth();
   $(carusel).find(".carousel-items .carousel-block").eq(-1).clone().prependTo($(carusel).find(".carousel-items")); 
   $(carusel).find(".carousel-items").css({"left":"-"+block_width+"px"});
   $(carusel).find(".carousel-items .carousel-block").eq(-1).remove();
    $('.carousel-pages div[data-index=' +$(carusel).find(".carousel-items .carousel-block").eq(0).attr('data-index')+ ']').addClass('active');
   $(carusel).find(".carousel-items").animate({left: "0px"}, 300); 
   
}
function right_carusel(carusel){
    $('.carousel-pages>div').removeClass('active');
   var block_width = $(carusel).find('.carousel-block').outerWidth();
   $(carusel).find(".carousel-items").animate({left: "-"+ block_width +"px"}, 300, function(){
	  $(carusel).find(".carousel-items .carousel-block").eq(0).clone().appendTo($(carusel).find(".carousel-items")); 
      $(carusel).find(".carousel-items .carousel-block").eq(0).remove();
       $('.carousel-pages div[data-index=' +$(carusel).find(".carousel-items .carousel-block").eq(0).attr('data-index')+ ']').addClass('active');
      $(carusel).find(".carousel-items").css({"left":"0px"}); 
   }); 
}

$(function() {
//Раскомментируйте строку ниже, чтобы включить автоматическую прокрутку карусели
//	auto_right('.carousel:first');
})

// Автоматическая прокрутка
function auto_right(carusel){
	setInterval(function(){
		if (!$(carusel).is('.hover'))
			right_carusel(carusel);
	}, 1000)
}
// Навели курсор на карусель
$(document).on('mouseenter', '.carousel', function(){$(this).addClass('hover')})
//Убрали курсор с карусели
$(document).on('mouseleave', '.carousel', function(){$(this).removeClass('hover')})


$(function() {
    setTimeout(function () {
        if ($('.banner').length) {

            $('.banner').hover(function () {
                $(this).addClass('hover');
            }, function () {
                $(this).removeClass('hover');
            });

            setInterval(function() {

                !$('.banner').hasClass('hover') ? $('.banner .carousel-button-right').trigger('click') : 0;

            }, 4000);


        }
    }, 1000);

}());
