rbvj = function () {

  var particles = [];
  var r = width / 2 - 10;
  ctx.lineWidth = 1;
  var vol = 0;



  for ( var _y = 10; _y < h - 10; _y += 10 ) {

    for ( var _x = 10; _x < w - 10; _x += r ) {

      var particle = {
        x: _x,
        y: _y,
      }
      particles.push( particle );
    }

  }

  draw = function () {
    ctx.background( 0 );
    for ( var i = 0; i < particles.length; i++ ) {
      var p = particles[ i ];
      vol = Sound.mapSound( i % 100, 100, 0, 8 ) - random( 0.3 );
      ctx.fillStyle = rgb( 255 );
      ctx.fillRect( p.x, p.y, r, vol );
    }

  }


}();
