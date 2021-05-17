'use strict';
let attempts = 0;
let maxAttempts = 25;
let attemptsEl = document.getElementById('attempts');
let bussArray = [];
function BusMall(busName) {

    this.busName = busName.split('.')[0];
    this.source = 'img/' + busName;
    this.clicks = 0;
    this.views = 0;
    bussArray.push(this);
}

let BusMallImg = ['bag.jpg', 'banana.jpg', 'bathroom.jpg',
    'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg',
    'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg',
    'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg',
    'wine-glass.jpg'];

for (let i = 0; i < BusMallImg.length; i++) {
    new BusMall(BusMallImg[i]);
}

function generateImage() {
    
    return Math.floor(Math.random() * bussArray.length);
}


let lImgEl = document.getElementById('leftImg');
let mImgEl = document.getElementById('middleImg');
let rImgEl = document.getElementById('rightImg');

let leftImgIndex;
let rightImgIndex;
let middleImgIndex;
function renderImg() {
    leftImgIndex = generateImage();
    rightImgIndex = generateImage();
    middleImgIndex = generateImage();

    while ((leftImgIndex === rightImgIndex) || (middleImgIndex === rightImgIndex) || (middleImgIndex === leftImgIndex)) {
        leftImgIndex = generateImage();
        rightImgIndex = generateImage();
        middleImgIndex = generateImage();

    }

    lImgEl.setAttribute('src', bussArray[leftImgIndex].source);
    lImgEl.setAttribute('title', bussArray[leftImgIndex].source);
    bussArray[leftImgIndex].views++;

    rImgEl.setAttribute('src', bussArray[rightImgIndex].source);
    rImgEl.setAttribute('title', bussArray[rightImgIndex].source);
    bussArray[rightImgIndex].views++;
    attemptsEl.textContent = attempts;

    mImgEl.setAttribute('src', bussArray[middleImgIndex].source);
    mImgEl.setAttribute('title', bussArray[middleImgIndex].source);
    bussArray[middleImgIndex].views++;


}
renderImg();

lImgEl.addEventListener('click', handelClicks);
rImgEl.addEventListener('click', handelClicks);
mImgEl.addEventListener('click', handelClicks);

function handelClicks(event) {
    attempts++;
    if (attempts <= maxAttempts) {
        console.log(event.target.id)
        if (event.target.id === 'leftImg') {
            bussArray[leftImgIndex].clicks++;
        } else if (event.target.id === 'rightImg') {
            bussArray[rightImgIndex].clicks++;
        }
        else if (event.target.id === 'middleImg') {
            bussArray[middleImgIndex].clicks++;
        }

        renderImg();
    } else {
       
        lImgEl.removeEventListener('click', handelClicks);
        rImgEl.removeEventListener('click', handelClicks);
        mImgEl.removeEventListener('click', handelClicks);
    }
}

let button = document.getElementById('button');
button.addEventListener('click', buttonListener);

function buttonListener (){

 let ulEl = document.getElementById('results');
        let liEl;
        for (let i = 0; i < bussArray.length; i++) {
            liEl = document.createElement('li');
            ulEl.appendChild(liEl);
            liEl.textContent = `${bussArray[i].busName} has ${bussArray[i].views} views and has ${bussArray[i].clicks} clicks.`
        }

    button.removeEventListener('click',buttonListener);
}