'use strict';
import Popup from "./popup.js";
import { GameBuilder, Reason} from "./game.js";

// 당근 클릭 게임
// play: 게임 진행(아이템 세팅 및 클릭, timer 줄어듦)
// pause: 게임 멈추고 replayContainer 표시
// 리플레이: 초기화 및 다시 시작

const popUpBanner = new Popup();
const game = new GameBuilder()
  .withGameDuration(10)
  .withCarrotCnt(10)
  .withBugCnt(10)
  .withPopUpBanner(popUpBanner)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch(reason) {
    case Reason.win:
      message = 'YOU WON🎉';
      break;
    case Reason.lose:
      message = 'YOU LOST🙄';
      break;
    case Reason.cancel:
      message ='Replay❔';
      break;
    case Reason.timeOver:
      message = 'TIME OVER⏰';
      break;
    default:
      throw new Error('Not Valid Reason');
  }
  popUpBanner.popupContainer(message);
});

popUpBanner.setClickListener(() => {
  game.play();
});
