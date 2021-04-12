import { populate} from './utils/helperFunctions.js';
export default class Board {

  constructor(numberHorizontalTiles, numberVerticalTiles, elementsArray) {
    this.numberHorizontalTiles = numberHorizontalTiles; // width 
    this.numberVerticalTiles = numberVerticalTiles; // height
    this.boardArray = [];
    this.elementsArray = elementsArray; // elements that should populate the map
  }
  setBoardHeightandWidth(){
    document.getElementById("container").style.width = `${this.numberHorizontalTiles*4}em`;
    document.getElementById("container").style.height = `${this.numberVerticalTiles*4}em`;
  }
  generateInitialBoardArray() {
    for (var i = 0; i < this.numberHorizontalTiles; i++) {
      this.boardArray[i] = [];
      for (var j = 0; j < this.numberVerticalTiles; j++) {
        this.boardArray[i][j] = populate(this.elementsArray);
      }
    }
  }
}
