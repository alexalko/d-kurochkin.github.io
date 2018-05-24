$(document).ready(function () {
  if ($(window).width() > 1025) {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
        $('header').addClass('header_fixed');
      } else {
        $('header').removeClass('header_fixed');
      }
    });
  }

  // Launching humburger

  $('.humburger').click(function () {
    $('.hum').toggleClass('open');
    $('header').toggleClass('open');
  });

  // Slider properties

  $(".slider").owlCarousel({
    navigation: true,
    //    autoplay: true,
    items: 1,
    loop: true,
    navText: [, ]
  });

  // Project slider properties

  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    dots: false,
    autoplay: true,
    responsiveClass: true,
    navText: [, ],
    mergeFit: false,
    responsive: {
      0: {
        items: 1
      },
      450: {
        items: 2
      },
      700: {
        items: 3
      },
      1200: {
        items: 4
      },
      1400: {
        items: 4
      },
      1600: {
        items: 5
      },
      2000: {
        items: 6
      },
      2400: {
        items: 7
      },
      2800: {
        items: 8
      }
    }
  });

  // Making egual height for blog notes

  function setEqualHeight(blog_note_content) {
    var tallestcolumn = 0;
    blog_note_content.each(
      function () {
        currentHeight = $(this).height();
        if (currentHeight > tallestcolumn) {
          tallestcolumn = currentHeight;
        }
      }
    );
    blog_note_content.height(tallestcolumn);
  }

  if ($(window).width() > 900) {
    setEqualHeight($(".blog_note_content"));
  } else if ($(window).width() > 600) {
    setEqualHeight($(".blog_notes > .jsBlN900"));
  }
});
