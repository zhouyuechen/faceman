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
            function unmouseW() {
                return false
            }

            function unScroll() {
                $(document).on("mousewheel", unmouseW);
                var top = $(document).height();

                $(window).scrollTop(top);
                $(document).on('scroll.unable', function (e) {
                    $(window).scrollTop(top);
                })
            }
            /*
             解除禁用滚动条
             */
            function removeUnScroll() {
                $(document).unbind("scroll.unable");
                $(document).off("mousewheel", unmouseW);
            }
            /* 显示修改框 */
            $(".upinfo>button").on("click", function () {
                $("#upinfo").css("display", "flex");
                unScroll();
            });
            $("#upinfo>button.close").on("click", function () {
                $("#upinfo").css("display", "none");
                removeUnScroll();
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

            $("#upinfo input").on("focus", uptips);
            $("#upinfo input").on("blur", upconfirm);
            /* 提交修改 */
            
            $("#upinfo .sub").on("click", function () {
                let isRight=1;
                var gender=$("#male").attr("checked")=="checked"?1:0;
                for(var i=0;i<2;i++){
                    if( $($("#upinfo input")[i]).attr("data-isRight")=="n"
                    )isRight=0;
                }
                if(isRight==0){
                    alert( `请按正确格式修改信息`)
                }else{
                    console.log(gender);
                 ( async function(){
                     var person_upinfo = await $.ajax({
                    url: "http://localhost:3015/user/person_upinfo",
                    type: "post",
                    data:`uphone=${$("#upinfo input[name='uphone']").attr("value")}
                    &uemail=${$("#upinfo input[name='uemail']").attr("value")}
                    &user_name=${$("#upinfo input[name='user_name']").attr("value")}
                    &gender=${gender}`
                }).promise();
                if(person_upinfo=="1"){
                    location.href=`http://localhost:3015/person_fm.html`;
                }
            })()
               
            }



              });
            /* 查询收藏图片 */
            let fav_imgs = "";
            var pFav = await $.ajax({
                url: "http://localhost:3015/picture/my_fav",
                type: "get"
            }).promise();
            if (pFav[0] === undefined) {
                fav_imgs += "<h1>您还没有收藏图片</h1>";
                $(".person_kinds [data-person='fav']").html(fav_imgs);
            } else {
                var pidArr = [];
                for (var el of pFav) {
                    pidArr.push(el.pic_id);

                }
                pidArr = pidArr.toString();

                var pFav2 = await $.ajax({
                    url: "http://localhost:3015/picture/my_fav_src",
                    type: "post",
                    data: `pidArr=${pidArr}`
                }).promise();
                

                /* 图片事件绑定 */
              for (var p_item of pFav2) {
                    fav_imgs += `<div data-pid=${p_item.pid}> <img src=${p_item.src} alt=""></div>`;
                }
                $(".person_kinds [data-person='fav']").html(fav_imgs);

                $(".person_kinds [data-person='fav']").on("click", "div", function () {
                    var newPid = $(this).attr("data-pid");

                    location.href = `http://localhost:3015/img_intr.html?pid=${newPid}`;

                });
                $(".uppwd input").on("focus", uptips);
            $(".uppwd input").on("blur", upconfirm);

                $(".uppwd button").on("click",function () { 
                  (async function() {
                      var last_upwd = await $.ajax({
                        url: `http://localhost:3015/user/last_upwd`,
                        type: "post",
                        data: `upwd=${$(".uppwd input:nth-of-type(1)").attr("value")}`
                    }).promise();
                    if(last_upwd=="0"){
                        $($(".uppwd input")[0]).nextAll("p.last").css("color","red").text("原密码错误");
                        return;
                    }
                    if($($(".uppwd input")[1]).attr("value")!==$($(".uppwd input")[2]).attr("value"))
                {  $("p.new1").css("color","red").text("两次密码不一样");
                console.log("两次密码不一样");
            return;  }
            if($($(".uppwd input")[1]).attr("data-isright")!=="y"||$($(".uppwd input")[2]).attr("data-isright")!=="y")
            {  $("p.new2").css("color","red").text("新密码格式不正确");
            console.log("新密码格式不正确");
        return;  }
            var new_upwd = await $.ajax({
                url: `http://localhost:3015/user/new_upwd`,
                type: "post",
                data: `upwd=${$($(".uppwd input")[1]).attr("value")}`
            }).promise();
            if(new_upwd=="1"){
                alert("修改密码成功，确定后2s回到首页，请重新登录");
                setTimeout(function(){
                    location.href=`http://localhost:3015/index_fm2.html`;
                },2000);
            }else alert("修改失败");
                    
                
                })()


                 });



            }
        } catch (msg) {
            console.log(msg)
        }




    })()


})