rbvj = function () {

  var vol = 0;

  ctx.lineWidth = 1;
  var engine, gx;
  var gy = Math.floor( h / 6 )


  reset();

  function reset() {
    console.log( "reset" );
    gx = randomInt( 2, 10 );
    engine = new particleEngine( gx, gy );
  }


  draw = function () {
    if ( chance( 200 ) ) reset();
    ctx.background( 255 );
    for ( var i = 0; i < engine.particles.length; i++ ) {
      var p = engine.particles[ i ];
      vol = Sound.mapSound( i, engine.particles.length * 3, 0, 10 );
      ctx.fillStyle = rgb( 0 );
      ctx.fillRect( p.pos.x - ( engine.grid.spacing_x - 10 ) / 2, p.pos.y, engine.grid.spacing_x - 10, vol );

    }

  }

}();
