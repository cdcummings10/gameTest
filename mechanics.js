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

Enemy.prototype.randomXGrid = function(randomGridNumber){

};

var enemy1 = new Enemy ( 270, 120, 'enemy1');
var enemy2 = new Enemy ( 170, 220, 'enemy2');

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

//generate random number between 1 and 16
function randomRowSelector(){
  return(Math.floor(Math.random() * (4 - 1 + 1)) + 1);
}

function randomColumnSelector(){
  return(Math.floor(Math.random() * (4 - 1 + 1)) + 1);
}

var grid = document.getElementById('battleGrid');
var gridBlocks = [];
function generateBattleSquare(){
  var newBlock = document.createElement('div');
  grid.appendChild(newBlock);
  newBlock.className = 'battleSquare';
  gridBlocks.push(newBlock);
  newBlock.textContent = gridBlocks.length;
}


var gridForm = document.getElementById('grid_selector');
gridForm.addEventListener('submit', renderBattleGrid);

function renderBattleGrid(e){
  e.preventDefault();
  var choice = e.target.gridSize.value;
  switch (choice) {
  case '2x2':
    console.log('help');
    break;
  default:
    break;
  }
}

var grid = document.getElementById('battleGrid');
function generateNumberOfGrids(x, y){
  var totalSquares = x * y;
  var columns = [];
  for (var j = 0; j < x; j++){
    columns.push(' 100px');
  }
  grid.style.gridTemplateColumns = columns.toString();
  console.log(columns.toString());
  for (var i = 0; i < totalSquares; i++){
    generateBattleSquare();
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
  y: 20,
};

var charNew = document.getElementById('character');

function logKey(key) {
  switch (key.code) {
  case 'KeyW':
  case 'ArrowUp':
    if (charPosition.y < 21){
      break;
    }
    else {
      var charUp = charPosition.y - 100;
      charNew.style.top = charUp + 'px';
      charPosition.y = charUp;
      break;
    }
  case 'KeyS':
  case 'ArrowDown':
    if (charPosition.y > 319){
      break;
    }
    else {
      var charDown = charPosition.y + 100;
      charNew.style.top = charDown + 'px';
      charPosition.y = charDown;
      break;
    }
  case 'KeyA':
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
  case 'KeyD':
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

function attackStart(){
  setTimeout(function(){
    // charNew.className = 'attacking';
    charNew.style.left = charPosition.x + 50 + 'px';
  }, 500);
}

function attackStop(){
  setTimeout(function() {
    charNew.style.left = charPosition.x - 50 + 'px';
    // charNew.className = '';
  }, 1000);
}

function defeatEnemy() {
  for (var i = 0; i < Enemy.enemyList.length; i++) {
    if (charPosition.x - Enemy.enemyList[i].x === -50 && charPosition.y - Enemy.enemyList[i].y === 0 && document.getElementById(Enemy.enemyList[i].label) !== null){
      var enemy = document.getElementById(Enemy.enemyList[i].label);

      //removal
      enemy.remove();
      //animation
      // attackStart();
      // attackStop();
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


