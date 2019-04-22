rbvj = function() {

  var numParticles = 60;
  var particles = [];

  for (var i = 0; i < numParticles; i++) {
    addParticle(i);
  }

  function addParticle(i) {
    var x = map(i, 0, numParticles, 0, window.innerWidth);
    var particle = {
      x: 0,
      y: 0,
      r: random(1000),
      strokeColor: rgb(random(100, 255)),
      fillColor: rgba(0, random(55), random(0, 255), random(0, 255)),
      strokeWeight: randomInt(1, 4),
      size: 450,
      me: i
    }

    particles.push(particle);
  }



  draw = function() {
    ctx.background(0);
    for (var i = 0; i < particles.length; i++) {
      var vol = Sound.mapSound(i, particles.length, 0, w / 2);
      particles[i].strokeWeight = map( vol, 0, w/2, 1, 8);
      particles[i].size = tween(particles[i].size, vol * 2, 8);

    }
    moveParticles();

  }

  function moveParticles() {

    for (var i = 0; i < particles.length; i++) {
      particle = particles[i];
      ctx.strokeStyle = particles[i].strokeColor;
      ctx.lineWidth = particles[i].strokeWeight;
      ctx.HstrokeEllipse(w/2, h/2, particle.size, particle.size);
    };

  }




}();
