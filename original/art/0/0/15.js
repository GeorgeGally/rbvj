rbvj = function () {

  var particles = [];
  var radius = 220;
  var c = 0;

  var grid_w = 10;
  var grid_h = 5;
  var grid = createGrid( grid_w, grid_h, w, h );
  var num_particles = grid_w * grid_h;

  for ( var i = 0; i < num_particles; i++ ) {

    var m = map( i, 0, num_particles, 0, 360 );
    var cc = hsl( m, 96, 60 );
    addParticle( grid[ i ][ 0 ], grid[ i ][ 1 ], cc, i );

  }


  draw = function () {

    ctx.background( 255 );
    moveParticles();
    ctx.fillStyle = rgba( 0, 0, 0, 1 );

  }


  function addParticle( _x, _y, _colour, _me ) {
    var particle = {
      x: _x,
      y: _y,
      c: _colour,
      me: _me,
      me2: ( _me + randomInt( -30, 30 ) ) % num_particles,
      sz: 0,
      angle: radians( ( 2.2 * _me ) % 360 )
    }

    particles.push( particle );
  }

  function moveParticles() {
    for ( var i = 0; i < particles.length; i++ ) {
      p = particles[ i ];
      var sz = Sound.mapSound( 10, 100, 0, 50 );
      if ( sz < p.sz ) {
        p.sz = sz;
      } else {
        var sz = Sound.mapSound( 10, 100, 0, 40 );
        p.sz = tween( p.sz, sz, 8 );


      }
      p.angle = tween( p.angle, radians( 4 * p.sz ), 5 );
      ctx.translate( p.x, p.y );
      ctx.rotate( p.angle );

      cross( 0, 0, p.sz * 0.6, p.sz * 2.2 );
      ctx.rotate( -p.angle );
      ctx.translate( -p.x, -p.y );
    };

  }

  function cross( _x, _y, _w, _h ) {
    if ( _w === undefined ) _w = 20;
    if ( _h === undefined ) _h = 60;
    ctx.fillRect( _x - _w / 2, _y - _h / 2, _w, _h );
    ctx.fillRect( _x - _h / 2, _y - _w / 2, _h, _w );
  }
}();
