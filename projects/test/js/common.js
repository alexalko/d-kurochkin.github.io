$(function () {

  $('#fullpage').fullpage({
    lazyLoading: true,
    navigation: true,
    navigationPosition: 'right',
    fixedElements: '.header',
    onLeave: function(index, nextIndex){

		if(index == 1){
			setTimeout(function() { $('.header').addClass('header_mini'); }, 50)
//          $('.header').addClass('header_mini');
		}

		else if(nextIndex == 1){
			setTimeout(function() { $('.header').removeClass('header_mini'); }, 100)
		}
	}
  });


  $(".slick-text").slick({ // Our
    dots: true,
    arrows: false,
    infinite: true,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500
  });
  
  $(".slick-image").slick({ // Our
    dots: true,
    infinite: true,
    centerMode: false,
    slidesToShow: 2,
    slidesToScroll: 1
  });
  
  if ($(window).scrollTop() > 200) {
    $('.header').addClass('.header_mini');
  } else {
    $('.header').removeClass('.header_mini');
  }
  
  var allPanels = $('.accordion > dd').hide();
    
  $('.accordion > dt > a').click(function() {
      $this = $(this);
      $target =  $this.parent().next();

      if(!$target.hasClass('active')){
         allPanels.removeClass('active').slideUp();
         $target.addClass('active').slideDown();
      }
      
    return false;
  });
  
});
