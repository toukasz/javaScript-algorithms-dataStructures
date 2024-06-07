process.stdout.write('\x1Bc');

var n = [];
var m = [];
const lim = 100;
const div = 10;

for (let i = 0; i < lim; i++) {
	if (Math.random() >= 0.5) {
		n.push("# ");
	} else {
		n.push(". ");
	}
}

for (let i = 0; i < lim; i++) {
	process.stdout.write(n.at(i));
	if ((i + 1) % div === 0) {
		process.stdout.write("\n");
	}
}

// n-51 n-50 n-49
// n-1 n n+1
// n+49 n+50 n+51

function ana(x) {
	if (n.at(x) == "# ") {
		m.push(1);
	} else if (n.at(x) == ". ") {
		m.push(0);
	} else {
		console.log("fail");
	}
}

for (let i = 0; i < lim; i++) {
		if (i + 1 >= lim - div && i + 1 !== lim) {
		ana(i - div - 1);
		ana(i - div);
		ana(i - div + 1);
		ana(i - 1);
		ana(i);
		ana(i + 1);
		ana(i - lim + div - 1);
		ana(i - lim + div);
		ana(i - lim + div + 1);
		m = [];
	} else if (i + 1 == lim) {
		ana(i - div - 1);
		ana(i - div);
		ana(i - div + 1);
		ana(i - lim - 1);
		ana(i - lim);
		ana(i - lim + 1);
		ana(i - lim + div - 1);
		ana(i - lim + div);
		ana(i - lim + div + 1);
		console.log(m);
		m = [];
	} else {
		ana(i - div - 1);
		ana(i - div);
		ana(i - div + 1);
		ana(i - 1);
		ana(i);
		ana(i + 1);
		ana(i + div - 1);
		ana(i + div);
		ana(i + div + 1);
		m = [];
	}
}
