$(function() {
  //(get options? random by default)
  //pack size (show different sections?)
  //shuffle the default crayons

  //sort the shuffled crayons
  //convert hex to hsv
  //sort by h, then s, then v (options?)
  //animate the crayons

  //test swap on button click
  $('#shuffle').on('click', function() {
    $('li:eq(1)').
    after($('li:eq(5)')).
    insertBefore($('li:eq(5)'));
  });
});