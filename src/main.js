'use strict';
import Popup from "./popup.js";
import Game from "./game.js";

// 당근 클릭 게임
// play: 게임 진행(아이템 세팅 및 클릭, timer 줄어듦)
// pause: 게임 멈추고 replayContainer 표시
// 리플레이: 초기화 및 다시 시작

const popUpBanner = new Popup();
const game = new Game(5, 5, 5, popUpBanner);

popUpBanner.setClickListener(() => {
  game.play();
});
