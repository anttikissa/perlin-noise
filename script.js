var ctx = document.querySelector('canvas').getContext('2d');
ctx.fillRect(0, 0, 200, 200);

function rgb(r, g, b, x, y) {
	ctx.fillStyle = 'rgb('
		+ Math.round(255 * r) + ', '
		+ Math.round(255 * g) + ', '
		+ Math.round(255 * b) + ')';
	ctx.fillRect(x, y, 1, 1);
}

function gray(g, x, y) {
	rgb(g, g, g, x, y);
}

for (var i = 0; i < 100; i++) {
	for (var j = 0; j < 100; j++) {
		gray(Math.random(), i, j);
	}
}
