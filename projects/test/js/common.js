$(function() {

	$('.jsCitySelect').niceSelect();

  $('.header').css('padding-top', $('.panel').height() + 20);

  $('.jsCatalogueLink, .jsSubMenu').mouseover(function() {
    $('.jsSubMenu').css({
      opacity: '1',
      pointerEvents: 'all',
      maxHeight: '500px'
    });
    $('.header').css('box-shadow', '-1px 1px 23px 4px rgba(17, 17, 17, 0.1)')
  });

  $('.jsCatalogueLink, .jsSubMenu').mouseleave(function() {
    $('.jsSubMenu').css({
      opacity: '0',
      pointerEvents: 'none',
      maxHeight: '0'
    });
    $('.header').css('box-shadow', 'none')
  });

  $('.productSlider').owlCarousel({
    items: 3,
    nav: true,
    dots: false,
    navText: ['<', '>'],
    stagePadding: 10,
    merge: true
  });

  $('.product-autoHeight').matchHeight();

});
