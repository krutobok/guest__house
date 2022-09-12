const rates = document.querySelectorAll('.slider__item-rate')
const menuBtn = document.querySelector('.menu__btn')
const menuList = document.querySelector('.header__menu-list')
const headerBtn = document.querySelector('.header__btn')
const backgroundChange = document.querySelectorAll('section[data-background="true"]')

menuBtn.addEventListener('click', ()=>{
    menuList.classList.toggle('active')
    headerBtn.classList.toggle('active')
})


function check_webp_feature(feature, callback) {
    var kTestImages = {
        lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
        lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
        alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
        animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
    };
    var img = new Image();
    img.onload = function () {
        var result = (img.width > 0) && (img.height > 0);
        callback(feature, result);
    };
    img.onerror = function () {
        callback(feature, false);
    };
    img.src = "data:image/webp;base64," + kTestImages[feature];
}


check_webp_feature('lossy', function (feature, isSupported) {
    if (!isSupported) {
        backgroundChange.forEach(elem => {
            let bg = elem.style.backgroundImage.toString()
            bg = bg.slice(0, -6)+'jpg")'
            elem.style.backgroundImage = bg
        })
    }
});

function rate() {
    rates.forEach(elem => {
        if (elem.hasAttribute('data-rate')){
            const numFill = elem.getAttribute('data-rate').toString()
            const num = 5 - numFill
            for (let i = 0; i < numFill;i++){
                fillStar()
            }
            for (let i = 0; i < num;i++){
                emptyStar()
            }
        }
        else{
            fillStar()
            for (let i = 0; i < 4;i++){
                emptyStar()
            }
        }
        function emptyStar() {
            const star = document.createElement('img')
            star.setAttribute('src', 'images/star.svg')
            star.setAttribute('alt', 'пуста зірка')
            elem.appendChild(star)
        }
        function fillStar() {
            const star = document.createElement('img')
            star.setAttribute('src', 'images/star-fill.svg')
            star.setAttribute('alt', 'заповнена зірка')
            elem.appendChild(star)
        }
    })
}
function slider(sliderContent) {
    const slider = document.querySelector(sliderContent)
    const sliderInner = slider.closest('[data-slider="wrapper"]')
    const parentBlock = slider.closest('[data-slider="parent-block"]')
    let items = slider.children
    let width = window.getComputedStyle(items[0]).getPropertyValue('width')
    width = parseInt(width.substring(0, width.length-2))
    let margin = window.getComputedStyle(items[0]).getPropertyValue('margin-right')
    margin = parseInt(margin.substring(0,margin.length-2))
    const parent = slider.closest('[data-slider="inner"]')
    const btnRight = parentBlock.querySelector('[data-arrow="right"]')
    const btnLeft = parentBlock.querySelector('[data-arrow="left"]')
    let animSlider
    let parentBlockWidth = window.getComputedStyle(parent).getPropertyValue('width')

    let height = parseInt(window.getComputedStyle(slider).getPropertyValue('height').substring(0,3));
    + parseInt(window.getComputedStyle(slider).getPropertyValue('padding-bottom').substring(0,2))
    height = height+5
    parent.style.height = height + 'px'

    parentBlockWidth = parseInt(parentBlockWidth.substring(0, parentBlockWidth.length-2))
    if (parentBlock.hasAttribute('data-anim')){
        if(parentBlock.getAttribute('data-anim') === 'true'){
            animSlider = document.querySelector('.top-slider__btn-box')
        }
    }
    Array.prototype.forEach.call(items, item => {
        item.style.userSelect = 'none'
    });
    let slideCounter = 1
    let sliderPos
    let currentSlide = 1
    let dots = []
    let isDots
    let isCenterMode
    let currentRight
    let currentLeft
    let interval
    let isAutoplay
    let time
    let posDifference
    let centerSliderCounter = 0
    let moveTime = 500
    let currentMoveTime = moveTime
    if (parentBlock.hasAttribute('data-dots')){
        if (parentBlock.getAttribute('data-dots') === 'true'){
            isDots = true
        }
    }
    else{
        isDots = false
    }
    if (parentBlock.hasAttribute('data-center-mode')){
        if (parentBlock.getAttribute('data-center-mode') === 'true'){
            isCenterMode = true
            for (let i = 0; i < document.documentElement.clientWidth/width; i++){
                centerSliderCounter++
            }
            sliderPos = -(width*centerSliderCounter-((parentBlockWidth-width)/2))
            slider.style.transform = 'translateX(' + (-sliderPos + (-2*width + (((parentBlockWidth-width)/2)))) + 'px)'
            sliderInner.style.transform = 'translateX(' + (-(width*centerSliderCounter-((parentBlockWidth-width)/2))) + 'px)'
        }
        else{
            isCenterMode = false
            sliderPos = -width-margin
            sliderInner.style.transform = 'translateX(' + (-width-margin) + 'px)'
        }
    }
    else{
        isCenterMode = false
        sliderPos = -width-margin
        sliderInner.style.transform = 'translateX(' + (-width-margin) + 'px)'
    }
    if (parentBlock.hasAttribute('data-autoplay')){
        isAutoplay = true
        time = parseFloat(parentBlock.getAttribute('data-autoplay'))
    }
    if (isDots){
        const dotsInner = parentBlock.querySelector('[data-slider="dots-box"]')
        for (let i = 0; i < items.length; i++){
            const elem = document.createElement('button')
            elem.classList.add('dot')
            elem.textContent = i+1
            elem.dataset.id = i+1
            dots.push(elem)
            dotsInner.append(elem)
        }
        dots[0].classList.add('active')
        dots.forEach(elem => {
            elem.addEventListener('click', ()=> {
                let id = parseInt(elem.getAttribute('data-id'))
                if (id > currentSlide){
                    currentRight = Math.abs(id - currentSlide)
                    currentMoveTime = moveTime/currentRight
                    moveRight()
                }
                else if (id < currentSlide){
                    currentLeft = Math.abs(currentSlide - id)
                    currentMoveTime = moveTime/currentLeft
                    moveLeft()
                }

            })
        })
    }
    function move(transition = true) {
        if (transition === true){
            sliderInner.style.transition = 'transform .5s'
        }
        if (isAutoplay){
            animSlider.classList.remove('active')
            clearInterval(interval)
            interval = null
        }
        if(slideCounter === -1){
            slideCounter = slideCounter + items.length
        }
        currentSlide = slideCounter % items.length
        if (currentSlide === 0){
            currentSlide = items.length
        }
        if (isCenterMode){
            for (let i = 0; i < items.length; i++){
                items[i].classList.remove('active')
            }
        }
        setTimeout(()=> {
            items[(currentSlide+items.length-1)%items.length].style.order = '1'
            for (let i = items.length - 1; i > 0; i--){
                items[(currentSlide+i-1)%items.length].style.order = (i+2).toString()
            }
            if (isCenterMode){
                slider.style.transform = 'translateX(' + (-sliderPos + (-2*width + (((parentBlockWidth-width)/2)))) + 'px)'
                for (let i = 0; i < items.length; i++){
                    if (items[i].style.order === '4'){
                        items[i].classList.add('active')
                    }
                }
            }
            else{
                slider.style.transform = 'translateX(' + (-sliderPos - (width + margin)) + 'px)'
            }
            if (isDots){
                dots.forEach(elem => elem.classList.remove("active"))
                dots[currentSlide-1].classList.add('active')
            }
            if (currentLeft > 0){
                currentLeft--
                if (currentLeft > 0){
                    moveLeft()
                }
                else{
                    currentMoveTime = moveTime
                }
            }
            else if (currentRight > 0){
                currentRight--
                if (currentRight > 0){
                    moveRight()
                }
                else{
                    currentMoveTime = moveTime
                }
            }
            else{
                currentMoveTime = moveTime
            }
            if (isAutoplay){
                if (interval === null){
                    interval = setInterval(moveRight, time*1000)
                    animSlider.classList.add('active')
                }
            }
        }, currentMoveTime)
    }
    function moveRight(transition = true){
        sliderPos = sliderPos - (width + margin)
        sliderInner.style.transform = 'translateX(' + sliderPos + 'px)'
        slideCounter += 1
        move(transition)
    }
    function moveLeft(transition = true){
        sliderPos = sliderPos + (width + margin)
        sliderInner.style.transform = 'translateX(' + sliderPos + 'px)'
        slideCounter -= 1
        move(transition)
    }
    btnRight.addEventListener('click', ()=> {
        moveRight()
    })
    btnLeft.addEventListener('click', ()=> {
        moveLeft()
    })
    parent.addEventListener('touchstart', function(e) {
        let pos = e.targetTouches[0];
        let posEnd = pos.pageX
        sliderInner.style.transition = 'none'
        let touchLocation = pos
        parent.ontouchmove = (e) =>  {
            touchLocation = e.targetTouches[0];
            posDifference = touchLocation.pageX - pos.pageX
            sliderInner.style.transform = 'translateX(' + (sliderPos + posDifference) + 'px)'
            if (posDifference >= width+margin){
                currentMoveTime = 0
                pos = e.targetTouches[0]
                moveLeft(false)
            }else if (posDifference <= -width-margin){
                currentMoveTime = 0
                pos = e.targetTouches[0]
                moveRight(false)
            }
        }
        parent.ontouchend = () => {
            posEnd = touchLocation.pageX
            if (pos.pageX > posEnd){
                moveRight()
            }
            else if (pos.pageX < posEnd){
                moveLeft()
            }
            parent.ontouchmove = null
            parent.ontouchend = null
        }
    })
    parent.onmousedown = e =>{
        let pos = e.pageX
        sliderInner.style.transition = 'none'
        posDifference = 0
        if (isAutoplay){
            clearInterval(interval)
            interval = null
        }
        parent.onmousemove = (e) =>{
            posDifference = e.pageX - pos
            sliderInner.style.transform = 'translateX(' + (+sliderPos + posDifference) + 'px)'
            if (posDifference >= width+margin){
                currentMoveTime = 0
                pos = e.pageX
                moveLeft(false)
            }else if (posDifference <= -width-margin){
                currentMoveTime = 0
                pos = e.pageX
                moveRight(false)
            }
        }
        parent.onmouseup = () => {
            mouseUp()
        }
        parent.onmouseleave = () => {
            mouseUp()
        }
        function mouseUp(){
            if (posDifference < 0){
                moveRight()
            }
            else if (posDifference > 0){
                moveLeft()
            }
            parent.onmouseleave = null
            parent.onmousemove = null
            parent.onmouseup = null
        }
    }
    if (isAutoplay){
        interval = setInterval(moveRight, time*1000)
        animSlider.classList.add('active')
    }
    window.addEventListener('resize', ()=> {
        width = window.getComputedStyle(items[0]).getPropertyValue('width')
        width = parseInt(width.substring(0, width.length-2))
        margin = window.getComputedStyle(items[0]).getPropertyValue('margin-right')
        margin = parseInt(margin.substring(0,margin.length-2))
        height = parseInt(window.getComputedStyle(slider).getPropertyValue('height').substring(0,3));
        + parseInt(window.getComputedStyle(slider).getPropertyValue('padding-bottom').substring(0,2))
        height = height+5
        parent.style.height = height + 'px'
        parentBlockWidth = window.getComputedStyle(parent).getPropertyValue('width')
        parentBlockWidth = parseInt(parentBlockWidth.substring(0, parentBlockWidth.length-2))
        sliderInner.style.transition = 'none'
        if (isCenterMode){
            sliderPos = -(width*centerSliderCounter*currentSlide-((parentBlockWidth-width)/2))
            slider.style.transform = 'translateX(' + (-sliderPos + (-2*width + (((parentBlockWidth-width)/2)))) + 'px)'
            sliderInner.style.transform = 'translateX(' + sliderPos + 'px)'
        }
        else{
            sliderPos = currentSlide*width
            sliderInner.style.transform = 'translateX(' + sliderPos + 'px)'
            slider.style.transform = 'translateX(' + (-sliderPos - (width + margin)) + 'px)'
        }
    })
}


















const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
    animationTime = 500,
    framesCount = 120;

anchors.forEach(function(item) {
    item.addEventListener('click', function(e) {
        e.preventDefault();

        let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
        let coordY2 = (coordY-window.pageYOffset)
        console.log('coordY2: ' + coordY2)
        let scroller = setInterval(function() {
            let scrollBy = (Math.abs(coordY2) / framesCount);
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
const modalsBtn = [].slice.call(document.querySelectorAll('button[data-modal="modal"]'))
const modalWindow = document.querySelector('.modal')
const form = document.querySelector('.modal__form')
const modalBtnClose = document.querySelector('.btn__modal--close')
const modalBtnSubmit = document.querySelector('.modal__btn')
const modalTitle = document.querySelector('.modal__title')
const input1 = document.querySelector('.modal__input--1')
const input2 = document.querySelector('.modal__input--2')
function modal(){
    form.addEventListener('submit', onSubmit);
    modalsBtn.forEach(btn => {
        btn.addEventListener('click',  function modalOpen() {
            modalWindow.classList.add('active')
            if (btn.getAttribute('data-book') === 'true'){
                modalTitle.textContent = 'Введіть дані для бронювання'
                modalBtnSubmit.textContent = 'Забронювати'
            }
            else{
                modalTitle.textContent = "Зв'яжемося з вами за 30 хвилин"
                modalBtnSubmit.textContent = "Зв'язатися"
            }
        })
    })
    modalBtnClose.addEventListener('click', function () {
        modalWindow.classList.remove('active')
        input1.style.borderColor = "#52503B"
        input2.style.borderColor = "#52503B"
    })
    input1.addEventListener('input', ()=> input1.style.borderColor = "#52503B")
    input2.addEventListener('input', ()=> input2.style.borderColor = "#52503B")
    function onSubmit(event) {
        event.preventDefault();
        const inputValue1 = input1.value
        const inputValue2 = input2.value
        if (inputValue1 !== '' && inputValue2 !== ''){
            modalWindow.classList.remove('active')
            input1.value = ''
            input2.value = ''
        }
        else if (inputValue1 !== '' && inputValue2 === ''){
            input2.style.borderColor = "red"
        }
        else if (inputValue1 === '' && inputValue2 !== ''){
            input1.style.borderColor = "red"
        }
        else if (inputValue1 === '' && inputValue2 === ''){
            input1.style.borderColor = "red"
            input2.style.borderColor = "red"
        }
    }
}
modal()

rate()

document.addEventListener('DOMContentLoaded', () =>{
    slider('.slider__content')
})
