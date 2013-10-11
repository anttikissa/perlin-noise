var ctx = document.querySelector('canvas').getContext('2d');
ctx.fillRect(0, 0, 2000, 2000);

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

// This came from Wikipedia (page "random number generation")
// and is about 2 times slower than Math.random
var m_w = 123456789;
var m_z = 987654321;
var mask = 0xffffffff;

function seed(i) {
	m_w = i;
}

function random()
{
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    var result = ((m_z << 16) + m_w) & mask;
	result /= 4294967296;
	return result + 0.5;
}

// This is twice as fast as Math.random
function constRandom() {
	return 0.4;
}

// This is roughly competitive, speed-wise, with Math.random
// But not random at all (mostly as a benchmark)
var x = 0;
function base() {
	x += 1234567;
	x %= 1000000;
	return x / 1000000;
}


// This is from Stack Overflow, nice but slow (50x Math.random)
var idx = 0;
function random2() {
	var result = '0.' + Math.sin(idx++).toString().substr(6);
	return Number(result);
}

// This is an optimized version, more precise and faster
// (only 2.5x slower than Math.random)
var idx2 = 0;
function random3() {
	var x = Math.sin(idx2++) * 10000;
	return x - Math.floor(x);
}

var rnd = constRandom;
// Populate box with pixels to verify the randomness
for (var i = 0; i < 10000; i++) {
	rgb(0, 1, 0, rnd() * 280 + 10, rnd() * 280 + 10);
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

if (1) {
	measure(constRandom);
	measure(base);
	measure(random);
	measure(Math.random);
	measure(random2);
	measure(random3);
}
