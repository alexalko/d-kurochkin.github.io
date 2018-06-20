$(function () {
  $('.jsTel').inputmask({
    "mask": "8(999)9999-99-99",
    "removeMaskOnSubmit": true
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

  $(document).on('click', '.trigger', function (event) {
    event.preventDefault();
    $('#modal').iziModal({
      overlayColor: 'rgba(0,0,0, 0.5)'
    });
    $('#modal').iziModal('open');
  });

});
