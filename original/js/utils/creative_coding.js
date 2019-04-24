// GLOBALS
var mouseSpeedX = 0,
  mouseSpeedX = 0,
  mouseX = 0,
  mouseY = 0,
  lastMouseX = 0,
  lastMouseY = 0,
  oldMouseX = 0,
  oldMouseY = 0,
  frameRate = 60,
  frameCount = 0,
  frameNumber = 0,
  lastUpdate = Date.now(),
  mouseDown = false,
  mouseMoved = false;
var counter = 0;
var TWO_PI = Math.PI * 2;



var p = CanvasRenderingContext2D.prototype;

p.clearScreen = function(_x, _y, _w, _h) {
  var _x = _x || 0;
  var _y = _y || 0;
  var _w = _w || w;
  var _h = _h || h;
  this.clearRect(_x, _y, _w, _h)
}


p.background = function(r, g, b, a) {
  var c = this.getCurrentFill();
  this.fillStyle = getColour(r, g, b, a);
  this.fillRect(0, 0, w, h);
  this.fillStyle = c;

};


// COLOURS

function rgb(r, g, b, a) {
  return getColour(r, g, b, a);
};

function rgba(r, g, b, a) {
  return getColour(r, g, b, a);
};

function hsl(h, s, l) {
  return 'hsl(' + h + ', ' + clamp(s, 0, 100) + '%, ' + clamp(l, 0, 100) + '%)';
};

function hsla(h, s, l, a) {
  return 'hsla(' + h + ', ' + clamp(s, 0, 100) + '%, ' + clamp(l, 0, 100) + '%, ' + clamp(a, 0, 1) + ')';
};

function brightness(r, g, b, min, max) {
  if (max == undefined) {
    max = min;
    min = 0;
  }

  var b = Math.floor(rgbToHsl(r, g, b)[2]);
  return map(b, 0, 100, min, max);
};

function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  h = map(h, 0, 1, 0, 360);
  s *= 100;
  l *= 100;
  return [h, s, l];
}

function hexToRgb(hex) {
  // Expand shorthand form (e.g. '03F') to full form (e.g. '0033FF')
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}


p.getCurrentFill = function() {
  //console.log(ctx.fillStyle);
  var r = parseInt(this.fillStyle.substring(1, 3), 16);
  var g = parseInt(this.fillStyle.substring(3, 5), 16);
  var b = parseInt(this.fillStyle.substring(5), 16);
  return rgb(r, g, b);
}


function getColour(r, g, b, a) {
  'use strict';
  var c;

  if ((typeof r === 'string' || r instanceof String) && r.substr(0, 1) == "#") {

    return r;

  } else if (typeof r === 'string' || r instanceof String) {

    return r;

  } else if (g == undefined) {

    return 'rgb(' + clamp(Math.round(r), 0, 255) + ', ' + clamp(Math.round(r), 0, 255) + ', ' + clamp(Math.round(r), 0, 255) + ')';

  } else if (b == undefined) {

    return 'rgba(' + clamp(Math.round(r), 0, 255) + ', ' + clamp(Math.round(r), 0, 255) + ', ' + clamp(Math.round(r), 0, 255) + ', ' + clamp(g, 0, 1) + ')';

  } else if (a == undefined) {

    return 'rgba(' + clamp(Math.round(r), 0, 255) + ', ' + clamp(Math.round(g), 0, 255) + ', ' + clamp(Math.round(b), 0, 255) + ', 1)';

  } else {

    return 'rgba(' + clamp(Math.round(r), 0, 255) + ', ' + clamp(Math.round(g), 0, 255) + ', ' + clamp(Math.round(b), 0, 255) + ', ' + clamp(a, 0, 1) + ')';

  }
  // } else if (g == undefined) {
  //
  //   c = rgb(r, r, r);
  //
  // } else if (b == undefined && a == undefined) {
  //
  //   c = rgba(r, r, r, g);
  //
  // } else if (a == undefined) {
  //
  //   c = rgb(r, g, b);
  //
  // } else {
  //
  //   c = rgba(r, g, b, a);
  //
  // }
  return (c);
};



p.colour = function(r, g, b, a) {
  'use strict';
  this.fillStyle = getColour(r, g, b, a);
};


p.lineColour = function(r, g, b, a) {
  'use strict';
  this.strokeStyle = getColour(r, g, b, a);
};


// BASIC DRAWING


p.lineStyle = function(r, g, b, a) {
  'use strict';
  this.strokeStyle = getColour(r, g, b, a);
};


p.makeCircle = function(x, y, radius) {
  'use strict';
  this.beginPath();
  this.arc(x, y, radius / 2, 0, Math.PI * 2, true);
};


p.circle = function(x, y, radius) {
  'use strict';
  this.makeCircle(x, y, radius);
  this.fill();
  this.closePath();
};

p.fillCircle = function(x, y, radius) {
  'use strict';
  this.makeCircle(x, y, radius);
  this.fill();
  this.closePath();
};

p.strokeCircle = function(x, y, radius) {
  'use strict';
  this.makeCircle(x, y, radius);
  this.stroke();
  this.closePath();
};

p.circleH = function(x, y, width, height) {
  'use strict';
  if (height == undefined) {
    height = width;
  }
  this.Hellipse(x, y, width, height);
  this.fill();
  this.closePath();
};

p.ellipse = function(x, y, width, height) {
  if (height == undefined) {
    height = width;
  }
  this.beginPath();
  for (var i = 0; i < Math.PI * 2; i += Math.PI / 16) {
    this.lineTo(x + (Math.cos(i) * width / 2), y + (Math.sin(i) * height / 2));
  }
  this.closePath();
};

p.Hellipse = function(x, y, width, height) {
  if (height == undefined) {
    height = width;
  }
  this.beginPath();
  for (var i = 0; i < Math.PI * 2; i += Math.PI / 64) {
    this.lineTo(x + (Math.cos(i) * width / 2), y + (Math.sin(i) * height / 2));
  }
  //this.closePath();
};


p.Lellipse = function(x, y, width, height, sides) {
  var sides = sides || 8;
  if (height == undefined) {
    height = width;
  }
  this.beginPath();
  for (var i = 0; i < Math.PI * 2; i += Math.PI / sides) {
    this.lineTo(x + (Math.cos(i) * width / 2), y + (Math.sin(i) * height / 2));
  }
  //this.closePath();
};

p.fillEllipse = function(x, y, width, height) {
  if (height == undefined) height = width;
  this.ellipse(x, y, width, height);
  this.fill();
  this.beginPath();
};

p.HfillEllipse = function(x, y, width, height) {
  if (height == undefined) height = width;
  this.Hellipse(x, y, width, height);
  this.fill();
  this.beginPath();
};

p.LfillEllipse = function(x, y, w, h, sides) {
  var h = h || w;
  var sides = sides || 8;
  this.Lellipse(x, y, w, h, sides);
  this.fill();
  this.beginPath();
};


p.strokeEllipse = function(x, y, width, height) {
  if (height == undefined) height = width;
  this.ellipse(x, y, width, height);
  this.stroke();
  this.beginPath();
};

p.HstrokeEllipse = function(x, y, width, height) {
  if (height == undefined) {
    height = width;
  }
  this.Hellipse(x, y, width, height);
  this.stroke();
  this.beginPath();
};

p.LstrokeEllipse = function(x, y, width, height) {
  if (height == undefined) {
    height = width;
  }
  this.Lellipse(x, y, width, height);
  this.stroke();
  this.beginPath();
};

p.square = function(x, y, width, height) {
  if (height == undefined) height = width;
  this.fillRect(x, y, width, height);
};


p.centreStrokeRect = function(x, y, width, height) {
  this.strokeRect(x - width / 2, y - height / 2, width, height);
};

p.centreFillRect = function(x, y, width, height) {
  height = height || width;
  this.fillRect(x - width / 2, y - height / 2, width, height);
};

p.line = function(x1, y1, x2, y2) {
  this.beginPath();
  this.moveTo(x1, y1);
  this.lineTo(x2, y2);
  this.stroke();
  this.closePath();
};


p.strokePolygon = function(x, y, sides, size) {
  'use strict';
  this.polygon(x, y, sides, size);
  this.stroke();
}


p.fillPolygon = function(x, y, sides, size) {
  this.polygon(x, y, sides, size);
  this.fill();
}

p.polygon = function(x, y, sides, size) {
  Xcenter = x;
  Ycenter = y;
  this.beginPath();
  this.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));
  for (var i = 1; i <= sides; i += 1) {
    this.lineTo(Xcenter + size * Math.cos(i * 2 * Math.PI / sides), Ycenter + size * Math.sin(i * 2 * Math.PI / sides));
  }
}

p.strokeWeight = function(j) {
  this.lineWidth = j;
}

p.triangle = function(x1, y1, x2, y2, x3, y3) {
  'use strict';
  this.beginPath();
  this.moveTo(x1, y1);
  this.lineTo(x2, y2);
  this.lineTo(x3, y3);
  this.lineTo(x1, y1);
  this.stroke();
  this.closePath();
};

p.strokeTriangle = function(x1, y1, x2, y2, x3, y3) {
  this.beginPath();
  this.moveTo(x1, y1);
  this.lineTo(x2, y2);
  this.lineTo(x3, y3);
  this.lineTo(x1, y1);
  this.stroke();
  this.closePath();
}

p.fillTriangle = function(x1, y1, x2, y2, x3, y3) {
  this.beginPath();
  this.moveTo(x1, y1);
  this.lineTo(x2, y2);
  this.lineTo(x3, y3);
  this.lineTo(x1, y1);
  this.fill();
  this.closePath();
};


p.eqDownFillTriangle = function(x, y, sz, down) {
  this.translate(x, y);
  this.rotate(radians(180));
  this.fillTriangle(0, 0 - sz, 0 + sz, 0 + sz / 2, 0 - sz, 0 + sz / 2);
  this.rotate(radians(-180));
  this.translate(-x, -y);
}


p.eqLeftFillTriangle = function(x, y, sz, down) {
  this.translate(x, y);
  this.rotate(radians(270));
  this.fillTriangle(0, 0 - sz, 0 + sz, 0 + sz / 2, 0 - sz, 0 + sz / 2);
  this.rotate(radians(-270));
  this.translate(-x, -y);
}


p.eqDownTriangle = function(x, y, sz, down) {
  this.translate(x, y);
  if (!down) this.rotate(radians(180));
  this.triangle(0, 0 - sz, 0 + sz, 0 + sz / 2, 0 - sz, 0 + sz / 2);
  if (!down) this.rotate(radians(-180));
  this.translate(-x, -y);
}

p.fillEqTriangle = function(x, y, sz, down) {
  if (!down) {
    this.fillTriangle(x, y - sz, x + sz, y + sz / 2, x - sz, y + sz / 2);
  } else {
    this.save();
    this.translate(x, y);
    this.rotate(radians(180));
    this.fillTriangle(0, -sz, sz, sz / 2, -sz, sz / 2);
    this.restore();
  }
}

p.strokeEqTriangle = function(x, y, sz, down) {
  if (!down) {
    this.strokeTriangle(x, y - sz, x + sz, y + sz / 2, x - sz, y + sz / 2);
  } else {
    this.save();
    this.translate(x, y);
    this.rotate(radians(180));
    this.strokeTriangle(x0, -sz, sz, sz / 2, -sz, sz / 2);
    this.restore();
  }
}


p.eqFillTriangle = function(x, y, sz, down) {
  this.fillTriangle(x, y - sz, x + sz, y + sz / 2, x - sz, y + sz / 2);
}

p.eqTriangle = function(x, y, sz, down) {
  this.triangle(x, y - sz, x + sz, y + sz / 2, x - sz, y + sz / 2);
}

p.eqStrokeTriangle = function(x, y, sz, down) {
  this.strokeTriangle(x, y - sz, x + sz, y + sz / 2, x - sz, y + sz / 2);
}


function chanceLog(val, _chance){

  var c = _chance || 200;
  if(chance(c)) {
    var err = new Error();
    var caller_line = err.stack.split("\n")[2];
    var index = caller_line.indexOf("at ");
    var clean = caller_line.slice(index+2, caller_line.length);
    var url_index = clean.indexOf("(.html:");
    //clean = clean.slice(url_index+6, clean.length);
    //clean = clean.splice(clean.length-1, clean.length);
    //console.log(typeof(val));
    //console.log(val);

    if(typeof(val) == "object") {
      console.log('%c' + clean, 'color: blue');
      console.log(val);
    } else {
      console.log('%c >> ' + val + '\n' + clean, 'background: #000; color: red');
    }

    //console.log(clean);

  }
}


/// HANDY TRIG UTILITIES

function radians(deg) {
  return deg * Math.PI / 180;
};

function degrees(rad) {
  return (rad * 180 / Math.PI) % 360;
};

function degreesToPoint(deg, diameter) {
  var rad = Math.PI * deg / 180;
  var r = diameter / 2;
  return {
    x: r * Math.cos(rad),
    y: r * Math.sin(rad)
  };
}

function dist(x1, y1, x2, y2) {
  x2 -= x1;
  y2 -= y1;
  return Math.sqrt((x2 * x2) + (y2 * y2));
}

function distVector(x1, x2) {
  var d = dist(x1.x, x2.x, x1.y, x2.y);
  return d;
}

p.rotateDegrees = function(deg) {
  this.rotate(radians(deg));
}

p.rotateDeg = function(deg) {
  this.rotate(radians(deg));
}

function SinOsc(angle, ammt) {
  return Math.sin(angle) * ammt;
}

function CosOsc(angle, ammt) {
  return Math.cos(angle) * ammt;
}

// RANDOM UTILS


function random(min, max) {
  if (min === undefined) {
    min = 0;
    max = 1;
  } else if (max === undefined) {
    max = min;
    min = 0;
  }
  return (Math.random() * (max - min)) + min;
};


function randomInt(min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function randomSticky(min, max, c) {
  clamper = c || max;
  return sticky(random(min, max), clamper);
}


function randomWhole(min, max) {
  return posNeg() * random(min, max);
}

function randomWholeInt(min, max) {
  return posNeg() * randomInt(min, max);
}

function randomCardinal(min, max) {
  return posNeg() * random(min, max);
}

function randomCardinalInt(min, max) {
  return posNeg() * randomInt(min, max);
}

function randomColour(_sticky) {
  var sticky = _sticky || 1
  var r = randomSticky(255, sticky);
  var g = randomSticky(255, sticky);
  var b = randomSticky(255, sticky);
  return rgb(r, g, b);
}


// MAP, CLAMP, RANGE

function map(value, min1, max1, min2, max2, clampResult) {
  var returnvalue = ((value - min1) / (max1 - min1) * (max2 - min2)) + min2;
  if (clampResult) {
    return clamp(returnvalue, min2, max2);
  } else {
    return returnvalue;
  };
};

function log(val) {
  console.log(val);
}


function clamp(value, min, max) {
  return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
}

function inRange(value) {
  return value >= Math.min(min, max) && value <= Math.max(min, max);
}




function tween(pos, target, speed) {
  if (speed == undefined) speed = 20;
  pos += (target - pos) / speed;
  return pos;
}

function tweenOut(pos, target, duration, speed) {
  var diff = target - pos;
  speed = speed || 5;
  return pos + diff * (1 - Math.pow(1 - (1 / duration), speed));
}

function tweenIn(pos, target, duration, speed) {
  var diff = target - pos;
  speed = speed || 5;
  return pos + diff * Math.pow(1 / duration, speed);
  //return pos + diff * (1 - Math.pow(0 - (1 / duration), speed));
}

function fancyTween(type) {
  // t: current time, b: begInnIng value, c: change In value, d: duration

  //def: 'easeOutQuad',
  this.easeInQuad = function(x, t, b, c, d) {
    return c * (t /= d) * t + b;
  }
  this.easeOutQuad = function(x, t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  }
  this.easeInSine = function(x, t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  }
}


function chance(value) {
  if (random(value) > value - 1) return true;
}

function posNeg() {
  return randomInt(0, 1) * 2 - 1;
}

function sticky(num, clamper) {
  clamper = clamper | 1;
  return Math.round(num / clamper) * clamper;
}

function ave(num, clamper) {
  return Math.round(num / clamper) * clamper;
}

function randomGrey(_min, _max, _stick) {
  if (_max == undefined) {
    _max = _min;
    _min = 0;
  }
  var min = _min || 0;
  var max = _max || 240;

  var stick = _stick || 10;
  return rgb(sticky(randomInt(min, max), stick));
}


function greyscale(data) {
  for (var y = 0; y < data.height; y++) {
    for (var x = 0; x < data.width; x++) {
      var i = (y * 4) * data.width + x * 4;
      var avg = (data.data[i] + data.data[i + 1] + data.data[i + 2]) / 3;
      data.data[i] = avg;
      data.data[i + 1] = avg;
      data.data[i + 2] = avg;
    }
  }
  return data;
}

function getAngle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  if (theta < 0) theta = 360 + theta; // range [0, 360);
  if (theta == 360) theta = 0;
  return theta;
}

function distributeAngles(me, total) {
  return me / total * 360;
}


function bounce(pos, min, max, sz) {
  sz = sz || 0;
  if (pos > max - sz / 2 || pos < min + sz / 2) {
    return true;
  } else {
    return false;
  }
  //return num > max ? -1 : num < min ? -1 : 1
}

// Adapted from https://github.com/psalaets/line-intersect/
function checkIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {

  if (
    (x1 === x3 && y1 == y3) ||
    (x1 === x4 && y1 == y4) ||
    (x2 === x3 && y2 == y3) ||
    (x2 === x4 && y2 == y4)
  ) {
    return false;
  }

  var denom = ((y4 - y3) * (x2 - x1)) - ((x4 - x3) * (y2 - y1));
  var numeA = ((x4 - x3) * (y1 - y3)) - ((y4 - y3) * (x1 - x3));
  var numeB = ((x2 - x1) * (y1 - y3)) - ((y2 - y1) * (x1 - x3));

  if (denom === 0 || (numeA === 0 && numeB === 0)) {
    return false;
  }

  var uA = numeA / denom;
  var uB = numeB / denom;

  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return [
      (uA * (x2 - x1)) + x1,
      (uA * (y2 - y1)) + y1
    ]
  }
}


function selfHit(p) {

  for (var i = 0; i < balls.length; i++) {
    if (i != p.me) {

      p2 = balls[i];

      if (hittestBall(p, p2)) {
        p.speedx *= -1;
        p.speedy *= -1;
        p2.speedx *= -1;
        p2.speedy *= -1;
      }
    }

  }
  return p;
}

function hittestBall(p, p2) {

  if (p.x > p2.x - p2.sz && p.x < p2.x + p2.sz && p.y > p2.y - p2.sz && p.y < p2.y + p2.sz) {
    return true;
  }
}


function lineCircleCollide(a, b, circle, radius, nearest) {
  //check to see if start or end points lie within circle
  var tmp = {
    x: 0,
    y: 0
  }

  if (pointCircleCollide(a, circle, radius)) {
    if (nearest) {
      nearest.x = a.x
      nearest.y = a.y
    }
    return true
  }
  if (pointCircleCollide(b, circle, radius)) {
    if (nearest) {
      nearest.x = b.x
      nearest.y = b.y
    }
    return true
  }

  var x1 = a.x,
    y1 = a.y,
    x2 = b.x,
    y2 = b.y,
    cx = circle.x,
    cy = circle.y

  //vector d
  var dx = x2 - x1
  var dy = y2 - y1
  //vector lc
  var lcx = cx - x1
  var lcy = cy - y1


  //project lc onto d, resulting in vector p
  var dLen2 = dx * dx + dy * dy //len2 of d
  var px = dx
  var py = dy
  if (dLen2 > 0) {
    var dp = (lcx * dx + lcy * dy) / dLen2
    px *= dp
    py *= dp
  }

  if (!nearest)
    nearest = tmp
  nearest.x = x1 + px
  nearest.y = y1 + py

  //len2 of p
  var pLen2 = px * px + py * py

  //check collision
  return pointCircleCollide(nearest, circle, radius) &&
    pLen2 <= dLen2 && (px * dx + py * dy) >= 0
}

function pointCircleCollide(point, circle, r) {
  if (r === 0) return false
  var dx = circle.x - point.x
  var dy = circle.y - point.y
  return dx * dx + dy * dy <= r * r
}


p.cross = function(_x, _y, _w, _h) {
  if (_w === undefined) _w = 20;
  if (_h === undefined) _h = 60;
  this.fillRect(_x - _w / 2, _y - _h / 2, _w, _h);
  this.fillRect(_x - _h / 2, _y - _w / 2, _h, _w);
}

function makeGrid(_w, _h) {
  var grid = [];
  var k = 0;
  for (var y = 0; y < _h; y++) {
    for (var x = 0; x < _w; x++) {
      grid[k] = [x, y];
      k++;
    }
  };
  return grid;
}


function colourPool() {
  this.pool = [];
  this.colour_list = [];
  this.weights = [];

  this.add = function(_colour, _weight) {
    if (_weight == undefined) _weight = 1;
    this.pool.push(_colour);
    this.weights.push(_weight);
    this.colour_list = this.generateWeighedList(this.pool, this.weights);
    return this;
  }

  this.get = function(n) {
    if (n == undefined) n = randomInt(this.pool.length - 1);
    return this.pool[n];
  }
  this.generateWeighedList = function(list, weight) {

    var weighed_list = [];
    // Loop over weights
    for (var i = 0; i < weight.length; i++) {
      var multiples = weight[i] * 100;
      // Loop over the list of items
      for (var j = 0; j < multiples; j++) {
        weighed_list.push(list[i]);
      }
    }
    return weighed_list;
  };
  return this;
}


function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t
}


var Vector = function(_x, _y, _z) {
  this.x = _x || 0;
  this.y = _y || 0;
  this.z = _z || 0;

  this.add = function(_vector) {
    this.x += _vector.x || 0;
    this.y += _vector.y || 0;
    this.z += _vector.z || 0;
    return this;
  }

  this.subtract = function(_vector) {
    this.x -= _vector.x || 0;
    this.y -= _vector.y || 0;
    this.z -= _vector.z || 0;
    return this;
  }

  this.subtr = function(_vector2) {
    var v = new Vector();
    v.x = this.x - _vector2.x || 0;
    v.y = this.y - _vector2.y || 0;
    v.z = this.z - _vector2.z || 0;
    return v;
  }

  this.multiply = function(_vector) {
    this.x *= _vector.x || 0;
    this.y *= _vector.y || 0;
    this.z *= _vector.z || 0;
    return this;
  }

  this.divide = function(_vector) {
    this.x /= _vector.x || 1;
    this.y /= _vector.y || 1;
    this.z /= _vector.z || 1;
    return this;
  }

  this.angle = function(x1, x2) {
    return degrees(Math.atan2(this.x - x1, this.y - y2)) || degrees(Math.atan2(this.y / this.y));
  }

  this.velocity = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  // return the angle of the vector in radians
  this.getDirection = function() {
    return Math.atan2(this.y, this.x);
  };

  // set the direction of the vector in radians
  this.setDirection = function(direction) {
    var magnitude = this.getMagnitude();
    this.x = Math.cos(angle) * magnitude;
    this.y = Math.sin(angle) * magnitude;
  };

  // get the magnitude of the vector
  this.getMagnitude = function() {
    // use pythagoras theorem to work out the magnitude of the vector
    //console.log("y: "+ this.y * this.y);
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  };

  // set the magnitude of the vector
  this.setMagnitude = function(magnitude) {
    var direction = this.getDirection();
    this.x = Math.cos(direction) * magnitude;
    this.y = Math.sin(direction) * magnitude;
  };

  return this;

}

function createGrid(_gw, _gh, _w, _h) {

  if (_w === undefined) _w = w;
  if (_h === undefined) _h = h;

  var spacing_x = _w / _gw;
  var spacing_y = _h / _gh;
  var grid = [];
  var k = 0;

  for (var y = 0; y < _gh; y++) {

    for (var x = 0; x < _gw; x++) {

      grid[k] = {
        0: x * spacing_x + spacing_x / 2,
        1: y * spacing_y + spacing_y / 2,
        x: x * spacing_x + spacing_x / 2,
        y: y * spacing_y + spacing_y / 2
      };
      k++;
    }
  };

  return grid;

}


///////////////////////////////////////////
//////////////// G R I D //////////////////
///////////////////////////////////////////

function Grid(_num_items_horiz, _num_items_vert, _grid_w, _grid_h, _startx, _starty) {

  if (_num_items_horiz == undefined) _num_items_horiz = 1;
  if (_num_items_vert == undefined) _num_items_vert = 1;
  var _horiz = _num_items_horiz || 1;
  var _vert = _num_items_vert || 1;
  this.length = 0;
  this.spacing_x;
  this.spacing_y;
  this.c = rgb(200);
  this.num_items_horiz = 0;
  this.num_items_vert = 0;

  this.start = {
    x: _startx || 0,
    y: _starty || 0
  };

  this.grid_w = this.w = _grid_w || w;
  this.grid_h = this.h = _grid_h || h;

  this.width = _grid_w || w;
  this.height = _grid_h || h;
  this.centre = {
    x: this.start.x + this.width / 2,
    y: this.start.y + this.height / 2
  }
  this.grid = [];
  this.edge = [];
  this.x = [];
  this.y = [];
  this.rows = [];
  this.cols = [];
  this.pos = [];

  this.add = function(_horiz, _vert) {

    this.num_items_horiz += _horiz || 1;
    this.num_items_vert += _vert || 1;

    this.spacing_x = this.width / this.num_items_horiz;
    this.spacing_y = this.height / this.num_items_vert;
    this.spacing = new Vector(this.spacing_x, this.spacing_y);
    this.createGrid();

    return this;

  }


  this.setStart = function(_x, _y) {

    this.start = {
      x: _x || 0,
      y: _y || 0
    };
    createGrid();

  }

  this.createGrid = function() {
    var r = 0;
    this.spacing_x = this.width / this.num_items_horiz;
    this.spacing_y = this.height / this.num_items_vert;
    this.spacing = new Vector(this.spacing_x, this.spacing_y);
    // console.log(this.start.x);
    // console.log(this.width);
    this.cols = [];

    for (var y = 0; y < this.num_items_vert; y++) {

      var c = 0;
      var row = [];
      //this.cols[y] = [];
      var yy = y * this.spacing_y + this.spacing_y / 2 + this.start.y;


      for (var x = 0; x < this.num_items_horiz; x++) {

        var edge = false;
        var xx = x * this.spacing_x + this.spacing_x / 2 + this.start.x;

        //console.log(this.start.y);
        // see if it's a point on the outside
        if ((y == this.start.y || y == this.num_items_vert) && (x == this.start.x || x == this.num_items_horiz)) {
          edge = true;
        }

        this.x.push(xx);
        this.y.push(yy);
        this.pos.push({
          row: r,
          col: c,
          x: xx,
          y: yy
        });
        row.push({
          x: xx,
          y: yy
        });

        this.edge.push(edge);
        this.grid.push({
          row: y,
          col: x,
          x: xx,
          y: yy,
          edge: edge,
          c: this.c,
          r: 255,
          g: 255,
          b: 255
        });
        c++;

      }

      this.cols[x] = {
        col: x,
        x: xx,
        y: yy,
      };
      this.rows[r] = {
        row: r,
        items: this.num_items_horiz,
        pos: row
      };
      r++;
      //console.log(row);
    };
    //console.log(this.rows);
    this.length = this.num_items_vert * this.num_items_horiz;
    this.grid.push({
      row: this.rows,
      col: this.cols
    });

  }

  this.add(_horiz, _vert);

  //console.log(this);
  return this;

}


function mag(x, y) {
  return Math.sqrt(x * x + y * y);
}

var mousePressed = 0;
var mouseReleased = 0;
var mouseDown = 0;

document.onmousedown = function() {
  mousePressed = 1;
  mouseDown = 1;
}
document.onmouseup = function() {
  mousePressed = 0;
  mouseReleased = 1;
  mouseDown = 0;
}



function loop() {

  var now = Date.now();
  var elapsedMils = now - lastUpdate;

  if ((typeof window.draw == 'function') && (elapsedMils >= (1000 / window.frameRate))) {
    window.draw();
    frameCount++;
    frameNumber++;
    lastUpdate = now - elapsedMils % (1000 / window.frameRate);
    mouseReleased = 0;
    mouseMoved = 0;
  }
  requestAnimationFrame(loop);

};

// requestAnimationFrame
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
      window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() {
          callback(currTime + timeToCall);
        },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
}());


window.addEventListener('mousemove', function(e) {
  oldMouseX = mouseX;
  oldMouseY = mouseY;
  mouseX = e.clientX;
  mouseY = e.clientY;
  mouseSpeedX = mouseX - oldMouseX;
  mouseSpeedY = mouseX - oldMouseX;
  // lastMouseX = oldMouseX = mouseX;
  // lastMouseY = oldMouseY = mouseY;
  mouseMoved = true;
});

function init() {

  window.addEventListener('mousedown', function(e) {
    mouseDown = true;
    if (typeof onMouseDown == 'function') onMouseDown();
  });
  window.addEventListener('mouseup', function(e) {
    mouseDown = false;
    if (typeof onMouseUp == 'function') onMouseUp();
  });
  window.addEventListener('keydown', function(e) {
    if (typeof onKeyDown == 'function') onKeyDown(e);
  });
  window.addEventListener('keyup', function(e) {
    if (typeof onKeyUp == 'function') onKeyUp(e);
  });
  if (typeof window.setup == 'function') window.setup();
  loop();
}

window.addEventListener('load', init);



// loadscript utility

function loadScript(url, callback) {
  // Adding the script tag to the head as suggested before
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  script.onreadystatechange = callback;
  script.onload = callback;

  // Fire the loading
  head.appendChild(script);
}
