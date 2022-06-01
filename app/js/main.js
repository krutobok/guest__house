const rates = document.querySelectorAll('.slider__item-rate')


function rate() {
    rates.forEach(elem => {
        if (elem.hasAttribute('data-rate')){
            const numFill = elem.getAttribute('data-rate').toString()
            const num = 5 - numFill
            for (let i = 0; i < numFill;i++){
                const star = document.createElement('img')
                star.setAttribute('src', 'images/star-fill.svg')
                elem.appendChild(star)
            }
            for (let i = 0; i < num;i++){
                const star = document.createElement('img')
                star.setAttribute('src', 'images/star.svg')
                elem.appendChild(star)
            }
        }
        else{
            const star = document.createElement('img')
            star.setAttribute('src', 'images/star-fill.svg')
            elem.appendChild(star)
            for (let i = 0; i < 4;i++){
                const star = document.createElement('img')
                star.setAttribute('src', 'images/star.svg')
                elem.appendChild(star)
            }
        }
    })
}
function slider(sliderContent) {
    const slider = document.querySelector('.' + sliderContent)
    // const width = document.
}

slider('slider__content')

rate()