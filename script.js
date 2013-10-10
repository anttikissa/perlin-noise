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

rgb(0, .9, .5, 50, 50);

gray(.1, 0, 0);
gray(.2, 0, 1);
gray(.3, 1, 2);
gray(.4, 1, 3);
gray(.5, 2, 3);
