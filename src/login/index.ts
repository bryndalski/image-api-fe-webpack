import "./scss/style.scss"


document.addEventListener("DOMContentLoaded", function () {
    const imageGrid = document.getElementById('image-grid');
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('image-cell');
        cell.style.backgroundImage = `url('https://picsum.photos/100/100/?random&t=${new Date().getTime()+ Math.random()*1000}')`;
        imageGrid.appendChild(cell);
    }
})


