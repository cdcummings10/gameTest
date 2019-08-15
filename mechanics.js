'use strict';


var character = document.getElementById('character');

var charPosition = {
  x: 20,
  y: 200,
};


function logKey(key) {
  switch (key.code) {
  case 'ArrowUp':
    var charUp = charPosition.y - 50;
    character.style.top = charUp + 'px';
    charPosition.y = charUp;
    break;
  case 'ArrowDown':
    var charDown = charPosition.y + 50;
    character.style.top = charDown + 'px';
    charPosition.y = charDown;
    break;
  case 'ArrowLeft':
    var charLeft = charPosition.x - 50;
    character.style.left = charLeft + 'px';
    charPosition.x = charLeft;
    break;
  case 'ArrowRight':
    var charRight = charPosition.x + 50;
    character.style.left = charRight + 'px';
    charPosition.x = charRight;
    break;
  default:
    break;
  }
}

document.addEventListener('keydown', logKey);
