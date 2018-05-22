$(document).ready(function () {

  if ($(window).width() > 769) {
    $(function () {
      $('.js-about-me_box').matchHeight();
    });
  }

  var headerHeight, menuHeight;

  headerHeight = $("#js-header-wrapper").height();
  menuHeight = $("menu").height();

  $(document).on("scroll", function () {

    docScroll = $(this).scrollTop();

    if (docScroll > headerHeight && $(window).width() > 750) {
      $("menu").addClass("fixed");
      $("#js-header-wrapper").css("paddingBottom", menuHeight);
    } else if ($(window).width() > 750) {
      $("menu").removeClass("fixed");
      $("#js-header-wrapper").css("paddingBottom", "0");
    }

  });

  $('.humburger').click(function () {
    $('#menu').toggleClass('menu-active');
    $('.humburger').toggleClass('hum-active');
  });
  if ($(window).width() <= 750) {
    $('.anchorLink').click(function () {
      $('#menu').removeClass('menu-active');
      $('.humburger').removeClass('hum-active');
    })
  }


  $("a.anchorLink").click(function () {
    $("html, body").animate({
      scrollTop: $($(this).attr("href")).offset().top + "px"
    }, {
      duration: 500,
      easing: "swing"
    });
    return false;
  });

});
