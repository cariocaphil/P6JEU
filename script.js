import Player from './player.js';
import Weapon from './weapon.js';
import Game from './game.js';
import Board from './board.js';
import { hide, show } from './utils/helperFunctions.js';
import { endOfGame, goodbyeScreen, container, ruleHeader } from './utils/constants.js';
import handleNameForm from './handleNameForm.js';

import { boardWidth, boardHeight } from './utils/constants.js';

let gamePlayers = [];
const imagePlayer1 = './assets/rabbit.png';
const imagePlayer2 = './assets/hedgehog.png';

export const start = (namePlayer1, namePlayer2) => {
  let player1 = new Player(1, namePlayer1, imagePlayer1); // player represented by this number in the boardArray
  let player2 = new Player(2, namePlayer2, imagePlayer2);
  gamePlayers = [player1, player2];
  main(gamePlayers)
}

const handleRestartSame = () => {
  hide(endOfGame);
  gamePlayers = gamePlayers;
    // same players, but have to reset their life points and their arms
  for (let player of gamePlayers) {
    player.lifePoints = 100;
    player.weapon = null;
  }
  show([playInfo, turnInfo, playerInfo])
  main(gamePlayers);
}

const handleRestartNew = () => {

  gamePlayers = []; // erasing the gamePlayers
  let newGameArray = [];
  newGameArray.push(nameForm);
  show(newGameArray);
  hide(endOfGame)
  hide(playInfo);
  nameForm.reset();
  $('#container').empty();
}

const handleQuit = () => {

  hide(endOfGame)
  hide(playInfo);
  hide(infoContainer);
  hide(container);
  hide(ruleHeader)
  show(goodbyeScreen)
}

document.querySelector(".submit").addEventListener("click", handleNameForm);
document.querySelector(".restart").addEventListener("click", handleRestartNew);
document.querySelector(".restart-again").addEventListener("click", handleRestartSame);
document.querySelector(".quit").addEventListener("click", handleQuit);

const weapon1 = new Weapon(3, "Tank", 0, 0, 20);
const weapon2 = new Weapon(4, "Molotov", 0, 0, 16);
const weapon3 = new Weapon(5, "Gun", 0, 0, 12);
const weapon4 = new Weapon(6, "Rocket", 0, 0, 28);

// new game
export const main = (gamePlayers) => {

  const playerArray = gamePlayers;
  const weaponsArray = [weapon1, weapon2, weapon3, weapon4];

  // right hand side indicates how many of a given element
  const boardMapping = { // right hand side indicates how many of a given element
    1: 1, // player1
    2: 1, // player2
    3: 1, // weapon1
    4: 1, // weapon2
    5: 1, // weapon3
    6: 1, // weapon4
    0: 90, // green
    7: 4 // rock
  };

  function createInitialArrayFromMapping(boardMapping) {
    let initialArrayElements = [];
    for (let key in boardMapping) {
      initialArrayElements = initialArrayElements.concat(Array(boardMapping[key]).fill(parseInt(key)));
    }
    return initialArrayElements;
  }

  const initialBoardElementsArray = createInitialArrayFromMapping(boardMapping);
  const board = new Board(boardWidth, boardHeight, initialBoardElementsArray);

  // initializing the board 
  board.setBoardHeightandWidth();
  board.generateInitialBoardArray();

  const game = new Game(playerArray, weaponsArray, board.boardArray);

  // run game
  game.drawGameBoard();
  game.determineInitialPlayer();
  game.initializePlayers();
  game.plyAssignment(game.isCombatMode, game.boardArray);
};