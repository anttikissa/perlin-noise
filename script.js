var ctx = document.querySelector('canvas').getContext('2d');
ctx.fillRect(0, 0, 200, 200);

function rgb(r, g, b, x, y) {
	ctx.fillStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
	ctx.fillRect(x, y, 1, 1);
}

function gray(g, x, y) {
	rgb(g, g, g, x, y);
}

rgb(255, 255, 255, 50, 50);

gray(100, 0, 0);
gray(200, 0, 1);
gray(100, 1, 2);
gray(240, 1, 3);
gray(140, 2, 3);
