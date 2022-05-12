console.clear();
window.addEventListener("load",app);

function app() {
	var cnv = document.querySelector("canvas"),
		c = cnv.getContext("2d"),
		root = document.querySelector(":root"),
		rootFS = window.getComputedStyle(root).getPropertyValue("font-size"),
		u = +rootFS.substr(0,rootFS.length-2),
		uw = 25.25,
		uh = 16.25,
		// canvas dimensions
		w = u * uw,
		h = u * uh,
		// scale, keep at 2 for best retina results
		s = 2;

	// set canvas dimensions with scale
	cnv.width = w * s;
	cnv.height = h * s;
	cnv.style.width = uw + "em";
	cnv.style.height = uh + "em";
	c.scale(s,s);


		const img = new Image();
	img.onload = draw;
	img.src = 'images/art4.png';

	var stylus = {
			x: w/2,
			y: h/2,
			w: 3
		},
		draw = function(color) {
			c.fillStyle = "black";
			c.fillRect(stylus.x,stylus.y,stylus.w,stylus.w);
		},
		checkPos = function() {
			// x bounds
			if (stylus.x < 0) {
				stylus.x = 0;
			} else if (stylus.x > w - stylus.w) {
				stylus.x = w - stylus.w;
			}
			// y bounds
			if (stylus.y < 0) {
				stylus.y = 0;
			} else if (stylus.y > h - stylus.w) {
				stylus.y = h - stylus.w;
			}
		},
		shadeBrd = function draw() {
		const ctx = document.querySelector('canvas').getContext('2d');
		ctx.drawImage(img, 0, 0, w, h);
		},
		// shadeBrd = function() {
        //     // color of the screen
		// 	c.fillStyle = "white";
		// 	c.fillRect(0,0,w,h);
		// },
		erase = function() {
			let op = 0,
				opInc = 0.05,
				incStop = 0.5,
				doIt = function() {
					op += opInc;
					c.globalAlpha = op;
					shadeBrd();
					if (op < incStop) {
						setTimeout(doIt,1000/60);
					} else {
						op = 0;
						c.globalAlpha = 1;
					}
				};
			doIt();
		},
		move = function(d) {
			draw("#555");
			let inc = 2;
			// 0 = left, 1 = up, 2 = right, 3 = down
			switch (d) {
				case 0:
					stylus.x -= inc;
					break;
				case 1:
					stylus.y -= inc;
					break;
				case 2:
					stylus.x += inc;
					break;
				case 3:
					stylus.y += inc;
					break;
				default:
					break;
			}
			checkPos();
			draw("#eee");
		},
		moveKbd = function(e) {
			draw("#555");
			if (e && e.keyCode) {
				let inc = 2;
				switch (e.keyCode) {
					case 37:
						stylus.x -= inc;
						break;
					case 38:
						stylus.y -= inc;
						break;
					case 39:
						stylus.x += inc;
						break;
					case 40:
						stylus.y += inc;
						break;
					default:
						break;
				}
				// prevent scrolling at same time
				if (e.keyCode >= 37 && e.keyCode <= 40) {
					e.preventDefault();
				}
			}
			checkPos();
			draw("#eee");
		},
		getAngle = function(ele) {
			let el = document.querySelector(ele),
				elTr = el.style.transform,
				// break down matrix value of crank transform and get angle
				matrixVal = elTr.split('(')[1].split(')')[0].split(','),
				cos1 = matrixVal[0],
				sin = matrixVal[1],
				angle = Math.round(Math.atan2(sin, cos1) * (180 / Math.PI));
			
			// convert negative angles to positive, correct -0 issue
			if (angle < 0) {
				angle += 360;
				if (angle == "-0") {
					angle = 0;
				}
			}
			return angle;
		},
		dialH = 0,
		dialHFn = Draggable.create("#horz", {
			type: "rotation",
			throwProps: true,
			onDrag: function() {
				let aH = getAngle("#horz");
				if (aH > dialH) {
					move(2);
				} else if (aH < dialH) {
					move(0);
				}
				dialH = aH;
			}
		}),
		dialV = 0,
		dialVFn = Draggable.create("#vert", {
			type: "rotation",
			throwProps: true,
			onDrag: function() {
				let aV = getAngle("#vert");
				if (aV > dialV) {
					move(1);
				} else if (aV < dialV) {
					move(3);
				}
				dialV = aV;
			}
		}),
		shakeBrd = function() {
			let brd = document.querySelector(".board");
			brd.className = "";
			void brd.offsetWidth;
			brd.className = "board shaking";
		};
	shadeBrd();

	
	if ("ontouchstart" in document.documentElement) {
		if (window.parent != window.self) {
			document.querySelector("#note").classList.remove("hide");
		} else {
			// interacting with board on iOS would cause accidental panning
			document.addEventListener("touchmove", function(e) {
        		e.preventDefault();
    		});
		}
	}
	
	// erase via device shake
	if (window.DeviceMotionEvent) {
		window.addEventListener("devicemotion",function(e) {
			let az = Math.round(e.acceleration.z);
			if (az < -16) {
				erase();
			}
		});
	}
	// erase via button
	let erEvent = "ontouchend" in document.documentElement ? "touchend" : "click";
	document.querySelector("#erase").addEventListener(erEvent, function() {
		shakeBrd();
		erase();
	});
	// draw with arrow keys
	document.addEventListener("keydown", moveKbd);
}