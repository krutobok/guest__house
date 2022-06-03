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
    const items = document.querySelectorAll('.slider__item')
    const width = parseInt(window.getComputedStyle(items[0]).getPropertyValue('flex-basis').substring(0,3))
    const margin = parseInt(window.getComputedStyle(items[0]).getPropertyValue('margin-right').substring(0,2))
    let height = parseInt(window.getComputedStyle(slider).getPropertyValue('height').substring(0,3));
        + parseInt(window.getComputedStyle(slider).getPropertyValue('padding-bottom').substring(0,2))
    const parent = slider.closest('.slider__content-inner')
    const btnRight = document.querySelector('.slider__btn-right')
//     items.forEach(item => {
//         const itemHeight = parseInt(window.getComputedStyle(item).getPropertyValue('height').substr(0,3))
//             + parseInt(window.getComputedStyle(item).getPropertyValue('padding-top').substr(0,2))
//             + parseInt(window.getComputedStyle(item).getPropertyValue('padding-bottom').substr(0,2))
//         console.log(itemHeight)
//         if (height < itemHeight){
//             height = itemHeight
//         }
//     })
    parent.style.width = (items.length * width + (items.length-1)*margin) + 'px'
    parent.style.height = height + 'px'
    console.log(btnRight)
    let sliderPos = window.getComputedStyle(slider).getPropertyValue('left')
    sliderPos = parseInt(sliderPos.substring(0, sliderPos.length - 2))
    console.log( sliderPos)
    btnRight.addEventListener('click', ()=> {
        sliderPos = sliderPos - width - margin
        slider.style.left = sliderPos + 'px'

    })
}

rate()

document.addEventListener('DOMContentLoaded', () =>{
    slider('slider__content')
})
