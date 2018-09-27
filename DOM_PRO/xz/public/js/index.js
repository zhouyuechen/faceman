
(async function(){
	
 var res=await ajax({
	url:"http://localhost:3000/index/",
	type:"get",
	dataType:"json"
});	console.log(res);

var p1=res[0];
var {title,details,pic,price,href}=p1;
var html=`<div class="card border-0 flex-md-row box-shadow h-md-250">
              <div class="card-body d-flex flex-column align-items-start">
                <h5 class="d-inline-block mb-2">${title}</h5>
                <h6 class="mb-5">
                  <a class="text-dark" href="javascript:;">${details}</a>
																 </h6>
                <span class="text-primary">¥${price.tofixed(2)}</span>
                <a class="btn btn-primary" href=${href}>查看详情</a>
              </div>
              <img class="card-img-right flex-auto d-none d-md-block" data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" src=${pic} data-holder-rendered="true">
            </div>`;
var parent=document.querySelector("#main>div:nth-child(2)>h3:first-child>div:nth-child(2)>div:first-child");
parent.innerHTML=html;


})()