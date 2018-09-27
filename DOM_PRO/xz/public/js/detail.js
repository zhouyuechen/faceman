(async function (){
	if(location.search.indexOf("lid=")!=-1){
	var lid=location.search.split("=")[1];
	var res=await ajax({
		url:"http://localhost:3000/detail",
		type:"get",
		data:`lid=${lid}`,
		dataType:"json"
		
	});
	console.log(res);
	var {product,specs}=res;
	console.log(product);
	var {title,subtitle,price,promise}=product;
	var html=`<h6 class="font-weight-bold">
              ${title}
            </h6>
            <h6>
              <a class="small text-dark font-weight-bold" href="javascript:;">${subtitle}</a>
            </h6>
            <div class="alert alert-secondary small" role="alert">
              <div>
                <span>学员售价：</span>
                <h2 class="d-inline text-primary font-weight-bold">${price.toFixed(2)}</h2>
              </div>
              <div>
                <span>服务承诺：</span>
                <span>${promise}</span>
              </div>
            </div>`
	
	}
	
	var fa=document.getElementById("details");
	fa.innerHTML=html+fa.innerHTML;
	var html="";
   for(var s of specs){
	   html+=`<a class="btn btn-sm btn-outline-secondary ${s.lid==lid?'active':''}" href="product_details.html?lid=${s.lid}" >${s.spec}</a>`;
	   
   }	
	
	fa.children[4].children[1].innerHTML=html;
	
	var bb=66;
	console.log(`你好"${bb}"`);
	
	
	var html=`<li class="float-left p-1">
                      <img src="img/product/sm/57e3b072N661cd00d.jpg" data-md="img/product/md/57e3b072N661cd00d.jpg" data-lg="img/product/lg/57e3b072N661cd00d.jpg">
                    </li>`;
	
	
	
})()