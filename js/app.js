'use strict';
let attempts = 0;
let maxAttempts =25;
let attemptsEl = document.getElementById('attempts');
let goats = [];
let busMallNames =[];
let busMallClicks =[];
let busMallViews =[];
let checkImg = [];

function BusMall(busName) {
    // 'cruisin-goat.jpg'.split('.') >> ['cruisin-goat', 'jpg']
    this.busName = busName.split('.')[0]; // where is the busName valus
    this.source = 'img/' + busName;
    this.clicks = 0;
    this.views = 0;
    busMallNames.push(this.busName);
    
    goats.push(this);
}

// let goat1 = new BusMall('cruisin-goat', 'images/cruisin-goat.jpg');
// let goat2 = new BusMall('float-your-goat.jpg', 'images/float-your-goat.jpg');


let BusMallImg = ['bag.jpg', 'banana.jpg', 'bathroom.jpg',
    'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg',
    'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg',
    'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg',
    'wine-glass.jpg'];

for (let i = 0; i < BusMallImg.length; i++) {
    new BusMall(BusMallImg[i]);
}

function generateImage() {
    return Math.floor(Math.random() * goats.length);
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

    console.log(checkImg);

    while( leftImgIndex === rightImgIndex || middleImgIndex === rightImgIndex ||  middleImgIndex === leftImgIndex || checkImg[0] === rightImgIndex || checkImg[1] === rightImgIndex || checkImg[2] === rightImgIndex 
        || checkImg[0] === leftImgIndex || checkImg[1] === leftImgIndex || checkImg[2] === leftImgIndex
        || checkImg[0] === middleImgIndex || checkImg[1] === middleImgIndex || checkImg[2] === middleImgIndex
        ) {
        leftImgIndex = generateImage();
        rightImgIndex = generateImage();
        middleImgIndex = generateImage();

    }

    checkImg = [leftImgIndex ,rightImgIndex ,middleImgIndex ];



    lImgEl.setAttribute('src', goats[leftImgIndex].source);
    lImgEl.setAttribute('title', goats[leftImgIndex].source);
    goats[leftImgIndex].views++;

    rImgEl.setAttribute('src', goats[rightImgIndex].source);
    rImgEl.setAttribute('title', goats[rightImgIndex].source);
    goats[rightImgIndex].views++;
    attemptsEl.textContent = attempts;

    mImgEl.setAttribute('src', goats[middleImgIndex].source);
    mImgEl.setAttribute('title', goats[middleImgIndex].source);
    goats[middleImgIndex].views++;

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
            goats[leftImgIndex].clicks++;
        } else if (event.target.id === 'rightImg') {
            goats[rightImgIndex].clicks++;
        }
        else if (event.target.id === 'middleImg') {
            goats[middleImgIndex].clicks++;
        }

        renderImg();
     }else {
        let ulEl = document.getElementById('results');
        let liEl;
        for (let i = 0; i < goats.length; i++) {
            liEl = document.createElement('li');
            ulEl.appendChild(liEl);
            liEl.textContent = `${goats[i].busName} has ${goats[i].views} views and has ${goats[i].clicks} clicks.`
             busMallClicks.push(goats[i].clicks)
            busMallViews.push(goats[i].views);
        
        }
        lImgEl.removeEventListener('click', handelClicks);
        rImgEl.removeEventListener('click', handelClicks);
        mImgEl.removeEventListener('click', handelClicks);
        chartRender();
    }
}

function  chartRender() {
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: busMallNames,
        datasets: [{
            label: '# of clicks',
            data:  busMallClicks,
            backgroundColor: [
                
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },{
            label: '# of views',
            data:  busMallViews,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
               
            ],
            borderWidth: 1
        } ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

}