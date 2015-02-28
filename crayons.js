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
  var rgbToHSV = function (rgb) {
    var r, g, b, max, min, diff, hue;
    var regExpArray = /rgb\((\d+), (\d+), (\d+)\)/.exec(rgb);
    r = regExpArray[1] / 255;
    g = regExpArray[2] / 255;
    b = regExpArray[3] / 255;

    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    diff = max - min;

    if (max == r) {
      hue = 60 * (((g - b) / diff) % 6);
    } else if (max == g) {
      hue = 60 * (((b - r) / diff) + 2);
    } else if (max == b) {
      hue = 60 * (((r - g) / diff) + 4);
    } else {
      alert("Unable to convert "+rgb+" to hue!");
    }
    if (hue < 0) {
      hue += 360;
    }
    if (hue != hue) {
      hue = 0;
    }
    return hue;
  };
  //sort by h, then s, then v (options?)
  //animate the crayons
  //color test
  var length = $('.crayon').length - 1;
  var color;

  while (length+1) {
    color = $('li:eq('+length+')').css('background-color');
    color = rgbToHSV(color);
    $('li:eq('+length+')').append(" hue=" + color);
    length--;
  }
});