# tab
* 解决手机中多tab选项过多，流畅展示
* 依赖 zepto.js


#### 其他

*  支持
	* 宽度超过容器左右滑动
	* 宽度不超过容器居中
* 不支持
	* 动态改变tab容器大小
	
	
#### 使用方法
* css



````
	<link rel="stylesheet" href="../build/tab.css">
````
* js



````	
	<script src="../build/tab.js"></script>
````

* HTML

````
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

* 初始化

````
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