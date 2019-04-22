rbvj = function(){

var particles = [];
var numParticles = 40;
var mode = 1;
var dir = 1;
var x = 0;
var y = 0;
ctx.lineWidth = 1;

for (var i = 0; i < numParticles; i++) {
  x = x+(Math.cos(i)),
  y = y+(Math.sin(i));
  addParticle(i, x, y);

}

function addParticle(i, x, y){
      var particle = {
        x: x,
        y: h/2,
        sz: sticky(random(0.1, 6), 0.4),
        dir: dir
    }
    dir *=-1;
    particles.push(particle);
}



draw = function() {
  ctx.background(0);
  moveParticles();
}

function moveParticles(){
  if (chance(200)) mode = randomInt(1,2);
  for (var i = 0; i < particles.length; i++) {
    particle = particles[i];
    var f = Sound.mapSound(i, particles.length, 0, 100)*particle.dir* 0.5;
    var vol = Sound.volume;
    particle.x= particle.sz * (Math.sin(i)),
    particle.y = tween(particle.y, h/2 + f, 2);
    ctx.lineWidth = particle.sz;
    ctx.strokeStyle = rgb(255);
      if (particle.dir == 1) {
        var v = 0;
        var vv = w;
      } else {
        var vv = 0;
        var v = w;
      }
      if (mode == 1) {
        ctx.line(0, particle.y, w, particle.y);
      } else {
        ctx.line(vv, h/2 + f, v,h/2);
      }



  };
}



}();
