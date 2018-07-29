$(function() {

  var sync1 = $("#slider-1");
  var sync2 = $("#slider-2");
  var slidesPerPage = 1;
  var syncedSecondary = true;

  sync1.owlCarousel({
    items: 1,
    nav: true,
    autoplay: false,
    dots: false,
    loop: true,
    navText: ['<div class="nav-div"><svg viewBox="0 0 11 20"><path style="fill:none;stroke-width: 3px;stroke: #fff;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg><p>Предыдущая</p></div>', '<div class="nav-div"><p>Следующая </p> <svg viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 3px;stroke: #fff;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg></div>']
  }).on('changed.owl.carousel', syncPosition);

  sync2.on('initialized.owl.carousel', function() {
    sync2.find(".owl-item").eq(0).addClass("current");
  }).owlCarousel({
    items: 1,
    dots: false,
    nav: false,
    mouseDrag: false,
    touchDrag: false,
    animateOut: 'fadeOut',
    smartSpeed: 200,
    slideSpeed: 500,
    slideBy: 1,
  }).on('changed.owl.carousel', syncPosition2);

  function syncPosition(el) {
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - (el.item.count / 2) - .5);

    if (current < 0) {
      current = count;
    }
    if (current > count) {
      current = 0;
    }

    sync2.find(".owl-item").removeClass("current").eq(current).addClass("current");
    var onscreen = sync2.find('.owl-item.active').length - 1;
    var start = sync2.find('.owl-item.active').first().index();
    var end = sync2.find('.owl-item.active').last().index();

    if (current > end) {
      sync2.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
      sync2.data('owl.carousel').to(current - onscreen, 100, true);
    }
  }

  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      sync1.data('owl.carousel').to(number, 100, true);
    }
  }

  sync2.on("click", ".owl-item", function(e) {
    e.preventDefault();
    var number = $(this).index();
    sync1.data('owl.carousel').to(number, 300, true);
  });

  $(window).scroll(function() {
    var offset = $('.social').offset(),
      offsetwb = $('.social + .footer').offset();
    if ($(this).scrollTop() > offset.top && $(this).scrollTop() < offsetwb.top) {
      $('.zamer').css({
        opacity: '0',
        pointerEvents: 'none'
      });
    } else {
      $('.zamer').css({
        opacity: '1',
        pointerEvents: 'all'
      });
    }
  });

});
