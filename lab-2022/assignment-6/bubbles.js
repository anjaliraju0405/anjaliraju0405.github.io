let bubbles = document.querySelectorAll('.bubble');
let container = document.getElementById('container');


bubbles.forEach(function (bubble) {
    bubble.style.left = (70 * Math.random()) + '%';
    bubble.style.top = (70 * Math.random()) + '%';
});

container.addEventListener('click', function (event) {
    console.log(event) 
    if (event.target.classList.contains('bubble')){
        event.target.remove();   
     }
});
