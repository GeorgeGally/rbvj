var particle_array = [];
var imgData;
var maxParticles = 10000;
ctx.background(0);

function draw() {

  ctx.fillStyle = rgba( 0, 0, 0, 0.04 );
  ctx.fillRect( 0, 0, width, height );

  if ( chance( 2 ) ) {
    addParticle( random( w ), random( h ) );
    addParticle( random( w ), random( h ) );
  }

  for ( var i = particle_array.length - 1; i >= 0; i-- ) {
    p = particle_array[ i ];

    if ( p.x != 0 && p.y != 0 ) {

      ctx.fillStyle = p.c;

      ctx.fillEllipse( p.x, p.y, p.size, p.size );

      if ( p.alpha < 1 ) p.alpha += 0.0009;

      if ( p.size < 0.05 ) {
        p.x = p.orig_x + random( -4, 4 );
        p.y = p.orig_y + random( -4, 4 );
        p.size = 4;
        p.speedx = random( -1, 1 ),
          p.speedy = random( -1, 1 )
      }

      p.x += p.speedx;
      p.y += p.speedy;
      p.size *= p.reduce;
    }
  };

  if ( particle_array.size > maxParticles ) particle_array.shift();
}



function addParticle( _x, _y ) {
  var particle = {
    orig_x: _x,
    orig_y: _y,
    x: _x + random( -4, 4 ),
    y: _y + random( -4, 4 ),
    c: rgb( random( 40, 255 ), random( 10, 255 ), random( 255 ) ),
    size: 4,
    reduce: random( 0.9, 0.99 ),
    alpha: 0,
    speedx: random( -1, 1 ),
    speedy: random( -1, 1 )
  };
  particle_array.push( particle );
}
