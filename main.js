'use strict';
const playBtn = document.querySelector('.play-btn');
const gamePlace = document.querySelector('.game-place');
const placeRect = gamePlace.getBoundingClientRect();
const replayContainer = document.querySelector('.replay-container');
const time = document.querySelector('.time');
const score = document.querySelector('.score');

let play = false;
let timerCount;
const MAX_IMAGE_SIZE = 80;
let gameScore = 0;
// play: 게임 진행(당근 잡기 및 시간 줄어듦)
// pause: 멈추고 다시시작 표시
// 리플레이: 다시 시작

playBtn.addEventListener('click', () => {
  if(!play) {
    playGame();
    play = true;
    playBtn.innerText = 'stop';
  } else {
    pauseGame();
    play = false;
    playBtn.innerText = 'play_arrow';
    playBtn.style.opacity = 0;
  }
});

replayContainer.addEventListener('click', (e) => {
  if(e.target.classList.contains('replay-btn')){
    replayContainer.classList.add('display-none');
    playGame();
  }
});

function playGame() {
  playBtn.style.opacity = 1;
  timer();
  initGame();
}

function pauseGame() {
  clearInterval(timerCount);
  replayContainer.classList.remove('display-none');
}

function timer() {
  let count = 10;
  timerCount = setInterval(() => {
    time.innerText = `0:${count}`;
    count--;
    if(count < 0) {
      gameOver('lose');
    }
  }, 1000);
}

function initGame() {
  gameScore = 0;
  score.innerText = gameScore;
  createItem('bug', 10, 'img/bug.png');
  createItem('carrot', 10, 'img/carrot.png');
}

function createItem(className, count, imgPath) {
  const minX = 0;
  const minY = 0;
  const maxX = placeRect.width - MAX_IMAGE_SIZE;
  const maxY = placeRect.height - MAX_IMAGE_SIZE;
  for(let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const posX = randomNumber(minX, maxX);
    const posY = randomNumber(minY, maxY);
    item.style.top = `${posY}px`;
    item.style.left = `${posX}px`;
    gamePlace.append(item);
  }
}
function randomNumber(num1, num2) {
  return Math.floor(Math.random() * num2) + num1;
}

gamePlace.addEventListener('click', (e) => {
  clickItem(e.target);
}); 

function clickItem(target){
  if(target.className === 'bug') {
    gameOver('lose');
  }
  if(target.className === 'carrot') {
    gameScore++;
    score.innerText = gameScore;
    if(gameScore === 10) {
      gameOver('win');
    }
    gamePlace.removeChild(target);
  } 
}

function gameOver(str) {
  clearInterval(timerCount);
  replayContainer.classList.remove('display-none');
  const content = replayContainer.querySelector('.content');
  if(str === 'win'){
    content.innerHTML = `YOU WIN <span>🎉</span>`;
  } else {
    content.innerHTML = `YOU LOST <span>🙄</span>`;
  }
}