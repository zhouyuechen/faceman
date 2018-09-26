function checkLogin() {
    (async function () {
        var isLogin = await $.ajax({
            type: "GET",
            url: "http://localhost:3015/user/login",

        });
        if (isLogin != 0) {
            $("#login").html(`<a  href="javascript:void(0)" class="login_a2" id="personal"  >欢迎━(*｀∀´*)ノ亻!，${isLogin.uname}</a>
            &nbsp; |  &nbsp;<a  href="javascript:void(0)" class="login_a2" id="logout"  >退出</a>`);
            $("[data-pusher=login]").css("display", "none");
            $("[data-pusher=register]").css("display", "none");
            $("#personal").on("click",function () { 
                location.href=`http://localhost:3015/img_search/?tips=""`;
             });
             $("#logout").on("click",function () { 
                location.href=`http://localhost:3015/index_fmP.html`;
             });


        } else return











    })()

}