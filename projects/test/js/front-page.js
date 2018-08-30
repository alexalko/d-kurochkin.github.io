$(document).ready(function() {

  $('.slider').owlCarousel({
    items: 1,
    autoplay: true,
    loop: true,
    animateOut: 'fadeOut',
    dotsContainer: '#dots',
    mouseDrag: false
  });

  if ($(window).width() < 768) {
    $('.slider').owlCarousel('destroy');
  }

});
