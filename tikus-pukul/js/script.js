const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const papanSkor = document.querySelector('.skor');
const skorTertinggi = document.querySelector('.skor-tertinggi');
const countdown = document.querySelector('.countdown');

let tanahSebelumnya;
let selesai;
let skor;
let highScore = 0;
let waktu = 10000;

function randomTanah(tanah) {
    const t = Math.floor(Math.random() * tanah.length);
    const tRandom = tanah[t];
    if(tRandom == tanahSebelumnya)  {
        randomTanah(tanah);
    }
    tanahSebelumnya = tRandom;
    return tRandom;
}

function randomWaktu(min,max) {
    return Math.round(Math.random() * (max - min) + min);
}

function munculkanTikus() {
    const tRandom = randomTanah(tanah);
    const wRandom = randomWaktu(200,1000);
    tRandom.classList.add('muncul');

    setTimeout(() => {
       tRandom.classList.remove('muncul');
       if(!selesai) {
           munculkanTikus();
       }
    }, wRandom);
}

function mulai() {
    selesai = false;
    skor = 0;
    papanSkor.innerHTML = 0;
    countdown.innerHTML = 10;
    munculkanTikus();
    let wMundur = parseInt(seconds());
    var Timer = setInterval(() => {
        if(wMundur <= 1){
            clearInterval(Timer);
          }
          countdown.innerHTML =  wMundur - 1;
          wMundur -= 1;
    }, 1000);

    setTimeout(() => {
        selesai = true;
        skorTertinggi.innerHTML = setHighScore();
    }, waktu);
}

function setHighScore() {
    if(skor > highScore){
        highScore = skor;
    }
    return highScore;
}

function pukul() {
    skor++;
    papanSkor.innerHTML = skor;
    this.parentNode.classList.remove('muncul');
    this.style.transition = "top 0s";
}

function seconds() {
    let detik = ((waktu % 60000) / 1000).toFixed(0);
    return detik;
}

tikus.forEach(t => {
    t.addEventListener('click', pukul);
})


