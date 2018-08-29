$('.suggestionSlider').owlCarousel({
  items: 4,
  dots: false,
  nav: true,
  navContainer: '.productNav',
  navText: ['<', '>']
});

$('.cartItemsSlider').owlCarousel({
  items: 1,
  dots: false,
  nav: true,
  navText: ['<', '>'],
  margin: 50,
  loop: true
});
