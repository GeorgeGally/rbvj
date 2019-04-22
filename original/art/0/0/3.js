rbvj = function() {

  ctx.strokeStyle = rgba(0, 0, 0, 0.8);
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.lineJoin = "miter";
  var grid_w = 50;
  var grid_h = 40;
  var grid = createGrid(grid_w, grid_h, w, h);
  var counter = 0;
  var particles = [];
  var num_particles = grid_w * grid_h;
  var cols = ['#fdea00', '#50bfe8', '#f06724', '#8cc640'];
  var angle = 360 / num_particles;
  var circ_sz = 4;
  var t_size = 250;
  var middle = 0;

  for (var i = 0; i < num_particles; i += 1) {
    var x = grid[i][0];
    var y = grid[i][1];
    addParticle(x, y, cols[i % 5], i);
  };



  draw = function() {

    ctx.background(255);
    drawParticles();

  }


  function addParticle(_x, _y, _colour, _me) {
    var particle = {
      x: _x,
      y: _y,
      c: _colour,
      me: (_me + randomInt(-4, 4)) % 100,
      offset: 0,
      on: false,
      speedx: posNeg() * random(0.4, 4),
      speedy: posNeg() * random(0.4, 4),
      sz: circ_sz,
      counter: _x / 100 + _y / 50
    }

    particles.push(particle);
  }


  function drawParticles() {

    for (var i = 0; i < particles.length; i++) {
      p = particles[i];
      p.counter += 0.1;
      p.sz = tween(p.sz, circ_sz + Math.sin(p.counter) * 20, 10);
      if (Sound.spectrum[p.me] > 80) {
        p.on == true;
        ctx.fillStyle = rgb(0, 0, 0);
        ctx.fillEllipse(p.x, p.y, p.sz, p.sz);
      } else {
        ctx.fillStyle = rgba(0, 0, 0, 0.08);
      }
      if (chance(10000) && p.on == true) {
        p.on == false;
      }
    }

  }

}();
