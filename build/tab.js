/*! tab 2014-05-08 */
function MulitpeTab(a,b){this.tab=a,this.tabs=this.tab.find("li"),this.silder=this.tab.find(".J_Slider"),this.tabIn=this.tab.find(".J_In"),this.maxWidth=0,this.widthSum=0,this.offsets=[],this.currentIndex=0,this.maxMarginLeft=0,this.eventName=["onChange"],this.eventHandle={},this.options={gap:0,time:0},b&&$.extend(this.options,b),this.init()}MulitpeTab.prototype={constructor:MulitpeTab,init:function(){for(var a=0;a<this.eventName.length;a++)this.eventHandle[this.eventName]=[];this.initMaxWidth(),this.initOffsets(),this.render(),this.regEvent()},initMaxWidth:function(){this.maxWidth=this.tabIn.width()},initOffsets:function(){var a=this.options.gap,b=a,c=this.tabs;this.offsets=[];for(var d=0;d<c.length;d++)c.eq(d).attr("data-tabnavindex",d),this.offsets.push({left:c[d].offsetLeft+a*(d+1),width:c[d].offsetWidth}),b+=c[d].offsetWidth;b+=a,this.widthSum=b,this.maxMarginLeft=b-this.maxWidth/2},render:function(){var a=this.options.gap;this.isHaveScroll()?(this.tabs.css("margin-left",a+"px"),this.tabs.eq(this.tabs.length-1).css("margin-right",a+"px")):(this.options.gap=0,this.tab.addClass("center"),this.initOffsets())},isHaveScroll:function(){return this.offsets.length*this.options.gap+this.widthSum>this.maxWidth},regEvent:function(){var a=this;this.prevTime=0,this.tabs.click(function(){var b=parseInt($(this).attr("data-tabnavindex"));a.go(b)})},movePosition:function(a,b){var c=this.options.gap,d=this.offsets[a],e=this.offsets.length,f=this.maxWidth/2,g=this.offsets[this.offsets.length-1];if(d.left<f)return 0;var h=g.left+g.width+c-f;if(d.left>h)return f-h;var i=f-d.left,j=0,k=-i+this.maxWidth,l=-i,m=null;if(1==b){for(var n=a,e=this.offsets.length;e>n;n++)if(m=this.offsets[n],k>=m.left&&k<m.left+m.width+c){j=k-(m.left+m.width+c);break}}else for(var n=a-1;n>=0;n--)if(m=this.offsets[n],l>=m.left-c&&l<m.left+m.width){j=l-(m.left-c);break}return i+j},setSilder:function(a,b){this.silder.css("width",a+"px"),this.silder[0].style.webkitTransform="translateX("+b+"px)"},updateCurrentIndex:function(a){var b=this.currentIndex;this.tabs.eq(this.currentIndex).removeClass("on"),this.tabs.eq(a).addClass("on"),this.currentIndex=a,this.fire("onChange",[a,b,this.tabs.eq(a)])},go:function(a){var b=this,c=this.offsets[a].width,d=this.offsets[a].left,e=this.movePosition(a,a>=this.currentIndex?1:-1);this.scrollTo(this.tabIn[0],-e,18),setTimeout(function(){b.setSilder(c,d)},this.options.time),setTimeout(function(){b.updateCurrentIndex(a)},this.options.time)},next:function(){var a=this.currentIndex+1;a<this.counts&&this.go(a)},prev:function(){var a=this.currentIndex-1;a>=0&&this.go(a)},scrollTo:function(a,b,c){function d(){var b=e(h+=1,f,g-f,c);b!=g&&(a.scrollLeft=b,webkitRequestAnimationFrame(d))}function e(a,b,c,d){return c*((a=a/d-1)*a*a+1)+b}var f=a.scrollLeft,g=b,h=0;Math.abs(g-f)<10&&(c=1),d()},fire:function(a,b){for(var c=this.eventHandle[a],d=0;d<c.length;d++)try{c[d].apply(this,b)}catch(e){console.log(e)}},addEventListener:function(a,b){if(this.eventName.indexOf(a))throw"\u4e0d\u652f\u6301\u76d1\u542c+"+a+"\u4e8b\u4ef6";this.eventHandle[a].push(b)}};