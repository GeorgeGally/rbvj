rbvj = function () {

  var circs = [];
  var r = width / 8;
  var j = 0;

  for ( var _y = 10; _y < h - 10; _y += 10 ) {

    for ( var _x = 10; _x < w - 10; _x += r ) {
      var x = _x;
      var lw = random( 12 )
      var circle = {
        r: r - 10,
        me: j,
        x: x,
        vol: 0,
        dir: posNeg(),
        y: _y,
        myfill: rgb( 255, 255, 255 ),
        lw: lw
      }
      circs.push( circle );
    }

    j++;
    //console.log(j)
  }

  draw = function () {

    ctx.background( 255 );
    ctx.strokeStyle = rgb( 0 );

    for ( var i = 0; i < circs.length; i++ ) {

      var p = circs[ i ];
      var s = p.dir * Sound.mapSound( i, circs.length * 2, 0, 10 );
      p.vol = tween( p.vol, s, 10 );

      ctx.lineWidth = p.lw;
      if ( chance( 2000 ) ) p.dir *= -1;
      ctx.line( p.x, p.y + p.vol, p.x + r - 5, p.y - p.vol );


    }

  }

}();
