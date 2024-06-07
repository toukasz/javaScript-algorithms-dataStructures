process.stdout.write('\x1Bc');

let array = [".", ".", ".", ".", ".", ".", ".", ".", ".", ".",".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."];
let arrayNext = [];

function iterate() {
	for (let n = 0; n <= 20; n++) {
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
	for (let m = 0; m <= 20; m++) {
		process.stdout.write(array.at(m));
	}
	process.stdout.write("\n");
}

for (i = 0; i < 20; i++) {
	iterate();
}
