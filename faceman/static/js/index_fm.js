"use strict";
(function () {
	$("#demo").waterfall({
		itemClass: ".img_box",
		minColCount: 2,
		spacingHeight: 20,
		spacingWidth: 20,
		resizeable: true,
		ajaxCallback: function (success, end) {
			var data = {
				"data": [{
					"src": "duck2.jpg"
				}, {
					"src": "duck3.jpg"
				}, {
					"src": "duck4.jpg"
				}, {
					"src": "duck5.jpg"
				}, {
					"src": "duck6.jpg"
				}, {
					"src": "duck7.jpg"
				}]
			};
			var str = "";
			var templ =
				`<div class="img_box" style="opacity:0;filter:alpha(opacity=0);">
				<div class="pic animated zoomIn  "><img src="img/{{src}}" /></div>
				<div class="intr">
				<a href="javascript:void(0)" title="收藏">❤收藏</a>
						</div></div>`;

			for (var i = 0; i < data.data.length; i++) {
				str += templ.replace("{{src}}", data.data[i].src);
			}
			$(str).appendTo($("#demo"));
			
			success();
			end();
			console.log("执行");
}
		
	});


function touch() {

	/* 仿苹果栏 */
	var menu = document.getElementById("hot_tips_menu");
	var pop = document.getElementById("index_content1_pop");
	var imgs = menu.getElementsByTagName("img");
	var arr = [];
	//保存原宽度, 并设置当前宽度
	for (var i = 0; i < imgs.length; i++) {
		arr.push(imgs[i].offsetWidth);
		imgs[i].width = parseInt(imgs[i].offsetWidth / 2);
		console.log(imgs[i].offsetWidth);
	}
	//鼠标移动事件
/* 	document.addEventListener("mousemove", apple);

	function apple(event) {
		
		var ev = event || window.event;
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		for (var i = 0; i < imgs.length; i++) {
			var a = ev.clientX - imgs[i].offsetLeft - imgs[i].offsetWidth / 2;
			var b = ev.clientY - imgs[i].offsetTop  - imgs[i].offsetHeight / 2;
			
			if(i==0)console.log(i,Math.sqrt(a * a + b * b));
			var iScale =  Math.sqrt(a * a + b * b) /144;
			var hei = pop.offsetHeight;
			if (iScale < 0.5 ) {
				iScale = 0.5;
				imgs[i].width = arr[i] * iScale;
			} else {
				if(iScale > 1)iScale = 1;
				console.log(iScale);
				imgs[i].width = arr[i] * iScale;
			}
		}
	} */

	//创建异步请求,就是设置一个定时器
	/* 	const sleep = (times) => new Promise((resolve) => {
			setTimeout(resolve, times);
		});

		(async() => { // 声明即执行的 async 函数表达式
			for (var i = 0; i < 5; i++) {
				await sleep(1000);
				console.log(new Date, i);
			}

			await sleep(1000);
			console.log(new Date, i);
		})();
		 */
}
$(window).on("load",touch);

})()