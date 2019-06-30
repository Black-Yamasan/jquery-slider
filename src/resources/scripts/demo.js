$(function() {
  var slideOptions = {
    speed: 860,
    delay: 3400,
    easing: 'easeOutQuad',
    pager: true,
    arrow: true,
    autoPlay: true,
    $slideMain: '#js-slideMain',
    $slideGroup: '.js-slideGroup',
    $slideChild: '.js-slideChild',
    $slideContent: '#js-slideContent'
  };

  var $slide = $('#js-slide');
  $slide.slider(slideOptions);
});