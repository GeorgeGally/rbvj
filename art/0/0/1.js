rbvj = function () {

  var num_particles = 2;
  var engine = new particleEngine( num_particles, 1 );
  var particles = engine.particles;

  ctx.lineWidth = 1;

  var radius = 220;
  var out = radius;
  var out_on = false;
  var center_on = false;
  var all_on = false;
  var adding = false;
  var removing = false;
  var c = 0;
  var dir = 1;
  var rotation = 0;


  for ( var i = 0; i < particles.length; i++ ) {
    addNode( i );
  }

  function addNode( i ) {
    var p = particles[ i ];
    p.angle = radians( -90 + i * 360 / particles.length );
    p.pos.x = w / 2 + ( p.sz / 2 + radius ) * Math.cos( p.angle );
    p.pos.y = h / 2 + ( p.sz / 2 + radius ) * Math.sin( p.angle );
    p.start.x = p.pos.x;
    p.start.y = p.pos.y;
    p.radius = radius;

  }

  function addNewNode() {
    var me = particles.length;
    engine.add();
    addNode( me );
    for ( var i = 0; i < particles.length; i++ ) {
      var p = particles[ i ];
      p.angle = radians( -90 + i * 360 / particles.length );
      p.radius = radius;
      p.sz = 10;
    }
  }

  draw = function () {

    ctx.background( 245 );

    if ( chance( 400 ) ) adding = !adding;
    if ( chance( 400 ) ) removing = !removing;

    var ratio = w / Sound.spectrum.length;

    if ( chance( 100 ) && adding ) addNewNode();
    if ( chance( 100 ) && removing && engine.particles.length > 2 ) {
      engine.delete();
      engine.resetAngles();
    }
    if ( Sound.getBassVol() ) moveParticles();

  }


  function moveParticles() {

    if ( chance( 300 ) ) dir = posNeg();

    rotation = dir * Sound.spectrum[ 50 ];

    c = tween( c, 40 + map( Sound.spectrum[ 40 ], 0, 100, 0, 80 ), 2 );
    ctx.strokeStyle = rgb( 0 );
    ctx.fillStyle = rgb ( 0 );
    ctx.HfillEllipse( w / 2, h / 2, c, c );

    ctx.HstrokeEllipse( w / 2, h / 2, c, c );
    if ( center_on ) ctx.HfillEllipse( w / 2, h / 2, c - 20, c - 20 );

    if ( chance( 500 ) ) out_on = !out_on;
    if ( chance( 200 ) ) out_on = false;
    if ( chance( 500 ) ) all_on = !all_on;
    if ( Sound.getBassVol() > 80 ) {
      center_on = true;
    } else {
      center_on = false;
    }

    for ( var i = 0; i < particles.length; i++ ) {
      p = particles[ i ];
      var me = Math.floor( p.me * 360 / particles.length );
      p.angle += radians( rotation / 120 );

      if ( Sound.getBassVol() ) p.radius = tween( p.radius, Sound.getBassVol( c + 60, c + 300 ), 2 );

      out = p.radius;

      if ( all_on ) {
        p.on = true;
      } else {
        p.on = false;
      }

      if ( chance( 100 ) ) p.on = !p.on;

      var s = Sound.mapSound( i, particles.length, p.radius, 200 );
      p.sz = tween( p.sz, map( p.radius, 0, 100, 0, 20 ), 12 );
      p.pos.x = w / 2 + (  p.radius ) * Math.cos( p.angle );
      p.pos.y = h / 2 + (  p.radius ) * Math.sin( p.angle );
      var linepos = new Vector( w / 2 + ( p.radius - p.sz / 2 ) * Math.cos( p.angle ),
        h / 2 + ( p.radius - p.sz / 2 ) * Math.sin( p.angle ) );
      var linepos2 = new Vector( w / 2 + c / 2 * Math.cos( p.angle ), h / 2 + c / 2 * Math.sin( p.angle ) );
      ctx.strokeStyle = rgba( 0 );
      ctx.line( linepos2.x, linepos2.y, linepos.x, linepos.y );

      ctx.fillStyle = rgb( 0 );

      ctx.HstrokeEllipse( p.pos.x, p.pos.y, p.sz, p.sz );
      if ( p.on ) ctx.fillEllipse( p.pos.x, p.pos.y, p.sz - 20, p.sz - 20 );

    };


  }


}();
