const gameGrid = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,1,1,1,0,0,0,0,0,1,1,1,8,1,1,1,0,1],
  [1,0,1,3,3,3,1,0,0,0,0,1,0,0,0,0,3,1,0,1],
  [1,0,1,0,0,0,1,8,1,1,1,1,0,0,0,0,3,1,0,1],
  [1,0,0,1,1,0,1,0,0,0,0,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,1,0,1,0,4,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,1,0,0,3,1,0,0,0,1],
  [1,0,0,0,1,1,1,1,0,1,1,1,0,0,0,1,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,5,0,8,0,0,0,1],
  [1,0,0,0,6,0,3,0,0,0,0,3,0,0,0,1,0,0,0,1],
  [1,0,0,0,1,1,1,1,1,1,0,1,1,0,1,1,0,0,0,1],
  [1,0,0,0,1,3,0,0,1,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,0,0,1,3,0,0,0,0,0,1,0,7,0,1,1,1,0,1],
  [1,0,0,1,1,0,0,0,1,0,0,1,0,0,0,0,0,1,0,1],
  [1,0,1,0,0,0,1,8,1,1,1,1,8,1,1,3,0,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,3,0,1,0,1],
  [1,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];
//  0 = floor; 1 = wall; 3= treasure: 4,5,6,7 = guard; 8= window; 9= endpoint;
$(() => {

  let playerLocation = {};
  let guard1Location = {};
  let guard2Location = {};
  let guard3Location = {};
  let guard4Location = {};
  let guardDirection = 0;
  let treasureCounter = 0;
  let lifecounter = 3;
  let turnCounter = 0;
  let endScoreCounter = 0;
  let scoreValues = [];
  const noDuplicateScore= [];

  // Const for different screen elements
  const $introScreen = $('.introScreen');
  const $playScreen = $('.playScreen');
  const $endGameScreen = $('.endGameScreen');
  const $highScoreScreen = $('.highScoreScreen');
  const $map= $('#map');
  const $submitCheck = $('#submitCheck');
  const $endMessage = $('#endMessage');
  const $lootMessage = $('#lootMessage');

  // Const for score elements
  const $livesScore = $('#livesScore');
  const $treasure = $('#treasureScore');
  const $turnsScore = $('#turnsScore');
  // Const for buttons
  const $newGameButton = $('#newGame');
  const $highScoreButton = $('#highScoreTable');
  const $endScore = $('#endScore');
  const $submit = $('#submit');
  const $scoreSubmit = $('#scoreSubmit');
  const $continue = $('#continue');
  const $returnButton = $('#returnToMainMenu');
  const $clearHighScore = $('#clearHighScore');
  const $submitElements = $('.submit');

  $playScreen.hide();
  $endGameScreen.hide();
  $highScoreScreen.hide();

  $treasure.text('Score:' + treasureCounter);
  $livesScore.text('Lives:' + lifecounter);
  $turnsScore.text('Turn:' + turnCounter);
  $endScore.text(endScoreCounter);

  function drawMap(){
    $.each(gameGrid, (i,row) => {
      $.each(row, (j,cell) => {
        const $element = $('<div />');
        if(cell === 0){
          $element.addClass('floor');
        } else if (cell === 1) {
          $element.addClass('wall');
        } else if (cell === 3) {
          $element.addClass('treasure');
        } else if (cell === 4) {
          $element.addClass('guard');
          guard1Location = {x: i, y: j};
          gameGrid[guard1Location.x][guard1Location.y] = 0;
        } else if (cell === 5) {
          $element.addClass('guard');
          guard2Location = {x: i, y: j};
          gameGrid[guard2Location.x][guard2Location.y] = 0;
        } else if (cell === 6) {
          $element.addClass('guard');
          guard3Location = {x: i, y: j};
          gameGrid[guard3Location.x][guard3Location.y] = 0;
        } else if (cell === 7) {
          $element.addClass('guard');
          guard4Location = {x: i, y: j};
          gameGrid[guard4Location.x][guard4Location.y] = 0;
        } else if (cell === 8) {
          $element.addClass('window');
        } else if (cell === 9) {
          $element.addClass('exit');
        }
        $element.attr('data-x', i);
        $element.attr('data-y', j);
        $element.appendTo('#map');
      });
    });
  }


  function updateTurnCounter() {
    turnCounter++;
    $turnsScore.text('Turn:' + turnCounter);
  }


  function movePlayer(){
    $(document).on('keypress', function(e){
      updateTurnCounter();
      moveGuard(guard1Location);
      moveGuard(guard2Location);
      moveGuard(guard3Location);
      moveGuard(guard4Location);
      switch(e.which){
        case 119:     // MOVE PLAYER UP
          if (gameGrid[playerLocation.x-1][playerLocation.y] === 0 ||
          gameGrid[playerLocation.x-1][playerLocation.y] === 3){
            playerLocation.x -= 1;
            moveDirection();
            if (gameGrid[playerLocation.x][playerLocation.y] === 3){
              collectTreasure();
            }
          } else if (gameGrid[playerLocation.x-1][playerLocation.y] === 8){
            playerLocation.x -= 2;
            moveDirection();
          } else if (gameGrid[playerLocation.x-1][playerLocation.y] === 9){
            playerLocation.x -= 1;
            moveDirection();
            endGame();
          }
          break;
        case 97:     // MOVE PLAYER LEFT
          if (gameGrid[playerLocation.x][playerLocation.y-1] === 0 ||
          gameGrid[playerLocation.x][playerLocation.y-1] === 3){
            playerLocation.y -= 1;
            moveDirection();
            if (gameGrid[playerLocation.x][playerLocation.y] === 3){
              collectTreasure();
            }
          } else if (gameGrid[playerLocation.x][playerLocation.y-1] === 8){
            playerLocation.y -= 2;
            moveDirection();
          } else if (gameGrid[playerLocation.x][playerLocation.y-1] === 9){
            playerLocation.y -= 1;
            moveDirection();
            endGame();
          }
          break;
        case 115:     // MOVE PLAYER DOWN
          if (gameGrid[playerLocation.x+1][playerLocation.y] === 0 ||
          gameGrid[playerLocation.x+1][playerLocation.y] === 3){
            playerLocation.x += 1;
            moveDirection();
            if (gameGrid[playerLocation.x][playerLocation.y] === 3){
              collectTreasure();
            }
          } else if (gameGrid[playerLocation.x+1][playerLocation.y] === 8){
            playerLocation.x += 2;
            moveDirection();
          } else if (gameGrid[playerLocation.x+1][playerLocation.y] === 9){
            playerLocation.x += 1;
            moveDirection();
            console.log('error');
            endGame();
          }
          break;
        case 100:     // MOVE PLAYER RIGHT
          if (gameGrid[playerLocation.x][playerLocation.y+1] === 0 ||
          gameGrid[playerLocation.x][playerLocation.y+1] === 3){
            playerLocation.y += 1;
            moveDirection();
            if (gameGrid[playerLocation.x][playerLocation.y] === 3){
              collectTreasure();
            }
          } else if (gameGrid[playerLocation.x][playerLocation.y+1] === 8){
            playerLocation.y += 2;
            moveDirection();
          } else if (gameGrid[playerLocation.x][playerLocation.y+1] === 9){
            playerLocation.y += 1;
            moveDirection();
            endGame();
          }
          break;
      }
    });
  }


  function moveDirection(){
    $('.playerCharacter').removeClass('playerCharacter').addClass('floor');
    $(`div[data-x='${playerLocation.x}'][data-y='${playerLocation.y}']`).removeClass('floor treasure').addClass('playerCharacter');
  }


  function spawnPlayer() {
    playerLocation = {x: 2, y: 2};
    $(`div[data-x='${playerLocation.x}'][data-y='${playerLocation.y}']`).removeClass('floor treasure').addClass('playerCharacter');
  }


  function deSpawnPlayer() {
    $('.playerCharacter').removeClass('playerCharacter').addClass('floor');
    if (lifecounter === 0) endGame(lifecounter);
  }


  function collectTreasure() {
    treasureCounter += 100;
    console.log(treasureCounter);
    $treasure.text('Score:' + treasureCounter);
    gameGrid[playerLocation.x][playerLocation.y] = 0;
  }


  function checkForPlayer(guardLocation) {
    if (guardLocation.x === playerLocation.x && guardLocation.y === playerLocation.y) {
      lifecounter--;
      $livesScore.text('Lives:' + lifecounter);
      treasureCounter -= 50;
      $treasure.text('Score:' + treasureCounter);
      if (lifecounter === 0) endGame(lifecounter);
      deSpawnPlayer();
      spawnPlayer();
    }
  }


  function moveGuard(guardLocation){
    var guardCoordinates = guardLocation;
    checkForPlayer(guardCoordinates);
    guardDirection = Math.floor(Math.random() * 4);
    if (guardDirection === 0){
      if (gameGrid[guardLocation.x-1][guardLocation.y] === 0){
        $(`div[data-x='${guardLocation.x}'][data-y='${guardLocation.y}']`).removeClass('guard').addClass('floor');
        guardLocation.x -= 1;
        $(`div[data-x='${guardLocation.x}'][data-y='${guardLocation.y}']`).removeClass('floor').addClass('guard');
      } else {
        guardDirection = 1;
      }
    }
    if (guardDirection === 1){
      if (gameGrid[guardLocation.x+1][guardLocation.y] === 0){
        $(`div[data-x='${guardLocation.x}'][data-y='${guardLocation.y}']`).removeClass('guard').addClass('floor');
        guardLocation.x += 1;
        $(`div[data-x='${guardLocation.x}'][data-y='${guardLocation.y}']`).removeClass('floor').addClass('guard');
      } else {
        guardDirection = 2;
      }
    }
    if (guardDirection === 2){
      if (gameGrid[guardLocation.x][guardLocation.y-1] === 0){
        $(`div[data-x='${guardLocation.x}'][data-y='${guardLocation.y}']`).removeClass('guard').addClass('floor');
        guardLocation.y -= 1;
        $(`div[data-x='${guardLocation.x}'][data-y='${guardLocation.y}']`).removeClass('floor').addClass('guard');
      } else {
        guardDirection = 3;
      }
    }
    if (guardDirection === 3){
      if (gameGrid[guardLocation.x][guardLocation.y+1] === 0){
        $(`div[data-x='${guardLocation.x}'][data-y='${guardLocation.y}']`).removeClass('guard').addClass('floor');
        guardLocation.y += 1;
        $(`div[data-x='${guardLocation.x}'][data-y='${guardLocation.y}']`).removeClass('floor').addClass('guard');
      }
    }
  }

  function finalScoreCalculator(){
    endScoreCounter = Math.round((treasureCounter * lifecounter) - (turnCounter * 2.5));
    if (endScoreCounter < 0) endScoreCounter = 0;
    $endScore.text(endScoreCounter);
  }

  function endGame(check) {
    if (check === 0) {
      $submitElements.hide();
      $endMessage.text('You were thrown into jail');
      $lootMessage.text('You were caught too many times and now you\'ve nothing to sell');
      $endScore.hide();
    } else {
      $playScreen.hide();
      $endGameScreen.show();
      $map.empty();
      finalScoreCalculator();
      $submit.on('click', function (){
        var playerName = $scoreSubmit.val();
        localStorage.setItem(`${playerName}`, `${endScoreCounter}`);
        $submitCheck.text('Score submitted!');
      });
    }
  }

  function highScoreSorter(scoreValues){
    scoreValues.sort(function (a, b){
      return b - a;
    });
    return scoreValues;
  }

  function duplicateCheck (scoreValues){
    $.each(scoreValues, function(i, el){
      if($.inArray(el, noDuplicateScore) === -1) noDuplicateScore.push(el);
    });
  }

  function nameHighScore(){
    scoreValues = Object.values(localStorage);
    highScoreSorter(scoreValues);
    duplicateCheck(scoreValues);
    for (let m=0; m< noDuplicateScore.length; m++){
      for(var key in localStorage){
        if(localStorage[key] === noDuplicateScore[m]) {
          const $name = $('<p />');
          $name.text(key);
          $name.appendTo('.leftHandHighScoreTable');
          const $score = $('<p />');
          $score.text(noDuplicateScore[m]);
          $score.appendTo('.rightHandHighScoreTable');
          if (m === 9) break;
        }
      }
    }
  }

  function setup(){
    drawMap();
    spawnPlayer();
    movePlayer();
  }

  // BUTTONS IN THE DOCUMENT

  $newGameButton.on('click', () => {
    $introScreen.hide();
    $playScreen.show();
    setup();
  });

  $highScoreButton.on('click', ()=> {
    $introScreen.hide();
    $highScoreScreen.show();
    nameHighScore();
  });

  $returnButton.on('click', ()=>{
    location.reload();
  });

  $clearHighScore.on('click', ()=> {
    localStorage.clear();
    location.reload();
  });

  $continue.on('click', () => {
    location.reload();
  });
});
