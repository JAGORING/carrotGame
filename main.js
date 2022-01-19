'use strict';
const playBtn = document.querySelector('.play-btn');
const gamePlace = document.querySelector('.game-place');
const placeRect = gamePlace.getBoundingClientRect();
const replayContainer = document.querySelector('.replay-container');
const time = document.querySelector('.time');
const score = document.querySelector('.score');

let play = false;
let timer = undefined;
let carrotCount = undefined;

const MAX_IMAGE_SIZE = 80;
const GAME_TIME_DURATION = 10;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;

const bgm = new Audio('./sound/bg.mp3');
const effect = new Audio();

// 당근 클릭 게임
// play: 게임 진행(아이템 세팅 및 클릭, timer 줄어듦)
// pause: 게임 멈추고 replayContainer 표시
// 리플레이: 초기화 및 다시 시작

playBtn.addEventListener('click', () => {
  if(!play) {
    playGame();
  } else {
    pauseGame();
  }
});

replayContainer.addEventListener('click', (e) => {
  if(e.target.classList.contains('replay-btn')){
    hideTimerAndScore();
    replayContainer.classList.add('display-none');
    playBtn.style.opacity = 1;
    gamePlace.innerHTML = '';
  }
});

gamePlace.addEventListener('click', clickItem); 

function playBgm() {
  bgm.currentTime = 0;
  bgm.play();
}
function playSoundEffect(soundName) {
  const sound = {
    'alert': './sound/alert.wav',
    'bugClick': './sound/bug_pull.mp3',
    'carrotClick': './sound/carrot_pull.mp3',
    'gameWin': './sound/game_win.mp3',
  }
  effect.src = sound[soundName];
  effect.play();
}


function playGame() {
  play = true;
  playBgm();
  initGame();
  showPlayBtn();
  showTimerAndScore();
  startGameTimer();
}

function pauseGame() {
  play = false;
  playSoundEffect('alert');
  hidePlayBtn();
  stopGameTimer('Replay❔');
}

function showPlayBtn() {
  playBtn.innerText = 'stop';
  playBtn.style.opacity = 1;

}
function hidePlayBtn() {
  playBtn.innerText = 'play_arrow';
  playBtn.style.opacity = 0;
}
function showTimerAndScore() {
  time.style.visibility = 'visible';
  score.style.visibility = 'visible';
}
function hideTimerAndScore() {
  time.style.visibility = 'hidden';
  score.style.visibility = 'hidden';
}

function startGameTimer() {
  let count = GAME_TIME_DURATION;
  updateTimerText(count);
  timer = setInterval(() => { 
    if(count === 0) {
      gameOver('TIME OVER⏰');
      return;
    }
    updateTimerText(--count);
  }, 1000);
}

function updateTimerText(count) {
  const minutes = Math.floor(count / 60);
  const secs = count % 60;
  time.innerText = `${minutes}:${secs}`;
}

function stopGameTimer(str) {
  bgm.pause();
  clearInterval(timer);
  popupContainer(str);
}

function popupContainer(str) {
  replayContainer.classList.remove('display-none');
  const content = replayContainer.querySelector('.content');
  content.innerText = str;
}

function initGame() {
  carrotCount = CARROT_COUNT;
  gamePlace.innerHTML = '';
  updateScoreText(CARROT_COUNT);
  createItem('bug', BUG_COUNT, 'img/bug.png');
  createItem('carrot', CARROT_COUNT, 'img/carrot.png');
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
    
    const posX = randomNumber(minX, maxX);
    const posY = randomNumber(minY, maxY);
    item.style.position = 'absolute';
    item.style.top = `${posY}px`;
    item.style.left = `${posX}px`;
    gamePlace.append(item);
  }
}
function randomNumber(num1, num2) {
  return Math.floor(Math.random() * num2) + num1;
}

function clickItem(e){
  if(e.target.matches('.bug')) {
    playSoundEffect('bugClick');
    gameOver('YOU LOST🙄');
  } else if(e.target.matches('.carrot')) {
    playSoundEffect('carrotClick');
    updateScoreText(--carrotCount);
    if(carrotCount === 0) {
      playSoundEffect('gameWin');
      gameOver('YOU WON🎉');
    }
    gamePlace.removeChild(e.target);
  } 
}

function updateScoreText(count) {
  score.innerText = count;
}

function gameOver(str) {
  play = false;
  bgm.pause();
  clearInterval(timer);
  hidePlayBtn();
  popupContainer(str);
}