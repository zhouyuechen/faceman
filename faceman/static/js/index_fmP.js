"use strict";
(function() {
	$(function() {
		var $link = $(
			`<link rel="stylesheet" href="css/index_fm.css" />`);
		$link.appendTo("head");




		$.ajax({
			url: "index_fm_content.html",
			type: "get",
			success: function(res) {
				$(res).appendTo("#max_box");
			}
		}).complete(function() {
			(async function() {
				let first = await $.ajax({
					url: "picture/simi/",
					type: "get",
					dataType: "json"
				}).promise();
				let str = "";
				let templ =
					`<div class="img_box" style="opacity:0;filter:alpha(opacity=0);">
												<div class="pic animated zoomIn " data-pid="{{pid}}" ><img src="/{{src}}" /></div>
												<div class="intr">
												<a href="javascript:void(0)" title="收藏">❤收藏</a>
														</div></div>`;

				for (var i = 0; i < first.picture.length; i++) {
					str += templ.replace("{{src}}", first.picture[i].src).replace("{{pid}}", first.picture[i].pid);
				}
				$(str).appendTo($("#demo"));
				/* $("#demo .img_box>.pic").off("click","**");
				$("#demo .intr>a").off("click","**");
				$("#demo .img_box>.pic").on("click",function () { 
					var newPid= $(this).attr("data-pid");
				
					location.href=`http://localhost:3015/img_intr.html?pid=${newPid}`;
				 });
				 $("#demo .intr>a").on("click",function(){
					var $this=$(this);
					var pid=$this.parent().parent().children(".pic").attr("data-pid");
					console.log(pid);
					
					
					}); */





			})()


			$("#demo").waterfall({
				itemClass: ".img_box",
				minColCount: 2,
				spacingHeight: 20,
				spacingWidth: 20,
				resizeable: true,
				ajaxCallback: function(success, end) {
					if($("#demo .img_box").length>100){
						$(`<p>拉到底了~~ </p>`).appendTo($("#demo"));
						return }
					else{(async function() {
						let first = await $.ajax({
							url: "picture/simi/",
							type: "get",
							dataType: "json"
						}).promise();
						let str = "";
						let templ =
							`<div class="img_box" style="opacity:0;filter:alpha(opacity=0);">
																<div class="pic animated zoomIn " data-pid="{{pid}}" data-over="no" ><img src="/{{src}}" /></div>
																<div class="intr">
																<a href="javascript:void(0)" title="收藏">❤收藏</a>
																		</div></div>`;

						for (var i = 0; i < first.picture.length; i++) {
							str += templ.replace("{{src}}", first.picture[i].src).replace("{{pid}}", first.picture[i].pid);
						}
						$(str).appendTo($("#demo"));
						addEL();

						
						 
					})()}

					success();
					end();
					console.log("执行");
				}

			});


			$("#demo").on("mouseenter", ".img_box", function(e) {
				$(this).addClass("bigger");
				e.stopPropagation();


			});
			$("#demo").on("mouseleave", ".img_box", function(e) {
				$(this).removeClass("bigger");
				e.stopPropagation();


			});




			/* 搜索框功能 */
			var $search = $("#search_btn1");
			var $input = $search.prev("#search1");
			$search.on("click", function() {
				location.href = `http://localhost:3015/img_search.html?tips=${$input.val().trim()}`;
			});
			$input.keyup(function(e) {
				if (e.keyCode == 13) {
					$search.click();
				}

			});

			/* 方块 */
			$("#cube-container").createCube();


		});


	})



})()
