
const $$ = document.querySelectorAll.bind(document);
const $  = document.querySelector.bind(document)

const headName = $('.head h2')
const cdImg = $('.cd-img')
const cd = $('.cd')
const list = $('.play-list')
const audio = $('.audio')
const btnPlay = $('.btnPlay')
const iconPlay = $('.iconPlay')
const iconPause = $('.iconPause')
const btnNext = $('.btnNext')
const btnPrev = $('.btnPrev')
const durationTime = $('.duration-time')
const currentTime = $('.current-time')
const progress = $('.progress')
const btnRandom = $('.btnRandom')
const btnRepeat = $('.btnRepeat')
const boxList = $('.box-list')

const app = {
    mp3: [
        {
            music: 'Bỏ Quê',
            singer: 'Phi nhung',
            img: './img/1.jpg',
            audio: './music/boque.mp3'
        },
        {
            music: 'Dang Dở',
            singer: 'Cà Na',
            img: './img/2.jpg',
            audio: './music/dangdo.mp3'
        },
        {
            music: 'Đêm cuối',
            singer: 'Ngọc Sơn',
            img: './img/3.jpg',
            audio: './music/demcuoi.mp3'
        },
        {
            music: 'Đế Vương',
            singer: 'cà na',
            img: './img/4.jpg',
            audio: './music/devuong.mp3'
        },
        {
            music: 'Gặp Mẹ trong Mơ',
            singer: 'Thùy Chi',
            img: './img/5.jpg',
            audio: './music/gapme.mp3'
        },
        {
            music: 'Gia Tài Của Mẹ',
            singer: 'Khánh Ly',
            img: './img/6.jpg',
            audio: './music/giatai.mp3'
        },
        {
            music: 'Giã Từ',
            singer: 'Cà Na',
            img: './img/7.jpg',
            audio: './music/giatu.mp3'
        },
        {
            music: 'Giọt Lệ Đại Trang',
            singer: 'Hồ Văn Cường',
            img: './img/8.jpg',
            audio: './music/giotle.mp3'
        },
        {
            music: 'Hoàng Hôn Màu Tím',
            singer: 'Cà Na',
            img: './img/9.jpg',
            audio: './music/hoanghon.mp3'
        },
        {
            music: 'Khu Phố Ngày Xưa',
            singer: 'Lệ Quyên',
            img: './img/10.jpg',
            audio: './music/khupho.mp3'
        },
        {
            music: 'Cô Gái M52',
            singer: 'Cà Na',
            img: './img/11.jpg',
            audio: './music/m52.mp3'
        },
        {
            music: 'Mình ơi',
            singer: 'Thành Nghiệp',
            img: './img/12.jpg',
            audio: './music/minhoi.mp3'
        },
        {
            music: 'Ngẫu Hứng Lý Qua Cầu',
            singer: 'Thành Nghiệp',
            img: './img/13.jpg',
            audio: './music/ngauhung.mp3'
        },
        {
            music: 'Trong Đợi Người Về',
            singer: 'Cà Na',
            img: './img/14.jpg',
            audio: './music/trongdoi.mp3'
        },
        {
            music: 'Rừng Lá Thấp',
            singer: 'Cà Na',
            img: './img/15.jpg',
            audio: './music/rungla.mp3'
        },
    
    ],

    isPlay: true,
    isRandom: false,
    isRepeat: false,
    songIndex : 0,

    render: function(){
        htmls = this.mp3.map((song,index)=>{
            return `
            <div class="song ${this.songIndex == index ? "active" : ""}">
            <div class="song-img">
                <div class="img" style = "background-image: url(${song.img})"></div>
            </div>
            <div class="song-body">
                <h3 class="name">${song.music}</h3>
                <h5 class="singer">${song.singer}</h5>
            </div>
            <div class="option">
                <i class="fa-solid fa-ellipsis"></i>
            </div>
        </div>`
        })

        boxList.innerHTML = htmls.join("")
    },

    currentSong: function(){
        headName.textContent = this.mp3[this.songIndex].music;
        cdImg.style.backgroundImage = `url(${this.mp3[this.songIndex].img})`;
        audio.src = this.mp3[this.songIndex].audio;
    },

    handleEvent: function(){
        _this = this;
        btnPlay.onclick = ()=>{
            if(_this.isPlay) audio.play();
            else audio.pause();
        }
        audio.onplay = ()=>{
            _this.isPlay = false;
            iconPause.classList.add('no')
            cdImg.classList.add('isPlay')
            iconPlay.classList.remove('no')
        }
        audio.onpause = ()=>{
            _this.isPlay = true;
            iconPlay.classList.add('no')
            iconPause.classList.remove('no')
            cdImg.classList.remove('isPlay')
        }
        btnNext.onclick = ()=>{
            if(_this.isRandom) _this.Random();
            else _this.Next();

            _this.loadNewSong()
        }
        btnPrev.onclick = ()=>{
            if(_this.isRandom) _this.Random();
            else  _this.Prev()

            _this.loadNewSong()
        }
        btnRandom.onclick = ()=>{
            _this.isRandom = !_this.isRandom;
            btnRandom.classList.toggle('active')
        }
        btnRepeat.onclick = ()=>{
            _this.isRepeat = !_this.isRepeat;
            btnRepeat.classList.toggle('active')
        }
        list.onclick = (e)=>{
            const song = $$('.song')
            if(e.target.closest('.song')){
                index = [...song].findIndex((item)=>e.target.closest('.song')==item)
                _this.songIndex = index;
                _this.loadNewSong()
            }
        }
        audio.ontimeupdate = ()=>{
            currentTime.textContent = _this.current();
            durationTime.textContent = _this.duration();

            progress.max = audio.duration;
            progress.value =  audio.currentTime;
        }
        progress.onchange = ()=>{
            audio.duration = progress.max;
            audio.currentTime = progress.value;
        }
        audio.onended = ()=>{
            if(_this.isRandom) _this.Random();
            else if(_this.isRepeat) _this.songIndex;
            else _this.Next()

            _this.loadNewSong()
        }
        list.onscroll = ()=>{
            newCdHeight = cdImg.scrollHeight - list.scrollTop;
            if(newCdHeight<5) newCdHeight = 0;
            cd.style.height = `${newCdHeight}px`;
            cd.style.opacity = newCdHeight/cdImg.scrollHeight;
        }
    },
    Next: function(){
        if(this.songIndex >= this.mp3.length-1) this.songIndex = 0;
        else this.songIndex ++;
    },
    Prev: function(){
        if(this.songIndex <= 0) this.songIndex = this.mp3.length-1;
        else this.songIndex --;
    },
    Random: function(){
        do{ random = Math.floor(Math.random()*this.mp3.length) }
        while(this.songIndex == random)     
        return this.songIndex = random;
    },
    loadNewSong: function(){
        _this.currentSong()
        _this.render()
        audio.play()
    },
    current: function(){
        let curr = audio.currentTime;
        let fl = parseInt;

        let minute = fl(curr/60);
        let secont = fl(curr%60)>9?fl(curr%60):'0'+fl(curr%60);

        return `${minute}:${secont}`
    },
    duration: function(){
        let dur = audio.duration;
        let fl = parseInt;

        let minute = fl(dur/60);
        let secont = fl(dur%60)>9?fl(dur%60):'0'+fl(dur%60);
        if(audio.duration) return `${minute}:${secont}`;
        else return '0:00'
    },

    start: function(){
        this.render();
        this.currentSong();
        this.handleEvent()
    }
}

app.start()


                                // form Image
            
const url = 'http://localhost:3000/na';

const boxImg = $('.box-img')
const button = $('.button')
const inputImg = $('#inputImg')
const inputText = $('#inputText')
const iconClose = $('.close')

let output = [];
const render = (course)=>{
    course.forEach(course =>{
        output.unshift( `
        <div class="item-img" data-id = ${course.id}>
            <p class="text-img">${course.text}</p>
            <i class="fa-solid fa-xmark close"></i>
            <img src="${course.img}" alt="ảnh lỗi" class="img-left">
        </div>`)
    })
    boxImg.innerHTML = output.join('');
}

fetch(url)
 .then(res => res.json())
 .then(data => render(data))

boxImg.addEventListener('click',(e)=>{
    e.preventDefault();

    if(e.target.matches('.close')){
        let id = e.target.parentElement.dataset.id
        fetch(`${url}/${id}`,{
            method: 'DELETE',
        })
          .then(res => res.json())
          .then(() => location.reload())
    }
})

button.addEventListener('click',(e)=>{
    e.preventDefault();
    fetch(url, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({
            img: inputImg.value,
            text: inputText.value
        })
    })
    .then(res => res.json())
    .then(data => {
        const dataArr = [];
        dataArr.push(data)
        render(data);
    })
})

                            // box-right

const light = $('.light')
const timeDate = $('.date-time')
const randomText = $('.random-text')
const boxVideo = $('.box-video')
const btnVideo = $('.button-video')
const inputVideo = $('.url-video')

var br = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
light.addEventListener('click',handlecolor)
function handlecolor(){
  change = '';
  for(var i = 0 ; i < 6; i ++){
      ran = Math.floor(Math.random()*br.length)
      change += br[ran]
    }
    boxRight.style.background = `#${change}`;
    light.classList.add('active')
}

setInterval(time,500)
function time(){
    hour = new Date()
    let h = hour.getHours()
    let mi = hour.getMinutes()
    let m = mi<10?'0'+mi:mi
    let se = hour.getSeconds()
    let s = se<10?'0'+se:se

    timeDate.textContent = `${h}:${m}:${s}`
}

const joke = "https://icanhazdadjoke.com/";
const load = document.querySelector('.load')
async function api(){
   const response = await fetch(joke,{
    headers: {
      Accept: "application/json",
    } 
   });
   const data = await response.json();
   return data;
}
randomText.addEventListener('click',handle)
async function handle(){
  load.classList.remove('no')
  randomText.classList.add('no')
  data = await api()
  load.classList.add('no')
  randomText.textContent = data.joke;
  randomText.classList.remove('no')
}

 // url video
btnVideo.addEventListener('click',handleVideo)
function handleVideo(){
    value = inputVideo.value;
    newValue = value.replace('width="853" height="480"', 'width="100%" height="380px"')
    boxVideo.innerHTML = newValue;
    inputVideo.value = "";
}

                    // Responsive

const boxRight = $('.box-right')
const boxLeft = $('.box-left')
const boxCenter = $('.box-music')
const btnNav = $('.nav')

let wid = document.body.offsetWidth
if( wid < 740 || (wid>= 740 && wid < 1023) ){
    let i = 1;

    btnNav.addEventListener('click',handleNav)
    function handleNav(){
        if(i>=3) i=1;
        else i++;
        nav()
    }
    nav()
    function nav(){
        if(i==1){
            boxRight.classList.add('no')
            boxLeft.classList.add('no')
            boxCenter.classList.remove('no')
        }
        else if(i==2){
            boxRight.classList.remove('no')
            boxLeft.classList.add('no')
            boxCenter.classList.add('no')
        }
        else{
            boxRight.classList.add('no')
            boxLeft.classList.remove('no')
            boxCenter.classList.add('no')
        }
    }
}

console.log(body.offsetWidth)