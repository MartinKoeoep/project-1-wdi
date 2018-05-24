
//  0 = floor; 1 = wall; 3= treasure: 4,5,6,7 = guard; 8= window; 9= endpoint;
$(() => {
  // Const for different screen elements
  const $introScreen = $('.introScreen');
  const $playScreen = $('.playScreen');
  const $endGameScreen = $('.endGameScreen');
  const $highScoreScreen = $('.highScoreScreen');
  const $map= $('#map');
  const $submitCheck = $('#submitCheck');
  const $endMessage = $('#endMessage');
  const $lootMessage = $('#lootMessage');
  const $titleTheme = $('#title_theme');
  const $mute = $('#mute');

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
  const $mobileUp = $('#mobileUp');
  const $mobileDown = $('#mobileDown');
  const $mobileLeft = $('#mobileLeft');
  const $mobileRight = $('#mobileRight');

  // hide screens player shouldn't see at start
  $playScreen.hide();
  $endGameScreen.hide();
  $highScoreScreen.hide();

  // Take over the various counters in preparation for the game
  $treasure.text('Score:' + treasureCounter);
  $livesScore.text('Lives:' + lifecounter);
  $turnsScore.text('Turn:' + turnCounter);
  $endScore.text(endScoreCounter);

  function drawMap(){
    $.each(GameConfig.grid, (i,row) => {
      $.each(row, (j,cell) => {
        const $element = $('<div />');
        $element.addClass(tilesClasses[cell]);
        if(cell >= 4 && cell < 8){
          const location = {x: i, y: j}
          if (cell === 4) {
            guard1Location = location;
          } else if (cell === 5) {
            guard2Location = location;
          } else if (cell === 6) {
            guard3Location = location;
          } else if (cell === 7) {
            guard4Location = location;
          }
          GameConfig.grid[location.x][location.y] = 0;
        } else if (cell === 8) {
          if (GameConfig.grid[i-1][j] !== 0) {
            $element.addClass('vertical');
          }
        } else if (cell === 9) {
          $element.text('EX\nIT');
        }
        $element.attr({'data-x': i, 'data-y': j, id: `cell_${i}_${j}`});
        $element.appendTo('#map');
      });
    });
  }


  function updateTurnCounter() {
    turnCounter++;
    $turnsScore.text('Turn:' + turnCounter);
  }


  // *************************************************************************
  // MOVING PLAYER CHARACTER AROUND
  // *************************************************************************
  function getNewCellValue(direction, location){
    switch (direction) {
      case 'up':
        return GameConfig.grid[location.x-1][location.y];
      case 'down':
        return GameConfig.grid[location.x+1][location.y];
      case 'left':
        return GameConfig.grid[location.x][location.y-1];
      case 'right':
        return GameConfig.grid[location.x][location.y+1];
    }
  }



  function movePlayer(direction){
    const newCell = getNewCellValue(direction, playerLocation);
    const axis = (direction === 'up' || direction === 'down') ? 'x' : 'y';

    if(direction === 'up' || direction === 'left'){
      if(newCell === 8) playerLocation[axis] -=2;
      else if([0,3,9].includes(newCell)) playerLocation[axis] -=1;
    } else{
      if(newCell === 8) playerLocation[axis] +=2;
      else if([0,3,9].includes(newCell)) playerLocation[axis] +=1;
    }
    moveDirection();
    if(newCell === 9) endGame();
    if (GameConfig.grid[playerLocation.x][playerLocation.y] === 3)
      collectTreasure();
  }

  function moveDirection(){
    $('.playerCharacter').removeClass('playerCharacter').addClass('floor');
    $(`#cell_${playerLocation.x}_${playerLocation.y}`).removeClass('floor treasure').addClass('playerCharacter');
  }
  // *************************************************************************
  // *************************************************************************

  function moveCharacters(){
    $(document).on('keypress', function(e){
      const direction = directions[e.which];
      movePlayer(direction);
      turnUpdater();
    });
  }

  function turnUpdater() {
    updateTurnCounter();
    moveGuard(guard1Location);
    moveGuard(guard2Location);
    moveGuard(guard3Location);
    moveGuard(guard4Location);
  }

  function spawnPlayer() {
    playerLocation = {x: 2, y: 2};
    $(`#cell_${playerLocation.x}_${playerLocation.y}`).removeClass('floor treasure').addClass('playerCharacter');
  }


  function deSpawnPlayer() {
    $('.playerCharacter').removeClass('playerCharacter').addClass('floor');
    if (lifecounter < 1) endGame(lifecounter);
  }


  function collectTreasure() {
    playAudio('loot.wav');
    treasureCounter += 100;
    $treasure.text('Score:' + treasureCounter);
    GameConfig.grid[playerLocation.x][playerLocation.y] = 0;
  }


  function checkForPlayer(guardLocation) {
    if (guardLocation.x === playerLocation.x && guardLocation.y === playerLocation.y) {
      playAudio('captured.mp3');
      lifecounter--;
      $livesScore.text('Lives:' + lifecounter);
      treasureCounter -= 50;
      $treasure.text('Score:' + treasureCounter);
      if (lifecounter < 1) {
        endGame(lifecounter);
      }
      deSpawnPlayer();
      spawnPlayer();
    }
  }


  function moveGuard(guardLocation){
    var guardCoordinates = guardLocation;
    checkForPlayer(guardCoordinates);
    guardDirection = Math.floor(Math.random() * 4);
    const direction = randomDirections[guardDirection];
    const cell = getNewCellValue(direction, guardLocation);
    $(`div[data-x='${guardLocation.x}'][data-y='${guardLocation.y}']`).toggleClass('guard floor');
    const axis = (direction === 'up' || direction === 'down') ? 'x' : 'y';

    // Guard moves RIGHT
    if (guardDirection === 3){
      if(cell === 0)
        guardLocation.y += 1;
      else
        guardDirection = 0;
    }
    if(cell !== 0 && guardDirection !== 3){
      guardDirection++
    } else {
      // Guard moves UP
      if (guardDirection === 0) guardLocation.x -= 1;
      if (guardDirection === 1) guardLocation.x += 1;
      if (guardDirection === 2) guardLocation.y -= 1;
    }

    checkForPlayer(guardCoordinates);
    $(`#cell_${guardLocation.x}_${guardLocation.y}`).toggleClass('guard floor');
  }


  // **********************************
  // Functions dealing with final score and ending the GAME
  // **********************************

  function finalScoreCalculator(){
    endScoreCounter = Math.round((treasureCounter * lifecounter) - (turnCounter * 2.5));
    if (endScoreCounter < 0) endScoreCounter = 0;
    $endScore.text(endScoreCounter);
  }

  function endGame(lifecheck) {
    $('.playerCharacter').removeClass('exit').addClass('floor');
    $playScreen.hide();
    $endGameScreen.show();
    if (lifecheck < 0) {
      $continue.show();
      $submitElements.hide();
      $endMessage.text('You were thrown into jail');
      $lootMessage.text('You were caught too many times and now you\'ve nothing to sell');
      $endScore.hide();
    } else {
      $endGameScreen.show();
      $continue.hide();
      $map.empty();
      finalScoreCalculator();
      $submit.on('click', function (){
        playAudio('select_button.wav');
        $continue.show();
        var playerName = $scoreSubmit.val();
        if (playerName) {
          localStorage.setItem(`•  ${playerName}`, `${endScoreCounter}`);
          $submitCheck.text('Score submitted!');
        } else {
          localStorage.setItem('•  NoName', `${endScoreCounter}`);
          $submitCheck.text('Score submitted!');
        }
      });
    }
  }

  // **********************************
  // Functions dealing with High Score
  // **********************************

  function highScoreSorter(scoreValues){
    return scoreValues.sort((a, b) => b - a);
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
          $name.text(key).appendTo('.leftHandHighScoreTable');
          const $score = $('<p />');
          $score.text(noDuplicateScore[m]).appendTo('.rightHandHighScoreTable');
        }
        if (m > 8) break;
      }
    }
  }

  //*****************
  // AUDIO FUNCTIONS
  //*****************

  function playAudio(source){
    // uses the id of the button clicked to define the source of the audio file
    audio.src = `./audio/${source}`;
    audio.play();
  }

  function playTitleSong(source){
    // uses the id of the button clicked to define the source of the audio file
    mainTitle.src = `./audio/${source}`;
    mainTitle.loop = true;
    mainTitle.play();
  }

  function playHighScoreEasterEgg(){
    mainTitle.pause();
    var random = Math.random();
    if (random > .5){
      mainTitle.src = './audio/high_score.wav';
      mainTitle.volume = .3;
      mainTitle.play();
    }

  }
  //*****************
  //SETUP
  //*****************
  function setup(){
    drawMap();
    spawnPlayer();
    moveCharacters();
  }


  // BUTTONS IN THE DOCUMENT
  $('#newGame, #highScoreTable').on('click', function() {
    $introScreen.hide();
    if($(this).attr('id') === 'newGame'){
      playTitleSong('intro.mp3');
      $playScreen.fadeIn();
      setup();
    }else{
      playHighScoreEasterEgg();
      $highScoreScreen.show();
      nameHighScore();
    }
  });

  $('.sound-button').on('click', ()=>{ playAudio('select_button.wav')});

  $('#continue, #returnToMainMenu, #clearHighScore').on('click', function(){
    if ($(this).attr('id') === 'clearHighScore') localStorage.clear();
    location.reload();
  });


  // MUTE BUTTONS

  $('#title_theme, #mute').on('click', function(){
    onOff = !onOff;
    if (onOff){
      if ($(this).attr('id') === 'title_theme')
        playTitleSong('title_theme.mp3');
      else
        playTitleSong('intro.mp3');
    } else {
      mainTitle.pause();
    }
  });


  // Mobile Movement keypress

  $('#mobileUp, #mobileDown, #mobileLeft, #mobileRight').on('click', function(){
    if ($(this).attr('id') === 'mobileUp') movePlayer('up');
    if ($(this).attr('id') === 'mobileDown') movePlayer('down');
    if ($(this).attr('id') === 'mobileLeft') movePlayer('left');
    if ($(this).attr('id') === 'mobileRight') movePlayer('right');
    turnUpdater();
  });
});
