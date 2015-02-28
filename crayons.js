$(function() {
  //(get options? random by default)
  //pack size (show different sections?)
  //shuffle algorithm from class
  var shuffle = function(m) {
    var rand = Math.floor(Math.random() * m--);

    $('li:eq('+m+')').
      after($('li:eq('+rand+')')).
      insertBefore($('li:eq('+rand+')'));

    if (m) {
      setTimeout(shuffle, 200, m);
    }
  };

  //shuffle the default crayons
  $('#shuffle').on('click', function () {
    shuffle($('.crayon').length);
    $('#sort').show();
    $('#shuffle').text("Drop again!");
  });

  //sort the shuffled crayons
  //convert hex to hsv
  //sort by h, then s, then v (options?)
  //animate the crayons
  //color test
  var length = $('.crayon').length + 1;

  while (length) {
    length--;
    $('li:eq('+length+')').append(" "+length+" " + $('li:eq('+length+')').css('background-color'));
  }
});