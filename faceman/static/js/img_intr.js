$(function () {

	var $link = $(`<link rel="stylesheet" href="css/img_intr.css" />`);
	$link.appendTo("head");

	(async function () {


try{
	var data= await $.ajax({
				url: "http://localhost:3015/picture/simi/",
				type: "get"
			}).promise();
	console.log(data);
	
	var str = "";

	var templ =
		`<div class="img_box" style="opacity:0;filter:alpha(opacity=0);">
			<div class="pic animated zoomIn " data-pid="{{pid}}" ><img src="/{{src}}" /></div>
			<div class="intr">
			<a href="javascript:void(0)" title="收藏">❤收藏</a>
					</div></div>`;

	for (var i = 0; i < data.picture.length; i++) {
		str += templ.replace("{{src}}", data.picture[i].src).replace("{{pid}}", data.picture[i].pid);
	}
	
	console.log(str);
	/* $(str).appendTo($("#demo")); */
	
	}catch(msg){console.log(msg)}




})()



})
