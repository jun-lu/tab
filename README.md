# tab
* 移动端多tab流畅展示
* 依赖 zepto.js
* DEMO <http://jun-lu.github.io/tab/demo/app.html>
* 扫码在手机中查看DEMO
* ![DEMO](http://gtms03.alicdn.com/tps/i3/T1i6HkFGXcXXa7xbL2-592-600.png_240x240Q90.jpg)

## 说明

*  支持
	* 宽度超过容器左右滑动
	* 宽度不超过容器居中
* 不支持
	* 动态改变tab容器大小
	
	
## 使用方法
* CSS



```` html
	<link rel="stylesheet" href="../build/tab.css">	
````
* JS



```` html
	<script src="http://libs.baidu.com/zepto/0.8/zepto.min.js"></script>
	<script src="../build/tab.js"></script>
````

* HTML

```` html
	<!--
		DOM 结构
		-#id
			--.J_In
		    	--.J_Slider	
	-->
	<div class="h5-plugin-tab" id="J_Tabs3">
		<div class="h5-plugin-tab-in J_In"> <!--必须为 J_In-->
			<ul>
				<li>
					<a>Hello</a>
				</li>
				<li >
					<a>world</a>
				</li>
			</ul>
			<div class="h5-plugin-tab-silder J_Slider"></div> <!--必须为 J_Silder-->
		</div>
	</div>
````

* JS初始化

```` javascript
	/**
		@param  $element  容器zepto对象
		@param  options 其他配置参数
				{
					gap:20 //tab之间的间隙
				}
	*/
	
	var tab = new MulitpeTab($('#J_Tabs3'),{
		//tab之间的间距
		gap:20
		
	});
	// 从0开始，这里初始化到第2个tab
	tab.go(1);
````



## API

* `tab.addEventListener(type, handle)`

添加监听事件，目前仅支持一个`onChange`。当tab切换的时候触发
	
```` javascript
	tab.addEventListener('onChange', function(index, prevIndex, $element){
		// index 当前激活的tab序号,从0开始算
		// prevIndex 上一个激活的tab序号，从0开始算
		// $element 当前被高亮的LI元素
	});
	
````

* `tab.go( index )`

直接跳到第 index 个 tab, 序列从0开始

```` javascript
	tab.next( 1 )//跳到第2个tab
````

* `tab.next()`

切换到下一个tab

```` javascript
	tab.next()
````

* `tab.prev()`

切换到上一个tab

```` javascript
	tab.prev()
````

## 其他
* 建议使用 `FastClick.js` 提高页面 `click` 响应速度

## 克隆项目
```` shell
	git clone https://github.com/jun-lu/tab.git
	cd tab
	npm install
	grunt dev
	//访问 <http://0.0.0.0:9000/demo/app.html>
````
