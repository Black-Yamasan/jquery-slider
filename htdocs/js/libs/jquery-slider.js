!function(B){B.fn.slider=function(i){var e=B.extend({},B.fn.slider.defaults,i),n=B(this),t=B(window),d=null,s=null,a=window.innerWidth,l=n.find(e.$slideMain),o=n.find(e.$slideContent),c=n.find(e.$slideGroup),r=n.find(e.$slideChild),h=r.length,u=l.width(),f=!1,v=!1,g=!1,p=e.index,w=e.speed,m=e.delay,X=e.easing,$=e.pager,x=e.arrow,y=e.autoPlay,C=e.spWidth;
// ページャーを生成
if(c.clone().insertBefore(c),c.clone().insertBefore(c),c.clone().insertBefore(c),$){for(var P=B('<ul class="slidePager"></ul>').insertAfter(l),j=0;j<h;j++)P.append('<li class="slidePager_child '+e.$slidePagerChild+'"></li>');var E=P.find("."+e.$slidePagerChild);E.eq(p).addClass("active")}
// 前後の矢印を生成
if(x){l.append('<div class="slideArrow arrow-prev" id="'+e.$slidePrev+'"></div>'),l.append('<div class="slideArrow arrow-next" id="'+e.$slideNext+'"></div>');var T=l.find("#"+e.$slidePrev),M=l.find("#"+e.$slideNext)}var W,b,k=!!window.matchMedia("(max-width: "+C+"px)").matches,H=T?T[0].clientWidth:0;
// 初期化
function N(){k=!!window.matchMedia("(max-width: "+C+"px)").matches,H=T?T[0].clientWidth:0,k?(u=a-2*H,l.width(u)):(l.css("width",""),u=l.width()),o.css({width:u*h*4,marginLeft:-u*h*2}),o.velocity({translateX:-p*u},{duration:0}),(r=o.find(e.$slideChild)).width(u),t.off("slide.slideResize")}
// アニメーション
function Y(){f=!0,y&&A(),o.velocity({translateX:-p*u},{duration:w,easing:X,complete:function(){h<=p&&(p=0,o.velocity({translateX:0},{duration:0})),p<-(h-1)&&(p=0,o.velocity({translateX:0},{duration:0})),function(i){if($){var e=E.eq(i);E.not(e).removeClass("active"),e.addClass("active")}}
// アニメーションを開始
(p),f=!1,y&&z()}})}function z(){s=setInterval(function(){p++,Y()},m)}
// アニメーションを停止
function A(){clearInterval(s)}
// 現在のタブかどうかを監視
void 0!==document.hidden?(// Opera 12.10 や Firefox 18 以降でサポート
W="hidden",b="visibilitychange"):void 0!==document.msHidden?(W="msHidden",b="msvisibilitychange"):void 0!==document.webkitHidden&&(W="webkitHidden",b="webkitvisibilitychange"),void 0===document.addEventListener||void 0===document[W]?console.error("not supported"):y&&document.addEventListener(b,
// 別タブに移っていればスライダーを停止する。戻ってきたら再生開始。
function(){document[W]?A():z()},!1),t.on("resize.slideResize",function(){a!==window.innerWidth&&(d&&clearTimeout(d),d=setTimeout(function(){a=window.innerWidth,N()},40))}),x&&(T.on("click",function(){f||(p--,Y())}),M.on("click",function(){f||(p++,Y())})),$&&E.on("click",function(){if(!f){var i=B(this);p=E.index(i),Y()}}),
// タッチデバイスでの操作
o.on("touchstart",function(i){if(y&&A(),f)return!1;this.touchX=i.originalEvent.changedTouches[0].pageX,this.touchY=i.originalEvent.changedTouches[0].pageY,this.slideX=B(this).position().left}).on("touchmove",function(i){if(f)return!1;var e=this.touchX-i.originalEvent.changedTouches[0].pageX,n=e/(this.touchY-i.originalEvent.changedTouches[0].pageY);n<0&&(n=-n),n>Math.tan(45*Math.PI/180)&&i.preventDefault(),this.slideX=this.slideX-e,e<0&&(g=!(v=!0)),0<e&&(g=!(v=!1)),this.accel=5*(i.originalEvent.changedTouches[0].pageX-this.touchX),this.touchX=i.originalEvent.changedTouches[0].pageX,B(this).velocity({translateX:this.slideX},{duration:0})}).on("touchend",function(){if(this.slideX+=this.accel,f)return!1;!0===v&&p--,!0===g&&p++,Y(),this.accel=0,y&&z()}),N(),y&&z()},B.fn.slider.defaults={speed:600,// スライドのスピード
delay:800,// アニメーションの間隔
easing:"ease",// イージング
pager:!0,// ページャーを使用するかどうか
arrow:!0,// 前・後ろの矢印を使用するかどうか
autoPlay:!1,// 自動再生をするかどうか
index:0,// 中央に表示するスライドの順番
$slideMain:"#js-slideMain",// スライダーとページャー・矢印を囲う要素
$slideGroup:".js-slideGroup",// スライダーのリストを囲う要素
$slideChild:".js-slideChild",// スライダーのリスト一つ分の要素
$slideContent:"#js-slideContent",// アニメーションの対象になる要素
$slidePrev:"js-slidePrev",// スライダーを前に送る左側の矢印のID名
$slideNext:"js-slideNext",// スライダーを後ろに送る右側の矢印のID名
$slidePagerChild:"js-slidePager_child",// ページャーのクラス名
spWidth:768}}(jQuery);