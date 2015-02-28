$(function() {
  var numCrayons = $('.crayon').length - 1;

  //shuffle algorithm from class
  var shuffle = function(m) {
    var rand = Math.floor(Math.random() * m--);

    swap(m, rand);

    if (m) {
      setTimeout(shuffle, 150, m);
    }
  };

  var swap = function(a,b) {
    $('li:eq('+a+')').
      after($('li:eq('+b+')')).
      insertBefore($('li:eq('+b+')'));
  };

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

  var sort = function (i) {
    var currRGB = $('li:eq('+i+')').css('background-color');
    var currHSV = rgbToHSVArray(currRGB);
    var j = i - 1, k = i, compareRGB, compareHSV;

    while (j >= 0) {
      compareRGB = $('li:eq('+j+')').css('background-color');
      compareHSV = rgbToHSVArray(compareRGB);

      if (compareHSV[0] == currHSV[0]) {
        if (compareHSV[2] > currHSV[2]) {
          swap(k, j);
          k--;
        }
      } else if (compareHSV[0] > currHSV[0]) {
        swap(k, j);
        k--;
      }
      j--;
    }

    i++;
    if (i <= numCrayons) {
      setTimeout(sort, 150, i);
    }
  };

  $("#sort").on('click', function() {
    sort(0);
  });

  $('#shuffle').on('click', function () {
    shuffle($('.crayon').length);
    $('#sort').show();
    $('#shuffle').delay().text("Drop again!");
  });
});