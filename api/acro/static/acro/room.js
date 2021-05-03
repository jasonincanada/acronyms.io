
console.log('Hello, world!');

$(document).ready(function() {
  getActiveGame();
});


function getActiveGame(room) {

  $.get('/acro/api/room/' + window.room_id + '/get', {}, function(result) {
    console.log(result);

    $('#acronym').text(result.acronym);
    $('#phrase' ).text(result.phrase);
  });

}

