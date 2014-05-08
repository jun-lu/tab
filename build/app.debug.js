/*! tab 2014-05-08 */
/**
	依赖固定的DEMO结构，请查考demo/app.html
		#id
			--.J_In
				--.J_Silder

	@param tab 容器$element zepto对象
	@param options 其他配置参数
		{
			gap:0//tab之间的间距
			time:0 //在PC中遇到过tab滑动页面渲染不完成的现象，可配置 time 要延迟渲染解决(time:300)
		}
*/

function MulitpeTab( tab , options){ 

	this.tab = tab;
	this.tabs = this.tab.find("li");//.slice(0, -1);
	this.silder = this.tab.find(".J_Slider");
	this.tabIn = this.tab.find(".J_In");

	this.maxWidth = 0;
	this.widthSum = 0;
	this.offsets = [];

	this.currentIndex = 0;
	this.maxMarginLeft = 0;

	//支持的事列表件lie'b
	this.eventName = ["onChange"];
	this.eventHandle = {};
	this.options = {
		gap:0,
		time:0
	};

	options && $.extend( this.options,  options);

	this.init();

};


MulitpeTab.prototype = {
	constructor:MulitpeTab,
	init:function(){
		
		for(var i=0; i<this.eventName.length; i++){
			this.eventHandle[this.eventName] = [];
		}
		
		this.initMaxWidth();
		this.initOffsets();
		//重绘
		this.render();
		
		this.regEvent();
		
		//andriod 2.3 无法滑动bug
		this.touchScroll && this.touchScroll(this.tabIn);
	},

	initMaxWidth:function(){
		this.maxWidth = this.tabIn.width();
	},

	initOffsets:function(){
		var gap = this.options.gap;

		var sum = gap;

		var lis = this.tabs;
		var width = 0;
		var gapLeft = 0;//this.offsets[0].left;
		this.offsets = [];
		
		for(var i=0; i<lis.length; i++){
			// {left:  top: width: height:}
			
			lis.eq(i).attr("data-tabnavindex", i);
			
			this.offsets.push( {
				left:lis[i].offsetLeft+(gap*(i+1)),
				width:lis[i].offsetWidth
			} );
			sum += lis[i].offsetWidth;
		}
		
		sum += gap;
		
		this.widthSum = sum;
		this.maxMarginLeft = sum-(this.maxWidth/2);
	},
	render:function(){
		
		var gap = this.options.gap;
		
		
		if( this.isHaveScroll() ){
			//需要滑动
			this.tabs.css("margin-left", gap+"px");
			this.tabs.eq(this.tabs.length-1).css("margin-right", gap+"px");
			
		}else{
			//直接居中
			this.options.gap = 0;
			this.tab.addClass("center");
			this.initOffsets();
		}
	},
	//是否需要滚动
	isHaveScroll:function(){
		//console.log(this.widths.length * this.options.gap + this.widthSum)
		return this.offsets.length * this.options.gap + this.widthSum > this.maxWidth;
	},
	//事件帮顶
	regEvent:function(){
		var self = this;
		this.prevTime = 0;
		this.tabs.click(function(){
			var index = parseInt($(this).attr("data-tabnavindex"));
			self.go( index );
		});
	},
	//根据导航容器大小计算出当前最合适移动的距离
	//index 选中的元素
	//dir 移动方向   -1<--- --->1
	movePosition:function( index, dir){
	   
	
		var gap = this.options.gap;
		var offset = this.offsets[index];
		var len = this.offsets.length;
		var centerPosition = this.maxWidth/2;
		var lastOffset = this.offsets[this.offsets.length-1];
	
		//前面几个的位置没过中点
		if( offset.left < centerPosition ){
			return 0;
		}
		
		
		//最大移动距离 内容最大宽度 - 容器大小的一半
		var maxPosition = (lastOffset.left + lastOffset.width + gap) - centerPosition;
		
	
		//后面几个最大移动返回最大移动距离
		if( offset.left >  maxPosition){
			
			return centerPosition-maxPosition;
			
		}
		
		//移动到最中间需要的距离 负数
		var distance = centerPosition - offset.left;
		//最大移动距离
		var maxDistance = centerPosition - maxPosition;
		
		var patch = 0;
		
		//容器当前终点
		var finishPosition = -distance + this.maxWidth;
		//容器当前起点
		var startPosition = -distance;
		
		var itemOffset = null;
		
		if( dir == 1 ){
			//向后移动，尽量避免出现一个tab显示一半的情况
			for( var i=index, len = this.offsets.length; i< len; i++){
				itemOffset= this.offsets[i];
				
				if(finishPosition >= itemOffset.left && finishPosition < itemOffset.left+itemOffset.width+gap){
					patch = finishPosition - (itemOffset.left+itemOffset.width+gap);
					break;
				}
			}
			//向前移动
		}else{
			for( var i=index-1; i>=0; i--){
				itemOffset= this.offsets[i];
				
				if(startPosition >= itemOffset.left - gap && startPosition < itemOffset.left+itemOffset.width){
					patch = startPosition - (itemOffset.left - gap);
					break;
				}
			}
		}
		
		return distance + patch;
	},
	
	//设置滑动条的宽度与位置
	setSilder:function( width, left ){
		
		this.silder.css("width", width+"px");
		this.silder[0].style.webkitTransform = "translateX("+left+"px)";
		//.scrollTo(left, 0)
	},
	//高亮当前tab并触发事件
	updateCurrentIndex:function( index ){
	   
	    var currentIndex = this.currentIndex;
		this.tabs.eq(this.currentIndex).removeClass("on");
		this.tabs.eq(index).addClass("on");
		this.currentIndex = index;
	    this.fire("onChange", [index, currentIndex, this.tabs.eq(index)]);
	},
	go:function( index ){
		
		
		//当前元素宽度与offsetleft值
		var self = this;
		var width = this.offsets[index].width;
		var left = this.offsets[index].left;// - gapLeft;
		//计算最佳移动距离避免出现半个
		var xx = this.movePosition(index, index >= this.currentIndex ? 1 : -1);
		
		//$("#J_NavtabIn ul").css("-webkit-transform","translateX("+ (xx) +"px)")
		
		// 18 = 300/16
		// 按照 webkitRequestAnimationFrame 16毫秒调用一次，300毫秒的动画，保持在18步完成，较为流畅
		this.scrollTo(this.tabIn[0], -xx, 18);// 18 = 300/16
		
		
		//pc chrome渲染有问题
		setTimeout(function(){
			self.setSilder(width, left);
		}, this.options.time)
		
		setTimeout(function(){
			self.updateCurrentIndex( index );
		}, this.options.time);
	
		
		
	},
	next:function(){

		var index = this.currentIndex+1;
		//console.log(index)
		if( index < this.tabs.length){
			this.go( index );
		}

	},
	prev:function(){
		var index = this.currentIndex-1;
		if( index >= 0){
			this.go( index );
		}
	},
	scrollTo:function(ele, x, time ){
		
		var current = ele.scrollLeft;
		var duration = x;
		var t = 0;
		var webkitRequestAnimationFrame = this.webkitRequestAnimationFrame;
		//变化数字绝对值小于10直接设置到终点
		if( Math.abs(duration-current) < 10){
			time = 1;
		}
		
		function run(){
			
			var c = easeOut(t+=1, current, duration-current, time);
			if( c != duration){
				ele.scrollLeft = c;
				webkitRequestAnimationFrame(run);
			}
		};
		
		function easeOut(t,b,c,d){
            return c*((t=t/d-1)*t*t + 1) + b;
        }
		
		run();
	},
	//事件派发
	fire:function(type, arg){
		var handles = this.eventHandle[type];
		for(var i=0; i<handles.length; i++){
			try{
				handles[i].apply(this, arg);
			}catch(e){
				console.log( e );
			}
		}	
	},
	webkitRequestAnimationFrame:(function(){
		return 	window.webkitRequestAnimationFrame == undefined ? function( run ){
			setTimeout(function(){
				run()
			},20);
		} : window.webkitRequestAnimationFrame;
	})(),
	addEventListener:function( type, handle ){
		
		if( this.eventName.indexOf( type ) ){
			throw "不支持监听+"+ type +"事件";
			return ;
		}
		
		this.eventHandle[type].push( handle );
	}
	
};

//andriod 2.3 overflow:scroll 无效处理 放弃滑动缓动
//alert(navigator.userAgent)
//alert(navigator.userAgent.indexOf("Android 2."))
if(navigator.userAgent.indexOf("Android 2.") != -1){
	MulitpeTab.prototype.touchScroll = function( elem ){
		
	    var el=elem[0]
	    var scrollStartPos=0;
		
		function scroll(){
		    
		    el.addEventListener("touchstart", function(event) {
		        scrollStartPos=this.scrollLeft+event.touches[0].pageX;
		        event.preventDefault();
		    },false);
		    el.addEventListener("touchmove", function(event) {
		        this.scrollLeft=scrollStartPos-event.touches[0].pageX;
		        event.preventDefault();
		    },false);
		}
		
		scroll();
	}
}




