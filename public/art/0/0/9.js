rbvj = function () {

  let numParticles = 85;
  let engine = new particleEngine( 200, 16 );

  for ( let p of engine.particles ) {
    p.dir = posNeg();
    p.c = randomGrey();
  }


  draw = function () {

    ctx.background( 0, 0.2 );
    for ( let p of engine.particles ) {

      let s = Sound.mapSound( p.me, engine.particles.length * 2, 0, w / 2 );
      let s2 = Sound.mapSound( p.me, engine.particles.length * 2, 0, 8 );
      ctx.lineWidth = s2;
      p.pos.x += s;
      if(p.pos.x > w) p.pos.x = 0;
      let x = p.pos.x + Math.sin( frameCount / 10 ) * w;
      ctx.strokeStyle = p.c;
      ctx.line( p.pos.x, p.pos.y - engine.grid.spacing.y /2, p.pos.x, p.pos.y + engine.grid.spacing.y /2 );

    }


  }

}();
