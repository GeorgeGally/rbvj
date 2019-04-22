rbvj = function () {

  var fov = 240;

  var point = [];
  var points = [];
  var point3d = [];
  var angleX = 0;
  var angleY = 0;
  var HALF_WIDTH = width / 2;
  var HALF_HEIGHT = height / 2;

  var x3d = 0;
  var y3d = 0;
  var z3d = 0;

  var lastScale = 0;
  var lastx2d = 0;
  var lasty2d = 0;

  var size = 150;
  var dim = 80;
  var spacing;
  var numPoints;

  spacing = ( ( Math.PI * 2 ) / dim );
  numPoints = dim * dim;
  points = [];
  ctx.fillStyle = rgb(255);
  ctx.strokeStyle = rgb(0);

  for ( var i = 0; i < dim; i++ ) {

    var z = size * Math.cos( spacing / 2 * i );
    var s = size * Math.sin( spacing / 2 * i );

    for ( var j = 0; j < dim; j++ ) {

      var point = [ Math.cos( spacing * j ) * s, Math.sin( spacing * j ) * s, z ];
      points.push( point );


    }

  }



  draw = function () {

    ctx.background( 0 );

    angleX = Math.sin( frameCount / 100 ) * 0.01;
    angleY = Math.cos( frameCount / 200 ) * 0.01;

    for ( var i = 0; i < numPoints; i++ ) {
      point3d = points[ i ];
      // console.log(i)
      // console.log(points[i])
      z3d = point3d[ 2 ];
      if ( z3d < -fov ) z3d += 0;

      point3d[ 2 ] = z3d;

      rotateX( point3d, angleX );
      rotateY( point3d, angleY );

      x3d = point3d[ 0 ];
      y3d = point3d[ 1 ];
      z3d = point3d[ 2 ];

      var scale = ( fov / ( fov + z3d ) );
      var x2d = ( x3d * scale ) + HALF_WIDTH;
      var y2d = ( y3d * scale ) + HALF_HEIGHT;

      var s = Sound.mapSound( i % 90, numPoints * 2, 0, 1 );

      // ctx.fillEllipse( x2d, y2d, scale * s, scale * s );
      ctx.centreFillRect( x2d, y2d, scale * s, scale * s );
      //ctx.strokeEllipse( x2d, y2d, scale * s, scale * s );

    }

  }


  function rotateX( point3d, angleX ) {
    var x = point3d[ 0 ];
    var z = point3d[ 2 ];

    var cosRY = Math.cos( angleX );
    var sinRY = Math.sin( angleX );

    var tempz = z;
    var tempx = x;

    x = ( tempx * cosRY ) + ( tempz * sinRY );
    z = ( tempx * -sinRY ) + ( tempz * cosRY );

    point3d[ 0 ] = x;
    point3d[ 2 ] = z;

  }

  function rotateY( point3d, angleY ) {

    var y = point3d[ 1 ];
    var z = point3d[ 2 ];

    var cosRX = Math.cos( angleY );
    var sinRX = Math.sin( angleY );

    var tempz = z;
    var tempy = y;

    y = ( tempy * cosRX ) + ( tempz * sinRX );
    z = ( tempy * -sinRX ) + ( tempz * cosRX );

    point3d[ 1 ] = y;
    point3d[ 2 ] = z;

  }

}();
