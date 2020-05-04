var n = 105,
    speed = 0.15;

// ...not these
var c = document.getElementById("c"),
    ctx = c.getContext("2d"),
    cw = (c.width = window.innerWidth),
    ch = (c.height = window.innerHeight),
    bg = new Image(),
    img = new Image(100,100),
    img2 = new Image(100,100),
    img3 = new Image(100,100),
    mouseProps = {x:cw/2, y:cw/2},
    particles = [],
    Particle = function(index) {
      this.index = index;
      this.img = [img,img2,img3][index%3];    	
      this.x = this.y = this.progress = this.opacity = this.scale = 1;
      this.size = 25 + 400*((index+1)/n); //min size+
      if (index>n*0.96) this.size*=4; //make some really big foreground particles
      
      this.dur = (2 - 1*((index+1)/n))/speed;
      	
    	var rot = -rand(3,5); 
	    if (index%3==0) rot= -rot;
	    
      this.draw = function() {
        var offsetX = -(mouseProps.x-cw/2)*(this.size/1000),
            offsetY = -(mouseProps.y-ch/2)*(this.size/1000),
            size = this.size*this.scale;
	    	ctx.translate( this.x+offsetX, this.y+offsetY );
	      ctx.rotate(rot*this.progress);
	      ctx.globalAlpha = this.opacity; //console.log(this.opacity)
	      ctx.drawImage(this.img, -size/2, -size/2, size, size);
	      ctx.rotate(-rot*this.progress);
	      ctx.translate( -this.x-offsetX, -this.y-offsetY );
	    }
    };


function setParticle(p, replay) {
  var _tl = gsap.timeline()
            .fromTo(p, {
                x:rand(-p.size/2, cw+p.size),
                y:rand(-p.size/2, ch+p.size),
                progress:0,
                scale:function(i) {return (p.index%2==0) ? 0.8 : rand(2.5,5); }
            },{
                duration:p.dur,
                x:'+='+String( rand(-100, 100) ), 
                y:'+='+String( rand(-50, 50) ), 
                scale:function(i) {return (p.index%2==0) ? rand(2.5,5) : 0.8 ; },
                progress:1,              
                ease:Power0.easeNone,
                onComplete:function(){ setParticle(p, true); }
            }, 0)
            .fromTo(p, {
              opacity:0
            }, {
              duration:p.dur/4,
              opacity:1,
              yoyo:true,
              repeat:3,
              ease:'power4.in'
            }, 0)
  if (!replay) _tl.seek(p.dur*rand()); //fast forward only on first run
}


// First run
for (var i=0; i<n; i++) {
    particles.push(new Particle(i));
    setParticle(particles[i]);
}

gsap.ticker.add(function(){
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
  ctx.drawImage(bg, 0, 0, cw, ch);
  ctx.globalCompositeOperation = 'lighter';
  for (var i=0; i<n; i++) particles[i].draw();
});


window.addEventListener('resize', function() {
  particleNumber = 0;  
  cw = (c.width = window.innerWidth);
  ch = (c.height = window.innerHeight);
  for (var i=0; i<n; i++) {
    TweenMax.killTweensOf(particles[i]);
    setParticle(particles[i]);
  }
});

window.addEventListener('mousemove', function(e) { gsap.to(mouseProps, {duration:4, x:e.clientX, y:e.clientY, overwrite:true}); });

function rand(min=0, max=1) {
  return min + (max-min)*Math.random();
}

bg.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/721952/redLightBg.jpg';
img.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/721952/blurLight1.png';
img2.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/721952/blurLight2.png';
img3.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/721952/blurLight3.png';