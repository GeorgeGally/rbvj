rbvj = function () {

  var Wave = function ( _pos_y ) {

    ctx.strokeStyle = rgba( 0, 0, 0, 0.8 );
    ctx.lineWidth = 2;

    this.particles = [];
    particles = this.particles;
    var radius = 220;
    this.num_particles = 50;
    num_particles = this.num_particles;
    pos_y = _pos_y;
    this.pos_y = pos_y;

    this.setup = function () {
      for ( var i = 0; i < num_particles; i++ ) {
        var cc = rgba( random( 25 ), random( 255 ), 0, 0.5 );
        var x = Math.floor( i * w / num_particles );
        this.addParticle( x, pos_y, cc, i );
      }
    }

    this.draw = function () {
      this.moveParticles();

    }

    this.addParticle = function ( _x, _y, _colour, _me ) {
      var particle = {
        x: _x,
        y: _y,
        c: _colour,
        me: _me,
        speedx: 0.2,
        speedy: random( 2, 20 ),
        sz: 15,
        angle: radians( -90 + _me * 360 / num_particles )
      }
      //particle.x = w/2 + (particle.sz/2+radius) * Math.cos(particle.angle);
      particle.y = _y + ( particle.sz / 2 + radius ) * Math.sin( particle.angle );
      particle.startx = particle.x;
      particle.starty = particle.y;
      this.particles.push( particle );
    }


    this.moveParticles = function () {

      for ( var i = 0; i < particles.length; i++ ) {

        p = particles[ i ];
        var me = Math.floor( p.me * 360 / num_particles );
        var angle = Sound.spectrum[ Math.floor( ( i + pos_y ) % 256 ) ];
        p.angle += radians( angle / 80 );
        radius = Sound.spectrum[ p.me ];

        var r = radius;

        p.y = this.pos_y + ( 100 ) * Math.sin( p.angle );

        p.sz = Sound.mapSound( me + pos_y / 20, 2560, 6 );

        ctx.fillStyle = rgba( 0, 0, 0, 1 );

        if ( i > 0 ) ctx.line( p.x, p.y, particles[ i - 1 ].x, particles[ i - 1 ].y );

      };

    }

    this.setup();

  }

  var waves = [];
  var num_waves = 80;
  var spacing = h / num_waves;
  for ( var i = 0; i < num_waves; i++ ) {
    waves[ i ] = new Wave( i * spacing );
  };

  draw = function () {
    ctx.background( 255 );
    g1 = 10 + Math.sin( ( frameCount / 50 ) % 100 ) * 200;
    g2 = 10 + Math.sin( ( frameCount / 100 ) % 200 ) * 300;
    for ( var i = 0; i < num_waves; i++ ) {
      waves[ i ].draw();
    };

  }


}();
