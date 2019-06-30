;(function($) {
  $.fn.slider = function(options) {
    var sliderOptions = $.extend( {}, $.fn.slider.defaults, options );
    var $el = $(this);
    var $win = $(window);
    var resizeTimer = null;
    var slideTimer = null;

    var innerWidth = window.innerWidth;

    var $slideMain = $el.find(sliderOptions.$slideMain);
    var $slideContent = $el.find(sliderOptions.$slideContent);
    var $slideGroup = $el.find(sliderOptions.$slideGroup);
    var $slideChild = $el.find(sliderOptions.$slideChild);

    var slideLength = $slideChild.length;
    var slideWidth = $slideMain.width();
    var isSlide = false;
    var slideLeft = false;
    var slideRight = false;

    // options
    var index = sliderOptions.index; 
    var speed = sliderOptions.speed;
    var delay = sliderOptions.delay;
    var easing = sliderOptions.easing;
    var pager = sliderOptions.pager;
    var arrow = sliderOptions.arrow;
    var autoPlay = sliderOptions.autoPlay;
    var spWidth = sliderOptions.spWidth;
    
    $slideGroup.clone().insertBefore($slideGroup);
    $slideGroup.clone().insertBefore($slideGroup);
    $slideGroup.clone().insertBefore($slideGroup);

    // ページャーを生成
    if ( pager ) {
      var $slidePager = $('<ul class="slidePager"></ul>').insertAfter($slideMain);
      for ( var i = 0; i < slideLength; i++ ) {
        $slidePager.append('<li class="slidePager_child ' + sliderOptions.$slidePagerChild + '"></li>');
      }
      var $slidePagerChild = $slidePager.find('.' + sliderOptions.$slidePagerChild);
      $slidePagerChild.eq(index).addClass('active');
    }

    // 前後の矢印を生成
    if ( arrow ) {
      $slideMain.append('<div class="slideArrow arrow-prev" id="' + sliderOptions.$slidePrev + '"></div>');
      $slideMain.append('<div class="slideArrow arrow-next" id="' + sliderOptions.$slideNext + '"></div>');

      var $slidePrev = $slideMain.find('#' + sliderOptions.$slidePrev);
      var $slideNext = $slideMain.find('#' + sliderOptions.$slideNext);
    }

    var isSpWidth = window.matchMedia( '(max-width: ' + spWidth + 'px)' ).matches ? true : false;
    var arrowWidth = !!$slidePrev ? $slidePrev[0].clientWidth : 0;

    // 初期化
    function init() {
      isSpWidth = window.matchMedia( '(max-width: ' + spWidth + 'px)' ).matches ? true : false;
      arrowWidth = !!$slidePrev ? $slidePrev[0].clientWidth : 0;
      if ( isSpWidth ) {
        slideWidth = innerWidth - arrowWidth * 2;
        $slideMain.width( slideWidth );
      } else {
        $slideMain.css('width', '');
        slideWidth = $slideMain.width();
      }
      $slideContent.css({
        width: slideWidth * slideLength * 4,
        marginLeft: -slideWidth * slideLength * 2
      });
      $slideContent.velocity({ translateX: -index * slideWidth }, { duration: 0 } );
      $slideChild = $slideContent.find(sliderOptions.$slideChild);
      $slideChild.width( slideWidth );
      $win.off('slide.slideResize');
    }

    // アニメーション
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
          if ( index < -(slideLength - 1) ) {
            index = 0;
            $slideContent.velocity({ translateX: 0 }, { duration: 0 });
          }
          changePagerIndex(index);
          isSlide = false;
        }
      });
    }

    /**
     * アクティブにするページャーを変更する
     * @param { number } i スライドの番号 
     */
    function changePagerIndex(i) {
      if ( pager ) {
        var $pagerIndex = $slidePagerChild.eq(i);
        $slidePagerChild.not($pagerIndex).removeClass('active');
        $pagerIndex.addClass('active'); 
      }
    }

    // アニメーションを開始
    function startAnimation() {
      slideTimer = setInterval(function() {
        index++;
        slideAnimation();
      }, delay);
    }

    // アニメーションを停止
    function stopAnimation() {
      clearInterval(slideTimer);
    }

    // 現在のタブかどうかを監視
    var hidden, visibilityChange;
    if ( typeof document.hidden !== 'undefined' ) { // Opera 12.10 や Firefox 18 以降でサポート
      hidden = 'hidden';
      visibilityChange = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      hidden = 'msHidden';
      visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      hidden = 'webkitHidden';
      visibilityChange = 'webkitvisibilitychange';
    }

    // 別タブに移っていればスライダーを停止する。戻ってきたら再生開始。
    function handleVisibilityChange() {
      if ( document[hidden] ) {
        stopAnimation();
      } else {
        startAnimation();
      }
    }

    if (typeof document.addEventListener === 'undefined' || typeof document[hidden] === 'undefined') {
      console.error('not supported');
    } else {
      if ( autoPlay ) {
        document.addEventListener(visibilityChange, handleVisibilityChange, false);
      }
    }

    $win.on('resize.slideResize', function() {
      if ( innerWidth === window.innerWidth ) { return; };
      if ( resizeTimer ) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(function() {
        innerWidth = window.innerWidth;
        init();
      }, 40);
    });

    if ( arrow ) {
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
    }

    if ( pager ) {
      $slidePagerChild.on('click', function() {
        if ( isSlide ) return;
        var $self = $(this);
        index = $slidePagerChild.index($self);
        slideAnimation();
      });
    }

    // タッチデバイスでの操作
    $slideContent.on('touchstart', function(e) {
      if ( autoPlay ) {
        stopAnimation();
      }
      if ( isSlide ) return false;
      this.touchX = e.originalEvent.changedTouches[0].pageX;
      this.touchY = e.originalEvent.changedTouches[0].pageY;
      this.slideX = $(this).position().left;
    }).on('touchmove', function(e) {
      if ( isSlide ) return false;
      var moveX = this.touchX - e.originalEvent.changedTouches[0].pageX;
      var moveY = this.touchY - e.originalEvent.changedTouches[0].pageY;
      var moveRate = moveX / moveY;

      if ( moveRate < 0 ) {
        moveRate = -moveRate;
      }

      if ( moveRate > Math.tan(45 * Math.PI / 180) ) {
        e.preventDefault();
      }

      this.slideX = this.slideX - moveX;

      if ( moveX < 0 ) {
        slideLeft = true;
        slideRight = false;
      }
      if ( moveX > 0 ) {
        slideLeft = false;
        slideRight = true;
      }
      this.accel = (e.originalEvent.changedTouches[0].pageX - this.touchX) * 5;
      this.touchX = e.originalEvent.changedTouches[0].pageX;
      $(this).velocity({ translateX: this.slideX }, { duration: 0 });

    }).on('touchend', function() {
      this.slideX += this.accel;
      if ( isSlide ) return false;
      if ( slideLeft === true ) {
        index--;
      }
      if ( slideRight === true ) {
        index++;
      }
      slideAnimation();
      this.accel = 0;
      if ( autoPlay ) {
       startAnimation(); 
      }
    });

    init();

    if ( autoPlay ) {
      startAnimation();
    }

  };

  $.fn.slider.defaults = {
    speed: 600, // スライドのスピード
    delay: 800, // アニメーションの間隔
    easing: 'ease', // イージング
    pager: true, // ページャーを使用するかどうか
    arrow: true, // 前・後ろの矢印を使用するかどうか
    autoPlay: false, // 自動再生をするかどうか
    index: 0, // 中央に表示するスライドの順番
    $slideMain: '#js-slideMain', // スライダーとページャー・矢印を囲う要素
    $slideGroup: '.js-slideGroup', // スライダーのリストを囲う要素
    $slideChild: '.js-slideChild', // スライダーのリスト一つ分の要素
    $slideContent: '#js-slideContent', // アニメーションの対象になる要素
    $slidePrev: 'js-slidePrev', // スライダーを前に送る左側の矢印のID名
    $slideNext: 'js-slideNext', // スライダーを後ろに送る右側の矢印のID名
    $slidePagerChild: 'js-slidePager_child', // ページャーのクラス名
    spWidth: 768　// メディアクエリで切り替える数値
  };
})(jQuery);