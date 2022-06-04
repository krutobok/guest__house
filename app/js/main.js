const rates = document.querySelectorAll('.slider__item-rate')
const menuBtn = document.querySelector('.menu__btn')
const menuList = document.querySelector('.header__menu-list')
const headerBtn = document.querySelector('.header__btn')

menuBtn.addEventListener('click', ()=>{
    menuList.classList.toggle('active')
    headerBtn.classList.toggle('active')
})


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
    const sliderInner = document.querySelector('.slider__wrapper')
    sliderInner.style.transition = 'left .5s'
    let items = document.querySelectorAll('.slider__item')
    const width = parseInt(window.getComputedStyle(items[0]).getPropertyValue('flex-basis').substring(0,3))
    const margin = parseInt(window.getComputedStyle(items[0]).getPropertyValue('margin-right').substring(0,2))
    let height = parseInt(window.getComputedStyle(slider).getPropertyValue('height').substring(0,3));
        + parseInt(window.getComputedStyle(slider).getPropertyValue('padding-bottom').substring(0,2))
    height = height+5
    sliderInner.style.left = -width-margin + 'px'
    const parent = slider.closest('.slider__content-inner')
    const btnRight = document.querySelector('.slider__btn-right')
    const btnLeft = document.querySelector('.slider__btn-left')
    let slideCounter = 1
    parent.style.width = (items.length * width + (items.length-1)*margin) + 'px'
    parent.style.height = height + 'px'
    let sliderPos = -width-margin
    let currentSlide = 1
    function move() {
        if(slideCounter === -1){
            slideCounter = slideCounter + items.length
        }
        currentSlide = slideCounter % items.length

        setTimeout(()=> {
            slider.style.left = -sliderPos - width - margin + 'px'
            items[(currentSlide+items.length-1)%items.length].style.order = '1'
            for (let i = items.length-1; i > 0; i--){
                items[(currentSlide+i-1)%items.length].style.order = (i+2).toString()
            }
        }, 502)
    }
    function moveRight(){
        sliderPos = sliderPos - width - margin
        sliderInner.style.left = sliderPos + 'px'
        slideCounter++
        move()
    }
    function moveLeft(){
        sliderPos = sliderPos + width + margin
        sliderInner.style.left = sliderPos + 'px'
        slideCounter--
        move()
    }
    btnRight.addEventListener('click', ()=> {
        moveRight()
    })
    btnLeft.addEventListener('click', ()=> {
        moveLeft()
    })
    let pos
    parent.addEventListener('touchstart', function() {
        pos = 0
    })
    parent.addEventListener('touchmove', function(e) {
        let touchLocation = e.targetTouches[0];
        if (pos === 0){
            pos = touchLocation.pageX
        }
        let posEnd
        console.log(pos)
        parent.ontouchend = () => {
            posEnd = touchLocation.pageX
            console.log(posEnd)
            if (pos > posEnd){
                moveRight()
            }
            if (pos < posEnd){
                moveLeft()
            }
        }
    })
    parent.onmousedown = e =>{
        let pos = e.pageX
        let posEnd
        parent.onmouseup = (e) => {
            posEnd = e.pageX
            if (pos > posEnd){
                moveRight()
            }
            if (pos < posEnd){
                moveLeft()
            }
        }
    }
}
const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
    animationTime = 500,
    framesCount = 120;

anchors.forEach(function(item) {
    item.addEventListener('click', function(e) {
        e.preventDefault();

        let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
        console.log('coordY:' + coordY)
        let coordY2 = (coordY-window.pageYOffset)
        console.log('coordY2: ' + coordY2)
        let scroller = setInterval(function() {
            let scrollBy = (Math.abs(coordY2) / framesCount);
            console.log('scrollBy:' + scrollBy)
            console.log('pageYOffset: ' + window.pageYOffset)
            console.log('window.innerHeight: ' + window.innerHeight)
            console.log('document.body.offsetHeight: ' + document.body.offsetHeight)
            if (coordY2>0){
                if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                    window.scrollBy(0, scrollBy);
                } else {
                    window.scrollTo(0, coordY);
                    clearInterval(scroller);
                }
            }
            else if (coordY2<0){
                if(scrollBy < window.pageYOffset - coordY) {
                    window.scrollBy(0, -scrollBy);
                } else {
                    window.scrollTo(0, coordY);
                    clearInterval(scroller);
                }
            }
            else if (coordY2){
                clearInterval(scroller);
            }
        }, animationTime / framesCount);
    });
});

rate()
window.addEventListener('resize',  ()=> {
    slider('slider__content')
});

document.addEventListener('DOMContentLoaded', () =>{
    slider('slider__content')
})
