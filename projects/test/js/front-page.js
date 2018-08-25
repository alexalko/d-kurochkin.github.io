$(document).ready(function () {

  $('.slider').owlCarousel({
    items: 1,
    autoplay: true,
    loop: true,
    animateOut: 'fadeOut',
    dotsContainer: '#dots',
    mouseDrag: false
  });

  $('.productSlider').owlCarousel({
    items: 3,
    nav: true,
    dots: false,
    navText: ['<', '>']
  });

  $('.product').matchHeight();

});
