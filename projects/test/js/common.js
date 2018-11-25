$(function() {

	$('.toggle').click(function(e) {
  	e.preventDefault();
  
    var $this = $(this);
  
    if ($this.next().hasClass('show')) {
        $this.next().removeClass('show');
				$this.next().slideUp(350);
        $this.removeClass('show');
				
    } else {
        $this.parent().parent().find('li .aside_catalogueInner').removeClass('show');
        $('li .aside_elemTitle').removeClass('show');
        $this.parent().parent().find('li .aside_catalogueInner').slideUp(350);
        $this.addClass('show');
        $this.next().toggleClass('show');
        $this.next().slideToggle(350);
    }
	});

	var btn = $('#toTop');

	$(window).scroll(function() {
		if ($(window).scrollTop() > 600) {
			btn.addClass('show');
		} else {
			btn.removeClass('show');
		}
	});

	btn.on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop:0}, '300');
	});

	$('.jsOpenHeaderPopup').click(function(e) {
		e.preventDefault();
		$('.callbackPopup').toggleClass('open');
	});

	$('.jsCloseHeaderPopup').click(function(e) {
		e.preventDefault();
		$('.callbackPopup').removeClass('open');
	});

	$('#callbackSecond').iziModal({
		width: 450
	});

	$('.icon-one').click(function() {
		$('.icon-one').toggleClass('active-one');
		$('.nav_list').toggleClass('active');
  });

});
