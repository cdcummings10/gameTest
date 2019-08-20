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
    var currentY = ((randomColumnSelector() - 1) * 100) + 20;
    current.style.top = currentY + 'px';
    Enemy.enemyList[i].y = currentY;
    var currentX = ((randomRowSelector() - 1) * 100) + 70;
    Enemy.enemyList[i].x = currentX;
    current.style.left = currentX + 'px';
  }
}
var rows = 4;
var columns = 4;

//generate random number between of rows and columns
function randomRowSelector(){
  return(Math.floor(Math.random() * (rows - 1 + 1)) + 1);
}

function randomColumnSelector(){
  return(Math.floor(Math.random() * (columns - 1 + 1)) + 1);
}

var grid = document.getElementById('battleGrid');
var gridBlocks = [];
function generateBattleSquare(numberOfSquares){
  var newBlock = document.createElement('div');
  grid.appendChild(newBlock);
  newBlock.className = 'battleSquare';
  gridBlocks.push(newBlock);
  newBlock.textContent = numberOfSquares;
}


var gridForm = document.getElementById('grid_selector');
gridForm.addEventListener('submit', renderBattleGrid);
var grid = document.getElementById('battleGrid');

function renderBattleGrid(e){
  e.preventDefault();
  while (grid.firstChild){
    grid.removeChild(grid.firstChild); //source: https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
  }
  var choice = e.target.gridSize.value;
  switch (choice) {
  case '2x2':
    generateNumberOfGrids(2, 2);
    rows = 2;
    columns = 2;
    break;
  case '4x4':
    generateNumberOfGrids(4, 4);
    rows = 4;
    columns = 4;
    break;
  case '6x4':
    generateNumberOfGrids(6, 4);
    rows = 6;
    columns = 4;
    break;
  case '8x5':
    generateNumberOfGrids(8, 5);
    rows = 8;
    columns = 5;
    break;
  default:
    break;
  }
}

function generateNumberOfGrids(x, y){
  var totalSquares = x * y;
  var columns = [];
  for (var j = 0; j < x; j++){
    columns.push('100px');
  }
  grid.style.gridTemplateColumns = columns.join(' ');
  console.log(columns.toString());
  for (var i = 0; i < totalSquares; i++){
    generateBattleSquare(i + 1);
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
  character.style.top = 20 + 'px';
  charPosition.x = 20;
  charPosition.y = 20;
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
    if (charPosition.y > ((columns - 1) * 100) + 19){
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
    if (charPosition.x > ((rows - 1) * 100) + 19){
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
  }, 200);
}

function attackStop(){
  setTimeout(function() {
    charNew.style.left = charPosition.x + 'px';
    // charNew.className = '';
  }, 400);
}

function defeatEnemy() {
  for (var i = 0; i < Enemy.enemyList.length; i++) {
    if (charPosition.x - Enemy.enemyList[i].x === -50 && charPosition.y - Enemy.enemyList[i].y === 0 && document.getElementById(Enemy.enemyList[i].label) !== null){
      var enemy = document.getElementById(Enemy.enemyList[i].label);

      //removal
      setTimeout(function() { enemy.remove();}, 300);
      //animation
      attackStart();
      attackStop();
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


