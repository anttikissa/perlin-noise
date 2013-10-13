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

var seed = 0;
function random() {
	var x = Math.sin(.8765111159592828 + seed++) * 10000.0;
	return x - Math.floor(x);
}

console.log(random());
random();

// var rnd = random;
// for (var i = 0; i < 1000; i++) {
// 	var x = 120 + rnd() * 100;
// 	var y = 10 + rnd() * 100;
// 	rgb(1, 1, 1, x, y);
// }

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

function minus(a, b) {
	return [a[0] - b[0], a[1] - b[1]];
}

function dot(a, b) {
	return a[0] * b[0] + a[1] + b[1];
}

function smooth(x) {
	return 3 * x * x - 2 * x * x * x;
}

// t == 0 results in a
// t == 1 results in b
// t in between results in a mix of them
function interpolate(a, b, x) {
	//http://webstaff.itn.liu.se/~stegu/TNM022-2005/perlinnoiselinks/perlin-noise-math-faq.html
	// This seems to hint at:
	return a * smooth(1 - x) + b * x;
	return a * (1 - x) + b * x;
}

// Visualize smooth()
for (var i = 0; i < 100; i++) {
	var x = i / 100;
	var y = smooth(x);

	gray(255, 120 + x * 100, 110 - y * 100);
//	gray(255, 220 - x * 100, 10 + y * 100);
}

//seed = new Date();
for (var i = 0; i < 100; i++) {
	for (var j = 0; j < 100; j++) {
		var pos = [j / 10, i / 10];

		// x, y are integer indexes to the top-leftmost grid position
		var x = Math.floor(pos[0]);
		var y = Math.floor(pos[1]);

		var g1 = gradients[y * 10 + x];
		var g2 = gradients[y * 10 + x + 1];
		var g3 = gradients[(y + 1) * 10 + x];
		var g4 = gradients[(y + 1) * 10 + x + 1];
		var s = dot(g1, minus(pos, [x, y]));
		var t = dot(g2, minus(pos, [x + 1, y]));
		var u = dot(g3, minus(pos, [x, y + 1]));
		var v = dot(g4, minus(pos, [x + 1, y + 1]));

		var relX = pos[0] - x;
		var relY = pos[1] - y;

		var a = interpolate(s, t, relX);
		var b = interpolate(u, v, relX);
		var c = interpolate(a, b, relY);
		// [-1, +1] -> [0, 1]
		var value = c * .5 + .5;

		gray(value, 120 + j, 120 + i);
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
