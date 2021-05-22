'use strict';
let attempts = 0;
let maxAttempts = 25;
let attemptsEl = document.getElementById('attempts');
let bussArray = [];
let busMallNames = [];
let busMallClicks = []; 
let busMallViews = [];
let checkImg = [];

let BusMallImg = ['bag.jpg', 'banana.jpg', 'bathroom.jpg',
    'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg',
    'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg',
    'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg',
    'wine-glass.jpg']; // products name

let lImgEl = document.getElementById('leftImg');
let mImgEl = document.getElementById('middleImg');
let rImgEl = document.getElementById('rightImg');

let leftImgIndex;
let rightImgIndex;
let middleImgIndex;




function BusMall(busName) {

    this.busName = busName.split('.')[0]; // give the names 
    this.source = 'img/' + busName;
    this.clicks = 0;
    this.views = 0;
    busMallNames.push(this.busName);
    bussArray.push(this);

}





for (let i = 0; i < BusMallImg.length; i++) {
    new BusMall(BusMallImg[i]);
}


function generateImage() // function responseble to generate images 
 {
    return Math.floor(Math.random() * bussArray.length);
}

function settingImg () // responseble for converting object to string 
{
    let objectData = JSON.stringify(bussArray);
    localStorage.setItem('key',objectData);


}
function gettingItems() // responseble for converting string to object
{
let gettingObj = localStorage.getItem('key')
// console.log(gettingObj);
let normalObj = JSON.parse(gettingObj);
if (normalObj !== null){
    bussArray = normalObj

}
renderImg();
}
gettingItems();




function renderImg() {
    leftImgIndex = generateImage();
    rightImgIndex = generateImage();
    middleImgIndex = generateImage();

 
    while // while loop to make deferant photos
     (leftImgIndex === rightImgIndex || middleImgIndex === rightImgIndex 
        || middleImgIndex === leftImgIndex 
        || checkImg.includes(leftImgIndex ) || checkImg.includes(rightImgIndex )
         || checkImg.includes(middleImgIndex ))
        {
        leftImgIndex = generateImage();
        rightImgIndex = generateImage();
        middleImgIndex = generateImage();

    }

    checkImg = [leftImgIndex, rightImgIndex, middleImgIndex];



    lImgEl.setAttribute('src', bussArray[leftImgIndex].source);
    lImgEl.setAttribute('title', bussArray[leftImgIndex].source);
    bussArray[leftImgIndex].views++;

    rImgEl.setAttribute('src', bussArray[rightImgIndex].source);
    rImgEl.setAttribute('title', bussArray[rightImgIndex].source);
    bussArray[rightImgIndex].views++;
  

    mImgEl.setAttribute('src', bussArray[middleImgIndex].source);
    mImgEl.setAttribute('title', bussArray[middleImgIndex].source);
   
    bussArray[middleImgIndex].views++;
    attemptsEl.textContent = attempts;


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

        let button = document.getElementById('button');
        settingImg ();
        button.addEventListener('click', buttonListener);

        for (let i = 0; i < bussArray.length; i++) {
            liEl = document.createElement('li');
            ulEl.appendChild(liEl);
            liEl.textContent = `${bussArray[i].busName} has ${bussArray[i].views} views and has ${bussArray[i].clicks} clicks.`
            busMallClicks.push(bussArray[i].clicks);
            busMallViews.push(bussArray[i].views);

        }
     
        chartRender();
        button.removeEventListener('click',buttonListener);
    }
}

function buttonListener (){

 let ulEl = document.getElementById('results');
        let liEl;
        for (let i = 0; i < bussArray.length; i++) {
            liEl = document.createElement('li');
            ulEl.appendChild(liEl);
            liEl.textContent = `${bussArray[i].busName} has ${bussArray[i].views} views and has ${bussArray[i].clicks} clicks.`
             busMallClicks.push(bussArray[i].clicks);
            busMallViews.push(bussArray[i].views);
        }

  
}

function chartRender() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: busMallNames,
            datasets: [{
                label: '# of clicks',
                data: busMallClicks,
                backgroundColor: [

                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [

                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }, {
                label: '# of views',
                data: busMallViews,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',

                ],
                borderWidth: 1
            }]
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