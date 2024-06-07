process.stdout.write('\x1Bc');

let array = [];
let arrayNext = [];
const limit = 100;

//for (let i = 0; i <= limit; i++) {
//	array.unshift(".");
//}

for (let i = 0; i <= limit; i++) {
	if (Math.random() >= 0.5) {
		array.unshift(".");
	} else {
		array.unshift("#");
	}
}

function iterate() {
	for (let n = 0; n <= limit; n++) {
		if (array.at(n - 1) + array.at(n) + array.at(n + 1) == "###") {
			arrayNext.push(".");
		} else if (array.at(n - 1) + array.at(n) + array.at(n + 1) == "##.") {
			arrayNext.push("#");
		} else if (array.at(n - 1) + array.at(n) + array.at(n + 1) == "#.#") {
			arrayNext.push("#");
		} else if (array.at(n - 1) + array.at(n) + array.at(n + 1) == "#..") {
			arrayNext.push(".");
		} else if (array.at(n - 1) + array.at(n) + array.at(n + 1) == ".##") {
			arrayNext.push("#");
		} else if (array.at(n - 1) + array.at(n) + array.at(n + 1) == ".#.") {
			arrayNext.push("#");
		} else if (array.at(n - 1) + array.at(n) + array.at(n + 1) == "..#") {
			arrayNext.push("#");
		} else if (array.at(n - 1) + array.at(n) + array.at(n + 1) == "...") {
			arrayNext.push(".");
		} else {
			arrayNext.push("#");
		}
	}
	array = arrayNext;
	arrayNext = [];

	for (let m = 0; m <= limit; m++) {
		process.stdout.write(array.at(m));
	}
	process.stdout.write("\n");
}

for (i = 0; i < 40; i++) {
	iterate();
}
