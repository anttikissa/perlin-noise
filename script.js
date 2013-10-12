var ctx = document.querySelector('canvas').getContext('2d');
ctx.fillRect(0, 0, 200, 200);

function rgb(r, g, b, x, y) {
	ctx.fillStyle = 'rgb('
		+ Math.round(255 * r) + ', '
		+ Math.round(255 * g) + ', '
		+ Math.round(255 * b) + ')';
	ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
}

function gray(g, x, y) {
	rgb(g, g, g, x, y);
}

// This is an optimized version, more precise and faster
// (only 2.5x slower than Math.random)
var seed = 0;
function random() {
	var x = Math.sin(seed++) * 10000;
	return x - Math.floor(x);
}

// Populate box with pixels to verify the randomness
for (var i = 0; i < 100; i++) {
	for (var j = 0; j < 100; j++) {
		gray(random(), i, j);
	}
}

// Measure speed of `what`
function measure(what) {
	var start = new Date();
	var iters = 1000000;
	for (var k = 0; k < iters; k++) {
		what();
	}
	var end = new Date();
	console.log(what.name + " " + (end - start) * 1000 / iters + " us");
}

if (0) {
	measure(Math.random);
	measure(random);
}
