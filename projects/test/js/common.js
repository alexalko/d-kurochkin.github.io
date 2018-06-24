$(function () {

  $('.reviews_slider').owlCarousel({
    margin: 10,
    nav: true,
    items: 1,
    rewind: true,
    autoplay: true,
    navText: ['<img src="img/reviews/arrow-prev.svg">', '<img src="img/reviews/arrow-next.svg">']
  });

  function yaMaps() {
    ymaps.ready(function () {
      var myMap = new ymaps.Map('map', {
          center: [54.906837, 55.494254],
          zoom: 11
        }, {
          searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'База отдыха «Зеркальный карп»'
        }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: '../img/map/marker.png',
          // Размеры метки.
          iconImageSize: [90, 125],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-45, -140]
        });

      var position = myMap.getGlobalPixelCenter();
      myMap.behaviors.disable('scrollZoom');
      if (window.innerWidth >= 1200) myMap.setGlobalPixelCenter([position[0] + 400, position[1] - 50]);

      myMap.geoObjects
        .add(myPlacemark);
    });
  }

  function equalizeNewsElemsHeight() {
    function changeHeaderBg(elemNum) {
      $('.jsHeaderCircle' + elemNum).click(function () {
        $('header').css({
          'background-image': 'none',
          'background-color': 'white'
        });
        $('header').css('background-image', 'url(../img/header/bg-' + elemNum + '.jpg');
        $('.jsHeaderCircle').removeClass('active');
        $(this).addClass('active');
      });
    }

    changeHeaderBg(1);
    changeHeaderBg(2);
    changeHeaderBg(3);


    var slideIndex = 0;

    function changeHeaderBgAuto() {
      if (slideIndex == 3) slideIndex = 1;
      else slideIndex++;
      $('.jsHeaderCircle' + slideIndex).trigger('click');
    }

    setInterval(changeHeaderBgAuto, 7000);

    $('#nav-icon').click(function () {
      $(this).toggleClass('open');
      $('.header_nav').toggleClass('open');
    });
    
    $('.header_nav-ul > li').click(function () {
      if(window.innerWidth < 576) {
        $('nav').removeClass('open');
         $('#nav-icon').removeClass('open');
      }
    });

    if (window.innerWidth >= 998) {
      var maxHeight = 0;

      $(".news_elem_content-container").each(function () {
        if ($(this).height() > maxHeight) {
          maxHeight = $(this).height();
        }
      });

      $(".news_elem_content-container").height(maxHeight);
    }
  }

  function pricesAccordion() {
    (function ($) {
      var allPanels = $('.accordion > dd').hide();
      $('.accordion > dt').css('height', '60px');

      $('.accordion > dt > a, .accordion_toggle').click(function () {
        $this = $(this);
        $target = $this.parent().next();
        
        if ($(this).text() == '-') {
          allPanels.removeClass('active').slideUp();
          $('.accordion > dt').removeClass('shown');
          $('.accordion > dt > div').removeClass('shown');
          $('.accordion_toggle').html('+').css('top', '0');
          return;
        }

        if (!$target.hasClass('active')) {
          allPanels.removeClass('active').slideUp();
          $target.addClass('active').slideDown();
          $('.accordion > dt').removeClass('shown');
          $('.accordion > dt > div').removeClass('shown');
          if (window.innerWidth >= 768) {
            $('.accordion > dt > a').removeClass('width-100');
          }
          $('.accordion_toggle').html('+').css('top', '0');
          $this.parent().addClass('shown');
          $this.parent().children('div').addClass('shown');
          $this.parent().children('.accordion_toggle').html('-').css('top', '21px');
        }

        return false;
      });
    })(jQuery);
  }

  function submitFrom() {
    $('.jsTel').inputmask({
      "mask": "+7 (999) 999-99-99",
      "removeMaskOnSubmit": true
    });

    $.ajax({
      url: 'http://freegeoip.net/json/',
      type: 'get',
      dataType: 'json'
    }).done(function (data) {
      $('input[name="ip"]').val(data.ip);
    });

    // E-mail Ajax Send
    $("form").submit(function () {
      var th = $(this);
      $.ajax({
        type: "POST",
        url: "../mail.php", //Change
        data: th.serialize()
      }).done(function () {
        setTimeout(function () {
          // Done Functions
          alert("Заявка была успешно отправлена!");
          th.trigger("reset");
        }, 1000);
      });
      return false;
    });
  }



  yaMaps();
  equalizeNewsElemsHeight();
  pricesAccordion();
  submitFrom();

});
