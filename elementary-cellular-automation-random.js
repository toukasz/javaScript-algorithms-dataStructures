//Elementary Cellular Automaton with Variable Rules

process.stdout.write('\x1Bc');
process.stdout.write('press "s" to start, "q" to quit');

const readline = require('readline');
const rl = readline.createInterface ({
	input: process.stdin,
	output: process.stdout
});

process.stdin.on('keypress', (str, key) => {
  if (str === 's') {
    process.stdout.write('\x1Bc');
    start();
  }
  if (str === 'q') {
	process.stdout.write('\x1Bc');
    process.exit();
  }
});

function start() {
	let arr = [];
	let arrt = [];
	const lim = 100;
	const num = 40;
	const ran = true;
	let rul = []; //rule 110: [" ", "#", "#", " ", "#", "#", "#", " "]

	if (ran) {
		for (let i = 0; i < lim; i++) {
			if (Math.random() >= 0.5) {
				arr.push("#");
			} else {
				arr.push(" ");
			}
		}
	} else {
		for (let i = 0; i < lim - 1; i++) {
			arr.push(" ");
		} arr.push("#");
		for (let i = 0; i < lim; i++) {
			process.stdout.write(arr.at(i));
		} process.stdout.write("\n");
	}

	if (ran) {
		process.stdout.write("Rule: [");
		for (let i = 0; i < 8; i++) {
			if (Math.random() >= 0.5) {
				rul.push("#");
			} else {
				rul.push(" ");
			}
			process.stdout.write(rul.at(i));
		} process.stdout.write("]\n");
	} else {
		console.log("Rule: 110");
		rul.push(" ");
		rul.push("#");
		rul.push("#");
		rul.push(" ");
		rul.push("#");
		rul.push("#");
		rul.push("#");
		rul.push(" ");
	}

	function ite() {
		for (let i = 0; i < lim; i++) {
			if (arr.at(i - 1) + arr.at(i) + arr.at(i + 1) == "###") {
				arrt.push(rul.at(0));
			} else if (arr.at(i - 1) + arr.at(i) + arr.at(i + 1) == "## ") {
				arrt.push(rul.at(1));
			} else if (arr.at(i - 1) + arr.at(i) + arr.at(i + 1) == "# #") {
				arrt.push(rul.at(2));
			} else if (arr.at(i - 1) + arr.at(i) + arr.at(i + 1) == "#  ") {
				arrt.push(rul.at(3));
			} else if (arr.at(i - 1) + arr.at(i) + arr.at(i + 1) == " ##") {
				arrt.push(rul.at(4));
			} else if (arr.at(i - 1) + arr.at(i) + arr.at(i + 1) == " # ") {
				arrt.push(rul.at(5));
			} else if (arr.at(i - 1) + arr.at(i) + arr.at(i + 1) == "  #") {
				arrt.push(rul.at(6));
			} else if (arr.at(i - 1) + arr.at(i) + arr.at(i + 1) == "   ") {
				arrt.push(rul.at(7));
			} else {
				if (arr.at(i - 1) + arr.at(i) + arr.at(0) == "###") {
					arrt.push(rul.at(0));
				} else if (arr.at(i - 1) + arr.at(i) + arr.at(0) == "## ") {
					arrt.push(rul.at(1));
				} else if (arr.at(i - 1) + arr.at(i) + arr.at(0) == "# #") {
					arrt.push(rul.at(2));
				} else if (arr.at(i - 1) + arr.at(i) + arr.at(0) == "#  ") {
					arrt.push(rul.at(3));
				} else if (arr.at(i - 1) + arr.at(i) + arr.at(0) == " ##") {
					arrt.push(rul.at(4));
				} else if (arr.at(i - 1) + arr.at(i) + arr.at(0) == " # ") {
					arrt.push(rul.at(5));
				} else if (arr.at(i - 1) + arr.at(i) + arr.at(0) == "  #") {
					arrt.push(rul.at(6));
				} else if (arr.at(i - 1) + arr.at(i) + arr.at(0) == "   ") {
					arrt.push(rul.at(7));
				} else {
					console.log("fail");
				}
			}
		}
		for (let i = 0; i < lim; i++) {
			process.stdout.write(arrt.at(i));
		}
		process.stdout.write("\n");
		arr = arrt;
		arrt = [];
	}

	for (let i = 0; i < num; i++) {
		ite();
	}
}
