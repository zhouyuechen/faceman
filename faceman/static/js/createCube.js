jQuery.fn.createCube = function () {
			$(`<link rel="stylesheet" type="text/css" href="css/createCube.css" />`).appendTo("head")
			
			this[0].classList.add("cube-container");
			var box=this[0];
			this[0].parentNode.querySelector("#image-buttons").classList.add("image-buttons");
			var imageButtons=this[0].parentNode.querySelector("#image-buttons")
			$(function () {
				console.log(box,imageButtons);
				var cube=box.querySelectorAll("div:first-child")[0];
				cube.classList.add("cube");
				cube.classList.add("initial-position");
				var imgs=cube.getElementsByTagName("img");
					for(var i=0;i<imgs.length;i++){
						imgs[i].classList.add("cube-face-image");
						imgs[i].classList.add(`image-${i+1}`);
					}
				var  buttons=imageButtons.getElementsByTagName("input");	
					for(var i=0;i<buttons.length;i++){
						buttons[i].addEventListener("mouseover", function (e){
							e.target.style.transform="translateY(0.5rem)";
						});
						buttons[i].addEventListener("mouseleave", function (e){
							e.target.style.transform="translateY(0rem)";
						});
						buttons[i].classList.add(`show-image-${i+1}`);
					}
					var cubeImageClass = cube.classList[1];
		
					//Add click event listener to image buttons container
					imageButtons.addEventListener("mouseover", function (e) {
		         
						//Get node type and class value of clicked element
						var targetNode = e.target.nodeName,
							targetClass = e.target.className;
		
						//Check if image input has been clicked and isn't the currently shown image
						if (targetNode === "INPUT" && targetClass !== cubeImageClass) {
		
							console.log("Show Image: " + targetClass.charAt(11));
		
							//Replace previous cube image class with new class
							cube.classList.remove(cubeImageClass);
							cube.classList.add(targetClass);
		
							//Update cube image class variable with new class
							cubeImageClass = targetClass;
						}
					});
		
		
		
				})
		}
   