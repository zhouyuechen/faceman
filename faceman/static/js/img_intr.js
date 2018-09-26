$(function () {

	var $link = $(`<link rel="stylesheet" href="css/img_intr.css" />`);
	$link.appendTo("head");



	(async function () {


		try {
			var intr_content = await $.ajax({
				url: "http://localhost:3015/img_intr_content.html",
				type: "get"
			}).promise();
/* 			console.log(intr_content);
 */           $(intr_content).appendTo("#max_box");
            $("#pic_choose").attr("style","");
		  
		var pid=location.search.split("=")[1]||2;
		var thisimg=await $.ajax({
			url: `http://localhost:3015/picture/img`,
			data: {
				pid
			},
			dataType: "json",
		}).promise();
		thisimg=thisimg.picture[0];
		console.log(thisimg);
		$(".intr>img").attr("src",`${thisimg.src}`);
		thisTips=thisimg.tips.split(" ");
		let str_tip="";
		for(var e in thisTips){
			if(thisTips[e]==""||e>=4) continue;
			str_tip+=`<li>${thisTips[e]}</li>`;
		}
		console.log(str_tip);
		$(str_tip).appendTo(".relatedTips>ul");
		$(".relatedTips>ul>li:not(:first)").on("click",function () { 
			let tip=$(this).text();
			location.href=`http://localhost:3015/img_search.html?tips=${tip}`;
		 });
		thisPsize=thisimg.psize;
		$("div.imgFun>p").text(`图片尺寸:${thisPsize}`);

		function changeHref1(){
			
			location.href=`http://localhost:3015/img_intr.html?pid=${thisimg.pid-1}`;
		}
		function changeHref2(){
			
			location.href=`http://localhost:3015/img_intr.html?pid=${thisimg.pid+1}`;
		}
		$(".intr>button:nth-of-type(1)").on("click",changeHref1);
		$(".intr>button:nth-of-type(2)").on("click",changeHref2);






			var data = await $.ajax({
				url: "http://localhost:3015/picture/simi/",
				type: "get"
			}).promise();
			

			var str = "";

			var templ =
				`<div  class="img_box hide" >
			<div class="pic animated  " data-pid="{{pid}}" ><img src="/{{src}}" /></div>
			<div class="intr">
			<a href="javascript:void(0)" title="收藏">❤收藏</a>
					</div></div>`;

			for (var i = 0; i < data.picture.length; i++) {
				str += templ.replace("{{src}}", data.picture[i].src).replace("{{pid}}", data.picture[i].pid);
			}

			//console.log(str);
			$(str).appendTo($("#demo"));
			$("#demo").waterfall({
				itemClass: ".img_box",
				minColCount: 2,
				spacingHeight: 20,
				spacingWidth: 20,
				resizeable: false,
				ajaxCallback: function(success, end) {
					if($(".img_box").is(".hide")){
						$(".img_box").removeClass("hide");
						$(".img_box>.pic").addClass("zoomIn");
					}
					
					
	
					success();
					end();
					return;
				}
		
			});
			$("#demo .img_box>.pic").on("click",function () { 
				var newPid= $(this).attr("data-pid");
			
				location.href=`http://localhost:3015/img_intr.html?pid=${newPid}`;
			 });

		

		} catch (msg) {
			console.log(msg)
		}




	})()



})