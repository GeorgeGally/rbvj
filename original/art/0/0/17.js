rbvj = function () {

  var c = 0;
  var dir = 1;
  var rotation = 0;
  var ss = 0;
  var r = 0.0;
  var radius = 220;
  var out = radius;
  var out_on = false;
  var center_on = false;
  var all_on = false;
  var adding = false;
  var removing = false;
  var my_mode = randomInt( 1, 2 );
  console.log( my_mode );

  var VerletPhysics2D = toxi.physics2d.VerletPhysics2D,
    VerletParticle2D = toxi.physics2d.VerletParticle2D,
    VerletSpring2D = toxi.physics2d.VerletSpring2D,
    AttractionBehavior = toxi.physics2d.behaviors.AttractionBehavior,
    GravityBehavior = toxi.physics2d.behaviors.GravityBehavior,
    ZoomLensInterpolation = toxi.math.ZoomLensInterpolation,
    NamedColor = toxi.color.NamedColor,
    Collections = toxi.color.Collections,
    Vec2D = toxi.geom.Vec2D,
    TColor = toxi.color.TColor,
    Rect = toxi.geom.Rect;


  var physics = new VerletPhysics2D();
  physics.addBehavior( new GravityBehavior( new Vec2D( 0, 0.5 ) ) );
  physics.setWorldBounds( new Rect( 0, 0, w, h ) );


  num_shakers = 5;
  num_movers = 2;
  var d = 120;
  var d2 = 120;
  var frames = 400;
  var angle;
  var theta = 0;
  var offset = 0;
  var moverX;
  var moverY;
  var v = 0;
  ctx.lineWidth = 1;

  var movers = [];
  var shakers = [];
  var particles = [];
  var springs = [];
  var lines_on = true;
  var big_mover = false;

  for ( var i = 0; i < num_shakers; i++ ) {
    addShaker( i );
  }





  draw = function () {
    physics.update();
    ctx.background( 0 );
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.lineWidth = 0.5;
    theta += 2 * Math.PI / frames;
    drawLines();

  }


  function drawLines() {


    if ( chance( 1000 ) ) {
      my_mode = randomInt( 1, 3 );
      console.log( my_mode );
    }
    // if (chance(500)) lines_on = !lines_on;
    // if (chance(5000)) big_mover = !big_mover;
    //
    // if (chance(5000)) {
    //   num_movers = randomInt(2, 6);
    // };

    ctx.save();
    ctx.translate( w / 2, h / 2 );
    ctx.rotate( theta / 10 );

    if ( my_mode == 1 ) {
      Mode1();
    } else if ( my_mode == 2 ) {
      Mode2();
    } else if ( my_mode == 3 ) {
      Mode3();
    } else {
      Mode4();
    }

    ctx.restore();
  }

  function Mode1() {
    ctx.lineWidth = 1;
    if ( chance( 60 ) ) lines_on = !lines_on;
    if ( chance( 300 ) ) num_movers += 1;
    if ( chance( 1000 ) && num_movers > 3) num_movers -= 1;

    if ( chance( 300 ) ) addShaker();
    //if (chance(5000)) removeShaker();

    v = Sound.mapSound( 10, 100, 20, 120 );
    d = tween( d, v, 15 );
    d2 = tween( d2, v, 5 );
    for ( var i = 0; i < shakers.length; i++ ) {

      shakers[ i ].x = Math.cos( angle ) * d;
      shakers[ i ].y = Math.sin( angle ) * d;
      ctx.fillStyle = "white";
      ctx.strokeStyle = "white";
      ctx.fillEllipse( shakers[ i ].x, shakers[ i ].y, 12, 12 );
      angle = 2 * Math.PI / shakers.length * i;
      for ( var j = 0; j < num_movers; j++ ) {

        offset = theta + 2 * Math.PI / num_movers * j;
        moverX = Math.cos( offset ) * d2;
        moverY = Math.sin( offset ) * d2;
        if ( lines_on ) ctx.line( shakers[ i ].x, shakers[ i ].y, moverX, moverY );

        if ( big_mover ) {
          ctx.strokeEllipse( moverX, moverY, 100, 100 );
          ctx.fillEllipse( moverX, moverY, 12, 12 );
        } else {
          ctx.fillEllipse( moverX, moverY, 12, 12 );
        }

      }

    }
  }

  function Mode2() {

    ctx.lineWidth = 4;
    v = Sound.mapSound( 5, 100, 120, 150 );
    d = tween( d, v, 35 );
    d2 = tween( d2, v, 25 );
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    for ( var i = 0; i < shakers.length; i++ ) {

      shakers[ i ].x = Math.cos( angle ) * d;
      shakers[ i ].y = Math.sin( angle ) * d;
      angle = 2 * Math.PI / shakers.length * i;
      ctx.fillEllipse( shakers[ i ].x, shakers[ i ].y, 12, 12 );
      for ( var j = 0; j < num_movers; j++ ) {

        offset = theta + 2 * Math.PI / num_movers * j;
        moverX = Math.cos( offset ) * d2;
        moverY = Math.sin( offset ) * d2;
        if ( lines_on ) ctx.line( shakers[ i ].x, shakers[ i ].y, moverX, moverY );
        ctx.fillEllipse( moverX, moverY, 12, 12 );

      }

    }
  }

  function Mode3() {
    ctx.lineWidth = 2;
    if ( chance( 200 ) ) addShaker();
    if ( chance( 50 ) ) num_movers++;
    v = tween( v, Sound.mapSound( 10, 100, 60, 150 ), 5 );
    d = tween( d, v + 20, 35 );
    d2 = tween( d2, v + 30, 5 );
    ctx.fillStyle = "white";
    ctx.lineWeight = 0.2;
    for ( var i = 0; i < shakers.length; i++ ) {

      shakers[ i ].x = Math.cos( angle ) * d;
      shakers[ i ].y = Math.sin( angle ) * d;

      ctx.fillEllipse( shakers[ i ].x, shakers[ i ].y, 12, 12 );
      angle = 2 * Math.PI / shakers.length * i;

      for ( var j = 0; j < num_movers; j++ ) {

        offset = theta + 2 * Math.PI / num_movers * j;
        moverX = Math.cos( offset ) * d2;
        moverY = Math.sin( offset ) * d2;
        if ( lines_on ) ctx.line( shakers[ i ].x, shakers[ i ].y, moverX, moverY );

        if ( big_mover ) {
          ctx.fillStyle = "white";
          ctx.fillEllipse( moverX, moverY, 60, 60 );
          ctx.fillStyle = "white";
          ctx.fillEllipse( moverX, moverY, 22, 22 );
        } else {
          ctx.fillEllipse( moverX, moverY, 12, 12 );
        }


      }

    }
  }


  function Mode4() {

    ctx.strokeStyle = rgba( 255, 0.4 );
    var x = map( Math.sin( r ), -1, 1, 1, 720 );
    r += 0.00002;
    ss = tween( v, Sound.mapSound( 10, 100, 0, 200 ), 15 );

    for ( var i = 0; i < particles.length; ++i ) {
      ctx.strokeEllipse( x - w / 2, x - h / 2, 10000 * i / ss, 10000 * i / ss );
    }

  }




  function addShaker() {

    var s = new VerletParticle2D( new Vec2D( w / 2, h / 4 ) );
    shakers.push( s );
    var p = new VerletParticle2D( new Vec2D( w / 2, h / 2 ) );
    p.x = w / 2;
    p.y = h / 2;
    p.sz = 5;
    p.angle = random( 360 );
    p.on = true;
    p.me = particles.length;
    p.radius = radius;
    particles.push( p );

    physics.addParticle( s );
    physics.addParticle( p );

    var sp = new VerletSpring2D( shakers[ i ], particles[ i ], 90, 0.0001 );
    springs.push( sp );
    physics.addSpring( sp );

  }

  function removeShaker() {
    console.log( "removeShaker" );
    if ( shakers.length > 1 ) {
      var s = new VerletParticle2D( new Vec2D( w / 2, h / 4 ) );
      var s = shakers[ 0 ];
      var p = particles[ 0 ];
      var sp = springs[ 0 ];

      shakers.splice( 0, 1 );
      particles.splice( 0, 1 );
      springs.splice( 0, 1 );
    }
  }


}();
