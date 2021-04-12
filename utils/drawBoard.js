import Weapon from "../weapon.js";
//import { weapon1, weapon2, weapon3, weapon4} from '../script.js';
//** for each number in the array there is a div and we drap the map accordingly.
export const drawBoard = (boardArray) => {
  for (let v = 0; v < boardArray.length; v++) {
    for (let w = 0; w < boardArray[v].length; w++) {
      const entity = boardArray[v][w]
      switch (entity) {
        case 0:
          $('#container').append('<div class="empty"></div>');
          break;
        case 1:
          $('#container').append('<div class="player1"></div>');
          break;
        case 2:
          $('#container').append('<div class="player2"></div>');
          break;
        case 3:

          $('#container').append('<div class="weapon1"></div>');
          break;
        case 4:
          $('#container').append('<div class="weapon2"></div>');
          break;
        case 5:
          $('#container').append('<div class="weapon3"></div>');
          break;
        case 6:
          $('#container').append('<div class="weapon4"></div>');
          break;
        case 7:
          $('#container').append('<div class="rock"></div>');
          break;
        default:
          $('#container').append('<div class="empty"></div>');
      }
    }
  }
};