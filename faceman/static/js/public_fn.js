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


function uptips() {
	var name = $(this).attr("name");
	var sp = $(this).nextAll("p");
	
	sp.css("color","white");
	switch (name) {
		case "last_upwd":
			sp.html(`请输入原密码`);
			break;
		case "upwd":
			sp.html(`请输入6-24位新密码，由字母，数字或下划线组成`);
			break;
		case "uphone":
			sp.html(`输入您的电话`);
			break;
		case "uemail":
		sp.html(`输入您的邮箱`);
			
			break;
	}
}


function upconfirm() {
	var reg1 = /^\w{6,24}$/;
var reg2 = /^((1[358][0-9])|(14[57])|(17[0678])|(19[7]))\d{8}$/;
var reg3 = /^\w+([-+.]\w+)*@\w+(([^\.]+)?)\.(com|cn|net)([-.](cn))?$/;
var name = $(this).attr("name");
var sp = $(this).nextAll("p");
var va=$(this).attr("value");
	switch (name) {
		case "upwd":
		if (reg1.test(va)) {
			sp.css("color","lightseagreen");
			sp.html(`密码格式正确`); 
			$(this).attr("data-isright","y");
		} else {
			
			sp.css("color","red");
			sp.html(`密码格式不正确`); 
			$(this).attr("data-isright","n");
		}
		break;
	
		case "uphone":
			if (reg2.test(va)) {
				sp.css("color","lightseagreen");
				sp.html(`电话格式正确`); 
				$(this).attr("data-isright","y");
			} else {
				
				sp.css("color","red");
				sp.html(`电话格式不正确`); 
				$(this).attr("data-isright","n");
			}
			break;
		case "uemail":
			if (reg3.test(va)) {
				sp.css("color","lightseagreen");
				sp.html(`邮箱格式正确`); 
				$(this).attr("data-isright","y");
			} else {
				sp.css("color","red");
				sp.html(`邮箱格式不正确`); 
				$(this).attr("data-isright","n");
			}
			break;
	}
}

