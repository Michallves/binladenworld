const cat = document.querySelector('.cat');

const jump = () => {
    cat.classList.add('jump');

    setTimeout(() => {
        cat.classList.remove('jump');
    }, 500)
}

document.addEventListener('keydown', jump);