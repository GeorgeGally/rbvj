rbvj = function () {

  num = 3;
  movers = 3;
  var radius = 280;
  var radius2 = 120;

  var angle;
  var theta = 0;
  var offset = 0;
  var moverX;
  var moverY;

  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";
  ctx.lineWidth = 4;

  draw = function () {

    ctx.background( 240 );


    change();
    drawLines();

  }

  function change() {
    if ( chance( 5000 ) ) movers += 1;
    if ( chance( 5000 ) && movers > 2 ) movers -= 1;
    if ( chance( 5000 ) ) num += 1;
    if ( chance( 5000 ) && num > 2 ) num -= 1;
  }

  function drawLines() {

    theta += 2 * Math.PI / 400;
    var v = Sound.getVol( 0, 400 );
    radius2 = tween( radius2, v, 4 );

    ctx.save();
    ctx.translate( window.innerWidth / 2, window.innerHeight / 2 );
    ctx.rotate( theta / 10 );

    for ( var i = 0; i < num; i++ ) {

      var outerX = Math.cos( angle ) * radius;
      var outerY = Math.sin( angle ) * radius;
      ctx.fillEllipse( outerX, outerY, 6, 6 );
      angle = 2 * Math.PI / num * i;

      for ( var j = 0; j < movers; j++ ) {

        offset = theta + 2 * Math.PI / movers * j;
        moverX = Math.cos( offset ) * radius2;
        moverY = Math.sin( offset ) * radius2;
        ctx.line( outerX, outerY, moverX, moverY );

      }

    }
    ctx.restore();
  }


  window.onkeydown = function ( event ) {

    if ( event.which == 38 ) movers = ( movers + 1 ) % 40
    if ( event.which == 40 ) movers = ( movers - 1 );
    if ( movers < 0 ) movers = 40;
    if ( event.which == 39 ) num = ( num + 1 ) % 20;
    if ( event.which == 37 ) num = ( num - 2 );
    if ( num < 0 ) num = 40;

  };

}

rbvj();
