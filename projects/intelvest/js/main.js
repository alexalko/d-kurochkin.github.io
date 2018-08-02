$(document).ready(function() {

  $('select').niceSelect()

  //masks
  $('input[name=name]').on('keyup keypress', function(e) {
    if (e.keyCode == 8 || e.keyCode == 46) {} else {
      var letters = ' zxcvbnmasdfghjklqwertyuiopQWERTYUIOPLKJHGFDSAZXCVBNMйцукенгшщзхъфывапролджэячсмитьбюЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ';
      return (letters.indexOf(String.fromCharCode(e.which)) != -1);
    }
  });
  // $("input[name=phone]").mask("+7 (999) 999-9999");
  // $('.calculator__screen-4 input[name="phone"]').unmask();

  $('input[name=phone]').inputmask({
    "mask": "9 (999) 999-9999",
    "removeMaskOnSubmit": true
  });
  //masks -- END


  //block15

  $('.block15__slider').owlCarousel({
    items: 1,
    mouseDrag: true,
    addClassActive: true,
    lazyLoad: true,
    nav: true,
    navText: ["<div class='block15-prev'><img src='img/left.png'/></div>", "<div class='block15-next'><img src='img/right.png'/></div>"],
  })

  //block15 end


  //block17

  if ($(window).width() < 1170) {

    $('.block17__flex').addClass('owl-carousel')

    $('.block17__flex').owlCarousel({
      items: 1,
      mouseDrag: true,
      addClassActive: true,
      lazyLoad: true,
      nav: true,
      navText: ["<div class='block17-prev'><img src='img/left.png'/></div>", "<div class='block17-next'><img src='img/right.png'/></div>"],
    })

  }

  //block17 end


  //popups

  $('.callback, .block11__button, .block11__button').click(function() {
    document.body.style.overflow = 'hidden';
    $('.layer').fadeIn(300)
    $('.callback-popup').fadeIn(500)
  })

  $('.callback-rev').click(function(e) {
    e.preventDefault();
    document.body.style.overflow = 'hidden';
    $('.layer-rev').fadeIn(300);
    $('.callback-popup-rev').fadeIn(500);
  })

  $('.block18__button').click(function() {
    document.body.style.overflow = 'hidden';
    $('.layer').fadeIn(300)
    $('.how-popup').fadeIn(500)
  })

  //popup mouseleave

  var active = true
  var a = false

  setTimeout(function() {
    a = true
  }, 40000)

  // $(document).mouseleave(function() {
  //
  // 	if (active && a) {
  //
  // 		active = false
  // 		setTimeout(function(){
  // 			active = true
  // 		}, 10000)
  // 		$('.layer').fadeIn(100)
  // 		$('.away-popup').fadeIn(150)
  // 		document.body.style.overflow = 'hidden';
  //
  // 	}
  // })

  //end

  $('.layer').click(function(e) {
    if ($(this).has(e.target).length === 0) {
      document.body.style.overflow = 'auto';
      $('.layer').fadeOut(300)
      $('.popup').fadeOut(300)
    }
  })

  $('.layer-rev').click(function(e) {
    if ($(this).has(e.target).length === 0) {
      document.body.style.overflow = 'auto';
      $('.layer-rev').fadeOut(300)
      $('.popup').fadeOut(300)
    }
  })

  $('.close').click(function() {
    document.body.style.overflow = 'auto';
    $('.layer').fadeOut(300)
    $('.layer-rev').fadeOut(300)
    $('.popup').fadeOut(300)
  })


  //popups


  $(".form").submit(function() {
    var a = $(this);
    $.ajax({
      type: "POST",
      url: "send.php",
      data: a.serialize()
    }).done(function() {
      // $('.layer').fadeIn(500)
      // $('.popup').fadeOut(300)
      // $('.thank').fadeIn(300)
      document.location = 'order.html';
    });
    return false;
  });


  $(".vid").YouTubePopUp();



  // Calculator

  function calculator() {

    var calculatorMode; // 0 - по выручке, 1 - по операциям
    var taxMode = '';

    var calculatorMoney = 10000;
    var calculatorEmployees = 1;
    var calculatorOperations = 10;

    var calculatorSum = 1;

    var sale = 10;
    const saleText = $('.jsCalculatorScreen2Sale');

    var clicked1 = false; // var of first input click
    var clicked2 = false; // var of second input click

    // Screen 2
    const screen2MoneyInp = $('.jsScreen2 .calculator__screen-2__money');
    const screen2MoneyText = $('.jsScreen2 input.jsCalculatorScreen2Sum');
    const screen2EmplInp = $('.jsScreen2 .calculator__screen-2__employee');
    const screen2EmplText = $('.jsScreen2 input.jsCalculatorScreen2Empls');
    const screen2Progress = $('.jsScreen2 .calculator__screen-2 progress');

    // Screen 2 alt
    const screen2MoneyInpAlt = $('.jsScreen2_alt .calculator__screen-2__money');
    const screen2MoneyTextAlt = $('.jsScreen2_alt input.jsCalculatorScreen2Sum');
    const screen2EmplInpAlt = $('.jsScreen2_alt .calculator__screen-2__employee');
    const screen2EmplTextAlt = $('.jsScreen2_alt input.jsCalculatorScreen2Empls');
    const screen2ProgressAlt = $('.jsScreen2_alt .calculator__screen-2 progress');

    // Images containers
    const screen2DocImgs = $('.calculator__screen-2__docs-imgs');
    const screen2MoneyImgs = $('.calculator__screen-2__money-imgs');
    const screen2EmpImgs = $('.calculator__screen-2__employee-imgs');

    // Adding blink animation to element
    function screen2NextBlink() {
      $('.jsScreen2Next').css('animation', 'blink 5s infinite 0s linear');
    }

    // Setting min and max for inputs
    function inputMinMax(elem) {
      var max = parseInt(elem.attr('max'));
      var min = parseInt(elem.attr('min'));
      if (elem.val() > max) {
        elem.val(max);
      } else if (elem.val() < min) {
        elem.val(min);
      }
    }

    function fullScreen() {
      $('.calculator').css({
        'position': 'fixed',
        'top': 0,
        'left': 0,
        'width': '100%',
        'height': '100%',
        'z-index': '100'
      });

      $('.calculator_close').css('display', 'block');
    }

    $('.calculator_close').click(function() {
      if ($(window).width() >= 1170) {
        $('.calculator').css({
          'position': 'relative',
          'top': 'auto',
          'left': 'auto',
          'width': '100%',
          'height': '760px',
          'z-index': '1'
        });
      } else {
        $('.calculator').css({
          'position': 'relative',
          'top': 'auto',
          'left': 'auto',
          'width': '100%',
          'z-index': '1'
        });
      }
      $('.calculator_close').css('display', 'none');
    });

    $(".jsMoney").click(function() {
      fullScreen();
      calculatorMode = 0;

      setTimeout(function() {
        $('.calculator__screen-1').fadeOut();
      }, 400);

      setTimeout(function() {
        $('.jsScreen2').fadeIn();

        $('.calculator').css('background-image', 'url(../img/calculator/screen-2/people.png)');
      }, 800);

    });

    $(".jsOperations").click(function() {
      fullScreen()
      calculatorMode = 1;

      setTimeout(function() {
        $('.calculator__screen-1').fadeOut();
      }, 400);

      setTimeout(function() {
        $('.jsScreen2_alt').fadeIn();

        $('.calculator').css('background-image', 'url(../img/calculator/screen-2/people.png)');
      }, 800);

    });

    function animateSale(elem) {
      elem.css({
        color: 'red',
        fontWeight: 'bold'
      });

      setTimeout(function() {
        elem.css({
          color: '#000',
          fontWeight: 'bold'
        });
      }, 1500);
    }


    screen2MoneyInp.click(function() {
      $(this).css('animation', 'none');

      if (clicked1 == false && sale == 20) {
        sale = 30;
        clicked1 = true;
        animateSale($('.jsCalculatorScreen2Sale'));
      }
      if (clicked1 == false && sale == 10) {
        sale = 20;
        clicked1 = true;
        animateSale($('.jsCalculatorScreen2Sale'));
      }
      saleText.html(sale);
      screen2Progress.val(sale);
      if (clicked1 && clicked2) {
        screen2NextBlink();
      }
    });

    screen2EmplInp.click(function() {
      $(this).css('animation', 'none');
      if (clicked2 == false && sale == 20) {
        sale = 30;
        clicked2 = true;
        animateSale($('.jsCalculatorScreen2Sale'));
      }
      if (clicked2 == false && sale == 10) {
        sale = 20;
        clicked2 = true;
        animateSale($('.jsCalculatorScreen2Sale'));
      }
      saleText.html(sale);
      screen2Progress.val(sale);
      if (clicked1 && clicked2) {
        screen2NextBlink();
      }
    });

    screen2MoneyInp.on('input', function() {
      screen2MoneyText.val(screen2MoneyInp.val());
      calculatorMoney = screen2MoneyInp.val();
    });

    screen2MoneyText.on('input', function() {
      screen2MoneyInp.val(screen2MoneyText.val());
      calculatorMoney = screen2MoneyText.val();
      $(screen2MoneyInp).css('animation', 'none');
      inputMinMax(screen2MoneyText);
    });

    screen2MoneyInp.change(function() {

      const screen2DocImg = '<img src="img/calculator/screen-2/doc.svg" alt="">';
      const screen2MoneyImg = '<img src="img/calculator/screen-2/rub.svg" alt="">';

      if ($(this).val() < 800000) {
        screen2DocImgs.html('');
        screen2MoneyImgs.html('');
      }
      if ($(this).val() >= 800000) {
        screen2DocImgs.html(screen2DocImg);
        screen2MoneyImgs.html(screen2MoneyImg);
      }
      if ($(this).val() >= 1000000) {
        screen2DocImgs.html(screen2DocImg.repeat(2));
        screen2MoneyImgs.html(screen2MoneyImg.repeat(2));
      }
      if ($(this).val() >= 1200000) {
        screen2DocImgs.html(screen2DocImg.repeat(3));
        screen2MoneyImgs.html(screen2MoneyImg.repeat(3));
      }
      if ($(this).val() >= 1400000) {
        screen2DocImgs.html(screen2DocImg.repeat(4));
        screen2MoneyImgs.html(screen2MoneyImg.repeat(4));
      }
      if ($(this).val() >= 1700000) {
        screen2DocImgs.html(screen2DocImg.repeat(5));
        screen2MoneyImgs.html(screen2MoneyImg.repeat(5));
      }
      if ($(this).val() >= 2100000) {
        screen2DocImgs.html(screen2DocImg.repeat(6));
        screen2MoneyImgs.html(screen2MoneyImg.repeat(6));
      }
      if ($(this).val() >= 2500000) {
        screen2DocImgs.html(screen2DocImg.repeat(8));
        screen2MoneyImgs.html(screen2MoneyImg.repeat(8));
      }
      if ($(this).val() >= 2900000) {
        screen2DocImgs.html(screen2DocImg.repeat(10));
        screen2MoneyImgs.html(screen2MoneyImg.repeat(10));
      }
      if ($(this).val() >= 3600000) {
        screen2DocImgs.html(screen2DocImg.repeat(12));
        screen2MoneyImgs.html(screen2MoneyImg.repeat(12));
      }
      if ($(this).val() >= 4200000) {
        screen2DocImgs.html(screen2DocImg.repeat(14));
        screen2MoneyImgs.html(screen2MoneyImg.repeat(14));
      }

    });

    screen2EmplInp.on('input', function() {
      screen2EmplText.val(screen2EmplInp.val());
      calculatorEmployees = screen2EmplInp.val();
    });

    screen2EmplText.on('input', function() {
      screen2EmplInp.val(screen2EmplText.val());
      calculatorEmployees = screen2EmplText.val();
      $(screen2EmplInp).css('animation', 'none');
      inputMinMax(screen2EmplText);
    });

    screen2EmplInp.change(function() {

      var screen2PersonImg = '<img src="img/calculator/screen-2/avatar.svg" alt="">';

      if ($(this).val() < 30) {
        $(screen2EmpImgs).html('');
      }
      if ($(this).val() >= 30) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(1));
      }
      if ($(this).val() >= 45) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(2));
      }
      if ($(this).val() >= 60) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(3));
      }
      if ($(this).val() >= 75) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(4));
      }
      if ($(this).val() >= 90) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(5));
      }
      if ($(this).val() >= 105) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(6));
      }
      if ($(this).val() >= 120) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(7));
      }
      if ($(this).val() >= 135) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(8));
      }
      if ($(this).val() >= 150) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(9));
      }
      if ($(this).val() >= 165) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(10));
      }
      if ($(this).val() >= 180) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(11));
      }
      if ($(this).val() >= 195) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(12));
      }

    });


    screen2MoneyInpAlt.click(function() {
      $(this).css('animation', 'none');
      if (clicked1 == false && sale == 20) {
        sale = 30;
        clicked1 = true;
        animateSale($('.jsCalculatorScreen2Sale'));
      }
      if (clicked1 == false && sale == 10) {
        sale = 20;
        clicked1 = true;
        animateSale($('.jsCalculatorScreen2Sale'));
      }
      saleText.html(sale);
      screen2Progress.val(sale);
      if (clicked1 && clicked2) {
        screen2NextBlink();
      }
    });

    screen2EmplInpAlt.click(function() {
      $(this).css('animation', 'none');
      if (clicked2 == false && sale == 20) {
        sale = 30;
        clicked2 = true;
        animateSale($('.jsCalculatorScreen2Sale'));
      }
      if (clicked2 == false && sale == 10) {
        sale = 20;
        clicked2 = true;
        animateSale($('.jsCalculatorScreen2Sale'));
      }
      saleText.html(sale);
      screen2Progress.val(sale);
      if (clicked1 && clicked2) {
        screen2NextBlink();
      }
    });

    screen2MoneyInpAlt.on('input', function() {
      screen2MoneyTextAlt.val(screen2MoneyInpAlt.val());
      calculatorOperations = screen2MoneyInpAlt.val();
    });

    screen2MoneyTextAlt.on('input', function() {
      screen2MoneyInpAlt.val(screen2MoneyTextAlt.val());
      calculatorOperations = screen2MoneyTextAlt.val();
      $(screen2MoneyInpAlt).css('animation', 'none');
      inputMinMax(screen2MoneyTextAlt);
    });

    screen2MoneyInpAlt.change(function() {

      const screen2DocImg = '<img src="img/calculator/screen-2/doc.svg" alt="">';

      if ($(this).val() < 100) {
        screen2DocImgs.html('');
      }
      if ($(this).val() >= 100) {
        screen2DocImgs.html(screen2DocImg);
      }
      if ($(this).val() >= 150) {
        screen2DocImgs.html(screen2DocImg.repeat(2));
      }
      if ($(this).val() >= 200) {
        screen2DocImgs.html(screen2DocImg.repeat(3));
      }
      if ($(this).val() >= 250) {
        screen2DocImgs.html(screen2DocImg.repeat(4));
      }
      if ($(this).val() >= 300) {
        screen2DocImgs.html(screen2DocImg.repeat(5));
      }
      if ($(this).val() >= 350) {
        screen2DocImgs.html(screen2DocImg.repeat(6));
      }
      if ($(this).val() >= 400) {
        screen2DocImgs.html(screen2DocImg.repeat(7));
      }
      if ($(this).val() >= 450) {
        screen2DocImgs.html(screen2DocImg.repeat(8));
      }
      if ($(this).val() >= 500) {
        screen2DocImgs.html(screen2DocImg.repeat(10));
      }
      if ($(this).val() >= 550) {
        screen2DocImgs.html(screen2DocImg.repeat(12));
      }
      if ($(this).val() >= 600) {
        screen2DocImgs.html(screen2DocImg.repeat(13));
      }
      if ($(this).val() >= 650) {
        screen2DocImgs.html(screen2DocImg.repeat(14));
      }

    });

    screen2EmplInpAlt.on('input', function() {
      screen2EmplTextAlt.val(screen2EmplInpAlt.val());
      calculatorEmployees = screen2EmplInpAlt.val();
    });

    screen2EmplTextAlt.on('input', function() {
      screen2EmplInpAlt.val(screen2EmplTextAlt.val());
      calculatorEmployees = screen2EmplTextAlt.val();

      $(screen2EmplInpAlt).css('animation', 'none');
      inputMinMax(screen2EmplTextAlt);
    });

    screen2EmplInpAlt.change(function() {

      var screen2PersonImg = '<img src="img/calculator/screen-2/avatar.svg" alt="">';

      if ($(this).val() < 30) {
        $(screen2EmpImgs).html('');
      }
      if ($(this).val() >= 30) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(1));
      }
      if ($(this).val() >= 45) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(2));
      }
      if ($(this).val() >= 60) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(3));
      }
      if ($(this).val() >= 75) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(4));
      }
      if ($(this).val() >= 90) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(5));
      }
      if ($(this).val() >= 105) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(6));
      }
      if ($(this).val() >= 120) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(7));
      }
      if ($(this).val() >= 135) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(8));
      }
      if ($(this).val() >= 150) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(9));
      }
      if ($(this).val() >= 165) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(10));
      }
      if ($(this).val() >= 180) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(11));
      }
      if ($(this).val() >= 195) {
        $(screen2EmpImgs).html(screen2PersonImg.repeat(12));
      }

    });


    $('.jsScreen2Next').click(function() {

      setTimeout(function() {
        $('.calculator__screen-2').fadeOut();
      }, 400);

      setTimeout(function() {
        $('.calculator').css({
          'background-image': 'url(../img/calculator/screen-3/doc-bg.png)',
          'background-position': 'center'
        });
      }, 500);

      setTimeout(function() {
        $('.calculator__screen-3').fadeIn();

        sale = 40;
        saleText.html(sale);
        screen2Progress.val(sale);
        animateSale($('.jsCalculatorScreen2Sale'));

      }, 800);

    });

    function screen3ChoiceClick() {

      setTimeout(function() {
        $('.calculator__screen-3').fadeOut();
      }, 400);
      setTimeout(function() {
        $('.calculator').css({
          'background-image': 'url(../img/calculator/screen-4/bg.png)',
          'background-position': 'bottom right'
        });
      }, 500);
      setTimeout(function() {
        $('.calculator__screen-4').fadeIn();
      }, 800);
      setTimeout(function() {
        animateSale($('.jsScreen4TextSale'));
      }, 900);

      if (calculatorMode == 0) {
        $('.jsScreen4Mode').html('ПО ВЫРУЧКЕ');
        $('.jsScreen5Mode').html('ПО ОПЕРАЦИЯМ?');
        $('.jsScreen5Text').html('Примерное количество операций в месяц<img src="img/calculator/screen-5/help.png" alt="" title="Ежемесячное кол-во счетов, которые оплачиваете вы + счета, которые оплачивают вам">');
        $('.jsScreen5RangeOperations').css('display', 'block');
        $('.jsScreen5RangeOperationsText').css('display', 'block');
      } else if (calculatorMode == 1) {
        $('.jsScreen4Mode').html('ПО ОПЕРАЦИЯМ');
        $('.jsScreen5Mode').html('ПО ВЫРУЧКЕ?');
        $('.jsScreen5Text').html('Примерная сумма выручки в месяц');
        $('.jsScreen5RangeMoney').css('display', 'block');
        $('.jsScreen5RangeMoneyText').css('display', 'block');
      }

      // console.log('Выручка:' + calculatorMoney + ' \nОперации:' + calculatorOperations + ' \nСотрудники: ' + calculatorEmployees + ' \nТип налога' + taxMode + ' \nРежим калькулятора:' + calculatorMode);
    }

    function calculatorCalcSum() {
      if (calculatorMode == 0) {

        if (calculatorMoney < 200000)
          calculatorSum = (3900 + (500 * calculatorEmployees)) * taxMode;

        if (calculatorMoney >= 200000 && calculatorMoney < 500000)
          calculatorSum = (6800 + (500 * calculatorEmployees)) * taxMode;

        if (calculatorMoney >= 500000 && calculatorMoney < 800000)
          calculatorSum = (9900 + (500 * calculatorEmployees)) * taxMode;

        if (calculatorMoney >= 800000 && calculatorMoney < 1300000)
          calculatorSum = (12900 + (500 * calculatorEmployees)) * taxMode;

        if (calculatorMoney >= 1300000 && calculatorMoney < 2000000)
          calculatorSum = (14600 + (500 * calculatorEmployees)) * taxMode;

        if (calculatorMoney >= 2000000 && calculatorMoney < 3000000)
          calculatorSum = (18600 + (500 * calculatorEmployees)) * taxMode;

        if (calculatorMoney >= 3000000 && calculatorMoney < 5000000)
          calculatorSum = (23400 + (500 * calculatorEmployees)) * taxMode;

      }
      if (calculatorMode == 1) {

        if (calculatorOperations >= 10 && calculatorOperations < 30)
          calculatorSum = (3600 + (500 * calculatorEmployees)) * taxMode;

        if (calculatorOperations >= 30 && calculatorOperations < 50)
          calculatorSum = (9000 + (500 * calculatorEmployees)) * taxMode;

        if (calculatorOperations >= 50 && calculatorOperations < 100)
          calculatorSum = (11500 + (500 * calculatorEmployees)) * taxMode;

        if (calculatorOperations >= 100 && calculatorOperations < 150)
          calculatorSum = (15500 + (500 * calculatorEmployees)) * taxMode;

        if (calculatorOperations >= 150 && calculatorOperations < 200)
          calculatorSum = (18000 + (500 * calculatorEmployees)) * taxMode;

        if (calculatorOperations >= 200 && calculatorOperations < 250)
          calculatorSum = (21000 + (500 * calculatorEmployees)) * taxMode;

        if (calculatorOperations >= 250 && calculatorOperations < 300)
          calculatorSum = (24000 + (500 * calculatorEmployees)) * taxMode;

        if (calculatorOperations >= 300 && calculatorOperations < 350)
          calculatorSum = (27600 + (500 * calculatorEmployees)) * taxMode;

        if (calculatorOperations >= 350)
          calculatorSum = (31200 + (500 * calculatorEmployees)) * taxMode;

      }

      console.log(calculatorSum);
      $('.jsScreen4Price').html(
        String(calculatorSum).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
      );
      $('.jsScreen4Sale').html(
        String(Math.floor(calculatorSum * 0.17)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
      );

      $('input[name="calc_mode"]').val(function() {
        if (calculatorMode == 0) return 'По выручке';
        else if (calculatorMode == 1) return 'По операциям';
      });

      $('input[name="calc_money"]').val(function() {
        if (calculatorMode == 0) return calculatorMoney;
        else if (calculatorMode == 1) return '';
      });

      $('input[name="calc_operations"]').val(function() {
        if (calculatorMode == 0) return '';
        else if (calculatorMode == 1) return calculatorOperations;
      });

      $('input[name="calc_employees"]').val(calculatorEmployees);

      $('input[name="calc_tax-mode"]').val(function() {
        if (taxMode == 1) return 'УСН 6%';
        else if (taxMode == 1.3 || taxMode == 1.25) return 'УСН 15%';
        else if (taxMode == 1.7 || taxMode == 1.5) return 'ОСНО';
      });

      $('input[name="calc_price-full"]').val(
        String(calculatorSum).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
      );

      $('input[name="calc_price"]').val(
        String(Math.floor(calculatorSum * 0.17)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
      );

    }

    function screen3Choice() {

      $('.jsTax6').click(function() {
        taxMode = 1;
        screen3ChoiceClick();
        calculatorCalcSum();
      });

      $('.jsTax15').click(function() {
        if (calculatorMode == 0)
          taxMode = 1.3;
        if (calculatorMode == 1)
          taxMode = 1.25;
        screen3ChoiceClick();
        calculatorCalcSum();
      });

      $('.jsTaxNDS').click(function() {
        if (calculatorMode == 0)
          taxMode = 1.7;
        if (calculatorMode == 1)
          taxMode = 1.5;
        screen3ChoiceClick();
        calculatorCalcSum();
      });

    }

    screen3Choice();

    $('.jsScreen5RangeMoney').change(function() {
      $('.jsScreen5RangeMoneyText').val($('.jsScreen5RangeMoney').val());
    });

    $('.jsScreen5RangeOperations').change(function() {
      $('.jsScreen5RangeOperationsText').val($('.jsScreen5RangeOperations').val());
    });

    $('.jsScreen5RangeMoneyText').on('input', function() {
      $('.jsScreen5RangeMoney').val($('.jsScreen5RangeMoneyText').val());
      inputMinMax($('.jsScreen5RangeMoneyText'));
    });

    $('.jsScreen5RangeOperationsText').on('input', function() {
      $('.jsScreen5RangeOperations').val($('.jsScreen5RangeOperationsText').val());
      inputMinMax($('.jsScreen5RangeOperationsText'));
    });

    $('.calculator__btn-decline').click(function(e) {
      e.preventDefault();
      $('.calculator').css('background-image', 'none');
      $('.calculator__screen-4').fadeOut();

      $('.calculator__screen-5').fadeIn();

    });

    $('.calculator__form').submit(function() {
      $.ajax({
        type: "POST",
        url: "calculator-send.php",
        data: $(this).serialize()
      }).done(function() {
        document.location = 'thank-you.html?id=' + $('.calculator__phone-input').val();
      });
      return false;
    });

    $('.calculator__form-alt').submit(function() {
      $.ajax({
        type: "POST",
        url: "calculator-send.php",
        data: $(this).serialize()
      }).done(function() {
        document.location = 'thank-you-alt.html?id=' + $('input[name="calc_mail"]').val();
      });
      return false;
    });



  };

  calculator();




});
