(function () {
	var login = document.getElementById("login_a1");
	var register = document.getElementById("login_a2");
	var l_r = login.parentElement;
	let father = document.getElementById("max_box_father");
	let box = document.getElementById("max_box");
	let pusher = document.getElementById("pusher");
	let login_show = pusher.querySelector("[data-pusher=login]");
	let register_show = pusher.querySelector("[data-pusher=register]");
	let bg = pusher.querySelector("[data-pusher=bg]");
	let l2r = login_show.querySelector("a:nth-of-type(2)");
	l_r.addEventListener("click", show);

	function show(ev) {
		if (ev.target.nodeName == "A") {
			father.className = "effect-father";
			box.className += " effect-11";
			/* 右部分折叠 */
			/* 左部分出现 */
			unScroll();
			pusher.style.transform = "scaleX(1)";
			login_show.style.display = "none ";
			register_show.style.display = "none ";
			var reg = /1/;
			if (reg.test(ev.target.id)) {
				login_show.style.display = "flex";
			} else register_show.style.display = "flex";
		} else return;
	}
	l2r.addEventListener("click", function () {
		login_show.style.display = "none";
		register_show.style.display = "flex";
	});
	bg.onclick = function (){
		box.style.transition = "transform 0.3s ";

		box.className = "container";
		pusher.style.transform = "scaleX(0)";
		removeUnScroll();
	}
	/* 显示页验证 */
	function tips(ev) {
		var name = ev.target.name;
		var sp = ev.target.previousElementSibling;
		sp.style.color = "black";
		switch (name) {
			case "uname":
				sp.innerHTML = `由字母,数字或者_组成的6至24位账号`;
				break;
			case "upwd":
				sp.innerHTML = `由字母,数字或者_组成的6至24位密码`;
				break;
			case "uphone":
				sp.innerHTML = `输入您的电话`;
				break;
			case "uemail":
				sp.innerHTML = `输入您的邮箱`;
				break;
		}
	}
	var reg1 = /^\w{6,24}$/;
	var reg2 = /^((1[358][0-9])|(14[57])|(17[0678])|(19[7]))\d{8}$/;
	var reg3 = /^\w+([-+.]\w+)*@\w+(([^\.]+)?)\.(com|cn|net)([-.](cn))?$/;

	function confirm(ev) {
		var name = ev.target.name;
		var sp = ev.target.previousElementSibling;
		switch (name) {
			case "uname":
				if (reg1.test(ev.target.value)) {
					sp.style.color = "lightseagreen";
					sp.innerHTML = `用户名可用`;
				} else {
					sp.style.color = "firebrick";
					sp.innerHTML = `用户名不可用`;
				}
				break;
			case "upwd":
				if (reg1.test(ev.target.value)) {
					sp.style.color = "lightseagreen";
					sp.innerHTML = `密码格式正确`;
				} else {
					sp.innerHTML = `密码格式不正确`;
					sp.style.color = "firebrick";
				}
				break;
			case "uphone":
				if (reg2.test(ev.target.value)) {
					sp.style.color = "lightseagreen";
					sp.innerHTML = `电话格式正确`;
				} else {
					sp.innerHTML = `电话格式不正确`;
					sp.style.color = "firebrick";
				}
				break;
			case "uemail":
				if (reg3.test(ev.target.value)) {
					sp.style.color = "lightseagreen";
					sp.innerHTML = `邮箱格式正确`;
				} else {
					sp.innerHTML = `请填写正确格式的邮箱~`;
					sp.style.color = "firebrick";
				}
				break;
		}
	}
	let inputs = register_show.getElementsByTagName("input");

	for (var i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener("focus", tips);
		inputs[i].addEventListener("blur", confirm);
	}
	/* 搜索框显示 */
	$(".if_search").on("click", function () {
			$("div.ssk").toggleClass("hidden");
		});
$("#top_nav").on("mouseleave",function(){
	
	$("div.ssk").addClass("hidden");
	
} );
	
/* toTop */
$(".toTop").on("click",function(){
		var  timer = setInterval(function () {
	
						//获取滚动条的滚动高度
						var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	
						//用于设置速度差，产生缓动的效果
						var speed = Math.floor(-scrollTop /3);
						document.documentElement.scrollTop = document.body.scrollTop = scrollTop + speed;
						isTop = true; //用于阻止滚动事件清除定时器
	
						if (scrollTop == 0) {
							clearInterval(timer);
						}
	
					}, 50);
	
} )
	/* 禁用滚动条 */
	function unmouseW(){
		return false
	}

	function unScroll() {
		$(document).on("mousewheel",unmouseW);
		var top=$(document).height();
		var top2=top*0.2;
		$(window).scrollTop(top2);
$(document).on('scroll.unable',function (e){
$(window).scrollTop(top2);
})
	}
	/*
	 解除禁用滚动条
	 */
	function removeUnScroll() {
		$(document).unbind("scroll.unable");
		$(document).off("mousewheel",unmouseW);
	}

/* 搜索框功能 */
var $search=$("#search_btn2");
var $input=$search.prev("#search2");
$search.on("click",function(){
	location.href=`http://localhost:3015/img_search.html?tips=${$input.val().trim()}`;
} );
$input.keyup(function(e){
	if(e.keyCode==13){
		$search.click();
	}
	
} );
/* if(location.search.indexOf("tips=")!=-1){
	var tips=location.search.split("=")[1];
	$input.val(tips);
} */
/* 导航指向 */
$("a").attr("href","javascript:void(0)");
$(".top_logo>a").click(function(){
	location.href=`http://localhost:3015/index_fm2.html`;
} );
$("#allkinds").parent().children(":first").click(function(){
	location.href=`http://localhost:3015/index_fm2.html`;
} );

})()
