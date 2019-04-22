rbvj = function () {

  var circSize = 30;
  var t = 0;
  var numDots = 120;
  var circs = [];
  var hiFreq;
  var loFreq;
  var r = 180;
  var rot;
  ctx.lineWidth = 1;
  resetMe();
  ctx.strokeStyle = rgb( 255 );

  function resetMe() {
    rot = 0;
    hiFreq = 0;
    loFreq = 1000;
    r = 180;
    t = 0;

    for ( var i = 0; i < numDots; i++ ) {

      var circle = {
        r: r,
        me: i,
        x: r * Math.cos( t ),
        y: r * Math.sin( t ),
        orgi_x: r * Math.cos( t ),
        orgi_y: r * Math.sin( t ),
        theta: t
      }
      circs.push( circle );
      t += radians( 360 / numDots );
    }

    for ( var i = 0; i < numDots; i++ ) {
      drawCirc( circs[ i ], 80 );
    }
  }

  this.draw = function () {

    ctx.background( 0 );

    for ( var i = 0; i < numDots; i++ ) {
      var vol = Sound.mapSound( i, numDots * 2, 0, 500 );
      drawCirc( circs[ i ], vol );

    }

    if ( randomInt( 100 ) > 90 ) resetMe();

  }


  function drawCirc( p, vol ) {

    ctx.save();
    ctx.translate( width / 2, height / 2 );
    p.r = Math.abs( r - vol ) / 3;
    p.r = clamp( p.r, 140, 400 );

    p.theta += 0.01;

    var xx = r * Math.cos( p.r )
    var yy = r * Math.cos( p.r )

    ctx.lineWidth = 3;
    ctx.line( p.x, p.y, p.x + xx, p.y + yy );
    ctx.rotate( rot );
    p.x = p.r * Math.cos( p.theta );
    p.y = p.r * Math.sin( p.theta );
    ctx.restore();

  }

}

rbvj();
