// handling the form where you can enter the player's names

import {hide, show} from './utils/helperFunctions.js';
import {start} from './script.js';

const handleNameForm = (event) => {
  event.preventDefault();
  const nameForm = document.getElementById("nameForm");
  let namePlayer1 = document.getElementById("namePlayer1").value;
  let namePlayer2 = document.getElementById("namePlayer2").value;
  const namesDecided = namePlayer1 !== '' && namePlayer2 !== '';
  
  if (namesDecided) {
    hide([nameForm]);
    show([playInfo, turnInfo, playerInfo])
    start(namePlayer1, namePlayer2);
  }
}

export default handleNameForm;
