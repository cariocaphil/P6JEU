// function that is useful for handling player movement (see swapX and swapY in Player)
export const swapArrayElements = (arr, indexA, indexB, indexC, indexD) => {
  var temp = arr[indexA][indexB];
  arr[indexA][indexB] = arr[indexC][indexD];
  arr[indexC][indexD] = temp;
};

// helper function for hiding elements
// source: https://stackoverflow.com/questions/21070101/show-hide-div-using-javascript
export const hide = (elements) => {
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) {
    elements[index].style.display = 'none';
  }
}

// helper function for showing elements
// source: https://stackoverflow.com/questions/21070101/show-hide-div-using-javascript
export const show = (elements, specifiedDisplay) => {
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) {
    elements[index].style.display = specifiedDisplay || 'block';
  }
} 

// returns a shuffled array, function we use in determineInitialPlayer
// source: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export const shuffleArray = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

// function that allows to shuffle the initial distribution of elements to create a random map.
export const shuffleMap = (mapArray) => {
  function fisherYates(myArray) {
    var i = myArray.length,
      j, tempi, tempj;
    if (i === 0) return false;
    while (--i) {
      j = Math.floor(Math.random() * (i + 1));
      tempi = myArray[i];
      tempj = myArray[j];
      myArray[i] = tempj;
      myArray[j] = tempi;
    }
  }

  mapArray.forEach(fisherYates);
};

export const populate = (array) => {
  while (array.length) {
    var index = Math.floor(Math.random() * array.length);
    const randomItem = array[index]; 
    array.splice(index, 1);
    return randomItem; // Remove the item from the array
  }
}
