;(function($) {
  $.fn.slider = function(options) {
    var sliderOptions = $.extend( {}, $.fn.slider.defaults, options );
    var $el = $(this);
    var $win = $(window);
    var timer = null;

    var winWidth = $win.width();
    var innerWidth = window.innerWidth;

    var $slideMain = $el.find(sliderOptions.$slideMain);
    var $slideContent = $el.find(sliderOptions.$slideContent);
    var $slideGroup = $el.find(sliderOptions.$slideGroup);
    var $slideChild = $el.find(sliderOptions.$slideChild);
    var $slidePrev = $el.find(sliderOptions.$slidePrev);
    var $slideNext = $el.find(sliderOptions.$slideNext);

    var slideLength = $slideChild.length;
    var slideWidth = $slideMain.width();
    var isSlide = false;

    // options
    var index = sliderOptions.index;
    var speed = sliderOptions.speed;
    var easing = sliderOptions.easing;
    var pager = sliderOptions.pager;
    var arrow = sliderOptions.arrow;
    var autoPlay = sliderOptions.autoPlay;
    var spWidth = sliderOptions.spWidth;

    var $beforeSlideGroup = $slideGroup.clone().insertBefore($slideGroup);
    var $afterSlideGroup = $slideGroup.clone().insertAfter($slideGroup);
    var $slidePagerChild = $el.find(sliderOptions.$slidePagerChild);

    var isSpWidth = window.matchMedia( '(max-width: ' + spWidth + 'px)' ).matches ? true : false;
    var arrowWidth = $slidePrev[0].clientWidth;

    $slidePagerChild.eq(index).addClass('active');

    function init() {
      isSpWidth = window.matchMedia( '(max-width: ' + spWidth + 'px)' ).matches ? true : false;
      if ( isSpWidth ) {
        slideWidth = innerWidth - arrowWidth * 2;
        $slideMain.width( slideWidth );
      } else {
        $slideMain.css('width', '');
        slideWidth = $slideMain.width();
      }
      $slideContent.css({
        width: slideWidth * slideLength * 3,
        marginLeft: -slideWidth * slideLength
      });
      $slideContent.velocity({ translateX: -index * slideWidth }, { duration: 0 } );
      $slideChild = $slideContent.find(sliderOptions.$slideChild);
      $slideChild.width( slideWidth );
    }

    function slideAnimation() {
      isSlide = true;
      $slideContent.velocity({
        translateX: -index * slideWidth
      }, {
        duration: speed,
        easing: easing,
        complete: function() {
          if ( index >= slideLength ) {
            index = 0;
            $slideContent.velocity({ translateX: 0 }, { duration: 0 });
          }
          if ( index < 0 ) {
            index = slideLength - 1;
            $slideContent.velocity({ translateX: -index * slideWidth }, { duration: 0 });
          }
          changePagerIndex(index);
          isSlide = false;
        }
      });
    }

    function changePagerIndex(i) {
      if ( pager ) {
        var $pagerIndex = $slidePagerChild.eq(i);
        $slidePagerChild.not($pagerIndex).removeClass('active');
        $pagerIndex.addClass('active'); 
      }
    }

    $win.on('resize', function() {
      if ( innerWidth === window.innerWidth ) { return; };
      if ( timer ) {
        clearTimeout(timer);
      }
      timer = setTimeout(function() {
        winWidth = $win.width();
        innerWidth = $win.innerWidth();
        slideWidth = $slideMain.width();
        init();
      }, 66);
    });

    $slidePrev.on('click', function() {
      if ( isSlide ) return;
      index--;
      slideAnimation();
    });

    $slideNext.on('click', function() {
      if ( isSlide ) return;
      index++;
      slideAnimation();
    });

    $slidePagerChild.on('click', function() {
      if ( isSlide ) return;
      var $self = $(this);
      index = $slidePagerChild.index($self);
      slideAnimation();
    });

    init();

  };

  $.fn.slider.defaults = {
    speed: 600,
    easing: 'ease',
    pager: true,
    arrow: true,
    autoPlay: false,
    index: 0,
    $slideMain: '#js-slideMain',
    $slideGroup: '.js-slideGroup',
    $slideChild: '.js-slideChild',
    $slideContent: '#js-slideContent',
    $slidePrev: '#js-slidePrev',
    $slideNext: '#js-slideNext',
    $slidePagerChild: '.js-slidePager_child',
    spWidth: 768
  };
})(jQuery);