"use strict";
(function () {
	$(function(){
		var $link=$(`<link rel="stylesheet" href="css/index_fm.css" />`);
		$link.appendTo("head");

		
		$.ajax({
			url:"index_fm_content.html",
			type:"get",
			success:function(res){
				$(res).appendTo("#max_box");
			}	
		}).complete(function(){
			
				
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
			
			
			
			
			
			/* 搜索框功能 */
			var $search=$("#search_btn1");
			var $input=$search.prev("#search1");
			$search.on("click",function(){
				location.href=`http://localhost:3015/img_search.html?tips=${$input.val().trim()}`;
			} );
			$input.keyup(function(e){
				if(e.keyCode==13){
					$search.click();
				}
				
			} );
			
			/* 方块 */
			$("#cube-container").createCube();
			
			
		}
		);
		
		
	})
	
	
	
})()