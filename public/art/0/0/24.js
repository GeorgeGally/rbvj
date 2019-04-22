rbvj = function () {

  var particles = [];
  var radius = 160;
  var c = 0;
  var num_particles = 4000;
  ctx.strokeStyle = rgb( 255 );
  ctx.lineWidth = 0.5;

  for ( var i = 0; i < num_particles; i++ ) {

    var m = map( i, 0, num_particles, 0, 360 );
    var cc = hsl( m, 96, 60 );
    addParticle( random( 55 ), random( 55 ), cc, i );

  }


  draw = function () {

    ctx.fillStyle = rgb( 0 );
    ctx.fillRect( 0, 0, w, h );
    moveParticles();

  }



  function addParticle( _x, _y, _colour, _me ) {
    var particle = {
      x: w / 2,
      y: h / 2,
      xx: w / 2,
      yy: h / 2,
      c: _colour,
      me: _me,
      r: 0,
      r2: 0,
      me2: ( _me + randomInt( -30, 30 ) ) % num_particles,
      speedx: random( -2, 2 ) / 2,
      speedy: random( 2, 20 ),
      sz: 0,
      angle: radians( ( _me * 2 ) )
    }

    particles.push( particle );
  }

  function moveParticles() {
    for ( var i = 0; i < particles.length; i++ ) {
      p = particles[ i ];
      var r = radius + Sound.mapSound( p.me + randomInt( -20, 20 ) % 100, particles.length, -20, 20 );
      if ( !isNaN( r ) ) p.r = tween( p.r, randomInt( -40, 40 ) + r, 5 );

      x2 = p.x + ( radius / 2 * Math.cos( p.angle + radians( Sound.mapSound( i, particles.length, 0, 30 ) ) ) );
      y2 = p.y + ( radius / 2 * Math.sin( p.angle + radians( Sound.mapSound( i, particles.length, 0, 30 ) ) ) );

      p.xx = p.x + p.r * Math.cos( p.angle );
      p.yy = p.y + p.r * Math.sin( p.angle );


      if ( i > 0 ) {
        ctx.line( p.xx, p.yy, particles[ ( i - 1 ) ].xx, particles[ ( i - 1 ) ].yy );
      } else {
        ctx.line( p.xx, p.yy, particles[ 0 ].xx, particles[ 0 ].yy );
      }
    };

  }


}();
