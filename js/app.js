const gameGrid = [
  [0,0,0,0,0,0,0,0,0,0],
  [3,1,1,0,1,1,8,1,1,0],
  [0,1,1,0,1,3,0,0,1,0],
  [0,1,3,0,1,0,0,0,1,0],
  [0,1,0,0,1,0,4,0,1,0],
  [0,8,0,0,0,0,0,0,1,0],
  [0,1,1,1,8,1,0,1,1,0],
  [0,1,3,0,0,1,0,1,0,0],
  [0,1,1,1,0,1,0,1,0,0],
  [0,0,0,0,0,0,0,0,0,0]
];
//  0 = floor; 1 = wall; 3= treasure: 4 = guard; 8= window
$(() => {

  let playerLocation = {};
  let guardLocation = {};
  let guardDirection = 0;
  let treasureCounter = 0;

  const $treasure = $('#treasureScore');
  $treasure.text(treasureCounter);
  $('#map').on('mouseover','div', function() {
    $('#cell-address').val(`${$(this).data('x')}-${$(this).data('y')}`);
  });

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
          guardLocation = {x: i, y: j};
          gameGrid[guardLocation.x][guardLocation.y] = 0;
        } else if (cell === 8) {
          $element.addClass('window');
        }
        $element.attr('data-x', i);
        $element.attr('data-y', j);
        $element.appendTo('#map');
      });
    });
  }

  function movePlayer(){
    $(document).on('keypress', function(e){
      moveGuard();
      switch(e.which){
        case 119:
          if (gameGrid[playerLocation.x-1][playerLocation.y] === 0 ||
          gameGrid[playerLocation.x-1][playerLocation.y] === 3){
            playerLocation.x -= 1;
            moveDirection();
            if (gameGrid[playerLocation.x][playerLocation.y] === 3){
              collectTreasure();
            }
          }
          break;
        case 97:
          if (gameGrid[playerLocation.x][playerLocation.y-1] === 0 ||
          gameGrid[playerLocation.x][playerLocation.y-1] === 3){
            playerLocation.y -= 1;
            moveDirection();
            if (gameGrid[playerLocation.x][playerLocation.y] === 3){
              collectTreasure();
            }

          }
          break;
        case 115:
          if (gameGrid[playerLocation.x+1][playerLocation.y] === 0 ||
          gameGrid[playerLocation.x+1][playerLocation.y] === 3){
            playerLocation.x += 1;
            moveDirection();
            if (gameGrid[playerLocation.x][playerLocation.y] === 3){
              collectTreasure();
            }
          }
          break;
        case 100:
          if (gameGrid[playerLocation.x][playerLocation.y+1] === 0 ||
          gameGrid[playerLocation.x][playerLocation.y+1] === 3){
            playerLocation.y += 1;
            moveDirection();
            if (gameGrid[playerLocation.x][playerLocation.y+1] === 3){
              console.log('should collect treasure');
              collectTreasure();
            }
          }
          break;
      }
    });
  }

  function moveDirection(){
    $('.playerCharacter').removeClass('playerCharacter').addClass('floor');
    $(`div[data-x='${playerLocation.x}'][data-y='${playerLocation.y}']`).removeClass('floor treasure').addClass('playerCharacter');
  }

  function moveDirectionGuard(){
    $('.guard').removeClass('guard').addClass('floor');
    $(`div[data-x='${guardLocation.x}'][data-y='${guardLocation.y}']`).removeClass('floor').addClass('guard');
  }

  function spawnPlayer() {
    playerLocation = {x: 0, y: 0};
    $(`div[data-x='${playerLocation.x}'][data-y='${playerLocation.y}']`).removeClass('floor treasure').addClass('playerCharacter');
  }

  function collectTreasure() {
    treasureCounter += 100;
    console.log(treasureCounter);
    $treasure.text(treasureCounter);
    gameGrid[playerLocation.x][playerLocation.y] = 0;
  }

  function moveGuard(){
    guardDirection = Math.floor(Math.random() * 4);
    switch (guardDirection) {
      case 0:
        if (gameGrid[guardLocation.x-1][guardLocation.y] === 0){
          guardLocation.x -= 1;
          moveDirectionGuard();
        } else {
          console.log('Cannot move up - Guard');
        }
        break;
      case 1:
        if (gameGrid[guardLocation.x+1][guardLocation.y] === 0){
          guardLocation.x += 1;
          moveDirectionGuard();
        } else {
          console.log('Cannot move down - Guard');
        }
        break;
      case 2:
        if (gameGrid[guardLocation.x][guardLocation.y-1] === 0){
          guardLocation.y -= 1;
          moveDirectionGuard();
        } else {
          console.log('Cannot move left - Guard');
        }
        break;
      case 3:
        if (gameGrid[guardLocation.x][guardLocation.y+1] === 0){
          guardLocation.y += 1;
          moveDirectionGuard();
        } else {
          console.log('Cannot move right - Guard');
        }
        break;
    }
  }

  function setup(){
    drawMap();
    spawnPlayer();
    movePlayer();
  }
  setup();


});
