$(function() {
  var numCrayons = $('.crayon').length - 1;
  var color;

  //(get options? random by default)
  //pack size (show different sections?)
  //shuffle algorithm from class
  var shuffle = function(m) {
    var rand = Math.floor(Math.random() * m--);

    $('li:eq('+m+')').
      after($('li:eq('+rand+')')).
      insertBefore($('li:eq('+rand+')'));

    if (m) {
      setTimeout(shuffle, 50, m);
    }
  };

  //shuffle the default crayons
  $('#shuffle').on('click', function () {
    shuffle($('.crayon').length);
    $('#sort').show();
    $('#shuffle').delay().text("Drop again!");
  });

  //sort the shuffled crayons
  //convert hex to hsv
  var rgbToHSVArray = function (rgb) {
    var r, g, b, max, min, diff, hue, sat, val;
    var regExpArray = /rgb\((\d+), (\d+), (\d+)\)/.exec(rgb);
    r = regExpArray[1] / 255;
    g = regExpArray[2] / 255;
    b = regExpArray[3] / 255;

    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    diff = max - min;
    val = (max + min) / 2;

    if (diff === 0) {
      sat = 0;
    } else {
      sat = diff / (1 - Math.abs(2 * val - 1));
    }

    if (max == r) {
      hue = 60 * (((g - b) / diff) % 6);
    } else if (max == g) {
      hue = 60 * (((b - r) / diff) + 2);
    } else if (max == b) {
      hue = 60 * (((r - g) / diff) + 4);
    } else {
      alert("Unable to convert "+rgb+" to HSV!");
    }
    if (hue < 0) {
      hue += 360;
    }
    //sneaky way to check for isNaN without false positives:
    //see developer.mozilla.org isNaN entry
    if (hue != hue) {
      hue = 0;
    }
    return [hue, sat, val];
  };
  //sort by h, then s, then v (options?)
  //animate the crayons
  //color test

  while (numCrayons+1) {
    color = $('li:eq('+numCrayons+')').css('background-color');
    color = rgbToHSVArray(color);
    $('li:eq('+numCrayons+')').append(" hue=" + color[0] + " sat=" + color[1] + " val=" + color[2]);
    numCrayons--;
  }
});