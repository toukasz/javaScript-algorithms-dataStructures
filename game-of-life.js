process.stdout.write('\x1Bc');

var x = [];
var y = [];
var z = [];
var arr = [];
var z_old = z;
var z_sum = [];
const div = 40;

function x_axis() {
	for (let i = 0; i < div; i++) {
		for (let i = 0; i < div; i++) {
			x.push(i);
		}
	}
}

function y_axis() {
	for (let i = 0; i < div; i++) {
		for (let n = 0; n < div; n++) {
			y.push(i);
		}
	}
}

function z_axis() {
	for (let i = 0; i < div * div; i++) {
		if (Math.random() >= 0.5) {
			z.push(1);
		} else {
			z.push(0);
		}
	}
}

function print() {
	for (let i = 0; i < div * div; i++) {
		if (arr[i][2] == 1 && (i + 1) % div == 0) {
			process.stdout.write("# \n");
		} else if (arr[i][2] == 0 && (i + 1) % div == 0) {
			process.stdout.write("  \n");
		} else if (arr[i][2] == 1) {
			process.stdout.write("# "); 
		} else if (arr[i][2] == 0) {
			process.stdout.write("  ");
		} else {
			process.stdout.write("? ");
		}
	}
}

// read 'z' at (x, y)
function life(n, m) {
	return(arr[x[n] + div * y[div * m]][2]);
}

// read sum life at (x, y)
function death(n, m) {
	if (n == 0 && m == 0) {
		return life(div - 1, div - 1) + life(n, div - 1) + life(n + 1, div - 1)
			+ life(div - 1, m) + life(n + 1, m)
			+ life(div - 1, m + 1) + life(n, m + 1) + life(n + 1, m + 1);
	} else if (n == div - 1 && m == 0) {
		return life(n - 1, div - 1) + life(n, div - 1) + life(0, div - 1)
			+ life(n - 1, m) + life(0, m)
			+ life(n - 1, m + 1) + life(n, m + 1) + life(0, m + 1);
	} else if (n == 0 && m == div - 1) {
		return life(div - 1, m - 1) + life(n, m - 1) + life(n + 1, m - 1)
			+ life(div - 1, m) + life(n + 1, m)
			+ life(div - 1, 0) + life(n, 0) + life(n + 1, 0);
	} else if (n == div - 1 && m == div - 1) {
		return life(n - 1, m - 1) + life(n, m - 1) + life(0, m - 1)
			+ life(n - 1, m) + life(0, m)
			+ life(n - 1, 0) + life(n, 0) + life(0, 0);
	} else if (n == 0) {
		return life(div - 1, m - 1) + life(n, m - 1) + life(n + 1, m - 1)
			+ life(div - 1, m) + life(n + 1, m)
			+ life(div - 1, m + 1) + life(n, m + 1) + life(n + 1, m + 1);
	} else if (n == div - 1) {
		return life(n - 1, m - 1) + life(n, m - 1) + life(0, m - 1)
			+ life(n - 1, m) + life(0, m)
			+ life(n - 1, m + 1) + life(n, m + 1) + life(0, m + 1);
	} else if (m == 0) {
		return life(n - 1, div - 1) + life(n, div - 1) + life(n + 1, div - 1)
			+ life(n - 1, m) + life(n + 1, m)
			+ life(n - 1, m + 1) + life(n, m + 1) + life(n + 1, m + 1);
	} else if (m == div - 1) {
		return life(n - 1, m - 1) + life(n, m - 1) + life(n + 1, m - 1)
			+ life(n - 1, m) + life(n + 1, m)
			+ life(n - 1, 0) + life(n, 0) + life(n + 1, 0);
	} else {
		return life(n - 1, m - 1) + life(n, m - 1) + life(n + 1, m - 1)
			+ life(n - 1, m) + life(n + 1, m)
			+ life(n - 1, m + 1) + life(n, m + 1) + life(n + 1, m + 1);
	}
}

// fill axes
x_axis();
y_axis();
z_axis();

// combine into array
for (let i = 0; i < div * div; i++) {
arr.push([x.shift(),y.shift(),z.shift()]);
}

// print
print();

function step() {
	x_axis();
	y_axis();
	z_sum = [];
	for (let i = 0; i < div * div; i++) {
		z_sum.push(death(x[i], y[i]));
	}
	for (let i = 0; i < div * div; i++) {
		if (z_sum[i] < 2) {
			arr[i][2] = 0;
		} else if (z_sum[i] > 3) {
			arr[i][2] = 0;
		} else if (z_sum[i] == 2 && z_old[i] == 1) {
			arr[i][2] = 1;
		} else if (z_sum[i] == 2 && z_old[i] == 0) {
			arr[i][2] = 0;
		} else if (z_sum[i] == 3) {
			arr[i][2] = 1;
		}
	}
	process.stdout.write('\x1Bc');
	print();
}

setInterval(step, 100);
