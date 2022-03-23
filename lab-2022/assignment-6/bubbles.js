let container = document.querySelectorAll('#container');

for (let i = 0; i < 50; i++) {
    let bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.left = (90 * Math.random()) + '%';
    bubble.style.top = (90 * Math.random()) + '%';
    container.appendChild(bubble);
}

container.addEventListener('click', function (event) {
    if (event.target.classlist.contains ('bubble')){
        event.target.remove();   
     }
});
