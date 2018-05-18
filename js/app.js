let gameGrid = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,1,0,1,0,0,0,0,0],
  [0,1,1,9,1,1,1,1,1,0],
  [0,1,0,0,1,0,0,0,1,0],
  [0,1,0,0,1,0,0,0,1,0],
  [0,1,0,0,0,0,0,0,1,0],
  [0,1,1,1,1,1,0,1,1,0],
  [0,0,0,0,0,1,0,1,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
];
//  0 = floor; 1 = wall; .. 9= playerCharacter

const $playerCharacter = $('#playerCharacter');
let playerLocation = [];
const $map = $('div#map');

$(() => {

  $('#map').on('mouseover','div', function() {
    $('#cell-address').val(`${$(this).data('x')}-${$(this).data('y')}`);
  });
  function drawMap(){

    $map.innerHTML = '';

    $.each(gameGrid, (i,row) => {
      $.each(row, (j,cell) => {
        const $element = $('<div />');
        if(cell === 0){
          $element.addClass('floor');
        } else if (cell === 1) {
          $element.addClass('wall');
        } else if (cell === 9) {
          $element.addClass('playerCharacter');
          playerLocation = [i, j];
        }
        $element.data({x: i, y: j});
        $element.on('click', function(){
          console.log($(this));
        });
        $element.appendTo('#map');
      });
    });
  }

  function movePlayer(){
    $(document).on('keypress', function(e){
      switch(e.which){
        case 119:
          console.log('up');
          if (gameGrid[playerLocation[0]-1][playerLocation[1]] === 0){
            gameGrid[playerLocation[0]][playerLocation[1]] = 0;
            gameGrid[playerLocation[0]-1][playerLocation[1]] = 9;
            drawMap();
          } else {
            console.log('Cannot move in that direction');
          }
          break;
        case 97:
          console.log('left');
          if (gameGrid[playerLocation[0]][playerLocation[1]-1] === 0){
            gameGrid[playerLocation[0]][playerLocation[1]] = 0;
            gameGrid[playerLocation[0]][playerLocation[1]-1] = 9;
            drawMap();
          } else {
            console.log('Cannot move in that direction');
          }
          break;
        case 115:
          console.log('down');
          if (gameGrid[playerLocation[0]+1][playerLocation[1]] === 0){
            gameGrid[playerLocation[0]][playerLocation[1]] = 0;
            gameGrid[playerLocation[0]+1][playerLocation[1]] = 9;
            drawMap();
          } else {
            console.log('Cannot move in that direction');
          }
          break;
        case 100:
          console.log('right');
          if (gameGrid[playerLocation[0]][playerLocation[1]+1] === 0){
            gameGrid[playerLocation[0]][playerLocation[1]] = 0;
            gameGrid[playerLocation[0]][playerLocation[1]+1] = 9;
            drawMap();
          } else {
            console.log('Cannot move in that direction');
          }
          break;
      }
    });
  }
  function setup(){
    drawMap();
    movePlayer();
  }
  setup();









});
