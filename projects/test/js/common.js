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
          meterPrice = 3500;
          timeText.innerHTML = squareVal.value / 2;
        } else if (document.querySelector('input[data-remont-choice="2"]').checked == true) {
          meterPrice = 7000;

          if (squareVal.value >= 0 && squareVal.value < 40) days = 50;
          if (squareVal.value >= 40 && squareVal.value < 56) days = 55;
          if (squareVal.value >= 56 && squareVal.value < 61) days = 60;
          if (squareVal.value >= 61 && squareVal.value < 70) days = 65;
          if (squareVal.value >= 70 && squareVal.value < 75) days = 70;
          if (squareVal.value >= 75 && squareVal.value < 80) days = 75;
          if (squareVal.value >= 80 && squareVal.value < 90) days = 80;
          if (squareVal.value >= 90 && squareVal.value < 100) days = 85;
          if (squareVal.value >= 100 && squareVal.value < 111) days = 90;
          if (squareVal.value >= 111 && squareVal.value < 120) days = 95;
          if (squareVal.value >= 120 && squareVal.value < 131) days = 100;
          if (squareVal.value >= 131 && squareVal.value < 141) days = 105;
          if (squareVal.value >= 141 && squareVal.value < 150) days = 110;
          if (squareVal.value >= 150 && squareVal.value < 160) days = 115;
          if (squareVal.value >= 160 && squareVal.value < 171) days = 120;
          if (squareVal.value >= 171 && squareVal.value < 181) days = 125;
          if (squareVal.value >= 181 && squareVal.value < 191) days = 130;
          if (squareVal.value >= 191 && squareVal.value < 201) days = 135;
          if (squareVal.value >= 201 && squareVal.value < 211) days = 140;
          if (squareVal.value >= 211 && squareVal.value < 221) days = 145;
          if (squareVal.value >= 221 && squareVal.value < 230) days = 150;
          if (squareVal.value >= 230 && squareVal.value < 241) days = 155;
          if (squareVal.value >= 241 && squareVal.value < 251) days = 160;
          if (squareVal.value >= 251 && squareVal.value < 260) days = 165;
          if (squareVal.value >= 260 && squareVal.value < 270) days = 170;
          if (squareVal.value >= 270 && squareVal.value < 281) days = 175;
          if (squareVal.value >= 281 && squareVal.value < 290) days = 180;
          if (squareVal.value >= 290 && squareVal.value < 300) days = 185;

          timeText.innerHTML = days;
        } else if (document.querySelector('input[data-remont-choice="3"]').checked == true) {
          meterPrice = 10000;
          
          if (squareVal.value >= 0 && squareVal.value < 40) days = 60;
          if (squareVal.value >= 40 && squareVal.value < 56) days = 65;
          if (squareVal.value >= 56 && squareVal.value < 61) days = 70;
          if (squareVal.value >= 61 && squareVal.value < 70) days = 75;
          if (squareVal.value >= 70 && squareVal.value < 75) days = 80;
          if (squareVal.value >= 75 && squareVal.value < 80) days = 85;
          if (squareVal.value >= 80 && squareVal.value < 90) days = 90;
          if (squareVal.value >= 90 && squareVal.value < 100) days = 95;
          if (squareVal.value >= 100 && squareVal.value < 111) days = 100;
          if (squareVal.value >= 111 && squareVal.value < 120) days = 105;
          if (squareVal.value >= 120 && squareVal.value < 131) days = 110;
          if (squareVal.value >= 131 && squareVal.value < 141) days = 115;
          if (squareVal.value >= 141 && squareVal.value < 150) days = 120;
          if (squareVal.value >= 150 && squareVal.value < 160) days = 125;
          if (squareVal.value >= 160 && squareVal.value < 171) days = 130;
          if (squareVal.value >= 171 && squareVal.value < 181) days = 135;
          if (squareVal.value >= 181 && squareVal.value < 191) days = 140;
          if (squareVal.value >= 191 && squareVal.value < 201) days = 145;
          if (squareVal.value >= 201 && squareVal.value < 211) days = 150;
          if (squareVal.value >= 211 && squareVal.value < 221) days = 155;
          if (squareVal.value >= 221 && squareVal.value < 230) days = 160;
          if (squareVal.value >= 230 && squareVal.value < 241) days = 165;
          if (squareVal.value >= 241 && squareVal.value < 251) days = 170;
          if (squareVal.value >= 251 && squareVal.value < 260) days = 175;
          if (squareVal.value >= 260 && squareVal.value < 270) days = 180;
          if (squareVal.value >= 270 && squareVal.value < 281) days = 185;
          if (squareVal.value >= 281 && squareVal.value < 290) days = 190;
          if (squareVal.value >= 290 && squareVal.value < 300) days = 195;

          timeText.innerHTML = days;
        }

        if (Number(squareVal.value) >= 0 && Number(squareVal.value) < 301) {
          saleAmount = 0.95;
          saleText.innerHTML = 5;
        }

        mainPrice = meterPrice * squareVal.value * saleAmount;
        priceText.innerHTML = Math.floor(mainPrice);

        if (document.querySelector('input[data-remont-choice="4"]').checked == true) {
          timeText.innerHTML = '-';
          saleText.innerHTML = '-';
          priceText.innerHTML = '-';
        }

      });
    });

  }

  calculator();




});
