$(function() {

  $('#gallery').unitegallery({
    gallery_theme: "tiles",
    tile_enable_textpanel: true,
    tile_textpanel_title_text_align: "center",
    tile_textpanel_always_on: true,
    tiles_space_between_cols: 0,
    tiles_space_between_cols_mobile: 0,
    tile_textpanel_position: "inside_center",
  });

  // 24 HRS Timer
  setInterval(function time() {
    var d = new Date();
    var hours = 24 - d.getHours();
    if ((hours + '').length == 1) {
      hours = '0' + hours;
    }
    var min = 60 - d.getMinutes();
    if ((min + '').length == 1) {
      min = '0' + min;
    }
    var sec = 60 - d.getSeconds();
    if ((sec + '').length == 1) {
      sec = '0' + sec;
    }

    $('.jsTimerHours').html(hours);
    $('.jsTimerMinutes').html(min);
    $('.jsTimerSeconds').html(sec);

  }, 1000);

  $('.open-popup-link').magnificPopup({
    type:'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });

});
