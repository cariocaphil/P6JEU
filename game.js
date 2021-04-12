
import { drawBoard } from './utils/drawBoard.js';
import { shuffleArray, hide, show } from './utils/helperFunctions.js';
import { render } from './utils/render.js';
import { endOfGame, player1info, player2info, turnInfo, playInfo, attributesPlayer1Tag, attributesPlayer2Tag, namePlayer1Tag, namePlayer2Tag, combatInfo, boardWidth, boardHeight } from './utils/constants.js';
const changeSound = 'changeSound.mp3';
const startSound = 'startSound.mp3';
const completedSound = 'completedSound.mp3';
const blockSound = 'blockSound.mp3';
const combatStartSound = 'combatStartSound.mp3';

export default class Game {
  constructor(playerArray, weaponsArray, boardArray) {
    this.player1 = playerArray[0];
    this.player2 = playerArray[1];
    this.playerArray = playerArray;
    this.currentPly = null;
    this.notCurrentPly = null;
    this.weaponsArray = weaponsArray;
    this.boardArray = boardArray;
    this.isCombatMode = false;
    this.combatCount = 0;
    this.isGameOver = false;
    this.gameWinner = null;
    this.plyCount = 0;
    this.reversePlyCount = 3;
    this.damageBalance = 0;
  }
  drawGameBoard() {
    drawBoard(this.boardArray);
  }
  determineInitialPlayer() {
    shuffleArray(this.playerArray);
    this.currentPly = this.playerArray[0]; // this player will have the first turn.
    this.notCurrentPly = this.playerArray[1];
  };

  initializePlayers() {
    for (const player of this.playerArray) {
      player.locatePosition(this.boardArray);
    }
    this.displayPlayInfo();
    this.loadAudio(startSound).play()
  }
  plyAssignment() {
    if (this.currentPly === this.player1) {
      this.handleKeyboardInput(this.player1);
    } else {
      this.handleKeyboardInput(this.player2);
    }
  }
  handleKeyboardInput(player) {
    document.onkeydown = (e) => {
      if (!this.isGameOver) {
        if (this.isCombatMode === false) {

          switch (e.which) {
            case 37: // left - 1

              this.movePlayer(0, (-1), player);
              break;

            case 39: // right + 1

              this.movePlayer(0, (+1), player);
              break;

            case 38: // up - 1

              this.movePlayer((-1), 0, player);
              break;

            case 40: // down + 1

              this.movePlayer((+1), (0), player);
              break;
          }
        } else {
          switch (e.which) {
            case 37: // left - 1
              this.damageBalance = this.currentPly.defend(this.damageBalance);
              this.combatCount += 1
              this.plyChange();
              this.displayPlayInfo();
              break;

            case 39: // right + 1
              this.damageBalance = this.currentPly.attack(this.damageBalance);
              this.combatCount += 1
              this.plyChange();
              this.displayPlayInfo();
              break;
          }
        }
      }
    }
  }
  canGoToField = (newPosY, newPosX) => {
    const outside = [newPosY, newPosX].includes(-1) || newPosY === boardHeight || newPosX === boardWidth;
    const field = outside ? null : this.boardArray[newPosY][newPosX];
    const isBlocked = ([7, 1, 2].includes(field));
    debugger;
    const isOtherPlayer = ([1, 2]).includes(field);
    if (isOtherPlayer) {
      this.isCombatMode = true;
      this.loadAudio(combatStartSound).play()
    }
    if (outside || isBlocked) {
      return false;
    } else {
      return true;
    }
  }
  nextFieldIsWeapon = (newPosY, newPosX) => {
    const field = this.boardArray[newPosY][newPosX];
    const isWeapon = ([3, 4, 5, 6].includes(field));
    return isWeapon;
  }
  movePlayer = (yValue, xValue, player) => {
    const posX = player.getPlayerX();
    const posY = player.getPlayerY();
    const newPosY = parseInt(posY) + (parseInt(yValue));
    const newPosX = parseInt(posX) + (parseInt(xValue));

    if (this.canGoToField(newPosY, newPosX, player)) {
      this.plyCounting();
      if (this.nextFieldIsWeapon(newPosY, newPosX)) {
        const newWeapon = this.boardArray[newPosY][newPosX]; // this is a number representing a weapon
        if (player.weapon == null) {
          let isChangingWeapons = false;
          this.swapPositions(newPosY, newPosX, player, isChangingWeapons);
        } else {
          let isChangingWeapons = true;
          player.previousWeapon = player.weapon;
          this.swapPositions(newPosY, newPosX, player, isChangingWeapons);
        }
        player.weapon = this.weaponsArray.find((item) => item.number === newWeapon); // in the player we store the weapon object, not the number representing the weapon
      } else { // if there was no weapon, he moves on as usual
        this.swapPositions(newPosY, newPosX, player);
      }
      this.loadAudio(completedSound).play();
      render(this.boardArray);

    } else { // canGoToField check is negative; can't got there
      this.loadAudio(blockSound).play()
    }
    this.displayPlayInfo();
  }
  swapPositions = (newPosY, newPosX, player, isChangingWeapons) => {
    if (isChangingWeapons) {
      this.boardArray[player.posY][player.posX] = player.previousWeapon && player.previousWeapon.number;
    } else {
      this.boardArray[player.posY][player.posX] = 0;
    }
    player.posY = newPosY;
    player.posX = newPosX;
    this.boardArray[player.posY][player.posX] = player.number;
  }

  //** for counting each ply and calling the plyChange function after 3 plys in order to give the next ply to the other player (used in playerMovement)
  plyCounting = () => {
    this.plyCount += 1;
    this.reversePlyCount -= 1;

    if (this.isGameOver === false) {
      if (this.isCombatMode === false) {
        if (this.plyCount % 3 === 0) {
          this.plyChange();
          this.reversePlyCount = 3;
        }
      } else {
        plyChange();
      }
      this.displayPlayInfo();
    }
  }
  plyChange = () => {
    this.loadAudio(changeSound).play()
    if (this.isGameOver == false) {
      // toggle the current player
      if (this.currentPly == this.player1) {
        this.currentPly = this.player2;
        this.notCurrentPly = this.player1;
        this.handleKeyboardInput(this.player2);
      } else {
        this.currentPly = this.player1;
        this.notCurrentPly = this.player2;
        this.handleKeyboardInput(this.player1);
      }
    }
  }
  displayPlayInfo = () => {

    this.player1 && this.player1.name ? namePlayer1Tag.innerHTML = "" + this.player1.name + "" : " ";
    this.player2 && this.player2.name ? namePlayer2Tag.innerHTML = "" + this.player2.name + "" : " ";
    player1info.children[0].setAttribute("src", this.player1.image);
    player2info.children[0].setAttribute("src", this.player2.image);

    if (this.currentPly === this.player1) {
      player1info.classList.add("current-player");
      player2info.classList.remove("current-player");
    } else {
      player2info.classList.add("current-player");
      player1info.classList.remove("current-player");
    }
    const infoTotalMovesContent = "<br>Total number of moves made: " + this.plyCount;
    const infoMovesLeftContent = "<br>Number of moves left for " + this.currentPly.name + ": " + this.reversePlyCount;
    const infoTurnContent = (this.reversePlyCount === 3 && this.plyCount > 1) ? "<br>" + this.notCurrentPly.name + ", you've run out of plays. It's the next player's turn!<br>" : "";
    const infoCombatContent = "<br>We are in combat mode!<br><br>Press right arrow to attack or left arrow to defend!<br><br>If you defend, damage will be reduced by 50%!";
    const infoPlayContent = infoTurnContent + infoMovesLeftContent + infoTotalMovesContent;

    if (this.isCombatMode && this.combatCount > 0) {
      combatInfo.innerHTML = this.notCurrentPly.weapon ? "<br>" + this.notCurrentPly.name + " has attacked with a " + this.notCurrentPly.weapon.name + "<br>creating potential damage of " + this.notCurrentPly.weapon.force + " life points<br><br>" + this.notCurrentPly.name + " had " + this.notCurrentPly.previousLifePoints + " life points before the attack <br>and now has " + this.notCurrentPly.lifePoints + " life points. <br>" : "No weapon to attack. Hence no damage";
    }

    playInfo.innerHTML = this.isCombatMode ? infoCombatContent : infoPlayContent;
    turnInfo.innerHTML = "<br>It's " + this.currentPly.name + "'s turn!";

    const playerAttributes = {
      0: attributesPlayer1Tag,
      1: attributesPlayer2Tag
    };
    const playerCardAttributesContent = (player) => {
      return "<li> Life Points: " + player.lifePoints + "</li><li>Current Weapon: " + (player.weapon ? player.weapon.name : "None") + "</li><li>Weapon Force: " + (player.weapon ? player.weapon.force : "None") + "<li><li>Score: " + player.score + "</li>";
    }

    playerAttributes[0].innerHTML = playerCardAttributesContent(this.player1);
    playerAttributes[1].innerHTML = playerCardAttributesContent(this.player2);

    for (let player of this.playerArray) {
      if (player.lifePoints <= 0) {
        this.isGameOver = true;
      }
    }
    if (this.isGameOver) {
      this.isCombatMode = false;
      this.gameWinner = this.playerArray.find(player => player.lifePoints > 0);
      this.gameWinner.score += 1;
      playInfo.innerHTML = "<br>Game Over! " + this.gameWinner.name + " has won! Congrats!<br><br>Do you want to play again?";
      hide(turnInfo);
      hide(combatInfo);
      hide(playerInfo);
      $('#container').empty();
      let endOfGameArray = [];
      endOfGameArray.push(endOfGame);
      show(endOfGameArray, 'block');
    }
  }
  loadAudio(filename) {
    const file = `./assets/${filename}?cb=${new Date().getTime()}`
    const audio = new Audio(file)
    audio.load()
    return audio;
  }
}


