var svg = document.getElementById('splash');
var mask = document.getElementById('maskRect');
var streak = document.getElementById('streak');
var cutout = document.getElementById('cutout');
var rated = document.getElementById('rated');
var header = document.getElementById('header');

var rotations = 2;
var rotation_dt = 10.5;
var rotation_dx = 0.5;

var revealQ_dt = 5;
var revealQ_da = 0.025;

var revealRated_dt = 5;
var revealRated_da = 0.025;

var revealVideo_dt = 50;
var revealVideo_da = 0.05;

var translateSvg_dy = 0.1;

function rotate_function(theta) { 
  return Math.pow(Math.sin( theta*Math.PI/180),0.5);
}

var i = 0;
var opacity = 0;
var rotID = window.setInterval(rotateStuff, rotation_dt);
var qID;
var ratedID;
var headerID;
var done = false;

function rotateStuff() {
  if (i >= 90) { i = 0; done=true;}
  if (i == 46) { qID = window.setInterval(revealQ, revealQ_dt);}
  mask.setAttribute("transform", "rotate(" + (rotate_function(i)*360*rotations -28.5) + ",50, 50) rotate(-5.2,47.5,85)");
  cutout.setAttribute("transform","rotate(" + (rotate_function(i)*360*rotations) + ",50,50)");
  streak.setAttribute("transform","rotate(" + (rotate_function(i)*360*rotations -37) + ",50, 50) rotate(3.4,50,85)");
  if(!done) i+=rotation_dx;
  else {
    clearInterval(rotID);
  }
}

function revealQ() {
  if(opacity>1) { 
    clearInterval(qID);
    ratedID = window.setInterval(revealRated, revealRated_dt);
    opacity=0;
    return;
  }
  streak.setAttribute('fill','rgba(255,255,255,'+opacity+')');
  opacity += revealQ_da;
}

function revealRated() {
  if(opacity>1) { 
    clearInterval(ratedID);
    opacity=1;
    headerID = window.setInterval(revealVideo, revealVideo_dt)
    return;
  }
  rated.setAttribute('fill','rgba(255,255,255,'+opacity+')');
  opacity += revealRated_da;
}

function revealVideo() {
  if(opacity <= 0.0) {
    clearInterval(headerID);
    // svg.style.position='relative';
    // svg.style.top='unset';
    // svg.style.left='unset';
    // svg.style.margin='auto';
    return;
  } 
  opacity -=revealVideo_da;
  header.style.backgroundColor='rgba(0,0,0,'+opacity+')';
}