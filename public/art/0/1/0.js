rbvj = function () {

  ctx.lineWidth = 1;
  var gx = randomInt( 2, 15 );
  var gy = 25;
  var grid = new Grid( gx, gy );
  var engine = new particleEngine( gx, gy );


  function reset() {
    console.log( "reset" );
    gx = randomInt( 2, 15 );
    grid = new Grid( gx, gy );
    engine = new particleEngine( gx, gy );
  }


  draw = function () {
    if ( chance( 400 ) ) reset();
    ctx.background( 0 );
    for ( var i = 0; i < engine.particles.length; i++ ) {
      var p = engine.particles[ i ];
      var vol = Sound.mapSound( i, engine.particles.length, 0, 10 );
      ctx.fillStyle = rgb( 255 );
      ctx.fillRect( p.pos.x - ( engine.grid.spacing_x - 10 ) / 2, p.pos.y, engine.grid.spacing_x - 5, 1.5 * Math.abs( vol ) );
      p.pos.y += 1;
      if ( p.pos.y > h ) p.pos.y = 0;
    }

  }


}();
