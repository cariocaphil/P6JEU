import { drawBoard} from './drawBoard.js';

export const render =   (mapArray) => {
  $('#container').empty();
  drawBoard(mapArray);
};