$(function () {

	var $link = $(`<link rel="stylesheet" href="css/img_intr.css" />`);
	$link.appendTo("head");



	(async function () {


		try {
			var intr_content = await $.ajax({
				url: "http://localhost:3015/img_intr_content.html",
				type: "get"
			}).promise();
          $(intr_content).appendTo("#max_box");
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
			console.log(data);
			let str="";
			for(var item of data.picture){
				str+=`<div class="img_box"  >
				<div class="pic " data-pid=${item.pid} data-over="no">
				<img src=${item.src}  />
				<div class="intr">
							<a href="javascript:void(0)" title="收藏">❤收藏</a>
																</div>
				</div>
					</div>`;
															
			}
			$("#demo").html(str);
			var $picdiv=$("#demo .img_box>.pic");
						for (var e = 0; e < $picdiv.length; e++) {
							
							var self=$($picdiv[e]);
							
							if(self.attr("data-over")=="over"){}
							else{
								self.attr("data-over","over");
								self.on("click",function () { 
									var newPid= $(this).attr("data-pid");
								
									location.href=`http://localhost:3015/img_intr.html?pid=${newPid}`;
								 });
								 self.on("click","a",function(e){
									e.stopPropagation();
									var $this=$(this);
									var pid=$this.parent().parent().attr("data-pid");
									
									(async function(){
										var isLogin = await $.ajax({
											type: "GET",
											url: "http://localhost:3015/user/login",
								
										}).promise();
										if(isLogin==0) alert("请先登录，(╯‵□′)╯︵┻━┻");
										else{var addFav= $.ajax({
											url: "picture/insert_fav/",
											type: "post",
											data:`pid=${pid}`,
											dataType: "json"
										}).promise();
										console.log(addFav);alert("收藏成功")}



									})()




									
									
									});
							}

						}

				$("div.imgFun>button:nth-of-type(1)").click(function () {
					
									var pid=location.search.split("=")[1];
									
									(async function(){
										var isLogin = await $.ajax({
											type: "GET",
											url: "http://localhost:3015/user/login",
								
										}).promise();
										if(isLogin==0) alert("请先登录，(╯‵□′)╯︵┻━┻");
										else{var addFav= $.ajax({
											url: "picture/insert_fav/",
											type: "post",
											data:`pid=${pid}`,
											dataType: "json"
										}).promise();
										console.log(addFav);
									alert("收藏成功")}



									})()
				  });


			
			

		

		} catch (msg) {
			console.log(msg)
		}




	})()



})