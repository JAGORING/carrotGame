'use strict';
import Field from "./field.js";
import Sound from "./sound.js";

export default class Game {
  constructor(gameTimeDuration, carrot_cnt, bug_cnt, popUpBanner) {
    this.gameTimeDuration = gameTimeDuration;
    this.carrot_cnt = carrot_cnt;
    this.bug_cnt = bug_cnt;
    this.popUpBanner = popUpBanner;

    this.playBtn = document.querySelector('.play-btn');
    this.time = document.querySelector('.time');
    this.score = document.querySelector('.score');
    
    this.started = false;
    this.timer = undefined;
    this.carrotCount = undefined;

    this.playBtn.addEventListener('click', () => {
      if(!this.started) {
        this.play();
      } else {
        this.pause();
      }
    });

    this.gameField = new Field(this.carrot_cnt, this.bug_cnt);
    this.gameField.setClickListener(this.onItemClick); 
    this.gameSound = new Sound();
  }

  onItemClick=(type)=>{
    if(type === 'bug') {
      this.gameSound.playEffect('bugClick');
      this.gameOver('YOU LOST🙄');
    } else if(type === 'carrot') {
      this.gameSound.playEffect('carrotClick');
      this.updateScoreText(--this.carrot_cnt);
      if(this.carrot_cnt === 0) {
        this.gameSound.playEffect('gameWin');
        this.gameOver('YOU WON🎉');
      }
    } 
  }

  play() {
    this.started = true;
    this.gameSound.playBgm();
    this.init();
    this.showPlayBtn();
    this.showTimerAndScore();
    this.startGameTimer();
  }
  
  pause() {
    this.started = false;
    this.gameSound.playEffect('alert');
    this.hidePlayBtn();
    this.stopGameTimer('Replay❔');
  }

  init() {
    this.carrotCount = this.carrot_cnt;
    this.updateScoreText(this.carrot_cnt);
    this.gameField.init();
  }

  showPlayBtn() {
    this.playBtn.innerText = 'stop';
    this.playBtn.style.opacity = 1;
  }

  hidePlayBtn() {
    this.playBtn.innerText = 'play_arrow';
    this.playBtn.style.opacity = 0;
  }

  showTimerAndScore() {
    this.time.style.visibility = 'visible';
    this.score.style.visibility = 'visible';
  }

  updateScoreText(count) {
    this.score.innerText = count;
  }

  startGameTimer() {
    let count = this.gameTimeDuration;
    this.updateTimerText(count);
    this.timer = setInterval(() => { 
      if(count === 0) {
        this.gameOver('TIME OVER⏰');
        this.gameSound.playEffect('alert');
        return;
      }
      this.updateTimerText(--count);
    }, 1000);
  }

  stopGameTimer(str) {
    this.gameSound.pauseBgm();
    clearInterval(this.timer);
    this.popUpBanner.popupContainer(str);
  }

  updateTimerText(count) {
    const minutes = Math.floor(count / 60);
    const secs = count % 60;
    this.time.innerText = `${minutes}:${secs}`;
  }

  gameOver(str) {
    this.started = false;
    this.gameSound.pauseBgm();
    clearInterval(this.timer);
    this.hidePlayBtn();
    this.popUpBanner.popupContainer(str);
  }
}