rbvj = function () {
  
  ctx.strokeStyle = rgb( 0, 0, 0 );

  var particles = [];
  var radius = 50;
  var num_particles = 8;
  var angle = 360 / num_particles;
  var circ_sz = 300;

  var s1 = 1;
  var s2 = -1;
  var vol = 0;
  var rot = 0;

  draw = function () {

    var v = map( Sound.spectrum[ 20 ], 0, 100, -17, 10 )
    rot = tween( rot, radians( v ) / 100, 10 );
    vol = tween( vol, v / 10, 240 );
    // var x = Math.sin(rot*80)*220;
    var x = Math.sin( vol ) * 220;

    ctx.fillStyle = rgb( 250 );
    ctx.fillRect( 0, 0, w, h );


    ctx.translate( w / 2, h / 2 );

    ctx.rotate( rot );

    drawCircle( x, 0 );
    drawCircle( -x, 0 );

    ctx.rotate( -rot );

    ctx.rotate( rot + radians( 45 ) );

    drawCircle( x, 0 );
    drawCircle( -x, 0 );

    ctx.rotate( rot + radians( -45 ) );

    ctx.rotate( rot + radians( 135 ) );

    drawCircle( x, 0 );
    drawCircle( -x, 0 );

    ctx.rotate( rot + radians( -135 ) );


    ctx.rotate( rot + radians( 90 ) );

    drawCircle( x, 0 );
    drawCircle( -x, 0 );

    ctx.rotate( rot + radians( -90 ) );


    ctx.translate( -w / 2, -h / 2 );

  }

  function drawCircle( x, y ) {

    ctx.lineWidth = 2;
    ctx.strokeStyle = rgb( 0 );

    ctx.save();
    ctx.ellipse( x, y, 250, 250 );
    ctx.clip();

    for ( var i = 0; i < h; i += 8 ) {
      ctx.line( -w / 2, i - h / 2, w / 2, i - h / 2 );
    }

    ctx.restore();

    ctx.lineWidth = 10;
    ctx.strokeStyle = rgb( 0 );
    ctx.HstrokeEllipse( x, y, 250, 250 );

  }

}();
