rbvj = function () {

  var block_size = 20;
  var maxballs = 500;
  var balls = [];
  var motion = [];
  var gridx = 20;
  var gridy = 5;
  var number_of_balls = gridx * gridy;
  var grid = createGrid( gridx, gridy );
  var grid2 = createGrid( gridx * 2, gridy * 2 );

  for ( var i = 0; i < number_of_balls; i++ ) {
    addBall( grid[ i ].x, grid[ i ].y );
  }

  ctx.background( 0 );


  function addBall( _x, _y ) {
    var sz = ave( random( 20, 200 ), gridx * 2 );

    var ball = {
      x: _x,
      y: _y,
      speed_x: random( -2, 2 ),
      speed_y: random( -5, -1 ),
      c: rgba( 255 ),
      sz: sz
    }

    balls.push( ball );
    if ( balls.length > maxballs ) removeBall();

  }

  function removeBall() {
    balls.splice( 0, 1 );
  }

  for ( var i = 0; i < number_of_balls; i++ ) {
    addBall( grid[ i ].x, grid[ i ].y );
  }

  function update() {

    for ( var i = 0; i < balls.length; i++ ) {

      b = balls[ i ];

      if ( b.x > width - b.size / 2 || b.x < b.size / 2 ) {
        b.speed_x = b.speed_x * -1;
      }

      if ( b.y < 0 ) {
        b.y = height;
      }
      vol = Sound.mapSound( i, balls.length, 0, 10 );
      //b.x += b.speed_x;
      b.y += b.speed_y - vol / 10;

      b.sz = Math.abs( Math.sin( frameCount / ( 20 + i + vol ) ) * 50 );
    } // end for loop

  }


  draw = function () {

    ctx.background( 255, 0.4 );
    update();

    ctx.lineWidth = 4;
    ctx.strokeStyle = rgb( 255 );
    for ( var i = 0; i < balls.length; i++ ) {
      b = balls[ i ];
      ctx.fillStyle = rgb( 0 );
      ctx.fillEllipse( b.x, b.y, b.sz, b.sz );

    } // end for loop

    ctx.lineWidth = 0.2;
    ctx.strokeStyle = rgba( 220, 0.9 );

  } // end draw

}();
