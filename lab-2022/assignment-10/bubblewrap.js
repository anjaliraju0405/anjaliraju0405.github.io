let container = document.querySelector(".grid-container");
let clearDrawing = document.querySelector("#clearDrawing");


let isPainting = false;


for (let i = 0; i < 16 * 16; i++){
  
  
  let newDiv = document.createElement("div");
  newDiv.classList.add("pixel");
  

  newDiv.addEventListener("mousedown", function(){
       isPainting = true;
    newDiv.style.backgroundColor = "skyblue";
  });
  
  
  newDiv.addEventListener("mouseenter", function(){
    
  
    if (isPainting){
      newDiv.style.backgroundColor = "skyblue";
    }
    
  });
  
 
  newDiv.addEventListener("mouseup", function(){
    isPainting = false;
  });
  
  
  clearDrawing.addEventListener("click", function(){
    newDiv.style.background = "white";
  })
  
  
  container.appendChild(newDiv);
}