const $$ = document.querySelectorAll.bind(document)
const $  = document.querySelector.bind(document)

const btnToggle = $('.navbar-toggler')
const menu = $('.collapse')
const navItem = $$('.nav-item')
const list = $$('.list-group')
const iconup = $$('.fa-regular')
const iconmenu = $('.fa-bars')
const iconclose = $('.fa-xmark')
const imghead = $('.img-head')
const imgshare = $('.img-share')
const input = $('.input')
const listcontrol = $('.list-control')
const listLi = $$('.list-control li')
const card = $$('.card')
const linkA = $('.card-title a')

btnToggle.onclick = ()=>{
    menu.classList.toggle('show')
    iconmenu.classList.toggle('no')
    iconclose.classList.toggle('no')
}

navItem.forEach((item)=>item.addEventListener('click',handle))
function handle(e){
    index = [...navItem].findIndex((item)=>item === e.target.closest('.nav-item'))
    console.log(e.target.closest('.nav-item'))
    list[index].classList.toggle('visible')
    iconup[index].classList.toggle('fa-angle-up')
}

document.body.onmouseover = (e)=>{
    na = e.target.closest('.event')
    if(na){
        na.querySelector('.img-share').style.height = "50px";
        na.querySelector('.img-share').style.background = "#77e2e1";
    }
}
document.body.onmouseout = (e)=>{
    na = e.target.closest('.event')
    if(na){
        na.querySelector('.img-share').style.height = "8px";
        na.querySelector('.img-share').style.background = "#0095a3";
    }
}

document.body.onclick = (e)=>{
    if(e.target.closest('.list-body')){
        listcontrol.classList.toggle('no')
    }
    if(!e.target.closest('.list-body')){
        listcontrol.classList.add('no')
    }
    if(e.target.closest('.list-control li')){
        listLi.forEach((item)=>{
            item.classList.remove('no')
        })
        e.target.closest('.list-control li').classList.add('no')
        input.value = e.target.textContent.toUpperCase();
    }
}

card.forEach((item)=>item.onclick=()=>{
    document.querySelector('.card-title a').click();

})
