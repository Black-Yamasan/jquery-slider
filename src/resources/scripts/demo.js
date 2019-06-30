$(function() {
  var slideOptions = {
    speed: 650,
    easing: 'easeOutQuad',
    pager: true,
    arrow: true,
    autoPlay: false,
    $slideMain: '#js-slideMain',
    $slideGroup: '.js-slideGroup',
    $slideChild: '.js-slideChild',
    $slideContent: '#js-slideContent'
  };

  var $slide = $('#js-slide');
  $slide.slider(slideOptions);
});