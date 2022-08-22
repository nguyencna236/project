const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const nominate = $('.comic-nominate__item')
const list = $('.comic-nominate__list');
const commic = $('.comic-nominate')
const numberPage = $$('.page')
const iconDen = $('.iconden ')

if(document.body.offsetWidth >= 740 && document.body.offsetWidth <= 1023){
    var widthmax = 1315;
}
if(document.body.offsetWidth > 1023){
    var widthmax = 1248;
}
if(document.body.offsetWidth < 740){
    var widthmax = 1836;
}
var skip = 0;
var delay = 3000;
document.body.addEventListener('click',handleButton);
function handleButton(e){
    if(e.target.matches('.right')){
        if(skip >= widthmax) skip = 0;
        else  skip += nominate.offsetWidth; 
        list.style = `transform: translateX(-${skip}px)`
    }
    if(e.target.matches('.left')){
        if(skip <= 0) skip = widthmax;
        else skip -= nominate.offsetWidth;  
        list.style = `transform: translateX(-${skip}px)`
    }
}
const stop = setInterval(handleAutoSkip,delay)
function handleAutoSkip(){
    if(skip >= widthmax) skip = 0;
    else  skip += nominate.offsetWidth; 
    list.style = `transform: translateX(-${skip}px)`
} 
[...numberPage].forEach((item)=>{
    item.addEventListener('click',handleNumberPage)
})
function handleNumberPage(e){
    [...numberPage].forEach((item)=>{
        item.classList.remove('click-page') 
    })
    e.target.closest('.page').classList.add('click-page')
}  
