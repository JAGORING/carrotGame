'use strict';

export default class Popup {
  constructor() {
    this.replayContainer = document.querySelector('.replay-container');
    this.replayContainer.addEventListener('click', (e) => {
      if(e.target.classList.contains('replay-btn')){
        this.replayContainer.classList.add('display-none');
        this.onClick && this.onClick();
      }
    });
  }
  setClickListener(onClick) {
    this.onClick = onClick;
  }
  popupContainer(str) {
    this.replayContainer.classList.remove('display-none');
    const content = this.replayContainer.querySelector('.content');
    content.innerText = str;
  }
}