$(function() {

  $('.jsCitySelect').niceSelect();

  $('.header').css('padding-top', $('.panel').height() + 20);

  if ($(window).width() >= 992) {
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
  }

  $('.jsMainLink').click(function(e) {
    e.preventDefault();
    $(this).parent().toggleClass('active');
  });

  $('.productSlider').owlCarousel({
    items: 3,
    nav: true,
    dots: false,
    navText: ['<', '>']
  });

  $('.productSmallSlider').owlCarousel({
    items: 3,
    nav: true,
    dots: false,
    navText: ['<', '>'],
    mouseDrag: false,
    touchDrag: false
  });


  $('.product-autoHeight').matchHeight();

  $('.hamburger').on('click', function(e) {

    e.preventDefault;
    $('.hamburger').toggleClass('active');
    $('.mobileMenu').toggleClass('active');
    // $('.nav').toggleClass('visible');

  });

});
