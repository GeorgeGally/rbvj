rbvj = function(){

  ctx.lineWidth = 0.6;
  var flies = [];
  var balls = new particleEngine(1000);
  ctx.strokeStyle = rgba(0, 0.08);

  for (var i = 0; i < balls.particles.length; i++) {
      b = balls.particles[i];
      b.pos.x = b.x = random(w);
      b.pos.y = b.y = random(55);
      b.speed.x = random(0.1,2);
  	  b.speed.y = random(2,20);
      b.sz = 10;

      flies[i] = new particleEngine(40);
      for (var j = 0; j < flies[i].particles.length; j++) {
          p = flies[i].particles[j];
          p.pos.x = w/2;
          p.r = 40;
          p.pos.y = h/2;
          p.me = (p.me + randomInt(50))%120;
      }
  }

  draw = function (){

      ctx.background(255, 0.8);
      ctx.fillStyle = rgba(0, 0.7);

      for (var i = 0; i < balls.particles.length; i++) {

          b = balls.particles[i];
          var s = Sound.getMidsVol(80, 140);
          if(s > 0) p.r = tween(p.r, s, 5);

          //b.angle += radians(map(Sound.spectrum[b.me%120], 0, 120, -1, 1));
          //b.angle += radians(Sound.mapSound(b.me, balls.particles.length, -1, 1));
          b.pos.x = w/2 + Math.cos(b.angle) * (b.sz/2+p.r);
  		    b.pos.y = h/2 + Math.sin(b.angle) * (b.sz/2+p.r);

          //b.sz =  tween(b.sz, map(audioChannelVolume[b.me%80], 0, 100, -45, 45), 3);
         	b.sz = 2;


          for (var j = 0; j < flies[i].particles.length; j++) {

              var acceleration = new Vector(b.pos.x + b.sz*2, b.pos.y + b.sz*2);
              p = flies[i].particles[j];
              acceleration = acceleration.subtract(p.position);
              acceleration.setMag(0.3);

              p.speed = p.speed.add(acceleration);
              p.speed.limit(7);
              p.position = p.position.add(p.speed);

              p.sz = 2;
              ctx.line(p.position.x, p.position.y, b.pos.x, b.pos.y);

          }

      }


  }

}();
