$(function() {

  // Accordeon
  $('.toggle').click(function(e) {
    e.preventDefault();

    var $this = $(this);

    if ($this.next().hasClass('show')) {
      $this.next().removeClass('show');
      $this.next().slideUp(350);
      $this.removeClass('active');
    } else {
      $this.parent().parent().find('li .inner').removeClass('show');
      $this.parent().parent().find('li .inner').slideUp(350);
      $this.next().toggleClass('show');
      $this.next().slideToggle(350);
      $this.toggleClass('active');
    }
  });

  // Mobile menu
	$('.nav-icon').click(function(){
		$('.nav-icon').toggleClass('open');
    $('.mobileMenu').toggleClass('open');
	});

});
