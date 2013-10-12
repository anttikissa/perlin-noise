var ctx = document.querySelector('canvas').getContext('2d');
ctx.fillRect(0, 0, 230, 230);

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
var seed = 1;
function random() {
	var x = Math.sin(seed++) * 10000;
	return x - Math.floor(x);
}

var gradients = [];

// Random (unit) vector
function randomVec() {
	var x = random() - 0.5;
	var y = random() - 0.5;
	var length = Math.sqrt(x * x + y * y);
	return [x / length, y / length];
}

// Generate gradients
for (var i = 0; i < 11; i++) {
	for (var j = 0; j < 11; j++) {
		gradients[i * 10 + j] = randomVec();
	}
}

// Visualize gradients
for (var i = 0; i < 11; i++) {
	for (var j = 0; j < 11; j++) {
		var startX = 10 + j * 10;
		var startY = 120 + i * 10;
		ctx.fillStyle = '#888';
		ctx.fillRect(startX - 1, startY - 1, 3, 3);
		ctx.strokeStyle = '#eee';
		ctx.beginPath();
		ctx.moveTo(startX, startY);
		var grad = gradients[i * 10 + j];
		ctx.lineTo(startX + grad[0] * 7, startY + grad[1] * 7);
		ctx.stroke();
	}
}

for (var i = 0; i < 100; i++) {
	for (var j = 0; j < 100; j++) {
		// TODO perlin

		gray(random(), 120 + j, 120 + i);
	}
}

// Generate random noise
for (var i = 0; i < 100; i++) {
	for (var j = 0; j < 100; j++) {
		gray(random(), j + 10, i + 10);
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
