rbvj = function () {

  ctx.strokeStyle = rgba( 0, 0, 0, 0.8 );

  var particles = [];
  var radius = 150;
  var num_particles = 1400;
  var cols = [ '#fdea00', '#50bfe8', '#f06724', '#8cc640' ];
  var angle = 360 / num_particles;
  var circ_sz = 300;
  var t_size = 150;
  var top_offset = 0;

  for ( var i = 0; i < num_particles; i += 1 ) {

    //var x = 2*Math.cos(radians(i*angle))*radius;
    var x = random( w );
    var y = random( h );

    addParticle( x, y, cols[ i % 5 ], i );
  };

  var s1 = 1;
  var s2 = -1;

  draw = function () {
    var s = Sound.mapSound( 10, 100, 80, 180 );
    t_size = tween( t_size, s, 3 );

    ctx.fillStyle = rgb( 255 );
    ctx.fillRect( 0, 0, w, h );

    moveParticles();

    ctx.save();
    ctx.fillStyle = rgb( 0 );

    ctx.rect( w / 2 - t_size / 2, h / 2 - t_size / 2, t_size, t_size );
    ctx.clip();
    ctx.fillStyle = rgb( 0 );
    ctx.fillRect( w / 2 - t_size / 2, h / 2 - t_size / 2, t_size, t_size );

    ctx.strokeStyle = rgb( 255 );

    ctx.fillStyle = rgb( 0 );
    drawParticles();
    ctx.restore();

    ctx.fillStyle = "#000";
    ctx.lineWidth = 1;

    ctx.save();
    ctx.fillStyle = rgb( 0 );
    ctx.rect( w / 2 - t_size / 2, h / 2 - t_size / 2, t_size, t_size );
    ctx.clip();
    ctx.fillStyle = cols[ randomInt( 4 ) ];
    drawParticles();
    ctx.restore();

  }


  function addParticle( _x, _y, _colour, _me ) {
    var particle = {
      x: _x,
      y: _y,
      c: _colour,
      me: _me,
      speedx: posNeg() * random( 0.4, 4 ),
      speedy: posNeg() * random( 0.4, 4 ),
      sz: random( 2, 10 ),
      angle: random( 1 )
    }

    particles.push( particle );
  }


  function drawParticles() {

    for ( var i = 0; i < particles.length; i++ ) {
      p = particles[ i ];
      ctx.fillEllipse( p.x, p.y, p.sz, p.sz );
    }

  }

  function moveParticles() {

    for ( var i = 0; i < particles.length; i++ ) {

      p = particles[ i ];
      var s = Sound.mapSound( p.me % 100, 100, -3, 5 );
      p.sz = s;

      p.x = ( p.x + p.speedx ) % w;
      p.y = ( p.y + p.speedy ) % h;

    };

  }



}();
