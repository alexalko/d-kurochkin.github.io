$(function () {

  // Setting Fullpage
  $('#fullpage').fullpage({
    lazyLoading: true,
    navigation: true,
    navigationPosition: 'right',
    fixedElements: '.header',
    responsiveWidth: 1200,
    onLeave: function (index, nextIndex) {

      if (index == 1) {
        setTimeout(function () {
          $('.header').addClass('header_mini');
        }, 50)
      } else if (nextIndex == 1) {
        setTimeout(function () {
          $('.header').removeClass('header_mini');
        }, 100)
      }
    }
  });


  // Setting Sliders
  $(".slick-text").slick({
    dots: true,
    arrows: false,
    infinite: true,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500
  });

  $(".slick-image").slick({
    dots: true,
    infinite: true,
    centerMode: false,
    slidesToShow: 2,
    slidesToScroll: 1
  });


  // Setting FAQ accordion

  var allPanels = $('.accordion > dd').hide();

  $('.accordion > dt > a').click(function () {
    $this = $(this);
    $target = $this.parent().next();

    if (!$target.hasClass('active')) {
      allPanels.removeClass('active').slideUp();
      $target.addClass('active').slideDown();
    }

    return false;
  });


  // Calculator

  function calculator() {

    const squareText = document.querySelector('.jsCalculatorSquareText');
    const squareVal = document.querySelector('.jsCalculatorSquareVal');

    const priceText = document.querySelector('.jsCalculatorPrice');
    const timeText = document.querySelector('.jsCalculatorTime');
    const saleText = document.querySelector('.jsCalculatorSale');

    var meterPrice = 1000;
    var saleAmount = 1;
    var mainPrice = 1;
    var days = 1;

    var inputs = document.querySelectorAll('.calculator_calculator_inputs');

    squareVal.addEventListener('input', function () {
      squareText.innerHTML = this.value;
    });

    inputs.forEach(input => {
      input.addEventListener('input', function () {

        if (document.querySelector('input[data-remont-choice="1"]').checked == true) {
          meterPrice = 1000;
          timeText.innerHTML = squareVal.value / 2;
        } else if (document.querySelector('input[data-remont-choice="2"]').checked == true) {
          meterPrice = 1200;
          timeText.innerHTML = Math.round(squareVal.value / 2) * 1.5;
        } else if (document.querySelector('input[data-remont-choice="3"]').checked == true) {
          meterPrice = 1400;
          timeText.innerHTML = Math.round(squareVal.value / 2) * 2;
        } else if (document.querySelector('input[data-remont-choice="4"]').checked == true) {
          meterPrice = 1600;
          timeText.innerHTML = Math.round(squareVal.value / 2) * 2.5;
        }

        if (Number(squareVal.value) >= 0 && Number(squareVal.value) < 301) {
          saleAmount = 0.95;
          saleText.innerHTML = 5;
        }

        mainPrice = meterPrice * squareVal.value * saleAmount;
        priceText.innerHTML = Math.floor(mainPrice);


      });
    });

  }
  
  calculator();




});
