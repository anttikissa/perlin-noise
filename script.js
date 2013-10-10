var ctx = document.querySelector('canvas').getContext('2d');
ctx.fillRect(0, 0, 2000, 2000);

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

idx = 0;

function random2() {
	result = '0.' + Math.sin(idx++).toString().substr(6);
	return Number(result);
}

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

for (var i = 0; i < 100; i++) {
	for (var j = 0; j < 100; j++) {
		gray(random2(), i, j);
	}
}

function measure(what) {
	var start = new Date();
	var iters = 1000000;
	for (var k = 0; k < iters; k++) {
		what();
	}
	var end = new Date();
	console.log(what.name + " " + (end - start) * 1000 / iters + " us");
}

measure(random);
measure(Math.random);
measure(random2);
