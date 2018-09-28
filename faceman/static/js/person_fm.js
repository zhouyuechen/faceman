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


            function unScroll() {
                $(document).on("mousewheel", function () {
                    return false
                });
                var top = $(document).height();
                var top2 = top * 0.1;
                $(window).scrollTop(top2);
                $(document).on('scroll.unable', function (e) {
                    $(window).scrollTop(top2);
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
                $("#upinfo").css("display","flex");
            });
            $("#upinfo>button.close").on("click", function () {
                $("#upinfo").css("display","none");
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
            var pFav = await $.ajax({
                url: "http://localhost:3015/picture/my_fav",
                type: "get"
            }).promise();
            
            var pidArr=[];
            for(var el of pFav){
                pidArr.push(el.pic_id);

            }
            pidArr=pidArr.toString();
            console.log(pidArr);
            var pFav2 = await $.ajax({
                url: "http://localhost:3015/picture/my_fav_src",
                type: "post",
                data:`pidArr=${pidArr}`
            }).promise();
            console.log(pFav2);




        } catch (msg) {
            console.log(msg)
        }




    })()


})