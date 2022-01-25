'use strict';
import Popup from "./popup.js";
import Field from "./field.js";
import Sound from "./sound.js";

const playBtn = document.querySelector('.play-btn');
const time = document.querySelector('.time');
const score = document.querySelector('.score');

let play = false;
let timer = undefined;
let carrotCount = undefined;

const GAME_TIME_DURATION = 10;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;

const gameSound = new Sound();
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

const popUpBanner = new Popup();
popUpBanner.setClickListener(() => {
  playGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick); 

function onItemClick(type){
  if(type === 'bug') {
    gameSound.playEffect('bugClick');
    gameOver('YOU LOST🙄');
  } else if(type === 'carrot') {
    gameSound.playEffect('carrotClick');
    updateScoreText(--carrotCount);
    if(carrotCount === 0) {
      gameSound.playEffect('gameWin');
      gameOver('YOU WON🎉');
    }
  } 
}

function playGame() {
  play = true;
  gameSound.playBgm();
  initGame();
  showPlayBtn();
  showTimerAndScore();
  startGameTimer();
}

function pauseGame() {
  play = false;
  gameSound.playEffect('alert');
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
  gameSound.pauseBgm();
  clearInterval(timer);
  popUpBanner.popupContainer(str);
}

function initGame() {
  carrotCount = CARROT_COUNT;
  updateScoreText(CARROT_COUNT);
  gameField.init();
}

function updateScoreText(count) {
  score.innerText = count;
}

function gameOver(str) {
  play = false;
  gameSound.pauseBgm();
  clearInterval(timer);
  hidePlayBtn();
  popUpBanner.popupContainer(str);
}