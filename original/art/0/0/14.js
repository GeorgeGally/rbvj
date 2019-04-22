rbvj = function () {

  ctx.strokeStyle = rgba( 0, 0, 0, 0.8 );
  var num = 120;
  var particles = [];

  var time = 0;
  ctx.fillStyle = "white";

  /// SETUP
  for ( var i = 0; i < num; i++ ) {
    particles[ i ] = new Particle( new Vector( random( w ), random( h ) ) );
  }


  function Particle( pos ) {
    this.pos = pos;
    this.speed = new Vector( random( 0.2, 2 ), random( 0.2, 2 ) );
  }

  var v = 1.3;

  this.draw = function () {
    //ctx.clearRect(0, 0,w,h);
    ctx.background( 240, 0.2 )
    ctx.save();
    ctx.translate( w / 2, h / 2 );
    var t = Sound.mapSound( 50, particles.length * 2, 1, 10 ) * 0.0001;
    for ( var i = 0; i < particles.length; i++ ) {

      ctx.rotate( radians( time ) );
      ctx.HfillEllipse( 10 + i * 2, 0, i * v, i * v );
      ctx.HstrokeEllipse( 10 + i * 2, 0, i * v, i * v );
      time += t;
    }

    ctx.restore();
  }


}();
