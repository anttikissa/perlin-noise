var ctx = document.querySelector('canvas').getContext('2d');
ctx.fillRect(0, 0, 200, 200);

function pixel(r, g, b, x, y) {
	ctx.fillStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
	ctx.fillRect(x, y, 1, 1);
}

pixel(255, 255, 255, 50, 50);
