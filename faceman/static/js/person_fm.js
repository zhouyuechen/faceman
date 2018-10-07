$(function () {
    /*  var $link = $(`<link rel="stylesheet" href="css/person_fm.css">`);
     $link.appendTo("head"); */
    (async function () {


        try {
            var person_fm_content = await $.ajax({
                url: "http://localhost:3015/person_fm_content.html",
                type: "get"
            }).promise();
            $(person_fm_content).appendTo("#max_box");

            $(".person_content nav").on("click", "li", function () {
                var $this = $(this);
                $this.parent().children("li").removeClass("act");
                $this.addClass("act");
                var attr = $this.attr("data-person");
                var boxs = $(".person_kinds>div");
                for (var i = 0; i < boxs.length; i++) {
                    $(boxs[i]).removeClass("act");
                    if ($(boxs[i]).attr("data-person") == attr) {
                        $(boxs[i]).addClass("act");
                    }
                }
            });


            /* 禁用滚动条 */
	function unmouseW(){
		return false
	}

	function unScroll() {
		$(document).on("mousewheel",unmouseW);
		var top=$(document).height();
		
		$(window).scrollTop(top);
$(document).on('scroll.unable',function (e){
$(window).scrollTop(top);
})
	}
	/*
	 解除禁用滚动条
	 */
	function removeUnScroll() {
		$(document).unbind("scroll.unable");
		$(document).off("mousewheel",unmouseW);
	}
            /* 显示修改框 */
            $(".upinfo>button").on("click", function () {
                $("#upinfo").css("display","flex");unScroll();
            });
            $("#upinfo>button.close").on("click", function () {
                $("#upinfo").css("display","none");removeUnScroll();
            });

            /* 添加个人数据 */
            var person_info = await $.ajax({
                url: "http://localhost:3015/user/person_info",
                type: "get"
            }).promise();
            $(".person_title>h3>span").html(`${person_info.uname}`);
            $("#uname>span").html(`${person_info.uname}`);
            $("#uphone>span").html(`${person_info.phone==undefined?'未填写':person_info.phone}`);
            $("#uemail>span").html(`${person_info.email==undefined?'未填写':person_info.email}`);
            $("#user_name>span").html(`${person_info.user_name==undefined?'未填写':person_info.user_name}`);
            $("#gender>span").html(`${person_info.gender==1?'男':'女'}`);
            /* 查询收藏图片 */
            let fav_imgs="";
            var pFav = await $.ajax({
                url: "http://localhost:3015/picture/my_fav",
                type: "get"
            }).promise();
            if(pFav[0]===undefined){
                fav_imgs+="<h1>您还没有收藏图片</h1>";
                $(".person_kinds [data-person='fav']").html(fav_imgs);
            }else{
                var pidArr=[];
            for(var el of pFav){
                pidArr.push(el.pic_id);

            }
            pidArr=pidArr.toString();
            
            var pFav2 = await $.ajax({
                url: "http://localhost:3015/picture/my_fav_src",
                type: "post",
                data:`pidArr=${pidArr}`
            }).promise();
            console.log(pFav2);
            

            for(var p_item of pFav2){
                fav_imgs+=`<div data-pid=${p_item.pid}> <img src=${p_item.src} alt=""></div>`;
            }
            $(".person_kinds [data-person='fav']").html(fav_imgs);

            $(".person_kinds [data-person='fav']").on("click","div",function () { 
                var newPid= $(this).attr("data-pid");
            
                location.href=`http://localhost:3015/img_intr.html?pid=${newPid}`;

            });
            




        }}catch(msg) {
            console.log(msg)
        }




    })()


})