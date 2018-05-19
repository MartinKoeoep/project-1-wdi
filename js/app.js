const gameGrid = [
  [0,0,0,0,0,0,0,0,0,0],
  [3,1,1,0,1,1,1,1,1,0],
  [0,1,1,0,1,3,0,0,1,0],
  [0,1,3,0,1,0,0,0,1,0],
  [0,1,0,0,1,0,4,0,1,0],
  [0,1,0,0,0,0,0,0,1,0],
  [0,1,1,1,1,1,0,1,1,0],
  [0,1,3,0,0,1,0,1,0,0],
  [0,1,1,1,0,1,0,1,0,0],
  [0,0,0,0,0,0,0,0,0,0]
];
//  0 = floor; 1 = wall; 3= treasure: 4 = guard
$(() => {

  let playerLocation = {};
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
        } else if (cell === 3) {
          $element.addClass('guard');
        }
        $element.attr('data-x', i);
        $element.attr('data-y', j);
        $element.on('click', function(){
          console.log($(this));
        });
        $element.appendTo('#map').clone(true);
      });
    });
  }

  function movePlayer(){
    $(document).on('keypress', function(e){
      switch(e.which){
        case 119:
          if (gameGrid[playerLocation.x-1][playerLocation.y] === 0 ||
          gameGrid[playerLocation.x-1][playerLocation.y] === 3){
            playerLocation.x -= 1;
            moveDirection();
            if (gameGrid[playerLocation.x][playerLocation.y] === 3){
              collectTreasure();
            }
          } else {
            console.log('Cannot move in that direction');
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

          } else {
            console.log('Cannot move in that direction');
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
          } else {
            console.log('Cannot move in that direction');
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
          } else {
            console.log('Cannot move in that direction');
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
    playerLocation = {x: 0, y: 0};
    $(`div[data-x='${playerLocation.x}'][data-y='${playerLocation.y}']`).removeClass('floor treasure').addClass('playerCharacter');
  }

  function collectTreasure() {
    treasureCounter += 100;
    console.log(treasureCounter);
    $treasure.text(treasureCounter);
    gameGrid[playerLocation.x][playerLocation.y] = 0;
  }

  function setup(){
    drawMap();
    spawnPlayer();
    movePlayer();
  }
  setup();


});
