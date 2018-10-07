function addEL(){//给图片添加事件
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
								 self.next("div").children("a").on("click",function(){
									var $this=$(this);
									var pid=$this.parent().parent().children(".pic").attr("data-pid");
									
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
}


