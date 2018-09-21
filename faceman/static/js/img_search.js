"use strict";

$(function () {
	var $link = $(`<link rel="stylesheet" href="css/img_search.css" />`);
	$link.appendTo("head");

	var  getPic=(function(){
		var times=0;
      return function(){
	if (location.search.indexOf("tips") != -1) {
      var pNum=times;
		var tips = decodeURI(location.search.split("=")[1]);
		times++;
		console.log(tips);
		console.log(times);
		$("#img_search>h3>span").html(tips);
		$.ajax({
			url: "http://localhost:3015/picture/search/",
			type: "get",
			data: {
				tips,
				pNum
			},
			dataType: "json",
			success: function (data) {
				console.log(data);
				var str = "";
				if(data.picture.length==0){
					str=`<h3>没有更多了....</h3>`;
					$(str).insertAfter($("#demo"));
					console.log(str);
					return false;
				}else{
				
				var templ =
					`<div class="img_box" style="opacity:0;filter:alpha(opacity=0);">
										<div class="pic animated zoomIn " data-pid="{{pid}}" ><img src="/{{src}}" /></div>
										<div class="intr">
										<a href="javascript:void(0)" title="收藏">❤收藏</a>
												</div></div>`;

				for (var i = 0; i < data.picture.length; i++) {
					str += templ.replace("{{src}}", data.picture[i].src).replace("{{pid}}", data.picture[i].pid);
				}
				$(str).appendTo($("#demo"));
				$("#demo .img_box>.pic").on("click",function () { 
					var newPid= $(this).attr("data-pid");
				
					location.href=`http://localhost:3015/img_intr.html?pid=${newPid}`;
				 });
			}
		} 
	}); //.complete(function () {});
	}
	}})()
getPic();
getPic();
      
		$("#demo").waterfall({
			itemClass: ".img_box",
			minColCount: 2,
			spacingHeight: 20,
			spacingWidth: 20,
			resizeable: true,
			ajaxCallback: function (success, end) {
				
				if($("#demo").next().is("h3")) {
					return;}else{
						getPic();
					}
				
			/* 	var data = {
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
				$(str).appendTo($("#demo")); */

				success();
				end();
				console.log("执行");
			}

		});


	


})
