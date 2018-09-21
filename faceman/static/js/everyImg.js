$(function(){
$("#demo .img_box>.pic").on("click",function () { 
    var newPid= $(this).attr("data-pid");

    location.href=`http://localhost:3015/img_intr.html?pid=${newPid}`;
 })

})()