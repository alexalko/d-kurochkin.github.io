$('.suggestionSlider').owlCarousel({
  items: 4,
  dots: false,
  nav: true,
  navContainer: '.productNav',
  navText: ['<', '>'],
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    1024: {
      items: 3
    },
    1200: {
      items: 4
    }
  }
});

$('.cartItemsSlider').owlCarousel({
  items: 1,
  dots: false,
  nav: true,
  navText: ['<', '>'],
  margin: 50,
  loop: true
});

if ($(window).width() >= 992) {
  $('.suggestion').height($('.suggestion').height());
}

// new ResizeSensor(jQuery('.product-small'), function(){
//     console.log('content dimension changed');
//     console.log($(this))
// });
