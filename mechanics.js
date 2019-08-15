'use strict';





//enemies
function Enemy ( x, y, label ) {
  this.x = x,
  this.y = y,
  this.label = label,
  Enemy.enemyList.push(this);
}

Enemy.enemyList = [];

Enemy.prototype.createEnemy = function(){
  var enemy = document.createElement('div');
  var location = document.getElementById('enemies');
  enemy.className = 'enemy';
  enemy.id = this.label;
  location.appendChild(enemy);
};

var enemy1 = new Enemy ( 270, 400, enemy1);
var enemy2 = new Enemy ( 170, 300, enemy2);

function generateEnemies(e){
  e.preventDefault();
  // generateChar();
  for (var i = 0; i < Enemy.enemyList.length; i++){
    Enemy.enemyList[i].createEnemy();
    var current = document.getElementById(Enemy.enemyList[i].label);
    current.style.top = Enemy.enemyList[i].y + 'px';
    current.style.left = Enemy.enemyList[i].x + 'px';
  }
}



//character
var spawn = document.getElementById('spawn');

function generateChar(){
  document.getElementById('character').remove();
  var newChar = document.createElement('div');
  newChar.id = 'character';
  spawn.appendChild(newChar);
  var character = document.getElementById('character');
  character.style.left = 20 + 'px';
  character.style.top = 200 + 'px';
  charPosition.x = 20;
  charPosition.y = 200;
}

var charPosition = {
  x: 20,
  y: 200,
};

var charNew = document.getElementById('character');

function logKey(key) {
  switch (key.code) {
  case 'ArrowUp':
    if (charPosition.y < 201){
      break;
    }
    else {
      var charUp = charPosition.y - 100;
      charNew.style.top = charUp + 'px';
      charPosition.y = charUp;
      break;
    }
  case 'ArrowDown':
    if (charPosition.y > 499){
      break;
    }
    else {
      var charDown = charPosition.y + 100;
      charNew.style.top = charDown + 'px';
      charPosition.y = charDown;
      break;
    }
  case 'ArrowLeft':
    if (charPosition.x < 21){
      break;
    }
    else {
      var charLeft = charPosition.x - 100;
      charNew.style.left = charLeft + 'px';
      charPosition.x = charLeft;
      break;
    }
  case 'ArrowRight':
    if (charPosition.x > 319){
      break;
    }
    else {
      var charRight = charPosition.x + 100;
      charNew.style.left = charRight + 'px';
      charPosition.x = charRight;
      break;
    }
  default:
    break;
  }
}

var score = 0;
function updateScore(){
  var location = document.getElementById('score');
  location.textContent = 'Score: ' + score;
}

function frame(enemyPos){
  var int = setInterval(frame, 5);
  while (Math.abs(charPosition.x - enemyPos) > 5){
    clearInterval(int);
    console.log('ouch');
    charPosition.x++;
    charNew.style.left = charPosition.x + 'px';
    if (charPosition.x - enemyPos !== -50){
      charPosition - 45;
      charNew.style.left = charPosition.x + 'px';
    }
  }
}

function defeatEnemy() {
  for (var i = 0; i < Enemy.enemyList.length; i++) {
    if (charPosition.x - Enemy.enemyList[i].x === -50 && charPosition.y - Enemy.enemyList[i].y === 0  && document.getElementById(Enemy.enemyList[i].label) !== null){
      var enemy = document.getElementById(Enemy.enemyList[i].label);

      //animation
      // frame(Enemy.enemyList[i].x);
      //removal
      enemy.remove();
      score++;
      updateScore();
    }
    console.log(score);
  }
}

document.addEventListener('keydown', logKey);
document.addEventListener('keydown', defeatEnemy);
var submitBtn = document.getElementById('reset_enemies');
submitBtn.addEventListener('submit', generateEnemies);


