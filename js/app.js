const gameGrid = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,1,9,1,0,0,0,0,0],
  [0,1,1,0,1,1,1,1,1,0],
  [0,1,0,0,1,0,0,0,1,0],
  [0,1,0,0,1,0,0,0,1,0],
  [0,1,0,0,0,0,0,0,1,0],
  [0,1,1,1,1,1,0,1,1,0],
  [0,0,0,0,0,1,0,1,0,0],
  [0,0,0,0,0,1,0,1,0,0],
  [0,0,0,0,0,0,0,0,0,0]
];
//  0 = floor; 1 = wall; .. 9= playerCharacter

const $playerCharacter = $('#playerCharacter');
let playerLocation = {};
const $map = $('#map');

$(() => {

  function emptyCheck() {
    $map.empty();
  }

  $('.tester').on('click', () => {
    emptyCheck();
  });

  $('#map').on('mouseover','div', function() {
    $('#cell-address').val(`${$(this).data('x')}-${$(this).data('y')}`);
  });
  function drawMap(){
    console.log($map);
    // $map.empty();

    $.each(gameGrid, (i,row) => {
      $.each(row, (j,cell) => {
        const $element = $('<div />');
        if(cell === 0){
          $element.addClass('floor');
        } else if (cell === 1) {
          $element.addClass('wall');
        } else if (cell === 9) {
          $element.addClass('playerCharacter');
          playerLocation = {
            x: i,
            y: j
          };
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
          if (gameGrid[playerLocation.x-1][playerLocation.y] === 0){
            $('.playerCharacter').removeClass('playerCharacter').addClass('floor');
            playerLocation.x -= 1;
            $(`div[data-x='${playerLocation.x}'][data-y='${playerLocation.y}']`).removeClass('floor').addClass('playerCharacter');
          } else {
            console.log('Cannot move in that direction');
          }
          break;
        case 97:
          if (gameGrid[playerLocation.x][playerLocation.y-1] === 0){
            $('.playerCharacter').removeClass('playerCharacter').addClass('floor');
            playerLocation.y -= 1;
            $(`div[data-x='${playerLocation.x}'][data-y='${playerLocation.y}']`).removeClass('floor').addClass('playerCharacter');
          } else {
            console.log('Cannot move in that direction');
          }
          break;
        case 115:
          if (gameGrid[playerLocation.x+1][playerLocation.y] === 0){
            $('.playerCharacter').removeClass('playerCharacter').addClass('floor');
            playerLocation.x += 1;
            $(`div[data-x='${playerLocation.x}'][data-y='${playerLocation.y}']`).removeClass('floor').addClass('playerCharacter');
          } else {
            console.log('Cannot move in that direction');
          }
          break;
        case 100:
          if (gameGrid[playerLocation.x][playerLocation.y+1] === 0){
            $('.playerCharacter').removeClass('playerCharacter').addClass('floor');
            playerLocation.y += 1;
            $(`div[data-x='${playerLocation.x}'][data-y='${playerLocation.y}']`).removeClass('floor').addClass('playerCharacter');
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
