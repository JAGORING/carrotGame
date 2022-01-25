'use strict';

export default class Sound {
  constructor() {
    this.bgm = new Audio('./sound/bg.mp3');
    this.effect = new Audio();
  }

  playBgm() {
    this.bgm.currentTime = 0;
    this.bgm.play();
  }

  pauseBgm() {
    this.bgm.pause();
  }
  
  playEffect(soundName) {
    const sound = {
      'alert': './sound/alert.wav',
      'bugClick': './sound/bug_pull.mp3',
      'carrotClick': './sound/carrot_pull.mp3',
      'gameWin': './sound/game_win.mp3',
    }
    this.effect.src = sound[soundName];
    this.effect.play();
  }
}