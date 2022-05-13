// code pen: https://codepen.io/halvves/pen/GZJyEZ
// Author: @halvves

// The overall animation and interface of this codepen intrigued me. The colors, speed and frequency of certain animated elements made the entire codepen appear almost like a movie.

// The variable here states the number of 'blobs' that will appear on the screen. it has been set in such a way that it appears randomly across the screen
var blobCount = 20;
function randy(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}

// The variable here states the 'time' or duration of the movement of 'blob's' occurr
var time = 4,
    tl = new TimelineMax({repeat: -1,yoyo:false}),
    container = document.getElementById("container");
for (var i = 0; i < blobCount; i++) {
  var div = document.createElement("div");
  container.appendChild(div);
}
// here the blobs have been estalbished into elements that are children. This allows for  distinctive movement amongst all the blobs in the animation
var blobs = container.children;
initSettings = [];
// this is the set size of the blobs as well as the coordinates through which all the blobs move around on the screen
for (var i = 0; i < blobs.length; i++) {
  var init = {};
  init.rot = randy(-2500,2500);
  init.rotX = randy(-2500,2500);
  init.rotY = randy(-2500,2500);
  init.rotZ = randy(-2500,2500);
  init.left = randy(-40,130) + "%";
  init.top = randy(-40,130) + "%";
  initSettings.push(init);
  tl.set(blobs[i], {
    //   rotation refers to the orientation of the blobs
    rotation: init.rot,
    rotationX: init.rotX,
    rotationY: init.rotY,
    rotationZ: init.rotZ,
    left: init.left,
    top: init.top,
  });
}
for (var i = 0; i < blobs.length; i++) {
  tl.to(blobs[i], time*6, {
    rotation: "+="+3600,
    rotationX: "+="+3600,
    rotationY: "+="+3600,
    rotationZ: "+="+3600,
    ease: Power0.easeNone
  }, 0);
}
// this refers to the length of the blobs as well as the manner in which they ease in and out.
// the blobs here are at different time as opposed to the blobs....
for (var i = 0; i < blobs.length; i++) {
  tl.to(blobs[i], time*2, {
    left: randy(-40,130) + "%",
    ease: Sine.easeInOut
  }, 0);
}
for (var i = 0; i < blobs.length; i++) {
  tl.to(blobs[i], time, {
    top: randy(-40,130) + "%",
    ease: Sine.easeInOut
  }, 0);
}
for (var i = 0; i < blobs.length; i++) {
  tl.to(blobs[i], time*2, {
    top: randy(-40,130) + "%",
    ease: Sine.easeInOut
  }, time);
}
// ...here
for (var i = 0; i < blobs.length; i++) {
  tl.to(blobs[i], time*2, {
    left: randy(-40,130) + "%",
    ease: Sine.easeInOut
  }, time*2);
}
for (var i = 0; i < blobs.length; i++) {
  tl.to(blobs[i], time*2, {
    top: randy(-40,130) + "%",
    ease: Sine.easeInOut
  }, time*3);
}
for (var i = 0; i < blobs.length; i++) {
  tl.to(blobs[i], time*2, {
    left: initSettings[i].left,
    ease: Sine.easeInOut
  }, time*4);
}
for (var i = 0; i < blobs.length; i++) {
  tl.to(blobs[i], time, {
    top: initSettings[i].top,
    ease: Sine.easeInOut
  }, time*5);
}