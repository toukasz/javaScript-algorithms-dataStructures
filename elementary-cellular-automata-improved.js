//Elementary Celluar Automata (Improved);

process.stdout.write('\x1Bc');

var x = [];
var x_temp = [];
const n = 40;
const r = 40;
const rand = true;
const loop = true;
const luck = true;
var rule = [0, 1, 1, 0, 1, 1, 1, 0];
const ascii = ["  ","██","??"];

if (luck) {
	rule = [];
	for (let i = 0; i < 8; i++) {
		if (Math.random() >= 0.5) {
			rule.push(1);
		} else {
			rule.push(0);
		}
	}
} else {
}

function x_rand() {
	for (let i = 0; i < 2 * n + 1; i++) {
		if (Math.random() >= 0.5) {
			x.push(1);
		} else {
			x.push(0);
		}
	}
}

function x_cntr() {
	for (let i = 0; i < 2 * n; i++) {
		if (i == n) {
			x.push(1);
			x.push(0);
		} else {
			x.push(0);
		}
	}
}

function x_pos(p) {
	if (loop) {
		if (p == 0) {
			return [x[2 * n], x[p], x[p + 1]];
		} else if (p == 2 * n) {
			return [x[p - 1], x[p], x[p - 2 * n]];
		} else {
			return [x[p - 1], x[p], x[p + 1]];
		}
	} else {
		if (p == 0) {
			return [0, x[p], x[p + 1]];
		} else if (p == 2 * n) {
			return [x[p - 1], x[p], 0];
		} else {
			return [x[p - 1], x[p], x[p + 1]];
		}
	}
}

function x_print() {
	for (let i = 0; i < 2 * n; i++) {
		if (x[i] == 0) {
			process.stdout.write(ascii[0].toString());
		} else if (x[i] == 1) {
			process.stdout.write(ascii[1].toString());
		} else {
			process.stdout.write(ascii[2].toString());
		}
	} process.stdout.write("\n");
}

function x_rule() {
	for (let i = 0; i < 2 * n + 1; i++) {
		if (x_pos(i).toString() == [1, 1, 1].toString()) {
			x_temp.push(rule[0]);
		} else if (x_pos(i).toString() == [1, 1, 0].toString()) {
			x_temp.push(rule[1]);
		} else if (x_pos(i).toString() == [1, 0, 1].toString()) {
			x_temp.push(rule[2]);
		} else if (x_pos(i).toString() == [1, 0, 0].toString()) {
			x_temp.push(rule[3]);
		} else if (x_pos(i).toString() == [0, 1, 1].toString()) {
			x_temp.push(rule[4]);
		} else if (x_pos(i).toString() == [0, 1, 0].toString()) {
			x_temp.push(rule[5]);
		} else if (x_pos(i).toString() == [0, 0, 1].toString()) {
			x_temp.push(rule[6]);
		} else if (x_pos(i).toString() == [0, 0, 0].toString()) {
			x_temp.push(rule[7]);
		} else {
			process.stdout.write("Error");
		}
	}
	x = x_temp;
	x_temp = [];
}

function layer() {
	x_print();
	x_rule();
}

if (rand) {
	x_rand();
} else {
	x_cntr();
}

setInterval(layer, 100);

/*
function state(a) {
	if (rule[a] == 0) {
		process.stdout.write(ascii[0]);
	} else if (rule[a] == 1) {
		process.stdout.write(ascii[1]);
	} else {
		process.stdout.write(ascii[2]);
	}
}

for (let i = 0; i < r; i++) {
	for (let i = 0; i < 2 * n + 1; i++) {
		if (x_pos(i).toString() == [1, 1, 1].toString()) {
			x_temp.push(rule[0]);
			state(0);
		} else if (x_pos(i).toString() == [1, 1, 0].toString()) {
			x_temp.push(rule[1]);
			state(1);
		} else if (x_pos(i).toString() == [1, 0, 1].toString()) {
			x_temp.push(rule[2]);
			state(2);
		} else if (x_pos(i).toString() == [1, 0, 0].toString()) {
			x_temp.push(rule[3]);
			state(3);
		} else if (x_pos(i).toString() == [0, 1, 1].toString()) {
			x_temp.push(rule[4]);
			state(4);
		} else if (x_pos(i).toString() == [0, 1, 0].toString()) {
			x_temp.push(rule[5]);
			state(5);
		} else if (x_pos(i).toString() == [0, 0, 1].toString()) {
			x_temp.push(rule[6]);
			state(6);
		} else if (x_pos(i).toString() == [0, 0, 0].toString()) {
			x_temp.push(rule[7]);
			state(7);
		} else {
			process.stdout.write("! ");
		}
	}
	process.stdout.write("\n");
	x = x_temp;
	x_temp = [];
}
*/
