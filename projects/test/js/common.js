$(function() {

  setTimeout(function() {
    $('body').addClass('loaded');
  }, 2500);

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

  $('.jsSubMenuSlider').owlCarousel({
    autoWidth: true,
    dots: false,
    responsive: {
      0: {
        autoplay: true
      },
      1200: {
        autoplay: false
      }
    }
  });

  if ($(window).width() <= 1200 && $(window).width() > 992) {
    $('.header_phones').click(function() {
      $(this).toggleClass('active');
    });
    $('.header_search').click(function() {
      $(this).toggleClass('active');
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
  if ($(window).width() < 992) {
    $('.suggestion .product-small').matchHeight();
  }


  $('.hamburger').on('click', function(e) {

    e.preventDefault;
    $('.hamburger').toggleClass('active');
    $('.mobileMenu').toggleClass('active');
    // $('.nav').toggleClass('visible');

  });

});
