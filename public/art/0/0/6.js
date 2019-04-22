rbvj = function(){

var vol = 0;
var gx, gy;

var engine;
reset();

function reset() {
  console.log("reset");
  gx = randomInt(20, 85);
  gy = randomInt(20, 120);
  engine = new particleEngine(gx, gy);
  ctx.fillStyle = rgb(0);
}


draw = function() {

  ctx.background(255);

  if (chance(400)) reset();

  for (var i=0; i < engine.particles.length; i++){

    var p = engine.particles[i];
    vol = Sound.mapSound(i%100, 100, 1, engine.grid.spacing_x - 2) - random(0.3);
    p.r = tween(p.r, vol, 2);
    ctx.fillRect(p.pos.x - engine.grid.spacing_x/2, p.pos.y - engine.grid.spacing_y/2, p.r, engine.grid.spacing_y - 2);

  }

}

}();
