process.stdout.write('\x1Bc');

var x = [];
var y = [];
var z = [];
var arr = [];
var z_old = z;
var z_sum = [];
const x_sprd = 80;
const y_sprd = 40;
const live = "██";
const dead = "  ";

function x_axis() {
	for (let i = 0; i < y_sprd; i++) {
		for (let i = 0; i < x_sprd; i++) {
			x.push(i);
		}
	}
}

function y_axis() {
	for (let i = 0; i < y_sprd; i++) {
		for (let n = 0; n < x_sprd; n++) {
			y.push(i);
		}
	}
}

function z_axis() {
	for (let i = 0; i < x_sprd * y_sprd; i++) {
		if (Math.random() >= 0.5) {
			z.push(1);
		} else {
			z.push(0);
		}
	}
}

function print() {
	for (let i = 0; i < x_sprd * y_sprd; i++) {
		if (arr[i][2] == 1 && (i + 1) % x_sprd == 0) {
			process.stdout.write(live + "\n");
		} else if (arr[i][2] == 0 && (i + 1) % x_sprd == 0) {
			process.stdout.write(dead + "\n");
		} else if (arr[i][2] == 1) {
			process.stdout.write(live); 
		} else if (arr[i][2] == 0) {
			process.stdout.write(dead);
		} else {
			process.stdout.write("??");
		}
	}
}

// read 'z' at (x, y)
function life(n, m) {
	return(arr[x[n] + x_sprd * y[x_sprd * m]][2]);
}

// read sum life at (x, y)
function death(n, m) {
	if (n == 0 && m == 0) {
		return life(x_sprd - 1, y_sprd - 1) + life(n, y_sprd - 1) + life(n + 1, y_sprd - 1)
			+ life(x_sprd - 1, m) + life(n + 1, m)
			+ life(x_sprd - 1, m + 1) + life(n, m + 1) + life(n + 1, m + 1);
	} else if (n == x_sprd - 1 && m == 0) {
		return life(n - 1, y_sprd - 1) + life(n, y_sprd - 1) + life(0, y_sprd - 1)
			+ life(n - 1, m) + life(0, m)
			+ life(n - 1, m + 1) + life(n, m + 1) + life(0, m + 1);
	} else if (n == 0 && m == y_sprd - 1) {
		return life(x_sprd - 1, m - 1) + life(n, m - 1) + life(n + 1, m - 1)
			+ life(x_sprd - 1, m) + life(n + 1, m)
			+ life(x_sprd - 1, 0) + life(n, 0) + life(n + 1, 0);
	} else if (n == x_sprd - 1 && m == y_sprd - 1) {
		return life(n - 1, m - 1) + life(n, m - 1) + life(0, m - 1)
			+ life(n - 1, m) + life(0, m)
			+ life(n - 1, 0) + life(n, 0) + life(0, 0);
	} else if (n == 0) {
		return life(x_sprd - 1, m - 1) + life(n, m - 1) + life(n + 1, m - 1)
			+ life(x_sprd - 1, m) + life(n + 1, m)
			+ life(x_sprd - 1, m + 1) + life(n, m + 1) + life(n + 1, m + 1);
	} else if (n == x_sprd - 1) {
		return life(n - 1, m - 1) + life(n, m - 1) + life(0, m - 1)
			+ life(n - 1, m) + life(0, m)
			+ life(n - 1, m + 1) + life(n, m + 1) + life(0, m + 1);
	} else if (m == 0) {
		return life(n - 1, y_sprd - 1) + life(n, y_sprd - 1) + life(n + 1, y_sprd - 1)
			+ life(n - 1, m) + life(n + 1, m)
			+ life(n - 1, m + 1) + life(n, m + 1) + life(n + 1, m + 1);
	} else if (m == y_sprd - 1) {
		return life(n - 1, m - 1) + life(n, m - 1) + life(n + 1, m - 1)
			+ life(n - 1, m) + life(n + 1, m)
			+ life(n - 1, 0) + life(n, 0) + life(n + 1, 0);
	} else {
		return life(n - 1, m - 1) + life(n, m - 1) + life(n + 1, m - 1)
			+ life(n - 1, m) + life(n + 1, m)
			+ life(n - 1, m + 1) + life(n, m + 1) + life(n + 1, m + 1);
	}
}

x_axis();
y_axis();
z_axis();
for (let i = 0; i < x_sprd * y_sprd; i++) {
arr.push([x.shift(),y.shift(),z.shift()]);
}

print();

function step() {
	x_axis();
	y_axis();
	z_sum = [];
	for (let i = 0; i < x_sprd * y_sprd; i++) {
		z_sum.push(death(x[i], y[i]));
	}
	for (let i = 0; i < x_sprd * y_sprd; i++) {
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
