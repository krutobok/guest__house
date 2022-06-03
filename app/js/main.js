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
    slider.style.transition = 'left .5s'
    let items = document.querySelectorAll('.slider__item')
    // const itemsTemp = items
    const width = parseInt(window.getComputedStyle(items[0]).getPropertyValue('flex-basis').substring(0,3))
    const margin = parseInt(window.getComputedStyle(items[0]).getPropertyValue('margin-right').substring(0,2))
    let height = parseInt(window.getComputedStyle(slider).getPropertyValue('height').substring(0,3));
        + parseInt(window.getComputedStyle(slider).getPropertyValue('padding-bottom').substring(0,2))
    height = height+5
    slider.style.left = -width-margin + 'px'
    const parent = slider.closest('.slider__content-inner')
    const btnRight = document.querySelector('.slider__btn-right')
    const btnLeft = document.querySelector('.slider__btn-left')
    let currentSlide = 1
    parent.style.width = (items.length * width + (items.length-1)*margin) + 'px'
    parent.style.height = height + 'px'
    let sliderPos = -width-margin
    // let sliderPos = window.getComputedStyle(slider).getPropertyValue('left')
    // sliderPos = parseInt(sliderPos.substring(0, sliderPos.length - 2))
    btnRight.addEventListener('click', ()=> {
        sliderPos = sliderPos - width - margin
        slider.style.left = sliderPos + 'px'
        currentSlide++
    })
    btnLeft.addEventListener('click', ()=> {
        sliderPos = sliderPos + width + margin
        slider.style.left = sliderPos + 'px'
        currentSlide--
        if (currentSlide === -1){
            currentSlide = items.length - 1
        }

        console.log(currentSlide)
        console.log(items)
        items[currentSlide].style.order = '2'
        if (currentSlide === 0){

        }
    })
}

rate()

document.addEventListener('DOMContentLoaded', () =>{
    slider('slider__content')
})
