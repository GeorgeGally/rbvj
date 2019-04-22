rbvj = function() {

  var vol = 0;
  ctx.fillStyle = rgb(0);
  var gx = randomInt(5, 50);
  var gy = randomInt(5, 50);

  var engine = new particleEngine(gx, gy);

  function reset(which) {

    console.log("reset");
    
    if(which) {
      gx = randomInt(2, 40)
    } else {
      gy = randomInt(2, 40);
    }

    engine = new particleEngine(gx, gy);
  }


  draw = function() {

    ctx.background(0);
    if (Sound.getMidsVol() > 60 && chance(40)) reset();
    if (Sound.getBassVol() > 60 && chance(40)) reset("x");

    for (var i = 0; i < engine.particles.length; i++) {

      var p = engine.particles[i];
      volX = Sound.mapSound(i, engine.particles.length * 1.4, 1, engine.grid.spacing_x - 1);
      volY = Sound.mapSound(i, engine.particles.length * 1.4, 1, 40);
      ctx.fillStyle = rgb(255);
      ctx.centreFillRect(p.pos.x - engine.grid.spacing_x / 2, p.pos.y - engine.grid.spacing_y / 2, volX, engine.grid.spacing_y);

    }

  }

}();
