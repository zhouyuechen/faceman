(function(){

	let tips=document.getElementById("tips");
	let as=tips.getElementsByTagName("a");
	let choose=tips.querySelector("a.choose");
	let divs=document.getElementById("content").querySelectorAll("[data-rank]");
	console.log(divs);
	
	console.log(divs[0].getAttribute("data-rank"));
	tips.addEventListener("click",change);
	
	function getMovie(){
		$.ajax({
			url:"bbbb",
			type:"get",
			
			
			
		});
		
	}
	
	function change(ev){
		if(ev.target.nodeName=="A"&&ev.target.className!="choose"){
			for(var elem of as){
				elem.className="";
			}
			ev.target.className="choose";
			for(var elem of divs){
				elem.className="";
				if(ev.target.getAttribute("data-rank")==elem.getAttribute("data-rank")){
					elem.className="show";
					
					
			}}
			
			
			}}
	
	window.addEventListener("load",load_li);
	var rankImg=[];
	function load_li(){
		
		
		
		
		
		
		
	}
	
	
	
	
	
	
	
	
	
	
	
})()