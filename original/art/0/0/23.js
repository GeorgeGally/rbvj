rbvj = function () {

  var particles = [];
  var radius = 180;
  var max_particles = 1800;
  draw = function () {
    var ratio = w / Sound.spectrum.length;

    ctx.background( 255 );

    for ( var i = 0; i < Sound.spectrum.length / 2; i += 2 ) {
      var x = w / 2 + Math.cos( radians( Sound.mapSound( i, Sound.spectrum.length / 2, 0, 360 ) ) ) * radius;
      var y = h / 2 + Math.sin( radians( Sound.mapSound( i, Sound.spectrum.length / 2, 0, 360 ) ) ) * radius;
      if ( Sound.spectrum[ i ] > 1 ) addParticle( x, y, "#000" );
    };
    moveParticles();
  }

  function addParticle( _x, _y, _colour ) {
    var particle = {
      x: _x,
      y: _y,
      c: _colour,
      speedx: random( -5, 5 ),
      speedy: random( -5, 5 ),
      sz: 18
    }

    particles.push( particle );
    if ( particles.length > max_particles ) particles.splice( 0, 1 );
  }

  function moveParticles() {
    for ( var i = particles.length - 1; i >= 0; i-- ) {
      p = particles[ i ];
      p.x += p.speedx;
      p.y += p.speedy;
      p.sz *= 0.85;
      ctx.fillStyle = p.c;
      ctx.fillEllipse( p.x, p.y, p.sz, p.sz );
      ctx.fillStyle = "#fff";
      if ( p.sz > 0.2 ) ctx.fillEllipse( p.x, p.y, p.sz / 5, p.sz / 5 );
      if ( p.x < 0 || p.y < 0 || p.x > w || p.y > h || p.sz < 0.2 ) particles.splice( i, 1 );
    };

  }



}();
