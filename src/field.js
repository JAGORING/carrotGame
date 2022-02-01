'use strict';

const MAX_IMAGE_SIZE = 85;

export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug'
});
export class Field {
  constructor(CARROT_COUNT, BUG_COUNT) {
    this.carrotCnt = CARROT_COUNT;
    this.bugCnt = BUG_COUNT;
    this.gamePlace = document.querySelector('.game-place');
    this.placeRect = this.gamePlace.getBoundingClientRect();
    this.gamePlace.addEventListener('click', this.onClick);
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  init() {
    this.gamePlace.innerHTML = '';
    this.createItem('bug', this.bugCnt, 'img/bug.png');
    this.createItem('carrot', this.carrotCnt, 'img/carrot.png');
  }

  createItem(className, count, imgPath) {
    const minX = 0;
    const minY = 0;
    const maxX = this.placeRect.width - MAX_IMAGE_SIZE;
    const maxY = this.placeRect.height - MAX_IMAGE_SIZE;
    for(let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      
      const posX = randomNumber(minX, maxX);
      const posY = randomNumber(minY, maxY);
      item.style.position = 'absolute';
      item.style.top = `${posY}px`;
      item.style.left = `${posX}px`;
      this.gamePlace.append(item);
    }
  }

  onClick = (e) => {
    if(e.target.matches('.bug')) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    } else if(e.target.matches('.carrot')) {
      this.onItemClick && this.onItemClick(ItemType.carrot);
      this.gamePlace.removeChild(e.target);
    } 
  }
}

function randomNumber(num1, num2) {
  return Math.floor(Math.random() * num2) + num1;
}