// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();
$(document).ready(function(){
  $('.slider').slick({
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true,
    arrows: false,
    speed: 500
  });
});
$('.joyride-btn').click(function(){
	$("#joyride-wrap").foundation('joyride', 'start');
});