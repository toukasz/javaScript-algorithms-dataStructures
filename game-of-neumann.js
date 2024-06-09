// PRESS "S" to regenerate random rule
// PRESS "R" to regenerate grid with random noise
process.stdout.write('\x1Bc');

const readline = require('readline');
const rl = readline.createInterface ({
	input: process.stdin,
	output: process.stdout
});

process.stdin.on('keypress', (str, key) => {
	if (str === 'r') {
		clearInterval(start);
		array = arrayState(0, 0, width, height, arrayGenerate(0, width, height, []));
		start = setInterval(printLive, 200);
	} if (str === 's') {
		rule = ruleGenerate(0, 5, []);
	} 
});

const width = 80;
const height = 40;
const ascii = ["  ","██","??"];
var rule = ruleGenerate(0, 5, []);
var start = setInterval(printLive, 150);
var array = [];

array = arrayState(0, 0, width, height, arrayGenerate(0, width, height, []));

function arrayWidth(index, width, array) {
	if (index < width) {
		array.push([]);
		arrayWidth(index + 1, width, array);
	}
	return array;
}

function arrayGenerate(index, width, height, array) {
	if (index < height) {
		array.push(arrayWidth(0, width, []));
		arrayGenerate(index + 1, width, height, array);
	}
	return array;
}

function randomState() {
	if (Math.random() >= 0.5) {
		return 1;
	} else {
		return 0;
	}
}

function arrayState(nth_width, nth_height, width, height, array) {
	if (nth_height < height) {
		if (nth_width < width) {
			array[nth_height][nth_width] = randomState();
			arrayState(nth_width + 1, nth_height, width, height, array);
		} else {
			nth_width = 0;
			arrayState(nth_width, nth_height + 1, width, height, array);
		}
	}
	return array;
}

function indexSum(index, nth_width, nth_height, width, height, array) {
		if (nth_height == 0) {
			index += array[height - 1][nth_width];
		} else {
			index += array[nth_height - 1][nth_width];
		} if (nth_width == width - 1) {
			index += array[nth_height][0];
		} else {
			index += array[nth_height][nth_width + 1];
		} if (nth_height == height - 1) {
			index += array[0][nth_width];
		} else {
			index += array[nth_height + 1][nth_width];
		} if (nth_width == 0) {
			index += array[nth_height][width - 1];
		} else {
			index += array[nth_height][nth_width - 1];
		}
	return index;
}

function ruleGenerate(index, ruleLength, array) {
	if (index < ruleLength) {
		array.push(randomState());
		ruleGenerate(index + 1, ruleLength, array);
	}
return array;
}

function arrayOutcome(nth_width, nth_height, width, height, arrayOld, arrayNew) {
	if (nth_height < height) {
		if (nth_width < width) {
			arrayNew[nth_height][nth_width] = rule[indexSum(0, nth_width, nth_height, width, height, arrayOld)];
			arrayOutcome(nth_width + 1, nth_height, width, height, arrayOld, arrayNew);
		} else {
			nth_width = 0;
			arrayOutcome(nth_width, nth_height + 1, width, height, arrayOld, arrayNew);
		}
	}
	return arrayNew;
}

function arrayPrint (nth_width, nth_height, array) {
	if (nth_height < height) {
		if (nth_width < width) {
			if (array[nth_height][nth_width].toString() == 0) {
				process.stdout.write(ascii[0]);
			} else if (array[nth_height][nth_width].toString() == 1) {
				process.stdout.write(ascii[1]);
			} else {
				process.stdout.write(ascii[2]);
			}
			arrayPrint(nth_width + 1, nth_height, array);
		} else {
			process.stdout.write("\n");
			nth_width = 0;
			arrayPrint(nth_width, nth_height + 1, array);
		}
	}
}

function printLive() {
	process.stdout.write('\x1Bc');
	arrayPrint(0, 0, array);
	array = arrayOutcome(0, 0, width, height, array, array);
}
